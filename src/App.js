import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// reactstrap components
import { Card } from 'react-bootstrap';
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// core components
import TopNavbar from "components/core/TopNavbar.js";
import Footer from "components/core/Footer.js";
import Sidebar from "components/core/SideNavbar.js";
//import FixedPlugin from "components/FixedPlugin/FixedPlugin.js"; /*{console.log(Component)}*/
import PanelHeader from "components/core/PanelHeader.js";
import runQuery from "variables/Generals"
import routes from "routes.js";

var ps;

const ContentData = ({title, Component}) => <>
  <Card className="card-header-content">
    <Card.Header>
      <Card.Title as="h5">{title}</Card.Title>
    </Card.Header>
  </Card>
  <Card>
  <Card.Body>
    {console.log("esta en content")}
    <Component />
  </Card.Body>
  </Card>
</>

class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLogged: "", backgroundColor: "blue", };
  }

  mainPanel = React.createRef();

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1 && this.state.isLogged ==="isLogged") {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    this.verifyToken()
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1 && this.state.isLogged ==="isLogged") {
      ps.destroy();
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  /* componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.mainPanel.current.scrollTop = 0;
    }
  } */
  handleColorClick = (color) => {
    this.setState({ backgroundColor: color });
  };

  verifyToken(){
    if (this.props.info.token ===""){
        this.setState({isLogged:"notLogged"})
    }
    else{
        runQuery("/login/verifyToken",{"token":this.props.info.token})
        .then((resp)=> {
            //console.log("ingrso aquiar ")
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

render() {
  let stateLogged = this.state.isLogged
  switch (stateLogged) {
    case "":
      return <div>Inicializando</div>
    case "notLogged":
        return <Redirect to="/login" />
    default:
      return (
        <div className="wrapper">
          <Sidebar {...this.props} routes={routes} backgroundColor={this.state.backgroundColor} />
          <div className="main-panel" ref={this.mainPanel}>
            <TopNavbar {...this.props} />
            <PanelHeader size="sm" />
            <div className="content">
                <Switch>
                  {routes.map((data, key) => {
                    if (data.childs){ 
                      return data.childs.map((item, id)=><Route path={item.layout + item.path} render={()=><ContentData title={item.name} Component={item.component} />}  key={id} />) 
                    }
                    else{
                      return <Route path={data.layout + data.path} render={()=><ContentData title={data.name} Component={data.component} />}  key={key} />
                    }
                  })}
                </Switch>
            </div>
            <Footer fluid />
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