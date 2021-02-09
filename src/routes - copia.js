//import Usuarios from "views/Usuarios";
import EditUsuario from "views/EditUsuario";
//import Grupos from "views/Grupos";
import EditGroup from "views/EditGroup";
import Categorias from "views/Categorias";

import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/TableList.js";
import Maps from "views/Maps.js";
import UserPage from "views/UserPage.js";

var userRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "design_app",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/Pages", name: "Pages", icon: "design_image", layout: "/admin",
    childs: [
      { path: "/Timeline", name: "Pages", icon: "TP", component: Icons, layout: "/admin"},
      { path: "/User-Prof", name: "User Prof", icon: "TP", component: TableList, layout: "/admin"},
      { path: "/Rtl-Support", name: "Rtl Support", icon: "RS", component: Dashboard, layout: "/admin"},
      { path: "/Register", name: "Register Page", icon: "RP", component: TableList, layout: "/admin"},
      { path: "/Pricing", name: "Pricing Page", icon: "PP", component: Icons, layout: "/admin"},
  ]
  },
  { path: "/Components", name: "Componentes", icon: "location_map-big", layout: "/admin",
    childs: [
      { path: "/Map", name: "Mapas", icon: "MP", component: Maps, layout: "/admin"},
      { path: "/Grid-System", name: "Grid System", icon: "GS", component: Notifications, layout: "/admin"},
      { path: "/Panels", name: "Paneles", icon: "NO", component: TableList, layout: "/admin"},
      { path: "/Icons", name: "Iconos", icon: "IC", component: Icons, layout: "/admin"},
    ]
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "ui-1_bell-53",
    component: Notifications,
    layout: "/admin",
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "users_single-02",
    component: UserPage,
    layout: "/admin",
  },
  { path: "/Tables", name: "Tablas", icon: "design_image", layout: "/admin",
    childs: [ 
      { path: "/extended-tables", name: "Table List", icon: "TL", component: TableList, layout: "/admin" },
      { path: "/typography", name: "Typography", icon: "TY", component: Typography, layout: "/admin"}
    ]
  }
];

let adminRoutes =[
  { path: "/Usuarios", name: "Usuarios", icon: "users_circle-08", component: Usuarios, layout: "/admin"},
  { path: "/Grupos", name: "Grupos", icon: "ui-1_bell-53", component: Grupos, layout: "/admin"},
  { path: "/Categorias", name: "Categorias", icon: "users_single-02", component: Categorias, layout: "/admin"},
  { path: "/Grupos-Categ", name: "Grupos x Categorias", icon: "design_app", component: TableList, layout: "/admin"},
]

let childRoutes =[
  { path: "/updateUser/:idusuario?", name: "Datos Usuario", icon: "users_circle-08", component: EditUsuario, layout: "/admin"},
  { path: "/updateGroup/:idgrupo/:nombre", name: "Datos Grupo", icon: "users_circle-08", component: EditGroup, layout: "/admin"},
]

export {userRoutes, adminRoutes, childRoutes};
