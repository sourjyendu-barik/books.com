import { useState, useEffect } from "react";
const useFetch = (apiFunction) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchFunction = async () => {
      setLoading(true);
      try {
        const result = await apiFunction();
        //  console.log("use fetch result is ", result);
        setData(result);
      } catch (error) {
        console.error("error");
        setError(error.data || "something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchFunction();
  }, [apiFunction]);
  return { data, loading, error };
};
export default useFetch;
