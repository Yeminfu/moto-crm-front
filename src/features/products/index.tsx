import React, { useState, useEffect } from "react";
import { Template, categories as cats } from "../template";
import { useParams } from "react-router-dom";
import { API } from "../../api";
import { Table as Btable, Button, Spinner } from "react-bootstrap";
import { useStore } from "effector-react";
import { EditProduct } from "./EditProduct";
import { AddSale } from "./AddSale";
import styled from "styled-components";
import { FilterInProducts } from "../FilterInProducts";
import { $auth } from "../Login";

export const Products = () => {
  const { id } = useParams();
  const [products, setProducts] = useState<any>([]);
  const [responseData, setResponseData] = useState<any>([]);
  const [modalAddSale, setModalAddSale] = useState<any>();
  const [parameters, setParameters] = useState<{ product_name: string }>();
  const [modalEditProduct, setModalEditProduct] = useState<any>();
  const [loading, setLoading] = useState<any>();
  const categories = useStore(cats);
  const auth = useStore<any>($auth);

  const get_products = (product_name?: string) => {
    setLoading(true);
    API.get_products({ category: id, product_name }).then((response) => {
      setProducts(response.data.products);
      setResponseData(response.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (parameters) {
      get_products(parameters.product_name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parameters]);

  useEffect(() => {
    get_products();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  type dsa = "";

  const table = (
    <Btable striped bordered hover size="sm" className="table-striped w-auto">
      <thead style={{ whiteSpace: "nowrap" }}>
        <tr>
          <th>id</th>
          <th>Заметки</th>
          <th>Фото</th>
          <th>Наименование</th>
          <th>Код товара</th>
          {responseData?.shops?.map((shop: { name: string }) => (
            <th key={shop.name}>р.ц. {shop.name}</th>
          ))}
          {responseData?.shops?.map((shop: { name: string }) => (
            <th key={shop.name}>Склад {shop.name}</th>
          ))}
          <th>Закупочная цена</th>
          <th>Себестоимость</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {products?.map(
          (
            product: {
              photo: string;
              name: string;
              code: string;
              id: string;
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
              cost_price: number;
              note: string;
              title_color: string;
            },
            i: number
          ) => (
            <tr key={i}>
              <td title="id">{product.id}</td>
              <td title="Заметки">{product.note}</td>
              <td title="изображение товара">{product.photo}</td>
              <td
                title="наименование товара"
                style={{ color: product.title_color }}
              >
                {product.name}
              </td>
              <td title="код товара">{product.code}</td>
              {responseData?.shops?.map((shop: { id: string }) => (
                <td key={shop.id} title={`розничная цена ${shop.id}`}>
                  {(() => {
                    const val = product.prices.find(
                      (price_item: { shop_id: string; price: string }) =>
                        price_item.shop_id === shop.id
                    )?.price;
                    const output =
                      Math.round(Number(val)) && Math.round(Number(val));
                    return output ? `${output} ₽` : "0";
                  })()}
                </td>
              ))}
              {responseData?.shops?.map(
                (shop: { id: string | number | undefined }) => (
                  <td
                    key={shop.id}
                    className="cell_prices"
                    title={`количество на складе ${shop.id}`}
                  >
                    {(() => {
                      const count = product.stock.find(
                        (stock_item: { shop_id: string; count: string }) =>
                          stock_item.shop_id === shop.id
                      )?.count;
                      return count ? count : 0;
                    })()}
                  </td>
                )
              )}
              <td title="закупочная цена">{product.purchase_price}</td>
              <td title="cost_price">{Math.round(product.cost_price)}</td>
              {/* <td title="id___">impty</td> */}
              <td
                style={{
                  whiteSpace: "nowrap",
                }}
              >
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
                {auth?.user?.role === "1" && (
                  <>
                    <Button
                      variant="primary"
                      className="mr-2"
                      onClick={() => {
                        setModalEditProduct({ product });
                      }}
                      size="sm"
                    >
                      Изменить
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        API.send_to_archive({ product_id: product.id }).then(
                          ({
                            data,
                          }: {
                            data: { success: boolean; errors: any };
                          }) => {
                            // get_products()
                            if (data.success) {
                              get_products();
                            } else {
                              alert(JSON.stringify(data.errors));
                            }
                          }
                        );
                      }}
                      size="sm"
                    >
                      В архив
                    </Button>
                  </>
                )}
              </td>
            </tr>
          )
        )}
        <tr></tr>
      </tbody>
    </Btable>
  );

  return (
    <Template title={categories?.find((cat: any) => cat.id === id)?.name}>
      {/* <Mail /> */}
      <FilterInProducts
        filterHandle={(pamparams: { product_name: string }) => {
          setParameters(pamparams);
        }}
      />
      <Styled>
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          <>
            {products?.length
              ? table
              : "Товары по заданным критериям не найдены"}
          </>
        )}
        {/* {products && <pre>{JSON.stringify(products, null, " ")}</pre>} */}
        <AddSale
          modalAddSale={modalAddSale}
          setModalAddSale={setModalAddSale}
          responseData={responseData}
          reload={() => get_products(parameters?.product_name)}
        />
        <EditProduct
          modalEditProduct={modalEditProduct}
          setModalEditProduct={setModalEditProduct}
          responseData={responseData}
          aaa={modalEditProduct}
          reload={() => get_products(parameters?.product_name)}
        />
        {/* {JSON.stringify(modalEditProduct)} */}
      </Styled>
    </Template>
  );
};

const Styled = styled.div`
  thead {
    overflow-y: auto;
    height: 100px;
  }
  th {
    position: sticky;
    top: 0;
    background: #fff;
  }
`;

// const data = [
//   {
//     наименование: "Товар 1",
//     сумма: "10000",
//   },
//   {
//     наименование: "Итого",
//     сумма: "10000",
//   }
// ]

// const Mail = () => {
//   // import axios from "axios";
//   // const axios = require("axios");
//   const [html, setHTML] = useState("");
//   return (<div style={{ margin: "100px 0", border:"1px solid", padding:20 }}>
//   <Button onClick={()=>{
//     API.mail_report().then(resp=>setHTML(resp.data.html))
//   }}>mail_report</Button>
//   <div dangerouslySetInnerHTML={{__html:html}}></div>
//   <h5>Продажи Хабаровск</h5>
//   <Btable striped bordered hover size="sm" className="table-striped w-auto">
//   <thead style={{ whiteSpace: "nowrap" }}>
//       <tr>
//         {Object.keys(data[0]).map(x => <th style={{border:"1px solid black"}}>{x}</th>)}
//       </tr>
//     </thead>
//     <tbody>
//       {data.map((row:any)=><tr>
//         {(()=>{
//           const cells = [];
//           for (const key in row) {
//             cells.push(row[key])
//           }
//         return cells.map(cell=><td style={{border:"1px solid black"}}>{cell}</td>)
//         })()}
//       </tr>)}
//     </tbody>
//   </Btable>
//   <h5>Продажи Биробиджан</h5>
//   <Btable striped bordered hover size="sm" className="table-striped w-auto">
//     <thead style={{ whiteSpace: "nowrap" }}>
//       <tr>
//         {Object.keys(data[0]).map(x => <th style={{border:"1px solid black"}}>{x}</th>)}
//       </tr>
//     </thead>
//     <tbody>
//       {data.map((row:any)=><tr>
//         {(()=>{
//           const cells = [];
//           for (const key in row) {
//             cells.push(row[key])
//           }
//         return cells.map(cell=><td style={{border:"1px solid black"}}>{cell}</td>)
//         })()}
//       </tr>)}
//     </tbody>
//   </Btable>
// </div>)}
