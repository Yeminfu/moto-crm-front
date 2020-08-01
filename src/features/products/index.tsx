import React, { useState, useEffect } from "react";
import { Template } from "../template";
// import { Table } from "../Table";
import { useParams } from "react-router-dom";
import { API } from "../../api";
import { Table as Btable } from "react-bootstrap";
import { Cart } from "../Table/atoms/cart";

export const Products = () => {
  const { id } = useParams();
  const [products, setProducts] = useState<any>([]);
  const [responseData, setResponseData] = useState<any>([]);
  useEffect(() => {
    API.get_products({ category: id }).then((response) => {
      setProducts(response.data.products);
      setResponseData(response.data);
      // console.log("response", response.data.products);
    });
  }, [id]);
  return (
    <Template title={id}>
      <Btable striped bordered hover size="sm" className="table-striped w-auto">
        <thead style={{ whiteSpace: "nowrap" }}>
          <tr>
            <th rowSpan={2}>Фото</th>
            <th rowSpan={2}>Наименование</th>
            <th rowSpan={2}>Код товара</th>
            <th colSpan={responseData?.shops?.length}>Розничная цена</th>
            <th rowSpan={2} />
          </tr>
          <tr>
            {responseData?.shops?.map((shop: { name: string }) => (
              <th key={shop.name}>{shop.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map(
            (
              product: {
                photo: string;
                name: string;
                code: string;
                id: any;
              },
              i: number
            ) => (
              <tr>
                <td>{product.photo}</td>
                <td>{product.name}</td>
                <td>{product.code}</td>
                {responseData?.shops?.map(
                  (shop: { name: string; id: string }) => (
                    <td>
                      {
                        responseData?.prices?.find(
                          (price: { shop_id: string; product_id: any }) =>
                            price.shop_id === shop.id &&
                            price.product_id === product.id
                        )?.sum
                      }
                    </td>
                  )
                )}
                <td>
                  <Cart />
                </td>
              </tr>
            )
          )}
          <tr></tr>
        </tbody>
      </Btable>
    </Template>
  );
};
