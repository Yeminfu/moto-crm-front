import React, { useState, useEffect } from "react";
import { Template, categories as cats } from "../template";
import { useParams } from "react-router-dom";
import { API } from "../../api";
import {
  Table as Btable,
  Button,
  Modal,
  Form as BForm,
  FormControl,
  Spinner,
} from "react-bootstrap";
import { OnChange } from "react-final-form-listeners";
import { Form, Field } from "react-final-form";
import { useStore } from "effector-react";
import { EditProduct } from "./EditProduct";

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
        {products.map(
          (
            product: {
              photo: string;
              name: string;
              code: string;
              id: any;
              prices: any;
              stock: any;
            },
            i: number
          ) => (
            <tr key={i}>
              <td>{product.photo}</td>
              <td>{product.name}</td>
              <td>{product.code}</td>
              {responseData?.shops?.map((shop: any) => (
                <td key={shop.id}>
                  {
                    product.prices.find(
                      (price_item: any) => price_item.shop_id === shop.id
                    )?.sum
                  }
                </td>
              ))}
              {responseData?.shops?.map((shop: any) => (
                <td key={shop.id}>
                  {
                    product.stock.find(
                      (price_item: any) => price_item.shop_id === shop.id
                    )?.count
                  }
                </td>
              ))}
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
        <>{products.length ? table : "В этой категории нет товаров"}</>
      )}

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

const AddSale = ({ modalAddSale, setModalAddSale, responseData }: any): any => {
  const onSubmit = (values: any) => {
    API.add_sale(values).then((response) => {
      if (response?.data?.success) {
        setModalAddSale(false);
      }
    });
  };
  const city = "khv";
  return (
    <>
      <Modal show={modalAddSale ? true : false} onHide={setModalAddSale}>
        <Form
          onSubmit={onSubmit}
          initialValues={{
            product_id: modalAddSale?.product?.id,
            shop_id: city,
            saler_id: 1,
            count: 1,
            sum: (() => {
              const val = responseData?.prices?.find(
                (price: { product_id: any; shop_id: any }) =>
                  price.product_id === modalAddSale?.product?.id &&
                  price.shop_id === city
              )?.sum;
              if (true) {
                return val;
              }
            })(),
          }}
          mutators={{
            setPrice: (args, state, utils) => {
              utils.changeValue(state, "sum", () => args);
            },
          }}
          render={({ form, handleSubmit, values }) => (
            <form onSubmit={handleSubmit}>
              <Modal.Header closeButton>
                <Modal.Title>Продать {modalAddSale?.product?.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {/* <pre>{JSON.stringify({ values, modalAddSale }, null, " ")}</pre> */}
                <Field name="shop_id">
                  {(props) => (
                    <BForm.Group>
                      <BForm.Label>Магазин</BForm.Label>
                      <BForm.Control as="select" {...props.input}>
                        {responseData?.shops?.map(
                          (shop: { name: string; id: string }) => (
                            <option key={shop.name} value={shop.id}>
                              {shop.name}
                            </option>
                          )
                        )}
                      </BForm.Control>
                      <OnChange name="shop_id">
                        {(shop_id) => {
                          const val = responseData?.prices?.find(
                            (price: { product_id: any; shop_id: any }) =>
                              price.product_id === modalAddSale?.product?.id &&
                              price.shop_id === shop_id
                          )?.sum;
                          form.mutators.setPrice(
                            val ? Number(val) * Number(values.count) : 0
                          );
                        }}
                      </OnChange>
                    </BForm.Group>
                  )}
                </Field>
                <Field name="count">
                  {(props) => (
                    <BForm.Group>
                      <BForm.Label>Количество</BForm.Label>
                      <FormControl
                        placeholder="shop_id"
                        aria-describedby="basic-addon1"
                        type="number"
                        {...props.input}
                      />
                      <OnChange name="count">
                        {(value) => {
                          const price = responseData?.prices?.find(
                            (price: { product_id: any; shop_id: any }) =>
                              price.product_id === modalAddSale?.product?.id &&
                              price.shop_id === values.shop_id
                          )?.sum;
                          form.mutators.setPrice(Number(price) * Number(value));
                        }}
                      </OnChange>
                    </BForm.Group>
                  )}
                </Field>
                {/* <Field name="sum">
                  {(props) => (
                    <BForm.Group>
                      <BForm.Label>Сумма</BForm.Label>
                      <FormControl
                        placeholder="shop_id"
                        aria-describedby="basic-addon1"
                        type="number"
                        {...props.input}
                        readOnly
                      />
                    </BForm.Group>
                  )}
                </Field> */}
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setModalAddSale(null);
                  }}
                >
                  Отмена
                </Button>
                <Button variant="primary" type="submit">
                  Подтвердить
                </Button>
              </Modal.Footer>
            </form>
          )}
        />
      </Modal>
    </>
  );
};
