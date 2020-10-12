import React, { useEffect, useState } from "react";
import { API } from "../../api";
import { Template } from "../template";
import { Table as Btable, } from "react-bootstrap";

export const SumInProducts = () => {
  const [data, sethata] = useState<any>([]);
  useEffect(() => {
    API.get_sum_in_products().then((resp: any) => {
      resp.data && sethata(resp.data);
    });
  }, []);
  return (
    <Template title="Сумма в товаре">
      {/* <pre>{JSON.stringify(data.more, null, " ")}</pre> */}
      <Btable striped bordered hover size="sm" className="table-striped w-auto">
        <thead>
          <tr>
            <th>Категория товара</th>
            <th>Сумма в товаре</th>
          </tr>
        </thead>
        <tbody>
          {data.categories?.map(
            (x: { name: string; sum_in_products: number }) => (
              <tr>
                <td>{x.name}</td>
                <td>
                  {x.sum_in_products
                    ? Math.round(x.sum_in_products).toLocaleString()
                    : 0}
                </td>
              </tr>
            )
          )}
          <tr>
            <td>
              <strong>Всего</strong>
            </td>
            <td>{data.sum ? Math.round(data.sum).toLocaleString() : 0}</td>
          </tr>
        </tbody>
      </Btable>
      {/* <pre>{JSON.stringify(data, null, " ")}</pre> */}
    </Template>
  );
};
