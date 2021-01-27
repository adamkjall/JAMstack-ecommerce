const SortBy = ({ showLabel, setSearchQuery }) => (
  <>
    {showLabel && <label htmlFor="sort">Sort by:</label>}
    <select
      name="sort"
      id="sort"
      className="outline-none bg-transparent w-full text-lg md:border-b border-gray-700"
      onChange={(e) =>
        setSearchQuery((opt) => {
          const value = e.target.value;
          if (value.includes(",")) {
            return {
              ...opt,
              sortBy: value.split(",")[0],
              direction: value.split(",")[1],
            };
          }

          return {
            ...opt,
            sortBy: value,
          };
        })
      }
    >
      <option value="id,desc" className="text-black">
        Newest
      </option>
      <option value="total_sold" className="text-black">
        Popular
      </option>
      <option value="price,asc" className="text-black">
        Price (asc)
      </option>
      <option value="price,desc" className="text-black">
        Price (desc)
      </option>
    </select>
  </>
);

export default SortBy;
