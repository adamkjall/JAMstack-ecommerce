const Filter = ({ categories, brands, handleChange, searchQuery }) => (
  <div className="filter">
    <div className="categories">
      <h2 className="text-2xl font-bold mb-2">Categories</h2>
      <div>
        {categories.map((category) => (
          <div key={category.id}>
            <input
              className="cursor-pointer"
              type="checkbox"
              id={category.id}
              name={category.name}
              value={category.id}
              checked={searchQuery?.categoryId?.includes(category.id) || false}
              onChange={(e) => handleChange(e, "categoryId")}
            />
            <label className="ml-2 text-xl" htmlFor={category.id}>
              {category.name}
            </label>
          </div>
        ))}
      </div>
    </div>
    <div className="brands mt-4">
      <h3 className="text-2xl font-bold mb-2">Brands</h3>

      <div>
        {brands.map((brand) => (
          <div key={brand.id}>
            <input
              className="cursor-pointer"
              type="checkbox"
              id={brand.id}
              name={brand.name}
              value={brand.id}
              checked={searchQuery?.brandId?.includes(brand.id) || false}
              onChange={(e) => handleChange(e, "brandId")}
            />
            <label className="ml-2 text-xl" htmlFor={brand.id}>
              {brand.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Filter;
