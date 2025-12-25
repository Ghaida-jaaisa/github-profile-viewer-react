import { useEffect, useState } from "react";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(url);

        if (res.status === 404)
          throw new Error(`User not Found: ${res.status} ${res.statusText}`);

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status} ${res.statusText}`);
        }
        const result = await res.json();

        setData(result);
      } catch (err) {
        setError(err.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { data, loading, error };
}
