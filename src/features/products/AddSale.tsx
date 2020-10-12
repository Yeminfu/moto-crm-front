import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Form } from "react-final-form";
import { CustomInput, CustomSelect } from "./fields";
import { validation } from "../helpers/validation";
import { OnChange } from "react-final-form-listeners";
import { API } from "../../api";
import Swal from "sweetalert2";

export const AddSale = ({
  modalAddSale,
  setModalAddSale,
  responseData,
  reload,
}: any): any => {
  const onSubmit = (values: any) => {
    API.add_sale(values).then((response) => {
      if (response?.data?.success) {
        Swal.fire({
          title: "Успешно!",
          icon: "success",
          confirmButtonText: "Ок",
        }).then(() => {
          setModalAddSale(false);
          reload();
        });
      } else {
        Swal.fire({
          title: "Ошибка!",
          icon: "error",
          text: JSON.stringify(response?.data?.errors),
          confirmButtonText: "Ок",
        });
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
              const sum = modalAddSale?.product?.prices?.find(
                (price: { product_id: any; shop_id: any }) =>
                  price.shop_id === city
              )?.price;
              return sum ? Math.round(sum) : 0;
            })(),
          }}
          mutators={{
            setPrice: (args, state, utils) => {
              utils.changeValue(state, "sum", () => args[0]);
            },
          }}
          render={({ form, handleSubmit, values }) => (
            <form onSubmit={handleSubmit}>
              <Modal.Header closeButton>
                <Modal.Title>Продать {modalAddSale?.product?.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
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
                    const price = modalAddSale?.product?.prices?.find(
                      (price: { product_id: any; shop_id: any }) =>
                        price.shop_id === shop_id
                    )?.price;
                    const count = values.count;
                    const val = price
                      ? Math.round(price) * Math.round(count)
                      : 0;

                    form.mutators.setPrice(val);
                  }}
                </OnChange>
                <CustomInput
                  name="count"
                  type="number"
                  lable="Количество"
                  placeholder=""
                  validation={validation.required}
                />
                <OnChange name="count">
                  {(value) => {
                    const prices = modalAddSale?.product?.prices;
                    const shop_id = values.shop_id;
                    const found = prices?.find(
                      (price_item: { shop_id: string }) =>
                        price_item.shop_id === shop_id
                    );
                    const found_price = found ? Math.round(found.price) : 0;
                    const newPrice = found_price * Number(value);
                    form.mutators.setPrice(newPrice);
                  }}
                </OnChange>
                <CustomInput
                  name="sum"
                  type="number"
                  lable="Сумма"
                  placeholder=""
                  validation={validation.required}
                />
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
