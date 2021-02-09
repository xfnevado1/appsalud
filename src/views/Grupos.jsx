import React from "react"
import { Button, Container, Form, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

import runQuery from "variables/Generals"
import GridTable from "components/Controls/GridTable"

class Grupos extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            TableGroups: null,  pagesCount: 10,
            nombre:"" 
        };
    }
    
    componentDidMount(){
        this.loadGroups()
    }

    loadGroups = (page = 1, sizePerPage = 10)=>{
        let nombre = document.getElementById("nombre").value

        let startRow = (page===1)? 0 : (page -1) * sizePerPage;
        if (nombre !== this.state.nombre){
            page = 1
        }
        runQuery("/grupos/listGroups",{"startRow":startRow, "sizePerPage": sizePerPage,"nombre":nombre})
        .then((resp)=>{
            let totalSize = (resp.data.records.length < sizePerPage)? page * sizePerPage : (page * sizePerPage)+100;
            this.setState({TableGroups: resp.data.records, page, sizePerPage, totalSize, nombre})
        })
        .catch((error)=>{
            alert("usuario invalido")
        })
    }
    
    handleTableChange = (type, { page, sizePerPage }) => {
        //const currentIndex = (page - 1) * sizePerPage;
        this.loadGroups(page , sizePerPage)
    }

    handleOnClickFilter=(e)=>{
        e.preventDefault();
        this.loadGroups();
    }

    handleOnClickNew=(e)=>{
        e.preventDefault();
        let nombre = prompt("Ingrese Nombre del nuevo grupo")
        if (nombre !== ""){
            runQuery("/grupos/insertGroup",{"nombre":nombre})
            .then((resp)=>{
                alert("Grupo Insertado exitosamente..")
                this.loadGroups();
            })
            .catch((error)=>{
                alert("Error Eliminando Usuario")
            })
    
        }
        this.loadGroups();
    }

    handleOnDelete=(idgrupo)=>{
        runQuery("/grupos/deleteGroup",{"idgrupo":idgrupo})
        .then((resp)=>{
            alert("Grupo eliminado exitosamente..")
            this.loadGroups();
        })
        .catch((error)=>{
            alert("Error Eliminando Usuario")
        })
    }

    handleOnModify=(idgrupo, nombre)=>{
        nombre = prompt("Ingrese Nombre del nuevo grupo", nombre).trim()
        if (nombre !== ""){
            runQuery("/grupos/modifyGroup",{"idgrupo":idgrupo, "nombre":nombre})
            .then(()=>{
                alert("Grupo Actualizado Exitosamente..")
                this.loadGroups();
            })
            .catch((error)=>{
                alert("Error Actualizando Grupo")
            })
        }
    }

    columns = [
        { Header: 'Id', accessor: 'idgrupo', },
        { Header: 'Nombre', accessor: 'nombre', },
        { Header: "Acciones",
            accessor: "name",
            Cell: ({ cell }) => (
                <div>
                    <Link to={"/admin/updateGroup/"+cell.row.values.idgrupo+"/"+cell.row.values.nombre} ><i className="now-ui-icons zoom_bold" /></Link>&nbsp;&nbsp;
                    <span onClick={()=>this.handleOnModify(cell.row.values.idgrupo, cell.row.values.nombre)} style={{cursor:"pointer"}} title="Modificar Registro"><i className="now-ui-icons ruler-pencil" /></span>&nbsp;&nbsp;
                    <span onClick={()=>this.handleOnDelete(cell.row.values.idgrupo)} style={{cursor:"pointer"}} title="Eiminar Registro"><i className="now-ui-icons simple-remove" /></span>
                </div>
            )
          }
    ]

    render(){
        
        const { TableGroups, pagesCount } = this.state;
        return <>
            <fieldset className="scheduler-border">
                <legend className="scheduler-border">Filtros</legend>
                <Form inline>
                    <Form.Row>
                    <Form.Group >
                        <Form.Label size="sm" >Nombre</Form.Label>
                        <Col>
                            <Form.Control id="nombre" size="sm" placeholder="Nombre Grupo" />
                        </Col>
                    </Form.Group >
                    <Col>
                        <Button size="sm" onClick={()=>this.loadGroups()}>Filtrar Grupo</Button>
                    </Col>
                    </Form.Row>
                </Form>
              </fieldset>
            <Container className="d-flex justify-content-end">
            <Row>
                <p><Button size="sm" onClick={this.handleOnClickNew}>Nuevo Grupo</Button></p>&nbsp;&nbsp; 
            </Row>
            </Container>

            {TableGroups && <GridTable columns={this.columns} data={TableGroups} 
                pageCount={pagesCount} fetchData={this.loadGroups}/> }

        </>
    }

}
export default Grupos