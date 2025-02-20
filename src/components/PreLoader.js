import { useEffect, useState } from "react";
import ReactLoading from "react-loading";

const PreLoader = () => {
  const [data, setData] = useState([]);
  const [done, setDone] = useState(undefined);

  useEffect(() => {
    setTimeout(() => {
      fetch("https://viacep.com.br/ws/79630762/json/")
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          setData(json);
          setDone(true);
        });
    }, 2000);
  }, []);
  return (
    <div>
      {!done ? (
        <ReactLoading
          type={"spin"}
          color={"#03fc4e"}
          height={100}
          width={100}
        />
      ) : (
        console.log("")
      )}
    </div>
  );
};

export default PreLoader;
