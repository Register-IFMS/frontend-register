import { useState, useEffect } from "react";

export const useFetchLang = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(url);
        const json = await res.json();
        setData(json);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setError("Erro ao carregar as linguagens");
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};
