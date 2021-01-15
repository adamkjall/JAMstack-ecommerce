import { useEffect, useState } from "react";

const useSearch = (query = {}) => {
  const [result, setResult] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);

      try {
        const res = await fetch(`/api/bigcommerce/catalog/products`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(query),
        });
        const data = await res.json();
        setResult(data);
      } catch (error) {
        console.log("error");
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (!isEmptyObject(query)) {
      fetchData();
    }
  }, [query]);

  return { result, loading, error };
};

function isEmptyObject(obj) {
  return JSON.stringify(obj) === "{}";
}

export default useSearch;
