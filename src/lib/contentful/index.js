import { createClient } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
});

export async function getCategories() {
  const entries = await client.getEntries({ content_type: "category" });

  if (entries?.items) {
    return transformItems(entries.items);
  }
}

export async function getHero() {
  const entry = await client.getEntries({ content_type: "hero" });

  if (entry.items) {
    return transformItems(entry.items)[0];
  }
}

export async function getCampaign() {
  const entry = await client.getEntries({ content_type: "campaign" });

  if (entry.items) {
    return transformItems(entry.items)[0];
  }
}

// Helpers
/**
 * Transform items data to fit the application
 * @param {array|object} items
 */
const transformItems = (items) =>
  items.map((item) => ({
    id: item.sys.id,
    ...item.fields,
  }));
