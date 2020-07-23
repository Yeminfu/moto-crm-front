import React from "react";
import { Table as Btable } from "react-bootstrap";
import { Cart } from "./atoms/cart";
import { data } from "./model/index";

export const Table = () => (
  <div style={{ overflowX: "scroll" }}>
    <Btable striped bordered hover size="sm">
      <thead style={{ whiteSpace: "nowrap" }}>
        <tr>
          {data.map((x) =>
            x.head_rows[0].map((y) => (
              <th colSpan={y.colSpan} rowSpan={y.rowSpan}>
                {y.text}
              </th>
            ))
          )}
          <th rowSpan={3} />
        </tr>
        <tr>
          {data.map((x) =>
            x.head_rows[1].map((y) => (
              <th colSpan={y.colSpan} rowSpan={y.rowSpan}>
                {y.text}
              </th>
            ))
          )}
        </tr>
        <tr>
          {data.map((x) =>
            x.head_rows[2].map((y) => (
              <th colSpan={y.colSpan} rowSpan={y.rowSpan}>
                {y.text}
              </th>
            ))
          )}
        </tr>
      </thead>
      <tbody>
        <tr>
          {data.map((x) =>
            x.body_cols.map((y) => (
              <td>
                {((type) => {
                  switch (type) {
                    case "image":
                      return (
                        <img
                          src={typeof y.data === "string" ? y.data : ""}
                          alt=""
                        />
                      );
                    default:
                      return y.data;
                  }
                })(y.type)}
              </td>
            ))
          )}
          <td>
            <Cart />
          </td>
        </tr>
      </tbody>
    </Btable>
  </div>
);
