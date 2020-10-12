import React from "react";
import { API } from "../api";
import { Button } from "react-bootstrap";
import products from "./products.json";
import { convert } from "./transliterate";

const addProducts = (i: number) => {
  const product: any = products[i];
  const productOutputObj = {
    retail_prices: [
      {
        id: "khv",
        name: "Хабаровск",
        price_type: product.цена_хаб && product.цена_хаб.type,
        count: product.цена_хаб && product.цена_хаб.value,
      },
      {
        id: "bir",
        name: "Биробиджан",
        price_type: product.цена_бир && product.цена_бир.type,
        count: product.цена_бир && product.цена_бир.value,
      },
    ],
    name: product.наименование.value,
    code: product.код_товара ? product.код_товара.value : "",
    category_id: convert(product.sheetName),
    purchase_price: product.закупочная_цена ? product.закупочная_цена.value : 0,
    cost_type: product.себестоимось && product.себестоимось.type,
    cost_value: product.себестоимось ? product.себестоимось.value : 0,
    // at_store: "5432",
    note: product.заметка ? product.заметка.value : "",
  };
  API.add_products(productOutputObj).then((_) => {
    if (i < products.length - 1) {
      addProducts(i + 1);
    }
  });
};

export const Products = () => {
  return (
    <div>
      <Button onClick={() => addProducts(0)}>import </Button>
    </div>
  );
};
