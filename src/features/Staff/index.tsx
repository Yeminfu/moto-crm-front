import React, { useEffect, useState } from "react";
import { Template, shops as shopss } from "../template";
import { API } from "../../api";
import {} from "../Table";
import {
  Table,
  Modal,
  Form as BForm,
  FormControl,
  Button,
} from "react-bootstrap";
import { Field, Form } from "react-final-form";
import { useStore } from "effector-react";

export const Staff = () => {
  const [roles, setRoles] = useState<any>([]);
  const [modal, setModal] = useState<any>(false);
  const [staff, setStaff] = useState<any>([]);
  useEffect(() => {
    API.get_staff().then((response: any) => setStaff(response.data.staff));
    API.get_roles().then((response: any) => setRoles(response.data.roles));
  }, []);

  useEffect(() => {
    API.get_staff().then((response: any) => {
      //   console.log("response", response.data.staff);
      setStaff(response.data.staff);
    });
  }, []);
  return (
    <Template title="Штат">
      <Table striped bordered hover size="sm" className="table-striped w-auto">
        <thead style={{ whiteSpace: "nowrap" }}>
          <tr>
            <th>ФИО</th>
            <th>Должность</th>
            <th>Магазин</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {staff.map((user: any, i: number) => (
            <tr key={i}>
              <td>{user.name}</td>
              <td>{roles.find((role: any) => role.id === user.role)?.role}</td>
              <td>{user.shop_id}</td>

              <td>
                <Button
                  variant="primary"
                  onClick={() => {
                    //   setModal({ product });
                  }}
                  size="sm"
                >
                  Изменить
                </Button>
              </td>
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </Table>
      <Button
        onClick={() => {
          setModal(true);
        }}
      >
        Добавить сотрудника
      </Button>
      <AddStaff modal={modal} setModal={setModal} roles={roles} />
    </Template>
  );
};

const AddStaff = ({ modal, setModal, roles }: any): any => {
  const shops = useStore(shopss);
  const onSubmit = (values: any) => {
    API.add_user(values).then(() => console.log("ok"));
  };
  const required = (value: any) => (value ? undefined : "Required");
  return (
    <>
      <Modal show={modal ? true : false} onHide={setModal}>
        <Form
          onSubmit={onSubmit}
          initialValues={{}}
          mutators={{
            setPrice: (args, state, utils) => {
              utils.changeValue(state, "sum", () => args);
            },
          }}
          render={({ form, handleSubmit, values, touched, errors }) => (
            <form onSubmit={handleSubmit}>
              {JSON.stringify(values)}
              <Modal.Header closeButton>
                <Modal.Title>Добавить сотрудника</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Field name="name" validate={required}>
                  {(props) => (
                    <BForm.Group>
                      <BForm.Label>ФИО</BForm.Label>
                      <FormControl
                        isInvalid={touched?.name && errors.name}
                        placeholder="фио"
                        aria-describedby="basic-addon1"
                        {...props.input}
                      />
                    </BForm.Group>
                  )}
                </Field>
                <Field name="shop_id" validate={required}>
                  {(props) => (
                    <BForm.Group>
                      <BForm.Label>Магазин</BForm.Label>
                      <BForm.Control
                        as="select"
                        {...props.input}
                        isInvalid={touched?.shop_id && errors.shop_id}
                      >
                        <option />
                        {shops?.map((shop: { name: string; id: string }) => (
                          <option key={shop.name} value={shop.id}>
                            {shop.name}
                          </option>
                        ))}
                      </BForm.Control>
                    </BForm.Group>
                  )}
                </Field>
                <Field name="role" validate={required}>
                  {(props) => (
                    <BForm.Group>
                      <BForm.Label>Должность</BForm.Label>
                      <BForm.Control
                        as="select"
                        {...props.input}
                        isInvalid={touched?.role && errors.role}
                      >
                        <option />
                        {roles?.map((role: any) => (
                          <option key={role.id} value={role.id}>
                            {role.role}
                          </option>
                        ))}
                      </BForm.Control>
                    </BForm.Group>
                  )}
                </Field>
                <Field name="password" validate={required}>
                  {(props) => (
                    <BForm.Group>
                      <BForm.Label>Пароль</BForm.Label>
                      <FormControl
                        isInvalid={touched?.password && errors.password}
                        placeholder="пароль"
                        aria-describedby="basic-addon1"
                        type="password"
                        {...props.input}
                      />
                    </BForm.Group>
                  )}
                </Field>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setModal(null);
                  }}
                >
                  Отмена
                </Button>
                <Button variant="primary" type="submit">
                  Подтвердить
                </Button>
              </Modal.Footer>
            </form>
          )}
        />
      </Modal>
    </>
  );
};
