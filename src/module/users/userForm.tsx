import React, { useState } from "react";
import { Form, Input, Button } from "antd";

function UserForm() {
  const [formUser] = Form.useForm(); // controlar el formulario

  const handleSubmit = () => {
    const values = formUser.getFieldsValue(); // Obtener todos los datos en JSON
    console.log("Todos los datos del formulario: ", values);
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <h1>User Form</h1>
      <Form
        form={formUser}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false} // Quita los asteriscos
      >
        <Form.Item
          label="Nombre"
          name="nombre"
          rules={[{ required: true, message: "Por favor ingresa tu nombre" }]}
        >
          <Input placeholder="" />
        </Form.Item>

        <Form.Item
          label="Correo Electrónico"
          name="email"
        >
          <Input placeholder="" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Enviar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default UserForm;
