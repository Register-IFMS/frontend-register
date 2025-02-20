import { useState } from "react";

export const useFetchData = (url) => {
  const [responseData, setResponseData] = useState(null);
  const [loadingPost, setLoadingPost] = useState(false);
  const [error, setError] = useState("");

  const postData = async (requestData) => {
    try {
      setLoadingPost(true);
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      const json = await res.json();
      setResponseData(json);
      setLoadingPost(false);
    } catch (error) {
      console.error(error);
      setError("Erro ao enviar os dados");
      setLoadingPost(false);
    }
  };

  return { responseData, loadingPost, error, postData };
};
