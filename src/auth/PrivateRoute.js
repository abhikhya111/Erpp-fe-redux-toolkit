import React, { useState, useEffect } from "react";
import axios from "axios";
import clsx from "clsx";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import StarBorder from "@material-ui/icons/StarBorder";
import { Route, Redirect } from "react-router-dom";
import useAuth from "hooks/useAuth";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";
import {
  Button,
  Drawer,
  makeStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useTheme,
  Divider,
} from "@material-ui/core";
import {
  Menu,
  ChevronLeft,
  ChevronRight,
  HomeOutlined,
  ContactMailOutlined,
  DateRangeOutlined,
  PaymentOutlined,
  PeopleOutlined,
  ExitToApp,
} from "@material-ui/icons";
import AssignmentIcon from "@material-ui/icons/Assignment";
import LiveHelpOutlinedIcon from "@material-ui/icons/LiveHelpOutlined";

const SideNavOptions = [
  {
    title: "Home",
    icon: "HomeOutlined",
    route: "/",
    rolesAllowed: ["ADMIN", "HR", "EMPLOYEE"],
    iconComponent: <HomeOutlined />,
  },
  {
    title: "My Profile",
    icon: "ContactMailOutlined",
    route: "/profile",
    rolesAllowed: ["ADMIN", "HR", "EMPLOYEE"],
    iconComponent: <ContactMailOutlined />,
  },

  {
    title: "Queries/Tickets",
    icon: "LiveHelpOutlinedIcon",
    route: "/queriesAndTickets",
    rolesAllowed: ["ADMIN", "HR", "EMPLOYEE"],
    iconComponent: <LiveHelpOutlinedIcon />,
  },
  {
    title: "Attendance/Shift & leaves",
    icon: "DateRangeOutlined",
    route: "/leaves",
    rolesAllowed: ["ADMIN", "HR", "EMPLOYEE"],
    iconComponent: <DateRangeOutlined />,
  },
  {
    title: "PayStub",
    icon: "PaymentOutlined",
    route: "/payroll",
    rolesAllowed: ["ADMIN", "HR", "EMPLOYEE"],
    iconComponent: <PaymentOutlined />,
  },
  {
    title: "Resign",
    icon: "ExitToApp",
    route: "/resign",
    rolesAllowed: ["ADMIN", "HR", "EMPLOYEE"],
    iconComponent: <ExitToApp />,
  },
];

const ExpandableHRSidebarItem = [
  {
    title: "Dashboard",
    icon: "PeopleOutlined",
    route: "/dashboard",
    rolesAllowed: ["ADMIN", "HR"],
    iconComponent: <StarBorder />,
  },
  {
    title: "My Employees",
    icon: "PeopleOutlined",
    route: "/employees",
    rolesAllowed: ["ADMIN", "HR"],
    iconComponent: <StarBorder />,
  },
  // {
  //   title: "All Projects",
  //   icon: "PeopleOutlined",
  //   route: "/projects",
  //   rolesAllowed: ["ADMIN", "HR"],
  //   iconComponent: <StarBorder />
  // },
  {
    title: "Leaves & Attendance",
    icon: "PeopleOutlined",
    route: "/LeavesAttendanceHR",
    rolesAllowed: ["ADMIN", "HR"],
    iconComponent: <StarBorder />,
  },

  {
    title: "Employee Communication",
    icon: "PeopleOutlined",
    route: "/communication",
    rolesAllowed: ["ADMIN", "HR"],
    iconComponent: <StarBorder />,
  },
  // {
  //   title: "Shift Schedule",
  //   icon: "PeopleOutlined",
  //   route: "/ShiftSchedule",
  //   rolesAllowed: ["ADMIN", "HR"],
  //   iconComponent: <StarBorder />
  // },
  {
    title: "Queries/All Ticket",
    icon: "PeopleOutlined",
    route: "/QueriesAllTicket",
    rolesAllowed: ["ADMIN", "HR"],
    iconComponent: <StarBorder />,
  },
  // {
  //   title: "Documents",
  //   icon: "PeopleOutlined",
  //   route: "/Documents",
  //   rolesAllowed: ["ADMIN", "HR"],
  //   iconComponent: <StarBorder />
  // },
  {
    title: "Resignation",
    icon: "PeopleOutlined",
    route: "/ResignationHR",
    rolesAllowed: ["ADMIN", "HR"],
    iconComponent: <StarBorder />,
  },
];

const ExpandableAssetMangement = [
  {
    title: "Dashboard",
    icon: "PeopleOutlined",
    route: "/assets/dashboard",
    rolesAllowed: ["ADMIN", "HR"],
    iconComponent: <StarBorder />,
  },
  {
    title: "All Asset",
    icon: "PeopleOutlined",
    route: "/assets/allassets",
    rolesAllowed: ["ADMIN", "HR"],
    iconComponent: <StarBorder />,
  },
  {
    title: "Asset Assign List",
    icon: "PeopleOutlined",
    route: "/assets/assetassign",
    rolesAllowed: ["ADMIN", "HR"],
    iconComponent: <StarBorder />,
  },
  {
    title: "Add Category",
    icon: "PeopleOutlined",
    route: "/assets/addcategory",
    rolesAllowed: ["ADMIN", "HR"],
    iconComponent: <StarBorder />,
  },
  {
    title: "Sub Category",
    icon: "PeopleOutlined",
    route: "/assets/addsubcategory",
    rolesAllowed: ["ADMIN", "HR"],
    iconComponent: <StarBorder />,
  },
  {
    title: "Add Asset Condition",
    icon: "PeopleOutlined",
    route: "/assets/addassetcondition",
    rolesAllowed: ["ADMIN", "HR"],
    iconComponent: <StarBorder />,
  },
];

const ShiftMngmtSidebarItem = [
  {
    title: "Dashboard",
    icon: "PeopleOutlined",
    route: "/shift-mngmt/dashboard",
    rolesAllowed: ["ADMIN", "HR"],
    iconComponent: <StarBorder />,
  },
  // {
  // 	title: "Leaves & Attendance",
  // 	icon: "PeopleOutlined",
  // 	route: "/LeavesAttendanceHR",
  // 	rolesAllowed: ["ADMIN", "HR"],
  // 	iconComponent: <StarBorder />
  // },
  {
    title: "Scheduler",
    icon: "PeopleOutlined",
    route: "/shift-mngmt/scheduler",
    rolesAllowed: ["ADMIN", "HR"],
    iconComponent: <StarBorder />,
  },
  {
    title: "Timesheets",
    icon: "PeopleOutlined",
    route: "/shift-mngmt/timesheets",
    rolesAllowed: ["ADMIN", "HR"],
    iconComponent: <StarBorder />,
  },
  // {
  //   title: "All Employees",
  //   icon: "PeopleOutlined",
  //   route: "/shift-mngmt/all-employees",
  //   rolesAllowed: ["ADMIN", "HR"],
  //   iconComponent: <StarBorder />,
  // },
  {
    title: "Projects and Sites",
    icon: "PeopleOutlined",
    route: "/shift-mngmt/projectsAndSites",
    rolesAllowed: ["ADMIN", "HR"],
    iconComponent: <StarBorder />,
  },

  // {
  //   title: "All Projects",
  //   icon: "PeopleOutlined",
  //   route: "/shift-mngmt/all-projects",
  //   rolesAllowed: ["ADMIN", "HR"],
  //   iconComponent: <StarBorder />,
  // },
  {
    title: "Positions",
    icon: "PeopleOutlined",
    route: "/shift-mngmt/positions",
    rolesAllowed: ["ADMIN", "HR"],
    iconComponent: <StarBorder />,
  },
  {
    title: "Tags",
    icon: "PeopleOutlined",
    route: "/shift-mngmt/tags",
    rolesAllowed: ["ADMIN", "HR"],
    iconComponent: <StarBorder />,
  },
  {
    title: "Shift Templates",
    icon: "PeopleOutlined",
    route: "/shift-mngmt/shift-templates",
    rolesAllowed: ["ADMIN", "HR"],
    iconComponent: <StarBorder />,
  },
  {
    title: "Shift Task",
    icon: "PeopleOutlined",
    route: "/shift-mngmt/shift-tasks",
    rolesAllowed: ["ADMIN", "HR"],
    iconComponent: <StarBorder />,
  },
];

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: "#ffffff",
    color: "#1F299C",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 0,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  backdrop: {
    zIndex: 9999,
    color: "#fff",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  whiteBg: {
    backgroundColor: "white",
  },
  greyBg: {
    backgroundColor: "lightgrey",
  },
  yellowBg: {
    backgroundColor: "yellow",
  },
}));

export default function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  const history = useHistory();
  const mediaQuery = window.innerWidth;
  let [redirectToLogin, setredirectToLogin] = useState(false);
  let [isLoading, setisLoading] = useState(true);
  let [isLogginOut, setIsLogginOut] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(true);
  const [hrOpenCollapse, setHROpenCollapse] = React.useState(false);
  const [asstOpenCollapse, setAsstOpenCollapse] = React.useState(false);
  const [routeAccessed, setRouteAccessed] = React.useState("");
  const [openShiftCollapse, setOpenShiftCollapse] = React.useState(false);

  function handleOpenHRSettings() {
    setHROpenCollapse(!hrOpenCollapse);
  }

  function handleOpenShiftSettings() {
    setOpenShiftCollapse(!openShiftCollapse);
  }

  function handleOpenAssetettings() {
    setAsstOpenCollapse(!asstOpenCollapse);
  }

  const checkLogin = async () => {
    let token = localStorage.getItem("token");
    if (token) {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/users/validatetoken`,
          {
            headers: {
              token,
            },
          }
        );
        if (result.status === 200) {
          await auth.fetchUser(token, result.data.data._id);
          setisLoading(false);
          setredirectToLogin(false);
          console.log("Setting route accessed ->", rest.location.pathname);
          setRouteAccessed(rest.location.pathname);
        } else {
          setisLoading(false);
          setredirectToLogin(true);
        }
      } catch (e) {
        console.log("E ", e);
        setisLoading(false);
        setredirectToLogin(true);
      }
    } else {
      setisLoading(false);
      setredirectToLogin(true);
    }
  };

  useEffect(() => {
    if (mediaQuery < 768) {
      setIsDrawerOpen(false);
    }

    const curr_route = rest.location.pathname;
    setRouteAccessed(curr_route);

    const now_in_hr_flow = ExpandableHRSidebarItem.some(
      (el) => el.route === curr_route
    );
    const now_in_hr = ExpandableAssetMangement.some(
      (el) => el.route === curr_route
    );
    const now_in_sm = ShiftMngmtSidebarItem.some(
      (el) => el.route === curr_route
    );

    if (now_in_hr_flow) {
      setHROpenCollapse(true);
    }

    if (now_in_hr) {
      setAsstOpenCollapse(true);
    }

    if (now_in_sm) {
      setOpenShiftCollapse(true);
    }

    if (!isLogginOut) {
      if (!auth.user) {
        checkLogin();
      } else {
        setisLoading(false);
      }
    }
  }, [auth.user, auth, mediaQuery]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleNavigateClick = (link) => {
    console.log("======== LINK -->", link);
    setRouteAccessed(link);
    history.push(`${link}`);
  };

  const handleLogout = function () {
    setisLoading(true);
    setIsLogginOut(true);
    setTimeout(async () => {
      auth.signout(function () {
        console.log("Logout successfull");
        history.push(`/login`);
        setIsLogginOut(false);
      });
    }, 1000);
  };
  return (
    <Route
      {...rest}
      render={({ location }) => (
        <div>
          {!redirectToLogin && auth.user && (
            <React.Fragment>
              <AppBar
                position='fixed'
                className={clsx(classes.appBar, {
                  [classes.appBarShift]: isDrawerOpen,
                })}
              >
                <Toolbar>
                  <IconButton
                    color='inherit'
                    aria-label='open drawer'
                    onClick={handleDrawerOpen}
                    edge='start'
                    className={clsx(
                      classes.menuButton,
                      isDrawerOpen && classes.hide
                    )}
                  >
                    <Menu />
                  </IconButton>

                  <Typography variant='h6' noWrap>
                    <b>GLEN</b> TRAFFIC
                  </Typography>
                  {auth.user && (
                    <Button
                      style={{
                        flexDirection: "row",
                        justify: "flex-end",
                        margin: "0 0 0 auto",
                      }}
                      onClick={() => handleLogout()}
                    >
                      <span
                        style={{
                          textTransform: "capitalize",
                          color: "#1F299C",
                          cursor: "pointer",
                        }}
                      >
                        Logout
                      </span>{" "}
                      &nbsp;
                      <ExitToApp style={{ color: "#1F299C" }} />
                    </Button>
                  )}
                </Toolbar>
              </AppBar>
              <Drawer
                className={classes.drawer}
                variant='persistent'
                anchor='left'
                open={isDrawerOpen}
                classes={{
                  paper: classes.drawerPaper,
                }}
              >
                <div
                  className={classes.drawerHeader}
                  style={{ color: "#1F299C" }}
                >
                  <Typography variant='h6' noWrap style={{ margin: "0 10px" }}>
                    Welcome {auth.user.first_name}
                  </Typography>

                  <IconButton onClick={handleDrawerClose}>
                    {theme.direction === "ltr" ? (
                      <ChevronLeft />
                    ) : (
                      <ChevronRight />
                    )}
                  </IconButton>
                </div>
                <Divider />
                <List style={{ color: "#16215B" }}>
                  {SideNavOptions.map((item) => {
                    if (item.rolesAllowed.includes(auth.user.role)) {
                      return (
                        <ListItem
                          button
                          key={item.title}
                          className={
                            item.route === routeAccessed
                              ? classes.greyBg
                              : classes.whiteBg
                          }
                          onClick={() => {
                            handleNavigateClick(item.route);
                          }}
                        >
                          <ListItemIcon
                            style={{ minWidth: "34px", color: "#16215B" }}
                          >
                            {item.iconComponent}
                          </ListItemIcon>
                          <ListItemText primary={item.title} />
                        </ListItem>
                      );
                    }
                    return null;
                  })}

                  {["ADMIN", "HR"].includes(auth.user.role) && (
                    <>
                      <ListItem button onClick={handleOpenHRSettings}>
                        <ListItemIcon
                          style={{ minWidth: "34px", color: "#16215B" }}
                        >
                          <PeopleOutlined />
                        </ListItemIcon>
                        <ListItemText primary='Employee Management' />
                        {hrOpenCollapse ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>
                      <Collapse
                        in={hrOpenCollapse}
                        timeout='auto'
                        unmountOnExit
                      >
                        <List component='div' disablePadding>
                          {ExpandableHRSidebarItem.map((item) => {
                            if (item.rolesAllowed.includes(auth.user.role)) {
                              return (
                                <ListItem
                                  button
                                  key={item.title}
                                  className={
                                    item.route === routeAccessed
                                      ? classes.greyBg
                                      : classes.whiteBg
                                  }
                                  onClick={() => {
                                    handleNavigateClick(item.route);
                                  }}
                                >
                                  <ListItemIcon
                                    style={{
                                      minWidth: "34px",
                                      color: "#16215B",
                                    }}
                                  >
                                    {item.iconComponent}
                                  </ListItemIcon>
                                  <ListItemText primary={item.title} />
                                </ListItem>
                              );
                            }
                            return null;
                          })}
                        </List>
                      </Collapse>
                    </>
                  )}

                  {/*  Asset Mangmanet */}
                  {/* <ListItem button onClick={handleOpenAssetettings}>
                    <ListItemIcon
                      style={{ minWidth: "34px", color: "#16215B" }}
                    >
                      <PeopleOutlined />
                    </ListItemIcon>
                    <ListItemText primary='Asset Management' />
                    {asstOpenCollapse ? <ExpandLess /> : <ExpandMore />}
                  </ListItem> */}
                  {/* <Collapse in={asstOpenCollapse} timeout='auto' unmountOnExit>
                    <List component='div' disablePadding>
                      {ExpandableAssetMangement.map((item) => {
                        if (item.rolesAllowed.includes(auth.user.role)) {
                          return (
                            <ListItem
                              button
                              key={item.title}
                              className={
                                item.route === routeAccessed
                                  ? classes.greyBg
                                  : classes.whiteBg
                              }
                              onClick={() => {
                                handleNavigateClick(item.route);
                              }}
                            >
                              <ListItemIcon
                                style={{ minWidth: "34px", color: "#16215B" }}
                              >
                                {item.iconComponent}
                              </ListItemIcon>
                              <ListItemText primary={item.title} />
                            </ListItem>
                          );
                        }
                        return null;
                      })}
                    </List>
                  </Collapse> */}

                  {/* ----------------------------------------------------- */}
                  {["ADMIN", "HR"].includes(auth.user.role) && (
                    <>
                      <ListItem button onClick={handleOpenShiftSettings}>
                        <ListItemIcon
                          style={{ minWidth: "34px", color: "#16215B" }}
                        >
                          <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary='Shift Management' />
                        {openShiftCollapse ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>
                      <Collapse
                        in={openShiftCollapse}
                        timeout='auto'
                        unmountOnExit
                      >
                        <List component='div' disablePadding>
                          {ShiftMngmtSidebarItem.map((item) => {
                            if (item.rolesAllowed.includes(auth.user.role)) {
                              return (
                                <ListItem
                                  button
                                  key={item.title}
                                  className={
                                    item.route === routeAccessed
                                      ? classes.greyBg
                                      : classes.whiteBg
                                  }
                                  // style={
                                  //   routeAccessed === item.route ?
                                  //   {
                                  //     backgroundColor:"yellow"
                                  //   }:
                                  //   {
                                  //     backgroundColor:"white"
                                  //   }
                                  // }
                                  onClick={() => {
                                    handleNavigateClick(item.route);
                                  }}
                                >
                                  <ListItemIcon
                                    style={{
                                      minWidth: "34px",
                                      color: "#16215B",
                                    }}
                                  >
                                    {item.iconComponent}
                                  </ListItemIcon>
                                  <ListItemText primary={item.title} />
                                </ListItem>
                              );
                            }
                            return null;
                          })}
                        </List>
                      </Collapse>
                    </>
                  )}
                  {/* --------------------------------------------------------------- */}
                </List>
              </Drawer>
              <div className={classes.drawerHeader} />
              {React.cloneElement(children, { isDrawerOpen, ...rest })}
            </React.Fragment>
          )}
          {redirectToLogin && (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          )}
          {isLoading && (
            <Loader
              type='Circles'
              color='#1f299c'
              height={200}
              width={200}
              style={{ marginTop: "200px" }}
              // timeout={3000} //3 secs
            />
          )}
        </div>
      )}
    />
  );
}
//pushed
