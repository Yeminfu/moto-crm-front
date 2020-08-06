import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Form } from "react-final-form";
import { CustomInput, CustomSelect } from "./fields";
import { validation } from "../helpers/validation";
import { OnChange } from "react-final-form-listeners";
import { API } from "../../api";

export const AddSale = ({
  modalAddSale,
  setModalAddSale,
  responseData,
}: any): any => {
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
              const data = responseData?.prices?.find(
                (price: { product_id: any; shop_id: any }) =>
                  price.product_id === modalAddSale?.product?.id &&
                  price.shop_id === city
              );
              return data;
              // return <pre>{JSON.stringify(data, null, " ")}</pre>;
              // if (data) {
              //   const { price_type, price_count } = data;
              //   switch (price_type) {
              //     case "percent":
              //       return (
              //         Number(product.purchase_price) *
              //         Number(price_count)
              //       );
              //     case "fix":
              //       return (
              //         Number(product.purchase_price) +
              //         Number(price_count)
              //       );
              //     case "handle":
              //       return Number(price_count);
              //   }

              // const val = responseData?.prices?.find(
              //   (price: { product_id: any; shop_id: any }) =>
              //     price.product_id === modalAddSale?.product?.id &&
              //     price.shop_id === city
              // )?.sum;
              // if (true) {
              //   return val;
              // }
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
                <pre>{JSON.stringify({ values }, null, " ")}</pre>
                <CustomSelect
                  name="shop_id"
                  lable="Магазин"
                  placeholder=""
                  options={responseData?.shops?.map((shop: any) => ({
                    value: shop.id,
                    label: shop.name,
                  }))}
                  validation={validation.required}
                />
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
                {/* <Field name="shop_id">
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
                </Field> */}
                <CustomInput
                  name="count"
                  type="number"
                  lable="Количество"
                  placeholder=""
                  validation={validation.required}
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
                {/* <Field name="count">
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
                </Field> */}
                <CustomInput
                  name="sum"
                  type="number"
                  lable="Сумма"
                  placeholder=""
                  validation={validation.required}
                />
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
