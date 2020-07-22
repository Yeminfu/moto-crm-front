export const tBody = [
  {
    id: "note",
    text: "1 шт в пути",
  },
  {
    id: "code",
    text: "0xj3",
  },
  {
    id: "img",
    text:
      "https://мотохит27.рф/wp-content/uploads/2020/05/prodracerendurol150rc15023x_3-1.jpg",
  },
  {
    id: "name",
    text: "APEX 10",
  },
  { id: "count_hab", text: "кол хаб 1" },
  { id: "count_bir", text: "кол бир 1" },
  { id: "retail_price_khv", text: "розн цена хаб1" },
  { id: "retail_price_bir", text: "розн цена бир 1" },
  ...Array.from({
    length: 24,
  }).map((_, i) => ({ id: `x_${i}`, text: `x_${i}` })),
  { id: "purchase_price", text: "Закупочная цена 1 р" },
  { id: "cost_price", text: "Себестоимость 1 р" },
  { id: "amount_in_goods", text: "Сумма в товаре 1 р" },
];

interface productType {
  id: string;
  text: string;
}

export const products: productType[][] = Array.from(
  { length: 10 },
  () => tBody
);
