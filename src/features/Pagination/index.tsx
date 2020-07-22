import React from "react";
import { Pagination as BPagination } from "react-bootstrap";
export const Pagination = () => <>{BPaginationBasic}</>;

let active = 2;
let items = [];
for (let number = 1; number <= 5; number++) {
  items.push(
    <BPagination.Item key={number} active={number === active}>
      {number}
    </BPagination.Item>
  );
}

const BPaginationBasic = (
  <div className="mt-2">
    <BPagination size="sm">{items}</BPagination>
  </div>
);
