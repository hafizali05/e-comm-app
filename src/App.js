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

  if (products?.results) {
    return (
      <div className={"wrapper"}>
        {products.results.map((item) => {
          return (
            <div className={'product'}>
              <div key={item.id} className={"productInfo"}>
                <img
                  width="100%"
                  alt={item.name}
                  src={item.images.largeSrc.path}
                ></img>
                <a className={"productName"} href={item.href}>
                  {item.name}
                </a>
                <span>£{item.list_price}</span>
              </div>
              <button className={'purchaseButton'}>Quick Add</button>
            </div>
          );
        })}
      </div>
    );
  } else {
    return null;
  }
}
