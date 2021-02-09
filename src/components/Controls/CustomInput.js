import React  from "react";
import {Form, } from "react-bootstrap";

const CustomInput = ({ field, form: { touched, errors }, ...props }) => {
  return <>
      <Form.Control {...field} {...props}  isInvalid={errors[field.name] && touched[field.name]} />
      <Form.Control.Feedback type="invalid">{errors[field.name]}</Form.Control.Feedback>
  </>
};
const CustomCheck = ({ field, form: { touched, errors }, ...props }) => {
  return <>
      <Form.Check type="checkbox" {...field} {...props}   />
      {/* <Form.Control.Feedback type="invalid">{errors[field.name]}</Form.Control.Feedback> 
      isInvalid={errors[field.name] && touched[field.name]}
      */}
  </>
};

export  {CustomInput, CustomCheck};