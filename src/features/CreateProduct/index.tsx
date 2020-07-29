import React from "react";
import { Form, Field } from "react-final-form";
import {
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  //   Label,
  Form as Bform,
} from "react-bootstrap";
import { API } from "../../api";

export const CreateProduct = () => (
  <>
    <MyForm />
  </>
);

const onSubmit = (values: any) => {
  // axios.get("http://10.0.0.31:3001/api/login").then((x) => console.log("x", x));
  API.add_products([values]).then((x) => console.log("x", x));
};

const MyForm = () => (
  <Form
    onSubmit={onSubmit}
    initialValues={
      {
        //   login: "loginasda",
        //   password: "passwordasda",
      }
    }
    render={({ handleSubmit, values }) => (
      <form onSubmit={handleSubmit}>
        <h2>Создать товар</h2>
        {/* <pre>{JSON.stringify(values, null, " ")}</pre> */}
        <Row>
          <Col xs="6">
            <Field name="name">
              {(props) => (
                <Bform.Group controlId="exampleForm.SelectCustom">
                  <Bform.Label>Название товара </Bform.Label>
                  <InputGroup>
                    <FormControl
                      placeholder="Название товара"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      {...props.input}
                    />
                  </InputGroup>
                </Bform.Group>
              )}
            </Field>
            <Field name="code">
              {(props) => (
                <Bform.Group controlId="exampleForm.SelectCustom">
                  <Bform.Label>Код товара </Bform.Label>
                  <InputGroup>
                    <FormControl
                      placeholder="Код товара"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      {...props.input}
                    />
                  </InputGroup>
                </Bform.Group>
              )}
            </Field>
            {/* <Field name="photo">
              {(props) => (
                <Bform.Group controlId="exampleForm.SelectCustom">
                  <Bform.Label>Изображение товара </Bform.Label>
                  <InputGroup>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="validatedCustomFile"
                        // required
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="validatedCustomFile"
                      >
                        Выберите файл...
                      </label>
                      <div className="invalid-feedback">
                        Example invalid custom file feedback
                      </div>
                    </div>
                  </InputGroup>
                </Bform.Group>
              )}
            </Field> */}
            <Field name="category_id">
              {(props) => (
                <Bform.Group controlId="exampleForm.SelectCustom">
                  <Bform.Label>Категория товара </Bform.Label>
                  <Bform.Control as="select" custom {...props.input}>
                    <option>Выберите категорию</option>
                    {[
                      {
                        label: "лодки",
                        value: "boats",
                      },
                      {
                        label: "моторы",
                        value: "motors",
                      },
                    ].map((x, i) => (
                      <option value={x.value} key={i}>
                        {x.label}
                      </option>
                    ))}
                  </Bform.Control>
                </Bform.Group>
              )}
            </Field>
            <Field name="purchase_price">
              {(props) => (
                <Bform.Group controlId="exampleForm.SelectCustom">
                  <Bform.Label>Закупочная цена</Bform.Label>
                  <InputGroup>
                    <FormControl
                      placeholder="Наценка"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      {...props.input}
                    />
                  </InputGroup>
                </Bform.Group>
              )}
            </Field>
            <Row className="align-items-end">
              <Col>
                <Field name="cost_type">
                  {(props) => (
                    <Bform.Group controlId="exampleForm.SelectCustom">
                      <Bform.Label>Себестоимость </Bform.Label>
                      <Bform.Control as="select" custom {...props.input}>
                        <option value={""}>Тип наценки</option>
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
                      </Bform.Control>
                    </Bform.Group>
                  )}
                </Field>
              </Col>
              <Col>
                <Field name="cost_value">
                  {(props) => (
                    <Bform.Group controlId="exampleForm.SelectCustom">
                      {/* <Bform.Label>Наценка</Bform.Label> */}
                      <InputGroup>
                        <FormControl
                          placeholder="Наценка"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          {...props.input}
                        />
                      </InputGroup>
                    </Bform.Group>
                  )}
                </Field>
              </Col>
            </Row>
            <Field name="note">
              {(props) => (
                <Bform.Group controlId="exampleForm.SelectCustom">
                  <Bform.Label>Название товара </Bform.Label>
                  <InputGroup>
                    <FormControl
                      placeholder="Название товара"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      as="textarea"
                      {...props.input}
                    />
                  </InputGroup>
                </Bform.Group>
              )}
            </Field>

            <Button variant="outline-primary" type="submit" size="sm">
              Сохранить
            </Button>
          </Col>
        </Row>
        {/* <pre>{JSON.stringify(values, null, " ")}</pre> */}
      </form>
    )}
  />
);
