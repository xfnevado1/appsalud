import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// reactstrap components
//import { Card } from 'react-bootstrap';
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// core components
import TopNavbar from "components/core/TopNavbar.js";
//import Footer from "components/core/Footer.js";
import Sidebar from "components/core/SideNavbar.js";
//import FixedPlugin from "components/FixedPlugin/FixedPlugin.js"; /*{console.log(Component)}*/
import PanelHeader from "components/core/PanelHeader.js";
import runQuery from "variables/Generals"
import { childRoutes} from "routes.js";
import ContentData from "components/core/ContentData"

var ps;

class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLogged: "isLogged", backgroundColor: "blue", };
  }

  mainPanel = React.createRef();

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1 ) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    //this.verifyToken()
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1 ) {
      if (ps){ ps.destroy(); }
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.mainPanel.current.scrollTop = 0;
    }
  }
  handleColorClick = (color) => {
    this.setState({ backgroundColor: color });
  };

  verifyToken(){
    if (this.props.info.token ===""){
        this.setState({isLogged:"notLogged"})
        console.log("token not logged APP Blank logged", this.props.info)
    }
    else{
        runQuery("/login/verifyToken",{"token":this.props.info.token})
        .then((resp)=> {
            //console.log("ingrso aquiar ")
            if (resp.data.token === "ValidToken"){
                this.setState({isLogged:"isLogged"})
            }
            else{
                this.setState({isLogged:"notLogged"})
                console.log("token not logged APP logged")
            }

            if (navigator.platform.indexOf("Win") > -1 ) {
              ps = new PerfectScrollbar(this.mainPanel.current);
              document.body.classList.toggle("perfect-scrollbar-on");
            }
        })
        .catch(()=>{
            this.setState({isLogged:"notLogged"})
            console.log("token not logged APP error logged")
        })
    }
  }

render() {
  //let stateLogged = this.state.isLogged
  
  let {isLogged, } = this.state
  let menuAdmin = this.props.info.menuAdmin;
  let userRoutes = this.props.info.menuUser;
  switch (isLogged) {
    case "":
      return <div>Inicializando</div>
    case "notLogged":
        return <Redirect to="/login" />
    default:
      return (
        <div className="wrapper">
          <Sidebar {...this.props} routes={userRoutes} backgroundColor={this.state.backgroundColor} />
          <div className="main-panel" ref={this.mainPanel}>
            <TopNavbar {...this.props} adminRoutes={menuAdmin} />
            <PanelHeader size="sm" />
            <div className="content">
                <Switch>
                  {userRoutes.map((data, key) => {
                    if (data.subRows){ 
                      return data.subRows.map((item, id)=><Route path={"/admin" + item.path} render={()=><ContentData title={item.nombre} Component={item.componente} />}  key={id} />) 
                    }
                    else if (data.tipo === 0){
                      return <Route path={"/admin" + data.path} render={()=><ContentData title={data.nombre} Component={data.componente} />}  key={key} />
                    }
                    return ""
                  })}
                  
                  {/* Rutas administrativas */}
                  {menuAdmin.map((data, key) => <Route path={"/admin" + data.path} render={()=><ContentData title={data.nombre} Component={data.componente} />}  key={key} />)}
                  
                  {/* Rutas Hijas */}
                  {childRoutes.map((data, key) => <Route path={data.layout + data.path} render={(props)=><ContentData title={data.name} Component={data.component} {...props} />}  key={key} />)}
                </Switch>
            </div>
            {/* <Footer fluid /> */}
          </div>
          {/* <FixedPlugin bgColor={this.state.backgroundColor} handleColorClick={this.handleColorClick} /> */}
        </div>
      );
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

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard)