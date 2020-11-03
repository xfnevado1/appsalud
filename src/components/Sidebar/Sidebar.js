import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

import logo from "logo-white.svg";

var ps;

function Menu (prop){
  const [open, setOpen] = useState(false);
  if (prop.childs){
    let hasClass = false
    const listMenu = prop.childs.map((item, key) => {
      if (prop.classActive ===(item.layout + item.path)){
        hasClass = true
      }
      return <li className={ (prop.classActive ===(item.layout + item.path))?"active":"" } key={key}>
        <NavLink to={item.layout + item.path} className="nav-link" activeClassName="active" key={"m"+key}>
          <span className="sidebar-mini-icon">{item.icon}</span>
          <span className="sidebar-normal">{item.name}</span>
        </NavLink>
      </li>
    })
    return <li className={ (hasClass)?"active":""}>
        <Nav.Link to="#pablo" data-toggle="collapse" aria-expanded={(open)?"true":""} onClick={()=>{ setOpen(!open)} }>
          <i className={"now-ui-icons " + prop.icon} />
          <p>{prop.name} <b className="caret"></b></p>
        </Nav.Link>
        <Navbar.Collapse in={open}>
          <ul className="nav">
            {listMenu}
          </ul>
        </Navbar.Collapse> 
    </li>    
    
  }
  else {
    return <li className={ (prop.classActive ===(prop.layout + prop.path))?"active":"" }  >
      <NavLink to={prop.layout + prop.path} className="nav-link" activeClassName="active" >
        <i className={"now-ui-icons " + prop.icon} />
        <p>{prop.name}</p>
      </NavLink>
    </li>
  }
}

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
  handleClickMinimize =(e)=>{
      if (document.body.classList.contains('sidebar-mini')){
        document.body.classList.remove('sidebar-mini');
      }
      else{
        document.body.classList.add('sidebar-mini');
      }

  }
  render() {
    let classActive = this.props.location.pathname;
    return (
      <div className="sidebar" data-color={this.props.backgroundColor}>
        <div className="logo">
          <a href="https://www.creative-tim.com?ref=nudr-sidebar" className="simple-text logo-mini" target="" >
            <div className="logo-img">
              <img src={logo} alt="react-logo" />
            </div>
          </a>
          <a href="https://www.creative-tim.com?ref=nudr-sidebar" className="simple-text logo-normal" target="" >
            Creative Tim
          </a>
          <div className="navbar-minimize">
            <button type="button" id="minimizeSidebar" onClick={this.handleClickMinimize} className="btn-round btn-icon btn btn-outline-neutral">
              <i className="now-ui-icons text_align-center visible-on-sidebar-regular"></i>
              <i className="now-ui-icons design_bullet-list-67 visible-on-sidebar-mini"></i>
            </button>
          </div>
        </div>
        <div className="sidebar-wrapper" ref="sidebar">
          <Nav>
            {this.props.routes.map((prop, key) => {
              //if (prop.redirect) return null;
              //let classActive = this.props.location.pathname; //this.activeRoute(prop.layout + prop.path)
              
              prop.classActive = classActive; //this.props.location.pathname;
              return <Menu {...prop} key={key}/>
            })
          }
          </Nav>
        </div>
      </div>
    );
  }
}
export default Sidebar;