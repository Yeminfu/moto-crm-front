import React, { useState, useEffect } from "react";
import { Template } from "../template";
import { useParams } from "react-router-dom";
import { API } from "../../api";
import {
  Table as Btable,
  Button,
  Modal,
  Form as BForm,
  FormControl,
} from "react-bootstrap";
import { OnChange } from "react-final-form-listeners";
import { Form, Field } from "react-final-form";

export const Products = () => {
  const { id } = useParams();
  const [products, setProducts] = useState<any>([]);
  const [responseData, setResponseData] = useState<any>([]);
  const [modal, setModal] = useState<any>();

  useEffect(() => {
    API.get_products({ category: id }).then((response) => {
      setProducts(response.data.products);
      setResponseData(response.data);
    });
  }, [id]);
  return (
    <Template title={id}>
      <Btable striped bordered hover size="sm" className="table-striped w-auto">
        <thead style={{ whiteSpace: "nowrap" }}>
          <tr>
            <th rowSpan={2}>Фото</th>
            <th rowSpan={2}>Наименование</th>
            <th rowSpan={2}>Код товара</th>
            <th colSpan={responseData?.shops?.length}>Розничная цена</th>
            <th rowSpan={2} />
          </tr>
          <tr>
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
              },
              i: number
            ) => (
              <tr key={i}>
                <td>{product.photo}</td>
                <td>{product.name}</td>
                <td>{product.code}</td>
                {responseData?.shops?.map(
                  (shop: { name: string; id: string }) => (
                    <td key={shop.id}>
                      {
                        responseData?.prices?.find(
                          (price: { shop_id: string; product_id: any }) =>
                            price.shop_id === shop.id &&
                            price.product_id === product.id
                        )?.sum
                      }
                    </td>
                  )
                )}
                <td>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setModal({ product });
                    }}
                    size="sm"
                  >
                    Продать
                  </Button>
                </td>
              </tr>
            )
          )}
          <tr></tr>
        </tbody>
      </Btable>
      <AddSale modal={modal} setModal={setModal} responseData={responseData} />
    </Template>
  );
};

const AddSale = ({ modal, setModal, responseData }: any): any => {
  const onSubmit = (values: any) => {
    API.add_sale(values).then((response) => {
      console.log("response", response);
    });
    // alert(JSON.stringify( values));
  };
  const city = "khv";
  return (
    <>
      <Modal show={modal ? true : false} onHide={setModal}>
        <Form
          onSubmit={onSubmit}
          initialValues={{
            product_id: modal?.product?.id,
            shop_id: city,
            saler_id: 1,
            count: 1,
            sum: (() => {
              const val = responseData?.prices?.find(
                (price: { product_id: any; shop_id: any }) =>
                  price.product_id === modal?.product?.id &&
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
                <Modal.Title>Продать {modal?.product?.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {/* <pre>{JSON.stringify({ values, modal }, null, " ")}</pre> */}
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
                              price.product_id === modal?.product?.id &&
                              price.shop_id === shop_id
                          )?.sum;
                          form.mutators.setPrice(val ? val : 0);
                          console.log(
                            responseData?.prices?.find(
                              (price: { product_id: any; shop_id: any }) =>
                                price.product_id === modal?.product?.id &&
                                price.shop_id === shop_id
                            )?.sum,
                            "value, previous",
                            shop_id,
                            responseData?.prices
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
                    </BForm.Group>
                  )}
                </Field>
                <Field name="sum">
                  {(props) => (
                    <BForm.Group>
                      <BForm.Label>Сумма</BForm.Label>
                      <FormControl
                        placeholder="shop_id"
                        aria-describedby="basic-addon1"
                        type="number"
                        {...props.input}
                      />
                    </BForm.Group>
                  )}
                </Field>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setModal(null);
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
