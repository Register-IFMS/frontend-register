import { useState, useEffect } from "react";

export const useFetchCEP = (cep) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (cep && cep.length === 8) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
          const json = await res.json();
          setData(json);

          setLoading(false);
        } catch (error) {
          setError(error);
          console.error("Não foi possível encontrar os dados desse CEP");
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [cep]);

  return { data, loading, error };
};
