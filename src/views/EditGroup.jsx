import React from "react"
import { Button, Container, Form, Row, Col, Tabs, Tab } from "react-bootstrap"
import { Link } from "react-router-dom"

import Autosuggest from 'react-autosuggest';
import GridTable from "components/Controls/GridTable"

import runQuery from "variables/Generals"

    // Use your imagination to render suggestions. {suggestion.idusuario}|
const renderSuggestion = suggestion => (
        <div>
            {suggestion.nombre} [ {suggestion.username} ]
        </div>
    );          

    // When suggestion is clicked, Autosuggest needs to populate the input
    // based on the clicked suggestion. Teach Autosuggest how to calculate the
    // input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.idusuario.toString();
 
class EditGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            TableGroupsUsers: null,  pagesCount: 10, TableGroupsCateg: null,
            value:'' , suggestions: [], TableCategories: null, category: 0
        };
    }

    columnsUsers = [
        {accessor: 'idusuario', Header: 'Id'}, 
        {accessor: 'nombre', Header: 'Nombre'}, 
        {accessor: 'acciones', Header: 'Acciones', 
            Cell: (cell) => (
              <div>
                <span onClick={()=>this.handleOnDelete(cell.row.values.idusuario)} style={{cursor:"pointer"}} title="Eiminar Registro"><i className="now-ui-icons simple-remove" /></span>
              </div>
            )
        }
    ];

    columnsCategories = [
        {accessor: 'idcategoria', Header: 'Id'}, 
        {accessor: 'nombre', Header: 'Nombre'}, 
        {accessor: 'acciones', Header: 'Acciones', 
            Cell: (cell) => (
              <div>
                <span onClick={()=>this.handleOnDeleteCategory(cell.row.values.idcategoria)} style={{cursor:"pointer"}} title="Eiminar Registro"><i className="now-ui-icons simple-remove" /></span>
              </div>
            )
        }
    ];

    componentDidMount(){
        this.loadGroupUsers();
        this.loadGroupCategories();
        this.loadCategories();
    }

    loadGroupUsers = (page = 1, pageSize = 10)=>{
        let startRow = (page===1)? 0 : (page -1) * pageSize;
        runQuery("/grupos/listGroupUsers",{"startRow":startRow, "pageSize": pageSize, "idgrupo":this.props.match.params.idgrupo})
        .then((resp)=>{
            let totalSize = (resp.data.records[1].length < pageSize)? page * pageSize : (page * pageSize)+100;
            this.setState({TableGroupsUsers: resp.data.records[1], page, pageSize, totalSize})
        })
        .catch((error)=>{
            console.log(error)
            alert("Error cargando Grupos")
        })
    }
    
    loadGroupCategories = (page = 1, pageSize = 10) => {
        let startRow = (page===1)? 0 : (page -1) * pageSize;
        runQuery("/grupos/listGroupCategories",{"startRow":startRow, "pageSize": pageSize, "idgrupo":this.props.match.params.idgrupo})
        .then((resp)=>{
            //console.log(resp)
            let totalSize = (resp.data.records.length < pageSize)? page * pageSize : (page * pageSize)+100;
            this.setState({TableGroupsCateg: resp.data.records, page, pageSize, totalSize})
        })
        .catch((error)=>{
            console.log(error)
            alert("Error cargando Grupos")
        })
    }

    loadCategories = () => {
        runQuery("/grupos/listCategories")
        .then((resp)=>{
            this.setState({TableCategories: resp.data.records})
        })
        .catch((error)=>{
            console.log(error)
            alert("Error cargando Grupos")
        })
    }

    handleOnClickNew=(e)=>{
        e.preventDefault();
        let idusuario = this.state.value
        if (idusuario !== ""){
            runQuery("/grupos/insertUserGroup",{"idusuario": idusuario, "idgrupo": this.props.match.params.idgrupo})
            .then((resp)=>{
                alert("Usuario Insertado exitosamente..")
                this.loadGroupUsers();
            })
            .catch((error)=>{
                alert("Error Insertando Usuario")
            })
    
        }
    }

    handleOnInsertCategory=(e)=>{
        e.preventDefault();
        let category = this.state.category
        if (category !== ""){
            runQuery("/grupos/insertUserCategory",{"idcategoria": category, "idgrupo": this.props.match.params.idgrupo})
            .then((resp)=>{
                alert("Categoria Insertada exitosamente..")
                this.loadGroupCategories();
            })
            .catch((error)=>{
                alert("Error Insertando Categoria")
            })
    
        }
    }

    handleOnDelete=(idusuario)=>{
        runQuery("/grupos/deleteUserGroup",{"idusuario": idusuario, "idgrupo":this.props.match.params.idgrupo})
        .then((resp)=>{
            alert("Usuario eliminado exitosamente del grupo..")
            this.loadGroupUsers();
        })
        .catch((error)=>{
            alert("Error Eliminando Usuario")
        })
    }

    handleOnDeleteCategory=(idcategoria)=>{
        runQuery("/grupos/deleteUserCategory",{"idcategoria": idcategoria, "idgrupo":this.props.match.params.idgrupo})
        .then((resp)=>{
            alert("Categoria eliminada exitosamente del grupo..")
            this.loadGroupCategories();
        })
        .catch((error)=>{
            alert("Error Eliminando Categoria")
        })
    }

    onChange = (event, { newValue }) => {
        this.setState({ value: newValue });
    };
    
    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    // .trim().toLowerCase()
    onSuggestionsFetchRequested = ({ value }) => {
        runQuery("/usuarios/getUsersbyName",{"userFind":value})
        .then((resp)=>{
            if (resp.data.records !== ""){
                this.setState({ suggestions: resp.data.records });    
            }
        })
        .catch((error)=>{
            alert("Error Realizando Consulta")
        })
        
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({ suggestions: [] });
    };

    handleChange(e) {
        const target = e.target;
        const name = target.name;
        const value = target.value;
    
        this.setState({
          [name]: value
        });
    };

    render(){
        const { TableGroupsUsers, TableGroupsCateg, TableCategories, pagesCount, value, suggestions } = this.state;
        const inputProps = { placeholder: 'Usuario a Insertar', value, onChange: this.onChange };
        //console.log("el valor es:",value)
        return <>
            <Container className="d-flex justify-content-center">
                <Row><h5>Grupo {this.props.match.params.nombre}</h5></Row>
            </Container>
            <br/>
            
            <Tabs defaultActiveKey="users" id="tab1">
                <Tab eventKey="users" title="Usuarios">
                    <br/> <br/>
                    <fieldset className="scheduler-border">
                        <legend className="scheduler-border">Agregar Usuario a Grupo</legend>
                        <Form inline>
                            <Form.Row>
                            <Form.Group >
                                <Form.Label size="sm" >Usuario:</Form.Label>
                                <Col>
                                    <Autosuggest 
                                        suggestions={suggestions}
                                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                        getSuggestionValue={getSuggestionValue}
                                        renderSuggestion={renderSuggestion}
                                        inputProps={inputProps}
                                    />                        
                                </Col>
                            </Form.Group >
                            <Col>
                                <Button size="sm" onClick={this.handleOnClickNew}>Insertar</Button>
                            </Col>
                            </Form.Row>
                        </Form>
                    </fieldset>

                    {TableGroupsUsers && <GridTable columns={this.columnsUsers} data={TableGroupsUsers} 
                        pageCount={pagesCount} fetchData={this.loadGroupUsers}
                    /> }
                    <br/>
                
            </Tab>
            <Tab eventKey="category" title="Categorias">
                <br/> <br/>
                <fieldset className="scheduler-border">
                    <legend className="scheduler-border">Agregar Categoria a Grupo</legend>
                    <Form inline>
                        <Form.Row>
                        <Form.Group >
                            <Form.Label size="sm" >Categoria:</Form.Label>
                            <Col>
                            <Form.Control as="select" name="category" size="sm" value={this.state.category} onChange={e => this.handleChange(e)} >
                                {TableCategories && TableCategories.map((row, key)=> 
                                    <option value={row.idcategoria} key={key}>{row.nombre}</option>
                                )}
                            </Form.Control>                            
                        </Col>
                        </Form.Group >
                        <Col>
                            <Button size="sm" onClick={this.handleOnInsertCategory}>Insertar</Button>
                        </Col>
                        </Form.Row>
                    </Form>
                </fieldset>

                {TableGroupsCateg && <GridTable columns={this.columnsCategories} data={TableGroupsCateg} 
                    pageCount={pagesCount} fetchData={this.loadGroupCategories}
                /> }
                <br/>
            </Tab>
            </Tabs>
            
            <br/>
            <div className="footerStyle">
                <Link to="/admin/Grupos" className="btn btn-primary btn-sm">Regresar</Link>&nbsp;
            </div>

        </>
    }

}
export default EditGroup