import fetchGraphqlApi from "@bigcommerce/storefront-data-hooks/api/utils/fetch-graphql-api";

export const getAllProducts = async (pageSize = 10, cursor = "") => {
  const res = await fetchGraphqlApi(
    `query paginateProducts(
      $pageSize: Int
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
              id
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
              defaultImage {
                urlOriginal
                url320wide: url(width: 320)
                altText
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

export const getProductBySlug = async (slug) => {
  const paddedSlug = "/" + slug + "/";
  const res = await fetchGraphqlApi(
    `query productBySlug($slug: String!) {
      site {
        route(path: $slug) {
          node {
            id
            ... on Product {
              name
              entityId
              brand {
                entityId
                name
              }
              description
              images {
                edges {
                  node {
                    altText
                    url320wide: url(width: 320)
                    url640wide: url(width: 640)
                    url960wide: url(width: 960)
                    url1280wide: url(width: 1280)
                  }
                }
              }
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
              options {
                edges {
                  node {
                    entityId
                    displayName
                    isRequired
                    values {
                      edges {
                        node {
                          entityId
                          label
                        }
                      }
                    }
                  }
                }
              }
              variants {
                edges {
                  node {
                    id
                    entityId
                    defaultImage {
                      altText
                      url160wide: url(width: 160)
                      url320wide: url(width: 320)
                    }
                    options {
                      edges {
                        node {
                          displayName
                          isRequired
                          entityId
                          values {
                            edges {
                              node {
                                label
                                entityId
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
              relatedProducts {
                edges {
                  node {
                    id
                    entityId
                    name
                    defaultImage {
                      altText
                      url160wide: url(width: 160)
                      url320wide: url(width: 320)
                    }
                    path
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
                  }
                }
              }
            }
          }
        }
      }
    }
    `,
    { variables: { slug: paddedSlug } }
  );

  return res.data.site.route.node;
};
