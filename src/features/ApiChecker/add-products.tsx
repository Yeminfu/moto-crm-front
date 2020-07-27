import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  Badge,
  InputGroup,
  FormControl,
  Spinner,
  Form as Bform,
} from "react-bootstrap";
import { Form, Field } from "react-final-form";
// import axios from "axios";
import { API } from "../../api";

export const AddProducts = () => {
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
    // const formData = new FormData();
    // console.log("values", values);

    API.add_products([values])
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
    <>
      <Row>
        <Col sm={2}>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Admin API: Products</Card.Title>
              <ListGroup>
                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <h2>Admin API: Sessions</h2>
          <div>
            <div>Add product</div>
            <Badge variant="info">POST</Badge> /api/product
          </div>
          <div className="mt-3">
            <MyForm onSubmit={onSubmit} setResponse={setResponse} />
            {response.data && (
              <pre>
                {JSON.stringify({ response: response.data }, null, " ")}
              </pre>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};

const MyForm = ({ onSubmit }: any) => (
  <Form
    onSubmit={onSubmit}
    initialValues={{
      name: "asd",
      code: "asd",
      cost_type: "fix",
      cost_value: "1000",
      purchase_price: "asdasd",
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
                    // aria-label="Username"
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
                    // aria-label="Username"
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
                    // aria-label="Username"
                    aria-describedby="basic-addon1"
                    {...props.input}
                  />
                </InputGroup>
              )}
            </Field>
            <Button
              variant="primary"
              // disabled
              type="submit"
            >
              Try it
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            </Button>
          </Col>
        </Row>
      </form>
    )}
  />
);
