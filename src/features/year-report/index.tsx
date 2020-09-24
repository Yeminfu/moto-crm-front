import React, { useEffect, useState } from "react";
import "./style.scss";
import { InputGroup, Button, Spinner } from "react-bootstrap";
import { Filter } from "../Filter";
import { API } from "../../api";
// import { refactorReport } from "./refactor-report";
import { Template } from "../template";
import { Table } from "react-bootstrap";
import dayjs from "dayjs";
// import { Products } from "../products";
import "dayjs/locale/ru"; // load on demand
import styled from "styled-components";
import { categories as $categories } from "../template";
import { useStore } from "effector-react";
dayjs.locale("ru"); // use Spanish locale globally

export const YearReport = (props: any) => {
  const [reportData, setReportData] = useState<any[]>([]);
  const [more, setMore] = useState<{
    sum_in_all_products: number;
    shops: {
      id: string;
      name: string;
    }[];
  }>();
  const [disableMonth, setDisableMonth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const categories = useStore($categories);
  // const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    setLoading(true);
    if (categories.length > 0) {
      API.get_report({ category: categories[0]?.id, year: "2020" }).then(
        (response: any) => {
          setReportData(response.data.report);
          setMore(response.data.more);
          // setCategories(x.data.data.categories);
          // setReportData(refactorReport(x.data.data));
          setLoading(false);
        }
      );
    }
  }, [categories]);

  const filterHandle = (values: any) => {
    setLoading(true);
    API.get_report(values).then((x) => {
      setReportData(x.data.report);
      setMore(x.data.more);
      setLoading(false);
    });
  };

  return (
    <Template title="Годовой отчет">
      {/* {JSON.stringify(categories)} */}
      <Filter
        filterHandle={filterHandle}
        reportData={reportData}
        categories={categories}
      />
      {/* {disableMonth ? "disableMonth" : "!disableMonth"} */}
      <InputGroup className="mb-3">
        <Button
          variant={disableMonth ? "primary" : "outline-primary"}
          onClick={() => setDisableMonth(!disableMonth)}
        >
          Продажи/Мес
        </Button>
      </InputGroup>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <Styled>
          <Table striped bordered hover size="sm">
            <thead style={{ whiteSpace: "nowrap" }}>
              <tr>
                <th rowSpan={3}>id</th>
                <th rowSpan={3}>наименование</th>
                <th rowSpan={3}>код</th>
                <th rowSpan={3}>фото</th>
                <th rowSpan={3}>заметки</th>
                {more?.shops.map((shop) => (
                  <th> склад {shop.id}</th>
                ))}
                <th rowSpan={3}>Сумма в товаре</th>
                {more?.shops.map((shop) => (
                  <th> Розничная цена {shop.id}</th>
                ))}
                {more?.shops.map((shop) => (
                  <th> Продано за год {shop.id}</th>
                ))}
                {disableMonth && (
                  <>
                    {Array.from({ length: 12 }).map((_, i) => (
                      <>
                        {more?.shops?.map((shop) => (
                          <th>
                            Продано в {dayjs(i + 1, "M").format("MMM")}{" "}
                            {shop.id}
                          </th>
                        ))}
                      </>
                    ))}
                  </>
                )}
                {/* {disableMonth && (
                  <th
                    rowSpan={1}
                    colSpan={
                      12 *
                      (() => {
                        const val = more?.shops.length;
                        return typeof val === "number" ? val : 1;
                      })()
                    }
                  >
                    Продано по месяцам
                    {JSON.stringify(more?.shops, null, 2)}
                  </th>
                )} */}
                {/* udo */}
                {/* <th rowSpan={1}>Продано за год</th> */}
              </tr>
              <tr>
                {/*                 
                {reportData[0]?.retail_prices.map(
                  (price_item: any, i: number) => (
                    <th>{price_item.shop_id}</th>
                  )
                )}
                {disableMonth && (
                  <>
                    {reportData[0]?.sales.map(
                      (
                        sales_item: {
                          month: number;
                          data: {
                            id: string;
                          }[];
                        },
                        i: number
                      ) => (
                        <>
                          {sales_item.data.map((shop, i: number) => (
                            <th>
                              {dayjs(`${sales_item.month}`, "M").format("MMM")}
                              <br />
                              {shop.id}
                            </th>
                          ))}
                        </>
                      )
                    )}
                  </>
                )}
                {reportData[0]?.sales_per_year.map((shop: any, i: number) => (
                  <th>{shop.id}</th>
                ))} */}
              </tr>
            </thead>
            <tbody>
              {reportData.map(
                (product: {
                  id: string;
                  category_id: string;
                  name: string;
                  code: string;
                  purchase_price: string;
                  image: string;
                  cost_type: string;
                  cost_value: string;
                  note: string;
                  stock: {
                    id: string;
                    shop_id: string;
                    product_id: string;
                    count: string;
                  }[];
                  retail_prices: {
                    retail_price: number;
                    shop_id: string;
                  }[];
                  sales: {
                    month: string | number;
                    data: {
                      id: string;
                      name: string;
                      counts: string | number;
                      sums: string | number;
                    }[];
                  }[];
                  sales_per_year: {
                    id: string;
                    name: string;
                    sales_count: number;
                    sales_sum: number;
                  }[];
                  sum_in_product: string | number;
                }) => (
                  <tr>
                    <td title="id">{product.id}</td>
                    <td title="наименование">{product.name}</td>
                    <td title="код товара">{product.code}</td>
                    <td title="изображение товара">
                      {product.image ? (
                        <img src={product.image} alt="" />
                      ) : (
                        "no image"
                      )}
                    </td>
                    <td title="заметки">{product.note}</td>
                    {more?.shops.map((shop) => (
                      <td title={`на складе ${shop.name}`}>
                        {
                          product.stock.find(
                            (stock_item) => stock_item.shop_id === shop.id
                          )?.count
                        }
                      </td>
                    ))}

                    <td title="сумма в товаре">
                      {typeof product.sum_in_product === "number" &&
                        Math.round(product.sum_in_product)}{" "}
                      ₽
                    </td>
                    {product.retail_prices.map((price_item) => (
                      <td title={`розничная цена ${price_item.shop_id}`}>
                        {Math.round(price_item.retail_price)} ₽
                      </td>
                    ))}
                    {product.sales_per_year.map((shop, i: number) => (
                      <td
                        style={{ whiteSpace: "nowrap" }}
                        title={`продаж за год в ${shop.name}`}
                      >
                        {shop.sales_count} / {shop.sales_count} ₽
                      </td>
                    ))}
                    {disableMonth &&
                      product.sales.map((month, i: number) => (
                        <>
                          {month.data.map((shop, i: number) => (
                            <td
                              style={{ whiteSpace: "nowrap" }}
                              key={i}
                              title={`продано за ${month} в ${shop.name}`}
                            >
                              {shop.counts} / {shop.sums} ₽
                            </td>
                          ))}
                        </>
                      ))}
                  </tr>
                )
              )}
            </tbody>
          </Table>
          <Table className="table_more" striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Общая сумма в товаре</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {(() => {
                    const val = more?.sum_in_all_products;
                    return typeof val === "number" ? Math.round(val) : "";
                  })()}
                </td>
              </tr>
            </tbody>
          </Table>
          {/* {view ? (
            <Table reportData={view} />
          ) : (
            "Нет данных (возможно в категории нет товаров)"
          )} */}
        </Styled>
      )}
      {/* <pre>{JSON.stringify(reportData, null, " ")}</pre> */}
    </Template>
  );
};

const Styled = styled.div`
  width: 100%;
  overflow-x: scroll;
  .table_more {
    width: auto;
    white-space: nowrap;
  }
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
