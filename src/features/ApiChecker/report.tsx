import React, { useState } from "react";
import {
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
  Form as Bform,
} from "react-bootstrap";
import { Form, Field } from "react-final-form";
import { API } from "../../api";
import { Wrapper } from "./wrapper";

export const Report = () => {
  const [response, setResponse] = useState<any>({
    loading: false,
    data: null,
    status: null,
  });
  const onSubmit = (values: any) => {
    setResponse({
      ...response,
      loading: true,
    });
    API.get_report(values)
      .then((x) => {
        setResponse({
          loading: false,
          data: x.data,
        });
      })
      .catch((error) => {
        if (error.response) {
          setResponse({
            loading: false,
            data: {
              error: {
                text: error.response.statusText,
                code: error.response.status,
              },
            },
          });
        }
      });
  };
  return (
    <Wrapper
      title="Year Report"
      method="GET"
      api_url="/api/report"
      form={<MyForm onSubmit={onSubmit} setResponse={setResponse} />}
      response_data={response.data}
    />
  );
};

const MyForm = ({ onSubmit }: any) => (
  <Form
    onSubmit={onSubmit}
    initialValues={{
      year: "2020",
      category: "boats",
    }}
    render={({ handleSubmit, values }) => (
      <form onSubmit={handleSubmit}>
        <Row>
          <Col sm="4">
            <Field name="category">
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
            <Field name="year">
              {(props) => (
                <InputGroup>
                  <FormControl
                    placeholder="Год"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    {...props.input}
                  />
                </InputGroup>
              )}
            </Field>
            <Button variant="primary" type="submit">
              Try it
            </Button>
          </Col>
        </Row>
      </form>
    )}
  />
);
