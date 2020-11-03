import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// reactstrap components
import { Card } from 'react-bootstrap';
import { Route, Switch } from "react-router-dom";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
//import FixedPlugin from "components/FixedPlugin/FixedPlugin.js"; /*{console.log(Component)}*/
import PanelHeader from "components/PanelHeader/PanelHeader.js";

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
    <Component />
  </Card.Body>
  </Card>
</>

class Dashboard extends React.Component {
  state = {
    backgroundColor: "blue",
  };
  mainPanel = React.createRef();
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
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
  render() {
    return (
      <div className="wrapper">
        <Sidebar {...this.props} routes={routes} backgroundColor={this.state.backgroundColor} />
        <div className="main-panel" ref={this.mainPanel}>
          <DemoNavbar {...this.props} />
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

export default Dashboard;