import React from "react";
import api from "./api";
import "./styles.css";

const PURCHASE_BUTTON_TEXT = {
  ADD_TO_BASKET: "Add to Basket",
  EMAIL_WHEN_IN_STOCK: "Email when in stock",
};

const hb_exclusive_product_sku = ["043243", "040173", "044233", "045925"];
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
      <section className={"wrapper"}>
        {products.results.map((item) => {
          const isExclusive = hb_exclusive_product_sku.includes(item.sku);
          return (
            <article className={"product"} key={item.id}>
              <div key={item.id} className={"productInfo"}>
                <picture className={"productImage"}>
                  <img
                    width={isExclusive ? "75%" : "100%"}
                    alt={item.name}
                    src={item.images.largeSrc.path}
                  ></img>
                  {isExclusive ? (
                    <img
                      className={"exclusiveProductBadge"}
                      width="25%"
                      height="30%"
                      alt={item.name}
                      src={"/images/badge.png"}
                    ></img>
                  ) : null}
                </picture>
                <a className={"productName"} href={item.href}>
                  {item.name}
                </a>
                <span>£{item.list_price}</span>
              </div>
              <button className={"purchaseButton"}>
                {item.inStock
                  ? PURCHASE_BUTTON_TEXT.ADD_TO_BASKET
                  : PURCHASE_BUTTON_TEXT.EMAIL_WHEN_IN_STOCK}
              </button>
            </article>
          );
        })}
      </section>
    );
  } else {
    return null;
  }
}
