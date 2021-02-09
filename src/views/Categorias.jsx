import React from "react"
import { Button, Container, Form, Row, Col, Modal } from "react-bootstrap"
//import { Link } from "react-router-dom"

import runQuery from "variables/Generals"
import GridTreeViewTable from "components/Controls/GridTreeViewTable"

class Categorias extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            TableCategories: null, TableFathers: null,  pagesCount: 10, pageSize: 10,
            showModal: false, categoryId:"", categoryName: "", categoryFather:"", categoryType:0,
            categoryComponent:"", categoryIcon:"", categoryPath:""
        };
    }
    
    componentDidMount(){
        this.loadCategories()
        this.loadFathers()
    }

    loadFathers = (idcategoria=0)=>{
        runQuery("/categorias/listFathers",{"idcategoria": idcategoria })
        .then((resp)=>{
            this.setState({TableFathers: resp.data.records[0]})
        })
        .catch((error)=>{
            console.log("el error es: ", error)
            alert("Error Consultando Categorias")
        })

    }

    loadCategories = ()=>{
        runQuery("/categorias/listCategories",{"CategoryId": 1 })
        .then((resp)=>{
            //console.log("los datos son: ",resp.data.subRows)
            this.setState({TableCategories: resp.data.subRows})
        })
        .catch((error)=>{
            console.log("el error es: ", error)
            alert("Error Consultando Categorias")
        })
    }
    
    handleOnClickNew=(e)=>{
        e.preventDefault();
        this.setState({showModal: true, categoryName:"", categoryId:"XXXXX", categoryComponent:"", 
            categoryIcon:"", categoryPath:"" })
    }

    handleOnDelete=(idcategoria)=>{
        if (window.confirm("Desea Eliminar la Categoria Seleccionada?")) {
            runQuery("/categorias/deleteCategory",{"idcategoria":idcategoria})
            .then((resp)=>{
                alert("Categoria eliminado exitosamente..")
                this.loadCategories();
            })
            .catch((error)=>{
                alert("Error Eliminando Categoria")
            })
        }
    }

    handleFormSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            //console.log("ingreso aqui")
            alert("formulario incompleto")
        }
        //console.log("tipo",this.state.categoryType)
        runQuery("/categorias/modifyCategory",{"idcategoria":this.state.categoryId, "nombre":this.state.categoryName,
                    "tipo":this.state.categoryType, "padre":this.state.categoryFather,"path": this.state.categoryPath,
                    "componente":this.state.categoryComponent, "icon":this.state.categoryIcon})
        .then(()=>{
            alert("Categoria Actualizada Exitosamente..")
            this.loadCategories();
        })
        .catch((error)=>{
            alert("Error Actualizando Categoria")
        })

        this.setState({showModal:false})
        event.preventDefault();
        event.stopPropagation();
    };
    
    handleShowDialog = (Row, showModal, EsMenu)=>{
        this.loadFathers(Row.idcategoria);
        if (EsMenu > 0 ){
            Row.componente = "";
            Row.path = "";
            Row.tipo = 1;
        }
        else
            Row.tipo = 0;

        this.setState({categoryId: Row.idcategoria, categoryName: Row.nombre, 
            categoryType: Row.tipo, 
            categoryFather: Row.idpadre, categoryComponent: Row.componente, categoryIcon: Row.icon, 
            categoryPath: Row.path, showModal})
    }

    handleChange(e) {
        const target = e.target;
        const name = target.name;
        const value = target.value;
    
        this.setState({
          [name]: value
        });
    }
    columns = [
        {
            // Build our expander column
            id: 'expander', // Make sure it has an ID
            Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
              <span {...getToggleAllRowsExpandedProps()}>
                {isAllRowsExpanded ? '👇' : '👉'}
              </span>
            ),
            Cell: ({ row }) =>
              // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
              // to build the toggle for expanding a row
              row.canExpand ? (
                <span
                  {...row.getToggleRowExpandedProps({
                    style: {
                      // We can even use the row.depth property
                      // and paddingLeft to indicate the depth
                      // of the row
                      paddingLeft: `${row.depth * 2}rem`,
                    },
                  })}
                >
                  {row.isExpanded ? '👇' : '👉'}
                </span>
              ) : null,
          },
        { Header: 'Id', accessor: 'idcategoria'},
        { Header: 'Nombre', accessor: 'nombre'},
        { Header: 'Padre', accessor: 'idpadre'},
        { Header: 'Tipo', accessor: 'tipo'},
        { Header: 'Componente', accessor: 'componente'},
        { Header: 'Icono', accessor: 'icon'},
        { Header: "Img", accessor: "img",Cell: ({ cell }) => ( <div><i className={"now-ui-icons " + cell.row.values.icon} /> </div>)},
        { Header: 'Path', accessor: 'path'},
        { Header: "Acciones", accessor: "name",
            Cell: ({ cell }) => (
                <div>
                    <span onClick={()=>this.handleShowDialog(cell.row.values, true, cell.row.subRows.length)} style={{cursor:"pointer"}} title="Modificar Categoria"><i className="now-ui-icons zoom_bold" /></span>&nbsp;&nbsp;
                    { cell.row.subRows.length === 0 && <div>
                    <span onClick={()=>this.handleOnDelete(cell.row.values.idcategoria)} style={{cursor:"pointer"}} title="Eiminar Registro"><i className="now-ui-icons simple-remove" /></span>
                    </div> }
                </div>
            )
          }
    ]

    render(){
        const { TableCategories, TableFathers, pagesCount, } = this.state;
        return <>
            <Container className="d-flex justify-content-end">
                <Row>
                    <p><Button size="sm" onClick={this.handleOnClickNew}>Nueva Categoria</Button></p>&nbsp;&nbsp; 
                </Row>
            </Container>

            {TableCategories && <GridTreeViewTable columns={this.columns} data={TableCategories} 
                pageCount={pagesCount} fetchData={this.loadCategories} hiddenColumns={["padre","tipo",]}/> }

            <Modal show={this.state.showModal} onHide={()=>this.setState({showModal:false})} centered >
            <Form  onSubmit={(e)=>this.handleFormSubmit(e)}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Editar Categoria</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Col >
                    <Form.Group>
                        <Form.Label size="sm" >ID Categoria:</Form.Label>
                        <Form.Control  size="sm" type="text" id="categoryId" name="categoryId" 
                            value={this.state.categoryId} required disabled onChange={e => this.handleChange(e)} >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label size="sm" >Nombre Categoria:</Form.Label>
                        <Form.Control  size="sm" type="text" id="categoryName" name="categoryName" value={this.state.categoryName} required onChange={e => this.handleChange(e)} ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label size="sm" >Tipo Categoria:</Form.Label>
                        <Form.Control as="select" name="categoryType" size="sm" value={this.state.categoryType} onChange={e => this.handleChange(e)} disabled >
                            <option value="0" >Normal</option>
                            <option value="1">Menu Usuario</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label size="sm" >Padre Categoria:</Form.Label>
                        <Form.Control as="select" name="categoryFather" size="sm" value={this.state.categoryFather} onChange={e => this.handleChange(e)} >
                            {TableFathers && TableFathers.map((row, key)=> 
                                <option value={row.idcategoria} key={key}>{row.nombre}</option>
                            )}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label size="sm" >Componente:</Form.Label>
                        <Form.Control  size="sm" type="text" id="categoryComponent" name="categoryComponent" value={this.state.categoryComponent} 
                            onChange={e => this.handleChange(e)} disabled={this.state.categoryType === 1 && "disabled" } >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label size="sm" >Icon:</Form.Label>
                        <Form.Control  size="sm" type="text" id="categoryIcon" name="categoryIcon" value={this.state.categoryIcon} required onChange={e => this.handleChange(e)} ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label size="sm" >Path:</Form.Label>
                        <Form.Control  size="sm" type="text" id="categoryPath" name="categoryPath" value={this.state.categoryPath} 
                            onChange={e => this.handleChange(e)} disabled={this.state.categoryType === 1 && "disabled" }>
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Modal.Body>
            <Modal.Footer>
                <Button type="submit" >Aceptar</Button>
                <Button onClick={()=>this.setState({showModal:false})}>Cancelar</Button>
            </Modal.Footer>
            </Form>
            </Modal>
        </>
    }

}
export default Categorias;