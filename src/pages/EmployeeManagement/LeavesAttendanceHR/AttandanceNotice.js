import React from "react";
import "@fontsource/roboto";
import {
  Grid,
  Paper,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  InputBase,
  Typography,
  IconButton,
  Menu
} from "@material-ui/core";
// import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
// import DateFnsUtils from '@date-io/date-fns';
// import useAuth from "hooks/useAuth";
// import clsx from "clsx";
// import Api from "../../../hooks/AjaxAction";
// import axios from "axios";
import { useLeavesAttendanceHRStyles } from "./style";
import SearchIcon from "@material-ui/icons/Search";
import { MoreHoriz } from "@material-ui/icons";

export const AttandanceNotice = props => {
  const classes = useLeavesAttendanceHRStyles();

  // const auth = useAuth();
  // const [isLoading, setIsLoading] = React.useState(false);
  const [allAttendance, setAllAttendance] = React.useState([]);

  // --- menu config -------------
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event, props) => {
    setAnchorEl(event.currentTarget);
    // setShiftTemplateSelected(props);
    // console.log("Opening options for shift template ->", props);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // ----------------------------

  // const getAttenanceNotice = async () => {
  //     try {

  //         const response = await axios.get(
  //             `${process.env.REACT_APP_API_BASE_URL}/leaves/getAllLeaves`,
  //             {
  //                 headers: {
  //                     token: auth.token,
  //                 },
  //             }
  //         );

  //         if (response.status === 200) {
  //             const data = response.data.data;
  //             setAllAttendance(data);
  //             console.log(data);
  //         }

  //     } catch (e) {
  //         if (e.response) {
  //             console.log("Error >", e.response);
  //         }
  //     }
  // }

  //   const getAllAttendance = async () => {
  //     console.log("Organisation id:", auth.user.org_id);
  //     try {
  //       const response = await axios.get(
  //         `${process.env.REACT_APP_API_BASE_URL}/attendance/getbyorg/${
  //           auth.user.org_id._id
  //         }?year=${""}`,
  //         {
  //           headers: {
  //             token: auth.token,
  //           },
  //         }
  //       );

  //       if (response.status === 200) {
  //         const data = response.data.data;
  //         setAllAttendance(data);
  //         console.log("All Attendance: ", data);
  //       }
  //     } catch (e) {
  //       if (e.response) {
  //         console.log("Error >", e.response);
  //       }
  //     }
  //   };

  const getPunchedStatus = atten => {
    if (atten.punchedIn === "" && atten.status === "No Show") {
      return "No show";
    } else if (atten.punchedIn === "" && atten.status === "Not Schedule") {
      return "Not Schedule";
    } else if (atten.status && Number(atten.status) < 0) {
      //   console.log(Number(atten.status));
      return "Punched Out Early";
    }
  };
  const getPunchedTimeDiffernce = atten => {
    if (atten.punchedIn === "" && atten.status === "No Show") {
      return "";
    } else if (atten.punchedIn === "" && atten.status === "Not Schedule") {
      return "";
    } else if (atten.status && Number(atten.status) < 0) {
      const positiveNumber = Math.abs(Number(atten.status));
      return `(${positiveNumber} minutes)`;
    }
  };

  const getInitialLetters = user => {
    // const user =  getUserById(user_id);

    //  using this causing infinite Loop!!!!!!!!!!
    // setCurrentUserInLoop(user);

    let initial_letters = "";
    // console.log(user);
    if (user) {
      initial_letters = user.first_name.charAt(0);

      if (user.last_name) {
        initial_letters += user.last_name.charAt(0);
      }
      // console.log(initial_letters);
    }
    initial_letters = initial_letters.toUpperCase();
    return initial_letters;
  };

  // ==========================================================

  const getUserName = user => {
    // const user = getUserById(user_id);

    let user_name = "";
    if (user) {
      user_name = user.first_name;

      if (user.last_name) {
        user_name += " " + user.last_name;
      }
    }
    // console.log("Username: ", user_name);
    return user_name;
  };

  //   ===========================================

  const dateToAMPM = datetime_string => {
    let date_object = new Date(datetime_string);
    let hours = date_object.getHours();
    let minutes = date_object.getMinutes();

    // Check whether AM or PM
    let newformat = hours >= 12 ? "PM" : "AM";

    // Find current hour in AM-PM Format
    hours = hours % 12;

    // To display "0" as "12"
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return hours + ":" + minutes + " " + newformat;
  };

  // ==============================================

  const getPunchInTime = punch_details => {
    let punchin_time = " - - : - - ";

    if (punch_details[0].punchin_time) {
      punchin_time = punch_details[0].punchin_time;
      punchin_time = dateToAMPM(punchin_time);
    }
    return punchin_time;
  };

  //  ===============================================

  const getPunchOutTime = punch_details => {
    let punchout_time = " - - : - - ";

    if (punch_details[punch_details.length - 1].punchout_time) {
      punchout_time = punch_details[punch_details.length - 1].punchout_time;
      punchout_time = dateToAMPM(punchout_time);
    }
    return punchout_time;
  };
  //  ===============================================

  React.useEffect(() => {
    // API call goes here
    // getAllAttendance();
    setAllAttendance(props.all_attendances); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          position: "relative"
        }}
      >
        <FormControl
          variant="outlined"
          style={{
            minWidth: "225px",
            marginRight: "auto",
            marginBottom: "10px"
          }}
        >
          <InputLabel
            // style={{
            //   paddingLeft:"5px"
            // }}
            id="demo-simple-select-label-1"
          >
            All
          </InputLabel>
          <Select
            labelId="demo-simple-select-label-1"
            label="Schedules"
            id="demo-simple-select"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            <MenuItem value={10}>Active</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>

        {/* <FormControl
                variant = "outlined"
                style={{
                    width:"275px",
                    minWidth: "225px",
                    marginRight:"auto",
                    marginBottom:"10px",
                }}
                >
                <InputLabel
                    // style={{
                    //   paddingLeft:"5px"
                    // }}
                    id="demo-simple-select-label-2"
                >
                    Select Site
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label-2"
                    label="All Positions"
                    id="demo-simple-select"
                    >
                    <MenuItem value="All"><em>All</em></MenuItem>
                    <MenuItem value={10}>Active</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                </FormControl> */}

        <Paper
          style={{
            width: "275px",
            minWidth: "225px",
            height: "56px",
            backgroundColor: "rgb(248,248,248)",
            marginBottom: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            style={{
              paddingLeft: "5px"
            }}
            placeholder="  Search..."
          />
          <IconButton
            style={{ paddingleft: "-5px", paddingRight: "0px" }}
            aria-label="search"
          >
            <SearchIcon style={{ paddingleft: "-5px", paddingRight: "0px" }} />
          </IconButton>
        </Paper>
      </div>

      {allAttendance &&
        allAttendance.map((atten, idx) => {
          return (
            <div key={idx} className={classes.listContainer}>
              <div className={classes.ProfileCircle}>
                <Typography
                  variant="h6"
                  style={{
                    color: "#1F299C",
                    fontWeight: "500"
                  }}
                >
                  {/* NL */}

                  {atten.emp_id && getInitialLetters(atten.emp_id)}
                </Typography>
              </div>

              <Grid container>
                <Grid item xs={11}>
                  <Grid
                    container
                    justifyContent="space-between"
                    spacing={2}
                    style={{
                      paddingLeft: "10px",
                      justifyContent: "space-between",
                      alignItems: "flex-start"
                    }}
                  >
                    <Grid item xs={12} lg={4}>
                      <Typography
                        variant="h6"
                        style={{
                          fontWeight: "500"
                        }}
                      >
                        {/* {atten.userName} ({atten.userId}) */}
                        {getUserName(atten.emp_id)} (
                        {atten.emp_id && atten.emp_id.emp_code})
                      </Typography>

                      <Typography
                        variant="body2"
                        style={{
                          color: "grey",
                          fontWeight: "500"
                        }}
                      >
                        {atten.emp_id && atten.emp_id.role} | Site Sample Name
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      md={6}
                      lg={3}
                      // style={{
                      //     positon:"relative",
                      //     display:"flex",
                      //     flexWrap:"wrap"
                      // }}
                      style={{
                        marginTop: "5px"
                      }}
                    >
                      <Typography
                        variant="body2"
                        //   component={"span"}
                        style={{
                          color: "grey",
                          fontWeight: "500"
                        }}
                      >
                        Punched IN (Scheduled)&nbsp;
                      </Typography>

                      <Typography
                        variant="subtitle1"
                        // component={"span"}
                        style={{
                          fontWeight: "600"
                        }}
                      >
                        <span style={{ color: "#3d9e5a", textAlign: "center" }}>
                          {getPunchInTime(atten.punch_details)}
                          {/* {atten.punchedIn || " - - : - - "} */}
                        </span>
                        &nbsp;&nbsp; (10:00 AM)
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      md={6}
                      lg={3}
                      // style={{
                      //     positon:"relative",
                      //     display:"flex",
                      //     flexWrap:"wrap"
                      // }}
                      style={{
                        marginTop: "5px"
                      }}
                    >
                      <Typography
                        variant="body2"
                        // component={"span"}
                        style={{
                          color: "grey",
                          fontWeight: "600"
                        }}
                      >
                        Punched OUT (Scheduled)&nbsp;
                      </Typography>

                      <Typography
                        variant="subtitle1"
                        // component={"span"}
                        style={{
                          fontWeight: "800"
                        }}
                      >
                        <span style={{ color: "#e9594a", textAlign: "center" }}>
                          {getPunchOutTime(atten.punch_details)}
                          {/* {atten.punchedOut || " - - : - - "} */}
                        </span>
                        &nbsp;&nbsp;&nbsp; (06:00 PM)
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      lg={2}
                      // style={{
                      //     positon:"relative",
                      //     display:"flex",
                      //     flexWrap:"wrap"
                      // }}
                      style={{
                        fontWeight: "700",
                        display: "flex"
                      }}
                    >
                      <p style={{ marginTop: "0", marginBottom: "0" }}>
                        {getPunchedStatus(atten)}
                        Not &nbsp;
                      </p>
                      <div style={{ color: "#e9594a" }}>
                        {getPunchedTimeDiffernce(atten)}
                        Scheduled
                      </div>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid
                  item
                  xs={1}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <IconButton
                    style={{ padding: "0px" }}
                    id="basic-button"
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <MoreHoriz style={{ padding: "0px" }} />
                  </IconButton>

                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button"
                    }}
                  >
                    <MenuItem onClick={handleClose}>View Details</MenuItem>
                    <MenuItem onClick={handleClose}>Approve</MenuItem>
                  </Menu>
                </Grid>
              </Grid>
            </div>
          );
        })}
    </React.Fragment>
  );
};
