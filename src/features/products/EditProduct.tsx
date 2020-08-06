import { API } from "../../api";
import React from "react";
import { Modal, Row, Col, Button } from "react-bootstrap";
import { Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import { validation } from "../helpers/validation";
import { CustomInput, CustomTextarea, CustomSelect } from "./fields";

export const markups = [
  {
    label: "фиксированная",
    value: "fix",
  },
  {
    label: "ручная",
    value: "handle",
  },
  {
    label: "процент",
    value: "percent",
  },
];

export const EditProduct = ({
  modalEditProduct,
  setModalEditProduct,
  responseData,
}: any): any => {
  const onSubmit = (values: any) => {
    API.edit_product(values).then((response) => {
      if (response?.data?.success) {
        setModalEditProduct(false);
      }
    });
  };
  const { shops, stock } = responseData;
  return (
    <>
      <Modal
        show={modalEditProduct ? true : false}
        onHide={setModalEditProduct}
      >
        {/* <pre>{JSON.stringify({ modalEditProduct }, null, " ")}</pre> */}
        <Form
          onSubmit={onSubmit}
          initialValues={{
            id: modalEditProduct?.product?.id,
            name: modalEditProduct?.product?.name,
            purchase_price: modalEditProduct?.product?.purchase_price,
            cost_type: modalEditProduct?.product?.cost_type,
            cost_value: modalEditProduct?.product?.cost_value,
            note: modalEditProduct?.product?.note,
            retail_prices: shops
              ? shops.map((shop: any) => ({
                  ...shop,

                  // price_type: stock.find(
                  //   (stock_item: any) =>
                  //     stock_item.shop_id === shop.id &&
                  //     modalEditProduct?.product?.id === stock_item.product_id
                  // )?.count,
                  price_type: "fix",
                  price_count: "123",
                }))
              : [],
            stock_counts: shops
              ? shops.map((shop: any) => ({
                  ...shop,
                  count: stock.find(
                    (stock_item: any) =>
                      stock_item.shop_id === shop.id &&
                      modalEditProduct?.product?.id === stock_item.product_id
                  )?.count,
                }))
              : [],
          }}
          mutators={{
            setPrice: (args, state, utils) => {
              utils.changeValue(state, "sum", () => args);
            },
            ...arrayMutators,
          }}
          render={({ form, handleSubmit, values, errors }) => (
            <form onSubmit={handleSubmit}>
              {/* <pre>{JSON.stringify(values, null, " ")}</pre> */}
              <Modal.Header closeButton>
                <Modal.Title>
                  Редактировать {modalEditProduct?.product?.name}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <CustomInput
                  lable="Наименование"
                  name="name"
                  type="input"
                  placeholder="Наименование"
                  validation={validation.required}
                />
                <CustomTextarea
                  lable="Заметки"
                  name="note"
                  validation={validation.required}
                />

                <CustomInput
                  lable="Закупочная цена"
                  name="purchase_price"
                  type="number"
                  placeholder="Закупочная цена"
                  validation={validation.required}
                />
                <Row className="align-items-end">
                  <Col>
                    <CustomSelect
                      lable="Себестоимость"
                      name="cost_type"
                      options={markups}
                      placeholder="тип наценки"
                      validation={validation.required}
                    />
                  </Col>
                  <Col>
                    <CustomInput
                      lable=""
                      name="cost_value"
                      type="number"
                      placeholder="значение"
                      validation={validation.required}
                    />
                  </Col>
                </Row>

                <FieldArray name="retail_prices">
                  {({ fields }) =>
                    fields.map((name, index) => (
                      <Row className="align-items-end" key={index}>
                        <Col>
                          <CustomSelect
                            lable={`Розн. цена ${shops[index].name}`}
                            name={`${name}.price_type`}
                            options={markups}
                            placeholder="тип наценки"
                            validation={validation.required}
                          />
                        </Col>
                        <Col>
                          <CustomInput
                            lable=""
                            name={`${name}.count`}
                            type="number"
                            validation={validation.required}
                          />
                        </Col>
                      </Row>
                    ))
                  }
                </FieldArray>

                <Row className="align-items-end">
                  <FieldArray name="stock_counts">
                    {({ fields }) =>
                      fields.map((name, index) => (
                        <Col key={index}>
                          <CustomInput
                            lable={`К-во в ${shops[index].id}`}
                            name={`${name}.count`}
                            type="number"
                            validation={validation.required}
                          />
                        </Col>
                      ))
                    }
                  </FieldArray>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setModalEditProduct(null);
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
