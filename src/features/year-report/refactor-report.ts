const dayjs = require("dayjs");
require("dayjs/locale/ru");
dayjs.locale("ru");

export const refactorReport = (data: any) => {
  const { products, sales, shops, stock, prices } = data;

  return products?.map((product: any) => [
    {
      head_rows: [
        [
          {
            text: "Заметки",
            colSpan: 1,
            rowSpan: 3,
          },
        ],
        [],
        [],
      ],
      body_cols: [
        {
          type: "text",
          data: product.note,
        },
      ],
    },
    {
      head_rows: [
        [
          {
            text: "Код товара",
            colSpan: 1,
            rowSpan: 3,
          },
        ],
        [],
        [],
      ],
      body_cols: [
        {
          type: "text",
          data: product.code,
        },
      ],
    },
    {
      head_rows: [
        [
          {
            text: "Фото",
            colSpan: 1,
            rowSpan: 3,
          },
        ],
        [],
        [],
      ],
      body_cols: [
        {
          type: "image",
          data: product.image,
        },
      ],
    },
    {
      head_rows: [
        [
          {
            text: "Наименование",
            colSpan: 1,
            rowSpan: 3,
          },
        ],
        [],
        [],
      ],
      body_cols: [
        {
          type: "text",
          data: product.name,
        },
      ],
    },
    {
      head_rows: [
        [
          {
            text: "Количество",
            colSpan: shops.length,
            rowSpan: 2,
          },
        ],
        [],
        [
          ...shops.map((shop: any) => ({
            text: shop.id,
            colSpan: 1,
            rowSpan: 1,
          })),
        ],
      ],
      body_cols: [
        ...shops.map((shop: any) => ({
          type: "text",
          data: (() => {
            const stockplace = stock.find(
              (stock_product: any) =>
                stock_product.product_id === product.id &&
                stock_product.shop_id === shop.id
            );
            return stockplace ? stockplace.count : 0;
          })(),
        })),
      ],
    },
    {
      head_rows: [
        [
          {
            text: "Цена розница ",
            colSpan: shops.length,
            rowSpan: 2,
          },
        ],
        [],
        [
          ...shops.map((shop: any) => ({
            text: shop.id,
            colSpan: 1,
            rowSpan: 1,
          })),
        ],
      ],
      body_cols: [
        ...shops.map((shop: any) => {
          const val = prices.find(
            (price: any) =>
              price.product_id === product.id && price.shop_id === shop.id
          )?.sum;
          return {
            type: "text",
            data: `${val ? val : 0}`,
          };
        }),
      ],
    },
    {
      id: "saled_per_month",
      head_rows: [
        [
          {
            text: "Продано/м",
            colSpan: shops.length * 12,
            rowSpan: 1,
          },
        ],
        [
          ...Array.from({ length: 12 }).map((_, i) => ({
            text: dayjs(`${i + 1}`, "mm").format("MMM"),
            colSpan: shops.length,
            rowSpan: 1,
          })),
        ],
        [
          ...(() => {
            const arr = [];
            const cities = Array.from({ length: 12 }, (_, i) => [
              ...shops.map((shop: any) => ({
                text: shop.id,
                colSpan: 1,
                rowSpan: 1,
              })),
            ]);
            for (let index = 0; index < cities.length; index++) {
              const city = cities[index];
              arr.push(...city);
            }
            return arr;
          })(),
        ],
      ],
      body_cols: [
        ...(() => {
          const arr: any = [];
          const year = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
          year.forEach((month) => {
            for (let index = 0; index < shops.length; index++) {
              const shop = shops[index];
              arr.push({
                type: "text",
                data: (() => {
                  const array = sales
                    .filter((sale: any) => {
                      return (
                        sale.product_id === product.id &&
                        sale.shop_id === shop.id &&
                        dayjs(sale.time, "D.M.YYYY").format("M") === month
                      );
                    })
                    .map((x: any) => Number(x.count));
                  return array.length
                    ? array.reduce((sum: any, val: any) => sum + val)
                    : 0;
                })(),
              });
            }
          });
          return arr;
        })(),
      ],
    },
    {
      head_rows: [
        [
          {
            text: "Продано всего",
            colSpan: shops.length,
            rowSpan: 2,
          },
        ],
        [],
        [
          ...shops.map((shop: any) => ({
            text: shop.id,
            colSpan: 1,
            rowSpan: 1,
          })),
        ],
      ],
      body_cols: [
        ...shops.map((shop: any) => ({
          type: "text",
          data: (() => {
            const array = sales
              .filter(
                (sale: any) =>
                  sale.shop_id === shop.id && sale.product_id === product.id
              )
              .map((x: any) => Number(x.count));
            return array.length
              ? array.reduce((sum: any, val: any) => sum + val)
              : 0;
          })(),
        })),
      ],
    },
    {
      head_rows: [
        [
          {
            text: "Закупочная цена",
            colSpan: 1,
            rowSpan: 3,
          },
        ],
        [],
        [],
      ],
      body_cols: [
        {
          type: "text",
          data: Number(product.purchase_price),
        },
      ],
    },
    {
      head_rows: [
        [
          {
            text: "Себестоимость",
            colSpan: 1,
            rowSpan: 3,
          },
        ],
        [],
        [],
      ],
      body_cols: [
        {
          type: "text",
          data: (() => {
            switch (product.cost_type) {
              case "fix":
                return (
                  Number(product.purchase_price) + Number(product.cost_value)
                );
              case "percent":
                return (
                  Number(product.purchase_price) * Number(product.cost_value)
                );
              default:
                return "не указано";
            }
          })(),
        },
      ],
    },
    {
      head_rows: [
        [
          {
            text: "Сумма в товаре",
            colSpan: 1,
            rowSpan: 3,
          },
        ],
        [],
        [],
      ],
      body_cols: [
        {
          type: "text",
          data: (() => {
            const count = stock
              .filter((item: any) => item.product_id === product.id)
              .map((item: any) => item.count);
            const sum = count.length
              ? count.reduce((partial_sum: any, a: any) => partial_sum + a)
              : 0;
            const cost = ((): number => {
              switch (product.cost_type) {
                case "fix":
                  return (
                    Number(product.purchase_price) + Number(product.cost_value)
                  );
                case "percent":
                  return (
                    Number(product.purchase_price) * Number(product.cost_value)
                  );
                default:
                  return 0;
              }
            })();
            return cost * sum;
          })(),
        },
      ],
    },
  ]);
};
