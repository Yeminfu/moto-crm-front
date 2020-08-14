import React, { useState, useEffect } from "react";
import { Template, categories as cats } from "../template";
import { useParams } from "react-router-dom";
import { API } from "../../api";
import { Table as Btable, Button, Spinner } from "react-bootstrap";
import { useStore } from "effector-react";
import { EditProduct } from "./EditProduct";
import { AddSale } from "./AddSale";

export const Products = () => {
  const { id } = useParams();
  const [products, setProducts] = useState<any>([]);
  const [responseData, setResponseData] = useState<any>([]);
  const [modalAddSale, setModalAddSale] = useState<any>();
  const [modalEditProduct, setModalEditProduct] = useState<any>();
  const [loading, setLoading] = useState<any>();
  const categories = useStore(cats);
  useEffect(() => {
    setLoading(true);
    API.get_products({ category: id }).then((response) => {
      setProducts(response.data.products);
      setResponseData(response.data);
      setLoading(false);
    });
  }, [id]);
  console.log("responseData", responseData);

  type dsa = "";

  const table = (
    <Btable striped bordered hover size="sm" className="table-striped w-auto">
      <thead style={{ whiteSpace: "nowrap" }}>
        <tr>
          <th rowSpan={2}>Фото</th>
          <th rowSpan={2}>Наименование</th>
          <th rowSpan={2}>Код товара</th>
          <th colSpan={responseData?.shops?.length}>Розничная цена</th>
          <th colSpan={responseData?.shops?.length}>К-во на складе</th>
          <th rowSpan={2} />
        </tr>
        <tr>
          {responseData?.shops?.map((shop: { name: string }) => (
            <th key={shop.name}>{shop.name}</th>
          ))}
          {responseData?.shops?.map((shop: { name: string }) => (
            <th key={shop.name}>{shop.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {products?.map(
          (
            product: {
              photo: string;
              name: string;
              code: string;
              id: any;
              prices: {
                shop_id: string;
                price: string;
              }[];
              stock: {
                count: string;
                shop_id: string;
              }[];
              cost_type: "";
              purchase_price: any;
            },
            i: number
          ) => (
            <tr key={i}>
              <td>{product.photo}</td>
              <td>{product.name}</td>
              <td>{product.code}</td>
              {responseData?.shops?.map((shop: { id: string }) => (
                <td key={shop.id}>
                  {
                    product.prices.find(
                      (price_item: { shop_id: string; price: string }) =>
                        price_item.shop_id === shop.id
                    )?.price
                  }
                </td>
              ))}
              {responseData?.shops?.map(
                (shop: { id: string | number | undefined }) => (
                  <td key={shop.id} className="cell_prices">
                    {
                      product.stock.find(
                        (stock_item: { shop_id: string; count: string }) =>
                          stock_item.shop_id === shop.id
                      )?.count
                    }
                  </td>
                )
              )}
              {/* {responseData?.shops?.map(
                (shop: { id: string | number | undefined }) => (
                  <td key={shop.id}>
                    {
                      product.stock.find(
                        (stock_item: { shop_id: string; count: string }) =>
                          stock_item.shop_id === shop.id
                      )?.count
                    }
                  </td>
                )
              )} */}
              <td>
                <Button
                  variant="primary"
                  onClick={() => {
                    setModalAddSale({ product });
                  }}
                  className="mr-2"
                  size="sm"
                >
                  Продать
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    // alert();
                    setModalEditProduct({ product });
                  }}
                  size="sm"
                >
                  Изменить
                </Button>
              </td>
            </tr>
          )
        )}
        <tr></tr>
      </tbody>
      {/* {JSON.stringify(modalEditProduct)} */}
      {/* {setModalEditProduct(13123)} */}
    </Btable>
  );

  return (
    <Template title={categories?.find((cat: any) => cat.id === id)?.name}>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <>{products?.length ? table : "В этой категории нет товаров"}</>
      )}
      {products && <pre>{JSON.stringify(products, null, " ")}</pre>}
      <AddSale
        modalAddSale={modalAddSale}
        setModalAddSale={setModalAddSale}
        responseData={responseData}
      />
      <EditProduct
        modalEditProduct={modalEditProduct}
        setModalEditProduct={setModalEditProduct}
        responseData={responseData}
        aaa={modalEditProduct}
      />
      {/* {JSON.stringify(modalEditProduct)} */}
    </Template>
  );
};
