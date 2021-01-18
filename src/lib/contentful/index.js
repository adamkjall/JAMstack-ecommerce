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

// Helpers
const transformItems = (items) =>
  items.map((item) => ({
    id: item.sys.id,
    ...item.fields,
  }));

const transformItem = (item) => ({
  id: item.sys.id,
  ...item.fields,
});
