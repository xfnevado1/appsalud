import React from "react"
import { connect } from "react-redux";
import { Redirect } from "react-router-dom"

import AdminLayout from "App.js";
import runQuery from "variables/Generals"

class ProtectedRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLogged: "" };
    }
    componentDidMount(){
        this.verifyToken()
    }

    verifyToken(){
        if (this.props.info.token ===""){
            this.setState({isLogged:"notLogged"})
        }
        else{
            runQuery("/login/verifyToken",{"token":this.props.info.token})
            .then((resp)=> {
                console.log("ingrso aquiar ")
                if (resp.data.token !== ""){
                    this.setState({isLogged:"isLogged"})
                }
                else{
                    this.setState({isLogged:"notLogged"})    
                }
            })
            .catch(()=>{
                this.setState({isLogged:"notLogged"})
            })
        }
    }
    
    render(){
        let stateLogged = this.state.isLogged
        switch (stateLogged) {
            case "isLogged":
                return <AdminLayout {...this.props} />
            case "notLogged":
                return <Redirect to="/login" />
            default:
                return <div>Inicializando</div>
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
  
export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute)