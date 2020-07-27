import React from "react";
import { Form, Field } from "react-final-form";
import axios from "axios";
import {
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  //   Label,
  Form as Bform,
} from "react-bootstrap";

export const CreateProduct = () => (
  <>
    <MyForm />
  </>
);

const onSubmit = (values: any) => {
  // axios.get("http://10.0.0.31:3001/api/login").then((x) => console.log("x", x));
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
        <Row>
          <Col sm="4">
            <Field name="login">
              {(props) => (
                <Bform.Group controlId="exampleForm.SelectCustom">
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

            <Field name="photo">
              {(props) => (
                <Bform.Group controlId="exampleForm.SelectCustom">
                  <InputGroup>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="validatedCustomFile"
                        required
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
            </Field>
            <Field name="categogy">
              {(props) => (
                <Bform.Group controlId="exampleForm.SelectCustom">
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
