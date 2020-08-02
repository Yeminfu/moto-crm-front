import React, { useEffect } from "react";
import { Form, Field } from "react-final-form";
import {
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  //   Label,
  Form as BForm,
} from "react-bootstrap";
import { API } from "../../api";
import { Template, shops as sho, categories as cats } from "../template";
import { useStore } from "effector-react";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";

const required = (value: any) => (value ? undefined : "Required");

export const CreateProduct = () => {
  useEffect(() => {}, []);
  const shops = useStore(sho);
  const categories = useStore(cats);
  const onSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <>
      <Template title="Создать товар">
        <Form
          onSubmit={onSubmit}
          // validate={(values) => {
          //   const errors: any = {};
          //   if (!values.name) {
          //     errors.name = "Required";
          //   }
          //   // if (!values.password) {
          //   //   errors.password = "Required";
          //   // }
          //   // if (!values.confirm) {
          //   //   errors.confirm = "Required";
          //   // } else if (values.confirm !== values.password) {
          //   //   errors.confirm = "Must match";
          //   // }
          //   return errors;
          // }}
          initialValues={{
            // name: "asd",
            // code: "asd",
            // cost_type: "percent",
            // cost_value: "1.3",
            // category_id: "boats",
            // purchase_price: 1000,
            // note: "bla bla bla",
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
              // validated={true}
            >
              {/* <pre>
                {JSON.stringify({ values, errors, touched }, null, " ")}
              </pre> */}
              <Row>
                <BForm.Group controlId="name" as={Col}>
                  <BForm.Label>Наименование</BForm.Label>
                  <Field name="name" validate={required}>
                    {(props) => (
                      <BForm.Control
                        aria-describedby="basic-addon1"
                        {...props.input}
                      />
                    )}
                  </Field>
                </BForm.Group>
                <BForm.Group as={Col}>
                  <BForm.Label>Код товара</BForm.Label>
                  <Field name="code" validate={required}>
                    {(props) => (
                      <FormControl
                        placeholder="Код товара"
                        aria-describedby="basic-addon1"
                        {...props.input}
                      />
                    )}
                  </Field>
                </BForm.Group>
                <BForm.Group controlId="exampleForm.SelectCustom" as={Col}>
                  <BForm.Label>Категория товара</BForm.Label>
                  <Field name="category_id" validate={required}>
                    {(props) => (
                      <BForm.Control as="select" custom {...props.input}>
                        <option />
                        {categories?.map((category: any) => (
                          <option value={category.id} key={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </BForm.Control>
                    )}
                  </Field>
                </BForm.Group>
              </Row>
              <Field name="cost_value" validate={required}>
                {(props) => (
                  <BForm.Group>
                    <BForm.Label>Закупочная цена</BForm.Label>
                    <FormControl
                      aria-describedby="basic-addon1"
                      type="number"
                      {...props.input}
                    />
                  </BForm.Group>
                )}
              </Field>
              <Row>
                <BForm.Group controlId="exampleForm.SelectCustom" as={Col}>
                  <BForm.Label>Себестоимость (тип)</BForm.Label>
                  <Field name="cost_type" validate={required}>
                    {(props) => (
                      <BForm.Control as="select" custom {...props.input}>
                        <option />
                        {[
                          {
                            label: "фиксированная",
                            value: "fix",
                          },
                          {
                            label: "процент",
                            value: "percent",
                          },
                        ].map((x, i) => (
                          <option value={x.value} key={i}>
                            {x.label}
                          </option>
                        ))}
                      </BForm.Control>
                    )}
                  </Field>
                </BForm.Group>
                <BForm.Group as={Col}>
                  <BForm.Label>Себестоимость (значение)</BForm.Label>
                  <Field name="cost_value" validate={required}>
                    {(props) => (
                      <FormControl
                        aria-describedby="basic-addon1"
                        type="number"
                        {...props.input}
                      />
                    )}
                  </Field>
                </BForm.Group>
              </Row>
              <Row>
                <FieldArray name="retail_prices">
                  {({ fields }) =>
                    fields.map((name, index) => (
                      <BForm.Group as={Col} key={index}>
                        <BForm.Label>Р цена {shops[index].name}</BForm.Label>
                        <Field name={`${name}.cost_value`} validate={required}>
                          {(props) => (
                            <FormControl
                              aria-describedby="basic-addon1"
                              type="number"
                              {...props.input}
                            />
                          )}
                        </Field>
                      </BForm.Group>
                    ))
                  }
                </FieldArray>
              </Row>

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
            </BForm>
          )}
        />
      </Template>
    </>
  );
};
