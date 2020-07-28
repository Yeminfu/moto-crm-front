import React, { ReactElement } from "react";
import { Row, Col, Card, Badge } from "react-bootstrap";

export const Wrapper = ({
  title,
  method,
  api_url,
  form,
  response_data,
}: {
  title: string;
  method: "GET" | "POST";
  api_url: string;
  form: ReactElement;
  response_data: any;
}) => (
  <>
    <Row>
      <Col sm={2}>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Admin API: {title}</Card.Title>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <h2>Admin API: {title}</h2>
        <div>
          <div>{title}</div>
          <Badge variant="info">{method}</Badge> {api_url}
        </div>
        <div className="mt-3">
          {form}
          {response_data && (
            <pre>{JSON.stringify({ response: response_data }, null, " ")}</pre>
          )}
        </div>
      </Col>
    </Row>
  </>
);
