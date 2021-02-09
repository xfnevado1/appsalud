import React from "react"
import { Suspense } from "react";
import { Card } from "react-bootstrap"
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import runQuery from "variables/Generals"

const MyComponent = (props)=>{
    //console.log("el componente es: ", props)
    let comp = props.Component 
    const LazyComponent = React.lazy(()=>import(`views/${comp}`))
    return <>
        <Suspense fallback={<div>Cargando..</div>}>
            <LazyComponent {...props}/>
        </Suspense>
    </>
}

class ContentData extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLogged: "isLogged" };
    }

    componentDidMount(){
        //this.verifyToken()
    }

    verifyToken(){
        if (this.props.info.token ===""){
            this.setState({isLogged:"notLogged"})
        }
        else{
            runQuery("/login/verifyToken",{"token":this.props.info.token})
            .then((resp)=> {
                if (resp.data.token === "ValidToken"){
                    this.setState({isLogged:"isLogged"})
                }
                else{
                    this.setState({isLogged:"notLogged"})    
                    console.log("token not logged")
                }
            })
            .catch((error)=>{
                this.setState({isLogged:"notLogged"})
                console.log("token error logged",error)
            })
        }
    }

    render(){
        let stateLogged = this.state.isLogged
        switch (stateLogged) {
          case "":
            return <div>Inicializando</div>
          case "notLogged":
              return <Redirect to="/login" />
          default:
            return <>
                <Card className="card-header-content">
                    <Card.Header>
                    <Card.Title as="h5">{this.props.title}</Card.Title>
                    </Card.Header>
                </Card>
                <Card>
                    <Card.Body>
                        <MyComponent {...this.props} />
                    </Card.Body>
                </Card>
            </>
        }
    }
}

const mapStateToProps =(state)=>{
    return {info: state.infoUser}
}

const mapDispatchToProps = dispatch => {
    return {
      dispatch
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ContentData)