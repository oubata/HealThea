import { CreateInventoryLevelInput, ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  Modules,
  ProductStatus,
} from "@medusajs/framework/utils";
import {
  createWorkflow,
  transform,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import {
  createApiKeysWorkflow,
  createInventoryLevelsWorkflow,
  createProductCategoriesWorkflow,
  createProductsWorkflow,
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createShippingOptionsWorkflow,
  createShippingProfilesWorkflow,
  createStockLocationsWorkflow,
  createTaxRegionsWorkflow,
  linkSalesChannelsToApiKeyWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
  updateStoresStep,
  updateStoresWorkflow,
} from "@medusajs/medusa/core-flows";
import { ApiKey } from "../../.medusa/types/query-entry-points";

const updateStoreCurrencies = createWorkflow(
  "update-store-currencies",
  (input: {
    supported_currencies: { currency_code: string; is_default?: boolean }[];
    store_id: string;
  }) => {
    const normalizedInput = transform({ input }, (data) => {
      return {
        selector: { id: data.input.store_id },
        update: {
          supported_currencies: data.input.supported_currencies.map(
            (currency) => {
              return {
                currency_code: currency.currency_code,
                is_default: currency.is_default ?? false,
              };
            }
          ),
        },
      };
    });

    const stores = updateStoresStep(normalizedInput);

    return new WorkflowResponse(stores);
  }
);

export default async function seedDemoData({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const link = container.resolve(ContainerRegistrationKeys.LINK);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const fulfillmentModuleService = container.resolve(Modules.FULFILLMENT);
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);
  const storeModuleService = container.resolve(Modules.STORE);

  logger.info("Seeding HealThEA store data...");
  const [store] = await storeModuleService.listStores();
  let defaultSalesChannel = await salesChannelModuleService.listSalesChannels({
    name: "Default Sales Channel",
  });

  if (!defaultSalesChannel.length) {
    const { result: salesChannelResult } = await createSalesChannelsWorkflow(
      container
    ).run({
      input: {
        salesChannelsData: [
          {
            name: "Default Sales Channel",
          },
        ],
      },
    });
    defaultSalesChannel = salesChannelResult;
  }

  // Set CAD as default currency
  await updateStoreCurrencies(container).run({
    input: {
      store_id: store.id,
      supported_currencies: [
        {
          currency_code: "cad",
          is_default: true,
        },
        {
          currency_code: "usd",
        },
      ],
    },
  });

  await updateStoresWorkflow(container).run({
    input: {
      selector: { id: store.id },
      update: {
        default_sales_channel_id: defaultSalesChannel[0].id,
      },
    },
  });

  logger.info("Seeding Canadian region data...");
  const { result: regionResult } = await createRegionsWorkflow(container).run({
    input: {
      regions: [
        {
          name: "Canada",
          currency_code: "cad",
          countries: ["ca"],
          payment_providers: ["pp_system_default"],
        },
      ],
    },
  });
  const region = regionResult[0];
  logger.info("Finished seeding regions.");

  logger.info("Seeding tax regions...");
  await createTaxRegionsWorkflow(container).run({
    input: [
      {
        country_code: "ca",
        provider_id: "tp_system",
      },
    ],
  });
  logger.info("Finished seeding tax regions.");

  logger.info("Seeding stock location data...");
  const { result: stockLocationResult } = await createStockLocationsWorkflow(
    container
  ).run({
    input: {
      locations: [
        {
          name: "HealThEA Canadian Warehouse",
          address: {
            city: "Toronto",
            country_code: "CA",
            address_1: "123 Main Street",
            province: "ON",
            postal_code: "M5V 1A1",
          },
        },
      ],
    },
  });
  const stockLocation = stockLocationResult[0];

  await updateStoresWorkflow(container).run({
    input: {
      selector: { id: store.id },
      update: {
        default_location_id: stockLocation.id,
      },
    },
  });

  await link.create({
    [Modules.STOCK_LOCATION]: {
      stock_location_id: stockLocation.id,
    },
    [Modules.FULFILLMENT]: {
      fulfillment_provider_id: "manual_manual",
    },
  });

  logger.info("Seeding fulfillment data...");
  const shippingProfiles = await fulfillmentModuleService.listShippingProfiles({
    type: "default",
  });
  let shippingProfile = shippingProfiles.length ? shippingProfiles[0] : null;

  if (!shippingProfile) {
    const { result: shippingProfileResult } =
      await createShippingProfilesWorkflow(container).run({
        input: {
          data: [
            {
              name: "Default Shipping Profile",
              type: "default",
            },
          ],
        },
      });
    shippingProfile = shippingProfileResult[0];
  }

  const fulfillmentSet = await fulfillmentModuleService.createFulfillmentSets({
    name: "Canadian Shipping",
    type: "shipping",
    service_zones: [
      {
        name: "Canada",
        geo_zones: [
          {
            country_code: "ca",
            type: "country",
          },
        ],
      },
    ],
  });

  await link.create({
    [Modules.STOCK_LOCATION]: {
      stock_location_id: stockLocation.id,
    },
    [Modules.FULFILLMENT]: {
      fulfillment_set_id: fulfillmentSet.id,
    },
  });

  await createShippingOptionsWorkflow(container).run({
    input: [
      {
        name: "Standard Shipping",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: fulfillmentSet.service_zones[0].id,
        shipping_profile_id: shippingProfile.id,
        type: {
          label: "Standard",
          description: "Delivered in 5-7 business days.",
          code: "standard",
        },
        prices: [
          {
            currency_code: "cad",
            amount: 599,
          },
          {
            region_id: region.id,
            amount: 599,
          },
        ],
        rules: [
          {
            attribute: "enabled_in_store",
            value: "true",
            operator: "eq",
          },
          {
            attribute: "is_return",
            value: "false",
            operator: "eq",
          },
        ],
      },
      {
        name: "Express Shipping",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: fulfillmentSet.service_zones[0].id,
        shipping_profile_id: shippingProfile.id,
        type: {
          label: "Express",
          description: "Delivered in 1-2 business days.",
          code: "express",
        },
        prices: [
          {
            currency_code: "cad",
            amount: 1299,
          },
          {
            region_id: region.id,
            amount: 1299,
          },
        ],
        rules: [
          {
            attribute: "enabled_in_store",
            value: "true",
            operator: "eq",
          },
          {
            attribute: "is_return",
            value: "false",
            operator: "eq",
          },
        ],
      },
    ],
  });
  logger.info("Finished seeding fulfillment data.");

  await linkSalesChannelsToStockLocationWorkflow(container).run({
    input: {
      id: stockLocation.id,
      add: [defaultSalesChannel[0].id],
    },
  });
  logger.info("Finished seeding stock location data.");

  logger.info("Seeding publishable API key data...");
  let publishableApiKey: ApiKey | null = null;
  const { data } = await query.graph({
    entity: "api_key",
    fields: ["id"],
    filters: {
      type: "publishable",
    },
  });

  publishableApiKey = data?.[0];

  if (!publishableApiKey) {
    const {
      result: [publishableApiKeyResult],
    } = await createApiKeysWorkflow(container).run({
      input: {
        api_keys: [
          {
            title: "HealThEA Storefront",
            type: "publishable",
            created_by: "",
          },
        ],
      },
    });

    publishableApiKey = publishableApiKeyResult as ApiKey;
  }

  await linkSalesChannelsToApiKeyWorkflow(container).run({
    input: {
      id: publishableApiKey.id,
      add: [defaultSalesChannel[0].id],
    },
  });
  logger.info("Finished seeding publishable API key data.");

  logger.info("Seeding tea product categories...");
  const { result: categoryResult } = await createProductCategoriesWorkflow(
    container
  ).run({
    input: {
      product_categories: [
        { name: "Green Tea", is_active: true },
        { name: "Black Tea", is_active: true },
        { name: "White Tea", is_active: true },
        { name: "Organic Tea", is_active: true },
        { name: "Herbal Tea", is_active: true },
        { name: "Oolong Tea", is_active: true },
        { name: "Matcha", is_active: true },
        { name: "Chai", is_active: true },
      ],
    },
  });

  const catId = (name: string) =>
    categoryResult.find((c) => c.name === name)!.id;

  logger.info("Seeding tea products...");
  await createProductsWorkflow(container).run({
    input: {
      products: [
        {
          title: "Japanese Sencha Green Tea",
          category_ids: [catId("Green Tea")],
          description:
            "A classic Japanese green tea with a delicate balance of sweetness and astringency. Rich in catechins and vitamin C.",
          handle: "japanese-sencha-green-tea",
          weight: 100,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          options: [{ title: "Weight", values: ["50g", "100g", "250g"] }],
          variants: [
            {
              title: "50g",
              sku: "SENCHA-50G",
              options: { Weight: "50g" },
              prices: [{ amount: 1499, currency_code: "cad" }],
            },
            {
              title: "100g",
              sku: "SENCHA-100G",
              options: { Weight: "100g" },
              prices: [{ amount: 2499, currency_code: "cad" }],
            },
            {
              title: "250g",
              sku: "SENCHA-250G",
              options: { Weight: "250g" },
              prices: [{ amount: 4999, currency_code: "cad" }],
            },
          ],
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        {
          title: "Chinese Gunpowder Green Tea",
          category_ids: [catId("Green Tea")],
          description:
            "Tightly rolled pellet-like leaves delivering a bold, slightly smoky flavour. Excellent base for Moroccan mint tea.",
          handle: "chinese-gunpowder-green-tea",
          weight: 100,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          options: [{ title: "Weight", values: ["50g", "100g", "250g"] }],
          variants: [
            {
              title: "50g",
              sku: "GUNPOWDER-50G",
              options: { Weight: "50g" },
              prices: [{ amount: 1199, currency_code: "cad" }],
            },
            {
              title: "100g",
              sku: "GUNPOWDER-100G",
              options: { Weight: "100g" },
              prices: [{ amount: 1999, currency_code: "cad" }],
            },
            {
              title: "250g",
              sku: "GUNPOWDER-250G",
              options: { Weight: "250g" },
              prices: [{ amount: 3999, currency_code: "cad" }],
            },
          ],
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        {
          title: "Darjeeling First Flush Black Tea",
          category_ids: [catId("Black Tea")],
          description:
            "The 'Champagne of Teas' — harvested in spring from the Himalayan foothills. Light, floral cup with muscatel notes.",
          handle: "darjeeling-first-flush-black-tea",
          weight: 100,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          options: [{ title: "Weight", values: ["50g", "100g", "250g"] }],
          variants: [
            {
              title: "50g",
              sku: "DARJEELING-50G",
              options: { Weight: "50g" },
              prices: [{ amount: 1899, currency_code: "cad" }],
            },
            {
              title: "100g",
              sku: "DARJEELING-100G",
              options: { Weight: "100g" },
              prices: [{ amount: 3299, currency_code: "cad" }],
            },
            {
              title: "250g",
              sku: "DARJEELING-250G",
              options: { Weight: "250g" },
              prices: [{ amount: 6999, currency_code: "cad" }],
            },
          ],
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        {
          title: "Earl Grey Supreme",
          category_ids: [catId("Black Tea")],
          description:
            "Premium Ceylon black tea with natural bergamot oil and cornflower petals. Sophisticated, citrus-forward cup.",
          handle: "earl-grey-supreme",
          weight: 100,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          options: [{ title: "Weight", values: ["50g", "100g", "250g"] }],
          variants: [
            {
              title: "50g",
              sku: "EARLGREY-50G",
              options: { Weight: "50g" },
              prices: [{ amount: 1399, currency_code: "cad" }],
            },
            {
              title: "100g",
              sku: "EARLGREY-100G",
              options: { Weight: "100g" },
              prices: [{ amount: 2399, currency_code: "cad" }],
            },
            {
              title: "250g",
              sku: "EARLGREY-250G",
              options: { Weight: "250g" },
              prices: [{ amount: 4799, currency_code: "cad" }],
            },
          ],
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        {
          title: "Silver Needle White Tea",
          category_ids: [catId("White Tea")],
          description:
            "The most prized white tea — unopened buds with honeyed sweetness and silky texture. A true luxury tea.",
          handle: "silver-needle-white-tea",
          weight: 50,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          options: [{ title: "Weight", values: ["50g", "100g"] }],
          variants: [
            {
              title: "50g",
              sku: "SILVERNEEDLE-50G",
              options: { Weight: "50g" },
              prices: [{ amount: 2499, currency_code: "cad" }],
            },
            {
              title: "100g",
              sku: "SILVERNEEDLE-100G",
              options: { Weight: "100g" },
              prices: [{ amount: 4499, currency_code: "cad" }],
            },
          ],
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        {
          title: "Organic Chamomile Bliss",
          category_ids: [catId("Herbal Tea"), catId("Organic Tea")],
          description:
            "Pure Egyptian chamomile flowers, certified organic. Caffeine-free with gentle apple-like sweetness and calming properties.",
          handle: "organic-chamomile-bliss",
          weight: 50,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          options: [{ title: "Weight", values: ["50g", "100g"] }],
          variants: [
            {
              title: "50g",
              sku: "CHAMOMILE-50G",
              options: { Weight: "50g" },
              prices: [{ amount: 1299, currency_code: "cad" }],
            },
            {
              title: "100g",
              sku: "CHAMOMILE-100G",
              options: { Weight: "100g" },
              prices: [{ amount: 2199, currency_code: "cad" }],
            },
          ],
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        {
          title: "Tieguanyin Iron Goddess Oolong",
          category_ids: [catId("Oolong Tea")],
          description:
            "Legendary Chinese oolong with complex orchid fragrance and lingering sweet aftertaste.",
          handle: "tieguanyin-iron-goddess-oolong",
          weight: 50,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          options: [{ title: "Weight", values: ["50g", "100g"] }],
          variants: [
            {
              title: "50g",
              sku: "TIEGUANYIN-50G",
              options: { Weight: "50g" },
              prices: [{ amount: 2199, currency_code: "cad" }],
            },
            {
              title: "100g",
              sku: "TIEGUANYIN-100G",
              options: { Weight: "100g" },
              prices: [{ amount: 3899, currency_code: "cad" }],
            },
          ],
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        {
          title: "Ceremonial Grade Matcha",
          category_ids: [catId("Matcha")],
          description:
            "The finest stone-ground matcha from Uji, Kyoto. Vibrant emerald green with smooth umami-rich flavour.",
          handle: "ceremonial-grade-matcha",
          weight: 30,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          options: [{ title: "Weight", values: ["30g Tin", "100g Tin"] }],
          variants: [
            {
              title: "30g Tin",
              sku: "MATCHA-30G",
              options: { Weight: "30g Tin" },
              prices: [{ amount: 2999, currency_code: "cad" }],
            },
            {
              title: "100g Tin",
              sku: "MATCHA-100G",
              options: { Weight: "100g Tin" },
              prices: [{ amount: 7999, currency_code: "cad" }],
            },
          ],
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        {
          title: "Traditional Masala Chai",
          category_ids: [catId("Chai")],
          description:
            "Authentic Indian spice blend — Assam black tea with cinnamon, cardamom, ginger, cloves, and black pepper.",
          handle: "traditional-masala-chai",
          weight: 100,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          options: [{ title: "Weight", values: ["100g", "250g"] }],
          variants: [
            {
              title: "100g",
              sku: "CHAI-100G",
              options: { Weight: "100g" },
              prices: [{ amount: 1599, currency_code: "cad" }],
            },
            {
              title: "250g",
              sku: "CHAI-250G",
              options: { Weight: "250g" },
              prices: [{ amount: 3299, currency_code: "cad" }],
            },
          ],
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        {
          title: "Organic Rooibos Red Bush",
          category_ids: [catId("Organic Tea"), catId("Herbal Tea")],
          description:
            "Sustainably harvested from South Africa's Cederberg mountains. Naturally caffeine-free with sweet, nutty flavour.",
          handle: "organic-rooibos-red-bush",
          weight: 100,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          options: [{ title: "Weight", values: ["100g", "250g"] }],
          variants: [
            {
              title: "100g",
              sku: "ROOIBOS-100G",
              options: { Weight: "100g" },
              prices: [{ amount: 1399, currency_code: "cad" }],
            },
            {
              title: "250g",
              sku: "ROOIBOS-250G",
              options: { Weight: "250g" },
              prices: [{ amount: 2799, currency_code: "cad" }],
            },
          ],
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
      ],
    },
  });
  logger.info("Finished seeding tea product data.");

  logger.info("Seeding inventory levels...");
  const { data: inventoryItems } = await query.graph({
    entity: "inventory_item",
    fields: ["id"],
  });

  const inventoryLevels: CreateInventoryLevelInput[] = [];
  for (const inventoryItem of inventoryItems) {
    inventoryLevels.push({
      location_id: stockLocation.id,
      stocked_quantity: 100,
      inventory_item_id: inventoryItem.id,
    });
  }

  await createInventoryLevelsWorkflow(container).run({
    input: {
      inventory_levels: inventoryLevels,
    },
  });

  logger.info("Finished seeding inventory levels.");
  logger.info("HealThEA seed complete!");
}
