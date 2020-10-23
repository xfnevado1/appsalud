import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";

// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

import logo from "logo-white.svg";

var ps;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebar, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  render() {
    return (
      <div className="sidebar" data-color={this.props.backgroundColor}>
        <div className="logo">
          <a
            href="https://www.creative-tim.com?ref=nudr-sidebar"
            className="simple-text logo-mini"
            target=""
          >
            <div className="logo-img">
              <img src={logo} alt="react-logo" />
            </div>
          </a>
          <a
            href="https://www.creative-tim.com?ref=nudr-sidebar"
            className="simple-text logo-normal"
            target=""
          >
            Creative Tim
          </a>
          <div className="navbar-minimize">
            <button type="button" id="minimizeSidebar" className="btn-round btn-icon btn btn-outline-neutral">
              <i className="now-ui-icons text_align-center visible-on-sidebar-regular"></i>
              <i className="now-ui-icons design_bullet-list-67 visible-on-sidebar-mini"></i>
              </button>
            </div>
        </div>
        <div className="sidebar-wrapper" ref="sidebar">
          <Nav>
            {this.props.routes.map((prop, key) => {
              //if (prop.redirect) return null;
              return (
                <li className={ this.activeRoute(prop.layout + prop.path) + (prop.pro ? " active active-pro" : "") } key={key} >
                  <NavLink to={prop.layout + prop.path} className="nav-link" activeClassName="active" >
                    <i className={"now-ui-icons " + prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            })
          }
          </Nav>
        </div>
      </div>
    );
  }
}

export default Sidebar;
