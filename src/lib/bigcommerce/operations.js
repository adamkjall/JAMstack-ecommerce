import fetchGraphqlApi from "@bigcommerce/storefront-data-hooks/api/utils/fetch-graphql-api";

export const getAllProducts = async (pageSize = 10, cursor = "") => {
  const res = await fetchGraphqlApi(
    `query paginateProducts(
      $pageSize: Int = 1
      $cursor: String
      # Use GraphQL variables to change the page size, or inject the endCursor as "cursor"
      # to go to the next page!
    ) {
      site {
        products (first: $pageSize, after:$cursor) {
          pageInfo {
            startCursor
            endCursor
          }
          edges {
            node {
              entityId 
              name
              path
              plainTextDescription
              prices {
                price {
                  value
                  currencyCode
                }
                basePrice {
                  value
                  currencyCode
                }
              }
              brand {
                name
              }
              images {
                edges {
                  node {          
                    url160wide: url(width: 160)
                    url320wide: url(width: 320)
                    url640wide: url(width: 640)
                    url960wide: url(width: 960)
                    url1280wide: url(width: 1280)
                    altText
                    isDefault
                  }
                }
              }
            }
          }
        }
      }
    }`,
    { variables: { pageSize, cursor } }
  );

  const products = res.data.site.products.edges;

  return products;
};
