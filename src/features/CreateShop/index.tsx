import React, { useEffect } from "react";
import { Form, Field } from "react-final-form";
import {
  Row,
  Col,
  // FormControl,
  Button,
  //   Label,
  Form as BForm,
} from "react-bootstrap";
// import {productType}
import { API, productType } from "../../api";
import { Template } from "../template";
// import { useStore } from "effector-react";
// import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";

const required = (value: any) => (value ? undefined : "Required");

export const CreateShop = () => {
  useEffect(() => {}, []);
  const onSubmit = (values: productType) => {
    console.log(values);
    API.add_shop(values);
  };
  return (
    <>
      <Template title="Создать магазин">
        <Form
          onSubmit={onSubmit}
          initialValues={{}}
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
                  <BForm.Group>
                    <BForm.Label>Название</BForm.Label>
                    <Field name="name" validate={required}>
                      {(props: any) => (
                        <BForm.Control
                          isInvalid={touched?.name && errors.name}
                          aria-describedby="basic-addon1"
                          {...props.input}
                        />
                      )}
                    </Field>
                  </BForm.Group>
                  <BForm.Group>
                    <BForm.Label>ID</BForm.Label>
                    <Field name="id" validate={required}>
                      {(props: any) => (
                        <BForm.Control
                          isInvalid={touched?.name && errors.name}
                          aria-describedby="basic-addon1"
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
