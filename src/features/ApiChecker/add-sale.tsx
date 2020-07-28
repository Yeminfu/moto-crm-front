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

export const AddSale = () => {
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

    API.add_sale(values)
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
      title="Add Sale"
      method={"POST"}
      api_url="/api/add-sale"
      form={<MyForm onSubmit={onSubmit} setResponse={setResponse} />}
      response_data={response.data}
    />
  );
};

const MyForm = ({ onSubmit }: any) => (
  <Form
    onSubmit={onSubmit}
    initialValues={{
      product_id: 1,
      shop_id: 1,
      saler_id: 1,
      count: 1,
      sum: 100500,
    }}
    render={({ handleSubmit, values }) => (
      <form onSubmit={handleSubmit}>
        <pre>{JSON.stringify({ values }, null, " ")}</pre>
        <Row>
          <Col sm="4">
            <Field name="name">
              {(props) => (
                <InputGroup>
                  <FormControl
                    placeholder="Название"
                    aria-describedby="basic-addon1"
                    {...props.input}
                  />
                </InputGroup>
              )}
            </Field>
            <Field name="code">
              {(props) => (
                <InputGroup>
                  <FormControl
                    placeholder="Код"
                    aria-describedby="basic-addon1"
                    {...props.input}
                  />
                </InputGroup>
              )}
            </Field>

            <Field name="cost_type">
              {(props) => (
                <Bform.Group controlId="exampleForm.SelectCustom">
                  <Bform.Control as="select" custom {...props.input}>
                    <option>Выберите тип наценки</option>
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
            <Field name="cost_value">
              {(props) => (
                <InputGroup>
                  <FormControl
                    placeholder="Размер наценки"
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
