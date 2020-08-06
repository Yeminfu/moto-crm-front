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
import { CustomInput, CustomSelect } from "../products/fields";
import { validation } from "../helpers/validation";
import { markups } from "../products/EditProduct";

const required = (value: any) => (value ? undefined : "Required");

export const CreateProduct = () => {
  useEffect(() => {}, []);
  const shops = useStore(sho);
  const categories = useStore(cats);
  const onSubmit = (values: productType, form: any) => {
    console.log({ values, form });
    API.add_products(values).then((response) => {
      Swal.fire({
        title: "Успех!",
        // text: "Неправильный логин или пароль",
        icon: "success",
        confirmButtonText: "Ок",
      }).then(() => form.reset());
    });
  };
  return (
    <>
      <Template title="Создать товар">
        <Form
          onSubmit={onSubmit}
          initialValues={{
            // name: "asd",
            // code: "asd",
            // cost_type: "percent",
            // cost_value: "1.3",
            // category_id: "boats",
            // purchase_price: 1000,
            // note: "bla bla bla",
            // at_store: "1",
            retail_prices: shops ? shops : [],
          }}
          mutators={{
            setPrice: (args, state, utils) => {
              utils.changeValue(state, "sum", () => args);
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
                      />
                    </Col>
                    <Col>
                      <CustomInput
                        name="code"
                        lable="Код товара"
                        validation={validation.required}
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
                        lable="Себестоимость (тип)"
                      />
                    </Col>
                    {/* <BForm.Group controlId="exampleForm.SelectCustom" as={Col}>
                      <BForm.Label>Себестоимость (тип)</BForm.Label>
                      <Field name="cost_type" validate={required}>
                        {(props) => (
                          <BForm.Control
                            as="select"
                            custom
                            {...props.input}
                            isInvalid={touched?.cost_type && errors.cost_type}
                          >
                            <option />
                            {markups.map((x, i) => (
                              <option value={x.value} key={i}>
                                {x.label}
                              </option>
                            ))}
                          </BForm.Control>
                        )}
                      </Field>
                    </BForm.Group> */}
                    {/* <BForm.Group as={Col}>
                      <BForm.Label>Себестоимость (значение)</BForm.Label>
                      <Field name="cost_value" validate={required}>
                        {(props) => (
                          <FormControl
                            isInvalid={touched?.cost_value && errors.cost_value}
                            aria-describedby="basic-addon1"
                            type="number"
                            {...props.input}
                          />
                        )}
                      </Field>
                    </BForm.Group> */}
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
                  <BForm.Group>
                    <BForm.Label>Количество на складе</BForm.Label>
                    <Field name="at_store" validate={required}>
                      {(props) => (
                        <FormControl
                          isInvalid={touched?.at_store && errors.at_store}
                          aria-describedby="basic-addon1"
                          type="number"
                          {...props.input}
                        />
                      )}
                    </Field>
                  </BForm.Group>
                  <BForm.Group>
                    <BForm.Label>Заметки</BForm.Label>
                    <Field name="note" validate={required}>
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
      </Template>
    </>
  );
};
