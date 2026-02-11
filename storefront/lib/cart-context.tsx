"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { medusaClientFetch, getRegion } from "@/lib/medusa";

export interface CartItem {
  productId: string;
  variantId: string;
  title: string;
  variantTitle: string;
  price: number; // cents
  quantity: number;
  image: string;
  handle: string;
  lineItemId?: string; // Medusa line item id
}

interface CartContextType {
  items: CartItem[];
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (item: Omit<CartItem, "quantity" | "lineItemId">, quantity?: number) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  cartId: string | null;
}

const CartContext = createContext<CartContextType | null>(null);

const CART_ID_KEY = "healthea-cart-id";

// --- Medusa cart API helpers ---

async function createMedusaCart(): Promise<string | null> {
  try {
    const region = await getRegion();
    const data = await medusaClientFetch<{ cart: { id: string } }>(
      "/store/carts",
      { method: "POST", body: { region_id: region.id } }
    );
    return data.cart.id;
  } catch (e) {
    console.error("Failed to create cart:", e);
    return null;
  }
}

async function addLineItem(
  cartId: string,
  variantId: string,
  quantity: number
): Promise<MedusaCart | null> {
  try {
    const data = await medusaClientFetch<{ cart: MedusaCart }>(
      `/store/carts/${cartId}/line-items`,
      { method: "POST", body: { variant_id: variantId, quantity } }
    );
    return data.cart;
  } catch (e) {
    console.error("Failed to add line item:", e);
    return null;
  }
}

async function updateLineItem(
  cartId: string,
  lineItemId: string,
  quantity: number
): Promise<MedusaCart | null> {
  try {
    const data = await medusaClientFetch<{ cart: MedusaCart }>(
      `/store/carts/${cartId}/line-items/${lineItemId}`,
      { method: "POST", body: { quantity } }
    );
    return data.cart;
  } catch (e) {
    console.error("Failed to update line item:", e);
    return null;
  }
}

async function deleteLineItem(
  cartId: string,
  lineItemId: string
): Promise<void> {
  try {
    await medusaClientFetch(
      `/store/carts/${cartId}/line-items/${lineItemId}`,
      { method: "DELETE" }
    );
  } catch (e) {
    console.error("Failed to delete line item:", e);
  }
}

async function fetchCart(cartId: string): Promise<MedusaCart | null> {
  try {
    const data = await medusaClientFetch<{ cart: MedusaCart }>(
      `/store/carts/${cartId}`
    );
    return data.cart;
  } catch {
    return null;
  }
}

interface MedusaLineItem {
  id: string;
  variant_id: string;
  product_id: string;
  title: string;
  quantity: number;
  unit_price: number;
  thumbnail: string | null;
  variant: {
    id: string;
    title: string;
    product: {
      handle: string;
      thumbnail: string | null;
    };
  };
}

interface MedusaCart {
  id: string;
  items: MedusaLineItem[];
}

function mapMedusaItems(items: MedusaLineItem[]): CartItem[] {
  return items.map((item) => ({
    productId: item.product_id,
    variantId: item.variant_id,
    title: item.title,
    variantTitle: item.variant?.title ?? "",
    price: item.unit_price,
    quantity: item.quantity,
    image: item.thumbnail || item.variant?.product?.thumbnail || "",
    handle: item.variant?.product?.handle ?? "",
    lineItemId: item.id,
  }));
}

// --- Provider ---

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate: load cart from Medusa on mount
  useEffect(() => {
    const storedId = localStorage.getItem(CART_ID_KEY);
    if (storedId) {
      setCartId(storedId);
      fetchCart(storedId).then((cart) => {
        if (cart) {
          setItems(mapMedusaItems(cart.items));
        } else {
          localStorage.removeItem(CART_ID_KEY);
        }
        setHydrated(true);
      });
    } else {
      setHydrated(true);
    }
  }, []);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity" | "lineItemId">, quantity = 1) => {
      // Optimistic update
      setItems((prev) => {
        const existing = prev.find((i) => i.variantId === item.variantId);
        if (existing) {
          return prev.map((i) =>
            i.variantId === item.variantId
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        }
        return [...prev, { ...item, quantity }];
      });
      setIsDrawerOpen(true);

      // Sync with Medusa
      (async () => {
        let currentCartId = cartId;

        if (!currentCartId) {
          currentCartId = await createMedusaCart();
          if (!currentCartId) return;
          setCartId(currentCartId);
          localStorage.setItem(CART_ID_KEY, currentCartId);
        }

        const cart = await addLineItem(currentCartId, item.variantId, quantity);
        if (cart) {
          setItems(mapMedusaItems(cart.items));
        }
      })();
    },
    [cartId]
  );

  const removeItem = useCallback(
    (variantId: string) => {
      const item = items.find((i) => i.variantId === variantId);

      // Optimistic update
      setItems((prev) => prev.filter((i) => i.variantId !== variantId));

      // Sync with Medusa
      if (cartId && item?.lineItemId) {
        deleteLineItem(cartId, item.lineItemId);
      }
    },
    [cartId, items]
  );

  const updateQuantity = useCallback(
    (variantId: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(variantId);
        return;
      }

      const item = items.find((i) => i.variantId === variantId);

      // Optimistic update
      setItems((prev) =>
        prev.map((i) => (i.variantId === variantId ? { ...i, quantity } : i))
      );

      // Sync with Medusa
      if (cartId && item?.lineItemId) {
        updateLineItem(cartId, item.lineItemId, quantity);
      }
    },
    [cartId, items, removeItem]
  );

  const clearCart = useCallback(() => {
    setItems([]);
    setCartId(null);
    localStorage.removeItem(CART_ID_KEY);
  }, []);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  // Don't render children until hydration is complete to prevent mismatch
  if (!hydrated) {
    return (
      <CartContext.Provider
        value={{
          items: [],
          isDrawerOpen: false,
          openDrawer: () => {},
          closeDrawer: () => {},
          addItem: () => {},
          removeItem: () => {},
          updateQuantity: () => {},
          clearCart: () => {},
          itemCount: 0,
          subtotal: 0,
          cartId: null,
        }}
      >
        {children}
      </CartContext.Provider>
    );
  }

  return (
    <CartContext.Provider
      value={{
        items,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        cartId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
