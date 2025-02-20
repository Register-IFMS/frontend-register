// useFetchPdf.js
import { useEffect, useState } from "react";

export const useFetchPdf = (id) => {
  const [pdf, setPdf] = useState(null);
  const [loadingPdf, setLoading] = useState(false);
  const [errorPdf, setError] = useState("");

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const res = await fetch(`http://localhost:1000/api/gerar-pdf/${id}`);
          const blob = await res.blob();
          setPdf(blob);
          setLoading(false);
        } catch (error) {
          setError(error);
          console.error("Não foi possível gerar o PDF");
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [id]);

  return { pdf, loadingPdf, errorPdf };
};
