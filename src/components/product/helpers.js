// Returns the available options of a product
export function getProductOptions(product) {
  const options = product.productOptions.edges?.reduce((arr, edge) => {
    if (edge?.node.__typename === "MultipleChoiceOption") {
      arr.push({
        displayName: edge.node.displayName.toLowerCase(),
        values: edge.node.values.edges?.map((edge) => edge?.node),
      });
    }
    return arr;
  }, []);

  return options;
}

// Finds a variant in the product that matches the selected options
export function getCurrentVariant(product, opts) {
  const variant = product.variants.edges.find((edge) => {
    const { node } = edge ?? {};

    return Object.entries(opts).every(([key, value]) =>
      node?.productOptions.edges?.find((edge) => {
        if (edge.node.displayName.toLowerCase() === key) {
          return edge.node.values.edges?.find(
            (valueEdge) => valueEdge?.node.label === value
          );
        }
      })
    );
  });

  return variant;
}

export function getSizesForColorVariant(product, color) {
  const sizesForVariant = product.variants.edges.reduce((acc, variant) => {
    const colorNode = variant.node.productOptions.edges.find(
      ({ node }) => node.displayName === "Color"
    );
    const colorData = colorNode.node.values.edges[0].node;

    if (colorData.label === color) {
      const sizesNode = variant.node.productOptions.edges.find(
        ({ node }) => node.displayName === "Size"
      );
      const sizeData = sizesNode.node.values.edges[0].node;

      return [...acc, { ...sizeData, inventory: variant.node.inventory }];
    }
    return acc;
  }, []);

  return sizesForVariant;
}

export function mapColorsToImages(product) {
  const colorData = product.variants.edges.reduce((acc, variant) => {
    const colorData = variant.node.productOptions.edges.find(
      (opt) => opt.node.displayName === "Color"
    );
    const color = colorData.node.values.edges[0].node.label;

    return { ...acc, [color]: variant.node.defaultImage.url160wide };
  }, {});

  return colorData;
}
