import React from "react";
import { Link } from "react-router-dom"
import { Form, Col, Button, Modal, Container } from "react-bootstrap"
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import {CustomInput} from "components/Controls/CustomInput"
import runQuery from "variables/Generals"

/* SELECT TOP (1000) [idusuario]
      ,[username] ,[password] ,[idzona] ,[nombres]
      ,[apellidos] ,[email] ,[telefono] ,[direccion]
      ,[cargo] ,[empresa] ,[tipoidentificacion] ,[identificacion]
      ,[profesion] ,[activo] ,[entidad_id]
  FROM [MedicalHealth].[dbo].[usuarios]
*/

class EditUsuario extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            recordUser: null, groupsUser: null,
            UserName:"", showModal: false,
        }
    }

    componentDidMount(){
        //console.log("ingreso por aqui",this.props.match)
        this.loadUser(this.props.match.params.idusuario)
        //console.log(this.props.match.params)
    }
    loadUser(idusuario){
        runQuery("/usuarios/recordUser",{"idusuario": idusuario})
        .then((resp)=>{
            //console.log("registros: ",resp.data.records[0])

            let recordUser = resp.data.records[0][0];
            let groupsUser = resp.data.records[1];
            recordUser.grupos =[];
            groupsUser.forEach((row)=>{
                if (row.idusuario !== null)
                    recordUser.grupos.push(row.idgrupo.toString())
            })
            
            this.setState({recordUser,  groupsUser, UserName: recordUser.username})
        })
        .catch((error)=>{
            console.log(error)
            alert("Error consultando Datos de Usuario")
        })

    }
    handleSubmit =(values, {setSubmitting})=>{
        values.newRecord = this.state.UserName === ""
        //console.log("valores: ",values)
        runQuery("/usuarios/updateUser",values)
        .then((resp)=>{
            alert("Registro Actualizado Correctamente..")
            this.props.history.push("/admin/Usuarios")
        })
        .catch((error)=>{
            alert("usuario invalido")
        })
        setSubmitting(true)
    
    }

    handleChangePass = ()=>{
        let password = document.getElementById("password").value;
        let password1 = document.getElementById("password1").value;
        console.log("password1: ", password, "paswword2: ",password1)
        
        if ( !password || !password1 || password ==="" || password1 ==="" ){
            alert("El password no puede estar en blanco")
            return
        }
        if ( password !== password1 ){
            alert("Los passwords deben ser iguales")
            return
        }
        runQuery("/usuarios/updatePassword",{idusuario: this.state.idusuario, password: password})
        .then((resp)=>{
            alert("Password Actualizado Correctamente..")
            //this.props.history.push("/admin/Usuarios")
        })
        .catch((error)=>{
            alert("usuario invalido")
        })        
        this.setState({showModal: false})
    }

    handleShowDialog = (isHide)=>{
        this.setState({showModal: isHide})
    }
    
    render(){
        let {UserName, recordUser, groupsUser} = this.state;
        const SignupSchema = Yup.object().shape({
            nombres: Yup.string().required('Debe Ingresar un Password'),
            apellidos: Yup.string().required('Debe Ingresar Apellidos'),
            identificacion: Yup.string().required('Debe Ingresar una Identificacion'),
            email: Yup.string().required('Debe Ingresar un correo valido'),
            grupos: Yup.array().min(1,"Debe seleccionar al menos un Grupo"),
            username: Yup.string().required('Debe Ingresar Un UserName')
                .test('Unique UserName','UserName already in use', 
                    function(value){
                        if ( value && document.activeElement ==="username" && value !== UserName) {
                            return new Promise((resolve, reject) => {
                                runQuery("/usuarios/existUserName",{"username": value})
                                    .then(res => resolve(res.data.idusuario === ''))
                                    .catch(() => resolve(false))
                            })
                        } else return true;
                    }
                )
        
        });
    
        if (recordUser === null){
            return <div>Loading</div>
        }
        else
        return <>
            <Formik initialValues ={recordUser} onSubmit={ this.handleSubmit } validationSchema={SignupSchema} >
            {({ handleSubmit, handleChange, values, touched, errors,}) => {
            return (
            <Form onSubmit={handleSubmit}> 
                <h4 style={{textAlign:"center", paddingBottom :"1rem"}}>
                    {(UserName ==="")?"Creacion de Nuevo Usuario":"Actualizacion Usuario"}
                </h4>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label size="sm" >UserName</Form.Label>
                        <Field type="text" name="username" size="sm" onChange={handleChange} component={CustomInput }/>
                    </Form.Group>
                    <Form.Group as={Col} >
                        <Form.Label size="sm" >Nombres</Form.Label>
                        <Field type="text" name="nombres" size="sm" onChange={handleChange} component={CustomInput }/>
                    </Form.Group >
                    <Form.Group as={Col} >
                        <Form.Label size="sm" >Apellidos</Form.Label>
                        <Field type="text" name="apellidos" size="sm" onChange={handleChange} component={CustomInput }/>
                    </Form.Group >
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label size="sm" >Tipo Doc</Form.Label>
                        <Form.Control as="select" name="tipoidentificacion" size="sm" onChange={handleChange} >
                            <option value="C">Cedula Ciudadania</option>
                            <option value="T">Tarjeta Identidad</option>
                            <option value="E">Cedula Extranjeria</option>
                            <option value="N">Certificado Nacimiento</option>
                        </Form.Control>
                    </Form.Group >
                    <Form.Group as={Col} >
                        <Form.Label size="sm" >Tipo Doc</Form.Label>
                        <Field type="text" name="identificacion" size="sm" onChange={handleChange} component={CustomInput }/>
                    </Form.Group >

                    <Form.Group as={Col}>
                        <Form.Label size="sm" >Email</Form.Label>
                        <Field type="email" name="email" size="sm" onChange={handleChange} component={CustomInput }/>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label size="sm" >Telefono</Form.Label>
                        <Field type="text" name="telefono" size="sm" onChange={handleChange} component={CustomInput }/>                        
                    </Form.Group >
                    <Form.Group as={Col} >
                        <Form.Label size="sm" >Direccion</Form.Label>
                        <Field type="text" name="direccion" size="sm" onChange={handleChange} component={CustomInput }/>
                    </Form.Group >
                    <Form.Group as={Col}>
                        <Form.Label size="sm" >Cargo</Form.Label>
                        <Field type="text" name="cargo" size="sm" onChange={handleChange} component={CustomInput }/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label size="sm" >Empresa</Form.Label>
                        <Field type="text" name="empresa" size="sm" onChange={handleChange} component={CustomInput }/>                        
                    </Form.Group >
                    <Form.Group as={Col} >
                        <Form.Label size="sm" >Profesion</Form.Label>
                        <Field type="text" name="profesion" size="sm" onChange={handleChange} component={CustomInput }/>
                    </Form.Group >
                    <Form.Group as={Col} >
                        <Form.Label size="sm" >Activo</Form.Label>
                        <Form.Control as="select" name="activo" size="sm" onChange={handleChange} >
                            <option value="1">Activo</option>
                            <option value="0">Inactivo</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label size="sm" >Tipo Usuario</Form.Label>
                        <Form.Control as="select" name="idzona" size="sm" onChange={handleChange} >
                            <option value="1">Normal</option>
                            <option value="2">Administrador</option>
                        </Form.Control>
                    </Form.Group >
                </Form.Row>
                
                <fieldset className="scheduler-border">
                    <legend className="scheduler-border">Asignar Grupos a Usuario</legend>
                    
                    <Container className="flex-container" >
                    <div style={{display:"flex", flexWrap: 'wrap' }}>
                        {groupsUser && groupsUser.map((obj,index) => {
                            return <Form.Check custom  name="grupos" label={obj.nombre} type="checkbox" 
                                id={`check-${index}`} onChange={handleChange} key={index} style={{width:"200px"}}
                                checked ={values.grupos.includes(obj.idgrupo.toString())} value={obj.idgrupo} 
                                isInvalid={errors.grupos } /> 
                        }
                        )}
                    </div>
                    </Container>
                    <Form.Control.Feedback className="d-block" type="invalid">{errors.grupos}</Form.Control.Feedback> 
                </fieldset>
                
                <div className="footerStyle">
                    <Link to="/admin/Usuarios" className="btn btn-primary btn-sm">Regresar</Link>&nbsp;
                    <Button size="sm" type="submit">Guardar</Button>&nbsp;
                    {UserName && <Button size="sm" onClick={()=>this.handleShowDialog(true)}>Cambiar Password</Button>}
                </div>
            </Form>
            )
        }}
        </Formik>

        <Modal show={this.state.showModal} onHide={()=>this.handleShowDialog(false)} aria-labelledby="contained-modal-title-vcenter"
                centered>
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Cambio de Password Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form >
                <Form.Group>
                    <Form.Label size="sm" >Ingrese Password</Form.Label>
                    <Form.Control size="sm" type="text" id="password" required></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label size="sm" >Confirme Password</Form.Label>
                    <Form.Control size="sm" type="text" id="password1" required></Form.Control>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={()=>this.handleChangePass()}>Aceptar</Button>
            <Button onClick={()=>this.handleShowDialog(false)}>Cancelar</Button>
        </Modal.Footer>
        </Modal>

        </>
    }
}

export default EditUsuario