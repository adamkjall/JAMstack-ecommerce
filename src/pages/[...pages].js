import { getConfig } from "@bigcommerce/storefront-data-hooks/api";
import getAllPages from "@bigcommerce/storefront-data-hooks/api/operations/get-all-pages";
import getPage from "@bigcommerce/storefront-data-hooks/api/operations/get-page";
import Layout from "components/layout";

import parse from "html-react-parser";

export async function getStaticProps({ preview, params, locale }) {
  const config = getConfig({ locale });
  const { pages } = await getAllPages({ preview, config });
  const path = "/" + params?.pages + "/";
  // const slug = locale ? `${locale}${path}` : path;

  const pageItem = pages.find((page) => page.url === path);

  const pageData = await getPage({
    variables: { id: pageItem?.id },
    config,
    preview,
  });

  const page = pageData?.page;

  if (!page) {
    throw new Error(`Page with path ${path} not found`);
  }

  return {
    props: { page },
  };
}

export default function Pages({ page }) {
  return (
    <div className="max-w-2xl mx-auto py-20">
      {page?.body && parse(page.body)}
    </div>
  );
}

Pages.Layout = Layout;
