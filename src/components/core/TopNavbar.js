import React from "react";
import { Link } from "react-router-dom";
import { Collapse, Navbar, Nav, Dropdown, Container, InputGroup, Form, } from "react-bootstrap";

import routes from "routes.js";

//import "assets/css/now-ui-dashboard.css"

class TopNavBar extends React.Component {
  state = {
    isOpen: false,
    dropdownOpen: false,
    color: "transparent",
  };
  sidebarToggle = React.createRef();
  toggle = () => {
    if (this.state.isOpen) {
      this.setState({ color: "transparent" });
    } else {
      this.setState({ color: "white" });
    }
    this.setState({ isOpen: !this.state.isOpen });
  };
  dropdownToggle = (e) => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };
  getBrand = () => {
    var name;
    routes.map((prop, key) => {
      if (prop.collapse) {
        prop.views.map((prop, key) => {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
          return null;
        });
      } else {
        if (prop.redirect) {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
        } else {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
        }
      }
      return null;
    });
    return name;
  };
  openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    this.sidebarToggle.current.classList.toggle("toggled");
  };
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  updateColor = () => {
    if (window.innerWidth < 993 && this.state.isOpen) {
      this.setState({ color: "white" });
    } else {
      this.setState({ color: "transparent" });
    }
  };
  componentDidMount() {
    window.addEventListener("resize", this.updateColor.bind(this));
  }
  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      this.sidebarToggle.current.classList.toggle("toggled");
    }
  }
  render() {
    return (
      // add or remove classes depending if we are on full-screen-maps page or not
      <Navbar color={this.state.color} /* expand="lg" */ className={ "navbar-absolute fixed-top " } >
        <Container fluid >
          <div className="navbar-wrapper">
            <div className="navbar-toggle">
              <button type="button" ref={this.sidebarToggle} className="navbar-toggler" onClick={() => this.openSidebar()} >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <Navbar.Brand href="/">{this.getBrand()}</Navbar.Brand>
          </div>
          <Navbar.Toggle onClick={this.toggle}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </Navbar.Toggle>
          <Collapse
            in={true /* this.state.isOpen */}
            /* navbar */
            /* className="justify-content-end" */
          >
            <Navbar>
              <Nav.Item>
                <Form>
                  <InputGroup className="no-border">
                    <Form.Control className="navbar-input-search" placeholder="Search..." />
                    <InputGroup.Append className="navbar-input-append">
                      <InputGroup.Text>
                        <i className="now-ui-icons ui-1_zoom-bold" />
                      </InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
                </Form>
              </Nav.Item>
          
              <Nav.Item>
                <Link to="#pablo" className="nav-link">
                  <i className="now-ui-icons media-2_sound-wave" />
                  <p>
                    <span className="d-lg-none d-md-block">Stats</span>
                  </p>
                </Link>
              </Nav.Item>
              <Dropdown  /* isOpen={this.state.dropdownOpen} toggle={(e) => this.dropdownToggle(e)} */ >
                <Dropdown.Toggle className=" bg-transparent no-border" >
                  <i className="now-ui-icons location_world" />
                  {/* <p>
                    <span className="d-lg-none d-md-block">Some Actions</span>
                  </p> */}
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-right">
                  <Dropdown.Item tag="a">Action</Dropdown.Item>
                  <Dropdown.Item tag="a">Another Action</Dropdown.Item>
                  <Dropdown.Item tag="a">Something else here</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Nav.Item>
                <Link to="#pablo" className="nav-link">
                  <i className="now-ui-icons users_single-02" />
                  <p>
                    <span className="d-lg-none d-md-block">Account</span>
                  </p>
                </Link>
              </Nav.Item>
            </Navbar>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default TopNavBar;