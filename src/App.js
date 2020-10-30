import React from "react";
import api from "./api";
import "./styles.css";

export default function App() {
  const [products, setProducts] = React.useState();
  React.useEffect(() => {
    api()
      .then((data) => setProducts(data))
      .catch((error) => new Error(error.message));
  }, []);
  console.log("products", products);
  return products?.results
    ? products.results.map((item) => {
        return <div key={item.id}>{item.id}</div>;
      })
    : null;
}
