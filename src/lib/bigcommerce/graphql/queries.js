/**
 * Generates graphql template string for fetching products
 * @param {string} type type can be "all", "newest", "bestSelling", or "featured"
 */
export function getProductsQuery(type, first, cursor) {
  return `query paginateProducts {
    site {
      ${type} (first: ${first}, ${cursor && `after:${cursor}`}) {
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
              url160wide: url(width: 160)
              url320wide: url(width: 320)
              url640wide: url(width: 640)
              altText
            }
          }
        }
      }
    }
  }`;
}

export const GET_PRODUCT_BY_SLUG = `query productBySlug($slug: String!) {
  site {
    route(path: $slug) {
      node {
        id
        ... on Product {
          name
          id
          entityId
          brand {
            entityId
            name
          }
          description
          images {
            edges {
              node {
                isDefault
                altText
                urlOriginal
                url160wide: url(width: 160)
                url320wide: url(width: 320)
                url640wide: url(width: 640)
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
          productOptions {
            edges {
              node {
                entityId
                displayName
                isRequired
                __typename
                ... on MultipleChoiceOption {
                  values {
                    edges {
                      node {
                        label
                        entityId
                        ... on SwatchOptionValue {
                          hexColors
                        }
                      }
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
                sku
                defaultImage {
                  url160wide: url(width: 160)
                }
                inventory {
                  isInStock  
                }
                productOptions {
                  edges {
                    node {
                      entityId
                      displayName
                      isRequired
                      __typename
                      ... on MultipleChoiceOption {
                        values {
                          edges {
                            node {
                              label
                              entityId
                              ... on SwatchOptionValue {
                                hexColors
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
                  url640wide: url(width: 640)
                }
                images {
                  edges {
                    node {
                      altText
                      urlOriginal
                      url320wide: url(width: 320)
                      url640wide: url(width: 640)
                    }
                  }
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
`;

export const GET_VARIANT_BY_ID = `
query variantById($variantEntityId: Int!) {
  site {
    product(variantEntityId: $variantEntityId) {
      name
      sku
      defaultImage {
        url(width: 500, height: 500)
      }
      productOptions {
        edges {
          node {
            entityId
            displayName
            isRequired
            __typename
            ... on MultipleChoiceOption {
              values {
                edges {
                  node {
                    label
                    entityId
                    ... on SwatchOptionValue {
                      hexColors
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
}
`;
