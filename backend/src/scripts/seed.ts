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
        {
          name: "Green Tea",
          description:
            "Unoxidised teas with fresh, grassy flavours. Rich in catechins and antioxidants, green teas are prized for their delicate taste and health benefits.",
          is_active: true,
        },
        {
          name: "Black Tea",
          description:
            "Fully oxidised teas with bold, robust flavours. From malty Assam to floral Darjeeling, black teas offer depth and complexity in every cup.",
          is_active: true,
        },
        {
          name: "White Tea",
          description:
            "The most delicate tea, minimally processed from young buds and leaves. White teas offer subtle sweetness, floral notes, and the highest antioxidant content.",
          is_active: true,
        },
        {
          name: "Organic Tea",
          description:
            "Certified organic selections grown without synthetic pesticides or fertilisers. Pure teas that are good for you and good for the planet.",
          is_active: true,
        },
        {
          name: "Herbal Tea",
          description:
            "Caffeine-free infusions crafted from flowers, herbs, and fruits. From soothing chamomile to refreshing peppermint, our herbal teas offer flavour and wellness without caffeine.",
          is_active: true,
        },
        {
          name: "Oolong Tea",
          description:
            "Partially oxidised teas that bridge the gap between green and black. Oolong offers complex flavour profiles ranging from floral and creamy to roasted and fruity.",
          is_active: true,
        },
        {
          name: "Matcha",
          description:
            "Stone-ground Japanese green tea powder, whisked into a frothy, vibrant cup. Matcha delivers a concentrated dose of antioxidants, L-theanine, and calm energy.",
          is_active: true,
        },
        {
          name: "Chai",
          description:
            "Aromatic spiced tea blends inspired by Indian chai traditions. Warm cinnamon, cardamom, ginger, and cloves meet bold black tea for a comforting, spicy cup.",
          is_active: true,
        },
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
            "A classic Japanese green tea from the sun-drenched fields of Shizuoka Prefecture. Deep-steamed for a rich, emerald-green liquor with a delicate balance of vegetal sweetness and mild astringency. Each sip reveals layers of umami, fresh grass, and a clean, lingering finish. Naturally high in catechins and vitamin C, Sencha is Japan's most beloved everyday tea.",
          handle: "japanese-sencha-green-tea",
          weight: 100,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          metadata: {
            origin_country: "Japan",
            health_benefits: "High in catechins, boosts metabolism, rich in vitamin C",
            brewing_temp: "70-80°C",
            steep_time: "1-2 minutes",
            caffeine_level: "medium",
          },
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
            "Hand-rolled into tight pellets that unfurl dramatically during steeping, Gunpowder green tea has been a Chinese staple for centuries. Sourced from the misty hills of Zhejiang Province, these leaves deliver a bold, slightly smoky flavour with a pleasantly sharp finish. A classic base for Moroccan mint tea, it also stands beautifully on its own as a robust, full-bodied green tea.",
          handle: "chinese-gunpowder-green-tea",
          weight: 100,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          metadata: {
            origin_country: "China",
            health_benefits: "Aids digestion, rich in antioxidants, supports heart health",
            brewing_temp: "75-85°C",
            steep_time: "2-3 minutes",
            caffeine_level: "medium",
          },
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
            "Known as the 'Champagne of Teas,' this first flush Darjeeling is harvested in early spring from the mist-covered estates of the Himalayan foothills. The light, amber liquor reveals an exquisite muscatel character — floral and bright with notes of stone fruit and a clean, crisp finish. Each harvest is limited, making this a prized selection for tea connoisseurs.",
          handle: "darjeeling-first-flush-black-tea",
          weight: 100,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          metadata: {
            origin_country: "India",
            health_benefits: "Boosts energy, supports cardiovascular health, rich in theaflavins",
            brewing_temp: "90-95°C",
            steep_time: "3-4 minutes",
            caffeine_level: "high",
          },
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
            "An elevated take on the classic Earl Grey, blending premium Ceylon black tea from the highlands of Sri Lanka with cold-pressed bergamot oil and delicate cornflower petals. The result is a sophisticated, citrus-forward cup with a smooth, malty base and a lingering floral-bergamot finish. Perfect for afternoon tea or as a refined morning ritual.",
          handle: "earl-grey-supreme",
          weight: 100,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          metadata: {
            origin_country: "Sri Lanka",
            health_benefits: "Improves focus, aids digestion, rich in antioxidants",
            brewing_temp: "95-100°C",
            steep_time: "3-5 minutes",
            caffeine_level: "high",
          },
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
            "The most prized white tea in the world, Bai Hao Yin Zhen is hand-picked from only the plumpest, most tender buds of the Fujian tea plant. Covered in fine silvery-white down, these buds produce a pale, luminous liquor with honeyed sweetness, notes of melon and peach, and an impossibly silky texture. Minimal processing preserves the highest antioxidant content of any tea type.",
          handle: "silver-needle-white-tea",
          weight: 50,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          metadata: {
            origin_country: "China",
            health_benefits: "Highest antioxidant content, anti-aging, supports skin health",
            brewing_temp: "70-75°C",
            steep_time: "3-5 minutes",
            caffeine_level: "low",
          },
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
            "Whole-flower Egyptian chamomile, certified organic and hand-harvested at peak bloom in the Nile Valley. These golden blossoms brew a gentle, honey-coloured infusion with a naturally sweet, apple-like fragrance and deeply calming properties. A perfect caffeine-free evening ritual that has been treasured for millennia as a natural remedy for restful sleep and relaxation.",
          handle: "organic-chamomile-bliss",
          weight: 50,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          metadata: {
            origin_country: "Egypt",
            health_benefits: "Promotes sleep, reduces anxiety, soothes digestion",
            brewing_temp: "95-100°C",
            steep_time: "5-7 minutes",
            caffeine_level: "none",
          },
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
            "Named after the Chinese Goddess of Mercy, this legendary Anxi oolong is one of China's most celebrated teas. Tightly rolled leaves unfurl to release a complex bouquet of orchid, lilac, and toasted grain. The smooth, creamy body gives way to a lingering sweet aftertaste that deepens with each re-infusion — Tieguanyin rewards patience with up to seven steepings of evolving flavour.",
          handle: "tieguanyin-iron-goddess-oolong",
          weight: 50,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          metadata: {
            origin_country: "China",
            health_benefits: "Boosts metabolism, supports bone health, reduces stress",
            brewing_temp: "85-95°C",
            steep_time: "3-5 minutes",
            caffeine_level: "medium",
          },
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
            "The finest ceremonial-grade matcha, stone-ground from shade-grown tencha leaves in the historic tea fields of Uji, Kyoto. This vibrant emerald powder produces an impossibly smooth, umami-rich bowl with a natural sweetness and creamy mouthfeel. Containing 137 times more antioxidants than standard green tea, ceremonial matcha is whisked to a frothy perfection for the traditional Japanese tea ceremony or enjoyed as a daily mindfulness ritual.",
          handle: "ceremonial-grade-matcha",
          weight: 30,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          metadata: {
            origin_country: "Japan",
            health_benefits: "137x more antioxidants than green tea, boosts calm focus, detoxifies",
            brewing_temp: "70-75°C",
            steep_time: "Whisk 15-20 seconds",
            caffeine_level: "high",
          },
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
            "An authentic masala chai blend crafted from robust Assam CTC black tea and whole spices — cinnamon bark, green cardamom, fresh ginger root, cloves, and black peppercorn. Designed to be simmered with milk in the traditional Indian manner, this aromatic blend fills the kitchen with warmth and produces a rich, spicy-sweet cup that energises body and soul. Each batch is hand-blended in small quantities for maximum freshness.",
          handle: "traditional-masala-chai",
          weight: 100,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          metadata: {
            origin_country: "India",
            health_benefits: "Anti-inflammatory, aids digestion, boosts immunity",
            brewing_temp: "95-100°C",
            steep_time: "4-5 minutes (simmer with milk)",
            caffeine_level: "medium",
          },
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
            "Sustainably harvested from the ancient Cederberg mountains of South Africa, this certified organic rooibos produces a deep amber-red infusion with a naturally sweet, nutty flavour and hints of vanilla and honey. Completely caffeine-free and exceptionally rich in minerals including calcium, manganese, and zinc, rooibos is a nourishing choice for any time of day — enjoyed by the whole family.",
          handle: "organic-rooibos-red-bush",
          weight: 100,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          metadata: {
            origin_country: "South Africa",
            health_benefits: "Rich in minerals, supports bone health, caffeine-free",
            brewing_temp: "95-100°C",
            steep_time: "5-7 minutes",
            caffeine_level: "none",
          },
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
