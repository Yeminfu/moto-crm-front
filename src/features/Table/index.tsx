import React from "react";
import { Table as Btable } from "react-bootstrap";
import { Cart } from "./atoms/cart";
import { headcols } from "./model/thead";
import { products } from "./model/tbody";

export const Table = () => (
  <div style={{ overflowX: "scroll" }}>
    <Btable striped bordered hover size="sm">
      <thead style={{ whiteSpace: "nowrap" }}>
        <tr>
          {headcols.map((x, i) => (
            <th colSpan={x.colSpan} rowSpan={x.rowSpan}>
              {x.name}
            </th>
          ))}
        </tr>
        <tr>
          {headcols
            .filter((x) => x.sub_a)
            .map((x) => (
              <>
                {x.sub_a?.map((s) => (
                  <th colSpan={s.colSpan}>{s.name}</th>
                ))}
              </>
            ))}
        </tr>
        <tr>
          {headcols
            .filter((x) => x.sub_b)
            .map((x) => (
              <>
                {x.sub_b?.map((s) => (
                  <th>{s.name}</th>
                ))}
              </>
            ))}
        </tr>
      </thead>
      <tbody>
        {products.map((product, i) => (
          <tr>
            {product.map((x) => (
              <td className="text-left">
                {((id) => {
                  switch (id) {
                    case "img":
                      return <img src={x.text} alt="" />;
                    default:
                      return `${x.text}/${x.id}`;
                  }
                })(x.id)}
              </td>
            ))}
            <td>
              <Cart />
            </td>
          </tr>
        ))}
      </tbody>
    </Btable>
  </div>
);
