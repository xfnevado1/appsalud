import React from "react";
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { connect } from "react-redux";

import {Nav, Container, Collapse, Navbar, Card, InputGroup, Button, Col, Form, } from "react-bootstrap";

import CustomInput from "components/Controls/CustomInput.js"
import runQuery from "variables/Generals"

const SignupSchema = Yup.object().shape({
    txtUserName: Yup.string().required('Debe Ingresar Un UserName'),
    txtPassword: Yup.string().required('Debe Ingresar un Password')
});

class Login extends React.Component {
constructor(props) {
    super(props);
    this.state = { show: true };
}

handleSubmit =(values, {setSubmitting})=>{
    runQuery("/login/signup",{"usuario":values.txtUserName, "password":values.txtPassword})
    .then((resp)=>{
        //console.log(resp.data.token)
        this.props.dispatch({
            type: 'UPDATE_TOKEN',
            payload: { token: resp.data.token }
        })
      
        this.props.history.push("/admin");
    })
    .catch((error)=>{
        alert("usuario invalido")
    })
    setSubmitting(true)
}


render(){
    return <div className="login-page sidebar-mini ">
        
    <Nav className="navbar navbar-expand-lg navbar-transparent  bg-primary  navbar-absolute">
        <Container>
            <div className="navbar-wrapper">
                <a className="navbar-brand" href="#pablo">Login Page</a>
            </div>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-bar navbar-kebab"></span>
                <span className="navbar-toggler-bar navbar-kebab"></span>
                <span className="navbar-toggler-bar navbar-kebab"></span>
            </button>

            <Collapse className="navbar-collapse justify-content-end" id="navigation">
                <Navbar>
                    <Nav.Item>
                        <Nav.Link href="register.html"><i className="now-ui-icons tech_mobile"></i>Register</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="active">
                        <Nav.Link href="login.html"><i className="now-ui-icons users_circle-08"></i>Login</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="pricing.html"><i className="now-ui-icons business_money-coins"></i>Pricing</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="lock.html"><i className="now-ui-icons ui-1_lock-circle-open"></i>Lock</Nav.Link>
                    </Nav.Item>
                </Navbar>
            </Collapse>
        </Container>
    </Nav>
    
    <div className="wrapper wrapper-full-page " style={{backgroundColor :"royalblue"}}>
        <div className="login-page container h-100" filter-color="black" >
            <div className="row h-100 justify-content-center align-items-center ">
                <Col md="3" >
                    <Formik initialValues ={{txtUserName:"", txtPassword:""}}
                        onSubmit={ this.handleSubmit } validationSchema={SignupSchema}
                    >
                    {({ handleSubmit, handleChange, values, touched, errors,}) => {
                    return (
                        <Form onSubmit={handleSubmit}>
                            <Card className="card-login">
                                <Card.Header>
                                    <Card.Title as="h4">LOGIN
                                            {/* <div className="logo-container">
                                            <img src="../../assets/img/now-logo.png" alt=""/>
                                        </div> */}                                    
                                    </Card.Title>
                                    
                                </Card.Header>
                                <Card.Body>
                                    <Form.Group>
                                    <InputGroup size="sm" className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>
                                                <i className="now-ui-icons users_circle-08"></i>
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Field type="text" name="txtUserName" value={values.name}
                                            onChange={handleChange} isInvalid={errors.txtUserName && touched.txtUserName}  
                                            placeholder="User Name..." component={CustomInput }
                                        />
                                    </InputGroup>
                                    </Form.Group>
                                    
                                    <InputGroup size="sm" className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>
                                                <i className="now-ui-icons text_caps-small"></i>
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Field type="text" name="txtPassword" value={values.txtPassword}
                                            onChange={handleChange} isInvalid={errors.txtPassword && touched.txtPassword} 
                                            placeholder="Password..." component={CustomInput}
                                        />
                                    </InputGroup>
                                </Card.Body>
                
                                <Card.Footer>
                                    <Button type="submit" size="sm" className="btn-primary btn-round btn-block mb-3">Ingresar</Button>
                                    {/* <div className="pull-left">
                                        <Card.Text>
                                            <a href="#pablo" className="link footer-link">Create Account</a>
                                        </Card.Text>
                                    </div>
                                    <div className="pull-right">
                                        <Card.Text><a href="#pablo" className="link footer-link">Need Help?</a></Card.Text>
                                    </div> */}
                                </Card.Footer>
                            </Card>
                        </Form>
                    )}}
                    </Formik>
                </Col>
            </div>
            <footer className="footer" >
                <Container>
                    <nav>
                        <ul>
                            <li> <a href="#Empresa">APPSALUD</a></li>
                            <li> <a href="#About">About Us</a></li>
                            <li> <a href="#Blog">Blog</a></li>
                        </ul>
                    </nav>
                </Container>
            </footer>
        </div>
    </div>
</div> 

}
}

const mapDispatchToProps = dispatch => {
    return {
      dispatch
    }
}
  
export default connect(null, mapDispatchToProps)(Login);