import React, { useEffect } from "react";
import { Form, Field } from "react-final-form";
import {
  Row,
  Col,
  FormControl,
  Button,
  //   Label,
  Form as BForm,
} from "react-bootstrap";
// import {productType}
import { API, productType } from "../../api";
import { Template, shops as sho, categories as cats } from "../template";
import { useStore } from "effector-react";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import Swal from "sweetalert2";
import { CustomInput, CustomSelect, CustomFileInput } from "../products/fields";
import { validation } from "../helpers/validation";
import { markups } from "../products/EditProduct";
import { OnChange } from "react-final-form-listeners";
import { slugify } from "transliteration";
import styled from "styled-components";
// import { $auth } from "../Login";
import { constants } from "../../constants";

export const CreateProduct = () => {
  useEffect(() => {}, []);
  const shops = useStore(sho);
  const categories = useStore(cats);
  // const auth = useStore<any>($auth);

  const onSubmit = (values: productType, form: any) => {
    // var bodyFormData = new FormData();

    const formData = new FormData();
    if (values?.product_image)
      formData.append("file", values?.product_image[0]);

    for (const key in values) {
      formData.append(
        key,
        (() => {
          if (["stock_items", "retail_prices"].indexOf(key) !== -1) {
            return JSON.stringify(values[key]);
          } else {
            return values[key];
          }
        })()
      );
    }

    API.add_products(formData).then((response) => {
      if (response?.data?.success) {
        Swal.fire({
          title: "Успех!",
          icon: "success",
          confirmButtonText: "Ок",
        });
      } else {
        Swal.fire({
          title: "Что-то пошло не так!",
          icon: "error",
          text: response?.data?.errors && response?.data?.errors.join(","),
          confirmButtonText: "Ок",
        });
      }

      // .then(() => form.reset());
    });
  };
  return (
    <>
      <Template title="Создать товар">
        <Styled>
          <Form
            onSubmit={onSubmit}
            initialValues={{
              retail_prices: shops ? shops : [],
              stock_items: shops ? shops : [],

              // retail_prices: shops
              //   ? shops.map((x: any) => ({
              //       ...x,
              //       id: "khv",
              //       name: "Хабаровск",
              //       price_type: "fix",
              //       count: "234",
              //     }))
              //   : [],

              // category_id: "lodki",
              // name: "ТестШмест",
              // purchase_price: "1234",
              // cost_type: "fix",
              // cost_value: "234",
            }}
            mutators={{
              setPrice: (args, state, utils) => {
                utils.changeValue(state, "sum", () => args);
              },
              setProductID: (args, state, utils) => {
                utils.changeValue(state, "id", () => args[0]);
              },
              ...arrayMutators,
            }}
            render={({ form, handleSubmit, values, errors, touched }) => (
              <BForm
                onSubmit={handleSubmit}
                noValidate
                className="needs-validation"
              >
                <Row>
                  <Col xs={6}>
                    <Row>
                      <Col>
                        <CustomInput
                          name="name"
                          lable="Наименование"
                          validation={validation.required}
                          type="input"
                          // required
                        />
                        <OnChange name="name">
                          {(name) => {
                            form.mutators.setProductID(slugify(name));
                          }}
                        </OnChange>
                      </Col>
                      <Col>
                        <CustomSelect
                          lable="Цвет"
                          name="title_color"
                          color={true}
                          options={[...constants.product_title_colors]}
                          placeholder="цвет"
                          // validation={validation.required}
                        />
                      </Col>
                      <Col>
                        <CustomInput
                          name="code"
                          lable="Код товара"
                          // validation={validation.required}
                          type="input"
                        />
                      </Col>
                      <Col>
                        <CustomSelect
                          name="category_id"
                          lable="Категория товара"
                          validation={validation.required}
                          placeholder="Категория"
                          options={[
                            ...categories?.map((category: any) => ({
                              value: category.id,
                              label: category.name,
                            })),
                          ]}
                        />
                      </Col>
                    </Row>

                    <CustomFileInput
                      lable="Изображение товара"
                      name="product_image"
                      // validation=any;
                    />

                    <CustomInput
                      name="purchase_price"
                      lable="Закупочная цена"
                      type="number"
                      validation={validation.required}
                      placeholder=""
                    />
                    <Row>
                      <Col>
                        <CustomSelect
                          name="cost_type"
                          lable="Себестоимость (тип)"
                          options={markups}
                          placeholder=""
                          validation={validation.required}
                        />
                      </Col>
                      <Col>
                        <CustomInput
                          name="cost_value"
                          type="number"
                          validation={validation.required}
                          placeholder=""
                          lable="Себестоимость (значение)"
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

                    {/* {auth?.user?.role === "1" && (
                      <Row className="align-items-end">
                        <FieldArray name="stock_items">
                          {({ fields }) =>
                            fields.map((name, index) => (
                              <Col>
                                <CustomInput
                                  lable={`Количество в ${shops[index].name}`}
                                  name={`${name}.count`}
                                  type="number"
                                  validation={validation.required}
                                />
                              </Col>
                            ))
                          }
                        </FieldArray>
                      </Row>
                    )} */}

                    <BForm.Group>
                      <BForm.Label>Заметки</BForm.Label>
                      <Field
                        name="note"
                        // validate={required}
                      >
                        {(props) => (
                          <FormControl
                            aria-describedby="basic-addon1"
                            as="textarea"
                            {...props.input}
                          />
                        )}
                      </Field>
                    </BForm.Group>
                    <Button variant="primary" type="submit">
                      Сохранить
                    </Button>
                  </Col>
                </Row>
              </BForm>
            )}
          />
        </Styled>
      </Template>
    </>
  );
};

const Styled = styled.div`
  label {
    display: block;
  }
`;
