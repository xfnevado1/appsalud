import React from "react"
import { Button, Container, Form, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

//import BootstrapTable from 'react-bootstrap-table-next';
//import paginationFactory from 'react-bootstrap-table2-paginator';
import GridTable from "components/Controls/GridTable"
import runQuery from "variables/Generals"

// idusuario, username, nombres+' '+apellidos as nombre, email, activo
  
class Usuarios extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            TableUsers: null, pagesCount: 10,
            UserName:"", Nombre:"", Apellidos:""
        };
    }
    columns = [
        {accessor: 'idusuario', Header: 'Id'}, 
        {accessor: 'username', Header: 'UserName'}, 
        {accessor: 'nombre', Header: 'Nombre'}, 
        {accessor: 'email', Header: 'Email'},
        {accessor: 'activo', Header: 'Activo'},
        {accessor: 'acciones', Header: 'Acciones', 
            Cell: (cell) => (
              <div>
                <Link to={"/admin/updateUser/"+cell.row.values.idusuario} ><i className="now-ui-icons zoom_bold" /></Link>&nbsp;
                <span onClick={()=>this.handleOnDelete(cell.row.values.idusuario)} style={{cursor:"pointer"}} title="Eiminar Fila"><i className="now-ui-icons simple-remove" /></span>
              </div>
            )
        }
    ];
    
    componentDidMount(){
        this.loadUsers()
    }

    loadUsers = (page = 1, pageSize = 10)=>{
        let UserName = document.getElementById("UserName").value
        let Nombre = document.getElementById("Nombre").value
        let Apellidos = document.getElementById("Apellidos").value
        let startRow = (page===1)? 0 : (page -1) * pageSize;
        if (UserName + Nombre + Apellidos !== this.state.UserName+this.state.Nombre+this.state.Apellidos){
            page = 1
        }

        runQuery("/usuarios/listUsers",{"startRow":startRow, "pageSize": pageSize,
            "UserName":UserName, "Nombre":Nombre, "Apellidos":Apellidos})
        .then((resp)=>{
            let pagesCount = resp.data.records[0][0].pagesCount;
            this.setState({TableUsers: resp.data.records[1], page, pagesCount, UserName, Apellidos, Nombre})
            //console.log(resp.data.token)
        })
        .catch((error)=>{
            alert("Error Consultando Tabla usuario")
        })
    }
    
    handleTableChange = (type, { page, pageSize }) => {
        //const currentIndex = (page - 1) * pageSize;
        this.loadUsers(page , pageSize)
    }

    handleOnClickFilter=(e)=>{
        e.preventDefault();
        this.loadUsers();
    }
    
    handleOnClickNew=(e)=>{
        e.preventDefault();
        this.loadUsers();
    }

    handleOnDelete=(idusuario)=>{
        runQuery("/usuarios/deleteUser",{"idusuario":idusuario})
        .then((resp)=>{
            alert("Usuario eliminado exitosamente..")
            this.loadUsers();
        })
        .catch((error)=>{
            alert("Error Eliminando Usuario")
        })
    }
    
    render(){
        
        const { TableUsers, pagesCount } = this.state;
        return <>
            <fieldset className="scheduler-border">
                <legend className="scheduler-border">Filtros</legend>
                <Form >
                    <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label size="sm" >UserName</Form.Label>
                        <Form.Control id="UserName" size="sm" className="mb-2" placeholder="Username" />
                    </Form.Group>
                    <Form.Group as={Col} >
                        <Form.Label size="sm" >Nombre</Form.Label>
                        <Form.Control id="Nombre" size="sm" placeholder="Nombre Usuario" />
                    </Form.Group >
                    <Form.Group as={Col}>
                        <Form.Label size="sm" >Apellidos</Form.Label>
                        <Form.Control id="Apellidos" size="sm" placeholder="Apellidos" />
                    </Form.Group >
                    </Form.Row>
                </Form>
              </fieldset>
            <Container className="d-flex justify-content-end">
            <Row>
                <p><Link to="/admin/updateUser" className="btn btn-primary btn-sm">Crear Usuario</Link></p>&nbsp;&nbsp; 
                <p><Button id="btnFilter" size="sm" onClick={this.handleOnClickFilter}>Filtrar Usuario</Button></p>
            </Row>
            </Container>
            
            {TableUsers && <GridTable columns={this.columns} data={TableUsers} 
                pageCount={pagesCount} fetchData={this.loadUsers}
            /> }

        </>
    }

}
export default Usuarios