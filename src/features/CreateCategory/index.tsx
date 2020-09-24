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
import { API, categoryType } from "../../api";
import { Template } from "../template";
import arrayMutators from "final-form-arrays";
import Swal from "sweetalert2";
import { AxiosResponse } from "axios";
import { slugify } from "transliteration";
import { OnChange } from "react-final-form-listeners";

const required = (value: any) => (value ? undefined : "Required");

export const CreateCategory = () => {
  useEffect(() => {}, []);
  const onSubmit = async (values: categoryType) => {
    const response = await API.add_category(values).then(
      (response: AxiosResponse<any>) => response.data
    );
    const { success, errors } = response;
    if (success) {
      Swal.fire({
        title: "Успешно!",
        icon: "success",
        confirmButtonText: "Ок",
      });
    } else {
      Swal.fire({
        title: "Ошибка!",
        icon: "error",
        text: JSON.stringify(errors),
        confirmButtonText: "Ок",
      });
    }
  };
  return (
    <>
      <Template title="Создать категорию">
        <Form
          onSubmit={onSubmit}
          initialValues={{}}
          mutators={{
            setPrice: (args, state, utils) => {
              utils.changeValue(state, "id", () => {
                // console.log(args[0]);

                return slugify(args);
              });
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
                  <OnChange name="name">
                    {(category_name) => {
                      // const val = responseData?.prices?.find(
                      //   (price: { product_id: any; shop_id: any }) =>
                      //     price.product_id === modalAddSale?.product?.id &&
                      //     price.shop_id === shop_id
                      // )?.sum;
                      form.mutators.setPrice(category_name);
                    }}
                  </OnChange>
                  <BForm.Group>
                    <BForm.Label>ID (например boats)</BForm.Label>
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
