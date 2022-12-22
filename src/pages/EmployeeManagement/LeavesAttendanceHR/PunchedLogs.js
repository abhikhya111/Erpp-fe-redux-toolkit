import React, { useState } from "react";
import "@fontsource/roboto";
import {
  Grid,
  Paper,
  Typography,
  IconButton,
  Menu,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  InputBase,
  Backdrop,
  CircularProgress,
  TextField,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
// import DateFnsUtils from '@date-io/date-fns';
import useAuth from "hooks/useAuth";
// import clsx from "clsx";
// import Api from "../../../hooks/AjaxAction";
import axios from "axios";
import { useLeavesAttendanceHRStyles } from "./style";
import ArrowBack from "@material-ui/icons/ArrowBack";
import MomentUtils from "@date-io/moment";
import { MoreHoriz } from "@material-ui/icons";

import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
// import FastfoodIcon from '@material-ui/icons-material/Fastfood';
// import LaptopMacIcon from '@material-ui/icons-material/LaptopMac';
// import HotelIcon from '@material-ui/icons-material/Hotel';
// import RepeatIcon from '@material-ui/icons-material/Repeat';
import EventIcon from "@material-ui/icons/Event";
import GoogleMapReact from "google-map-react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import avatarDemo from "../../../assets/images/avatar_demo.jpg";
import SearchIcon from "@material-ui/icons/Search";
import { Autocomplete } from "@material-ui/lab";

const center = {
  lat: 56.1304,
  lng: -106.3468,
};

// const mockedPunchedLogs = [
//     {
//         userName: 'Akash Vishwakarma',
//         userId: 'E123456789',
//         designation:'Software Engineer',
//         punchedIn: "10:00 AM",
//         punchedOut:'05:57 AM'
//     },
//     {
//         userName: 'Akash Vishwakarma',
//         userId: 'E123456789',
//         designation:'Software Engineer',
//         punchedIn: "10:00 AM",
//         punchedOut:'05:57 AM'
//     },
//     {
//         userName: 'Akash Vishwakarma',
//         userId: 'E123456789',
//         designation:'Software Engineer',
//         punchedIn: "10:00 AM",
//         punchedOut:'05:57 AM'
//     }
// ]

export const PunchedLogs = (props) => {
  const classes = useLeavesAttendanceHRStyles();

  const auth = useAuth();
  // const [isLoading, setIsLoading] = React.useState(false);
  const [punchedLogs, setPunchedLogs] = React.useState([]);
  const [allPunchedLogs, setAllPunchedLogs] = React.useState([]);
  const [currentPunchedLog, setCurrentPunchedLog] = React.useState("");
  const [viewDetails, setViewDetails] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [employees, setEmployees] = React.useState([]);

  const updateEmpOptions = (arr) => {
    let optionsDataArray = [];
    optionsDataArray = arr
      .filter((item) => {
        return item.emp_id !== null || typeof yourVariable === "object";
      })
      .map((user_data) => {
        return {
          title: `${user_data.emp_id.first_name} ${user_data.emp_id.last_name}`,
          ...user_data.emp_id,
        };
      });

    let newArray = [];
    let uniqueObject = {};
    for (let i in optionsDataArray) {
      // Extract the emp code
      let emp_code = optionsDataArray[i]?.emp_code;
      // Use the emp code as the index
      uniqueObject[emp_code] = optionsDataArray[i];
    }
    // Loop to push unique object into array
    for (let i in uniqueObject) {
      newArray.push(uniqueObject[i]);
    }
    setEmployees(newArray);
  };

  const handleViewDetails = (e, log) => {
    setCurrentPunchedLog(log);
    setViewDetails(!viewDetails);
    window.scrollTo(0, 0);
  };

  const getArrayViaIndexes = (arr, indexesToKeep) => {
    let newArr = indexesToKeep.map((idx) => {
      return arr[idx];
    });
    return newArr;
  };

  // const getAllAttendance = async () => {
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

  const getInitialLetters = (user) => {
    // const user =  getUserById(user_id);

    //  using this causing infinite Loop!!!!!!!!!!
    // setCurrentUserInLoop(user);

    let initial_letters = "";

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

  const getUserName = (user) => {
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

  const dateToAMPM = (datetime_string) => {
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

  const getPunchInTime = (punch_details) => {
    let punchin_time = " - - : - - ";
    if (punch_details[0]?.punchin_time) {
      punchin_time = punch_details[0]?.punchin_time;
      punchin_time = dateToAMPM(punchin_time);
    }
    return punchin_time;
  };

  //  ===============================================

  const getPunchOutTime = (punch_details) => {
    let punchout_time = " - - : - - ";

    if (punch_details[punch_details.length - 1].punchout_time) {
      punchout_time = punch_details[punch_details.length - 1].punchout_time;
      punchout_time = dateToAMPM(punchout_time);
    }
    return punchout_time;
  };
  //  ===============================================

  const getPunchInLocation = (punch_details) => {
    let punchin_location = " ";

    if (punch_details[0].punchin_location) {
      punchin_location =
        "[ " +
        punch_details[0].punchin_location.coordinates[0] +
        " , " +
        punch_details[0].punchin_location.coordinates[1] +
        " ]";
    }
    return punchin_location;
  };

  //  ===============================================

  const getPunchOutLocation = (punch_details) => {
    let punchout_location = " ";

    if (punch_details[punch_details.length - 1].punchout_location) {
      punchout_location =
        "[ " +
        punch_details[punch_details.length - 1].punchout_location
          .coordinates[0] +
        " , " +
        punch_details[punch_details.length - 1].punchout_location
          .coordinates[1] +
        " ]";
    }
    return punchout_location;
  };

  //  ===============================================

  const getPunchInSnap = (punch_details) => {
    let punchin_snap = "";

    if (punch_details[0].punchin_face_img_url) {
      punchin_snap = punch_details[0].punchin_face_img_url;
    }

    if (!punchin_snap.startsWith("http")) {
      punchin_snap = "";
    }
    return punchin_snap;
  };

  //  ===============================================

  const getPunchOutSnap = (punch_details) => {
    let punchout_snap = "";

    if (punch_details[0].punchout_face_img_url) {
      punchout_snap = punch_details[0].punchout_face_img_url;
    }
    if (!punchout_snap.startsWith("http")) {
      punchout_snap = "";
    }
    return punchout_snap;
  };

  React.useEffect(() => {
    setIsLoading(true);

    var punches = [];
    props.all_attendances.map((att) => {
      att.punch_details.map((punch) => {
        punches.push({
          ...att,
          punch_details: [punch],
        });
      });
    });
    let sortedAttendence = punches.sort(function (a, b) {
      return (
        new Date(b.punch_details[0].created_at) -
        new Date(a.punch_details[0].created_at)
      );
    });

    setPunchedLogs(sortedAttendence);
    setAllPunchedLogs(sortedAttendence);
    updateEmpOptions(sortedAttendence);
    setIsLoading(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getPunchLogsLandingPage = () => {
    return (
      <React.Fragment>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            position: "relative",
            marginLeft: "82%",
          }}
        >
          {/*  <FormControl
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
          </FormControl> */}

          {/* <FormControl
            variant="outlined"
            style={{
              width: "275px",
              minWidth: "225px",
              marginRight: "auto",
              marginBottom: "10px",
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
              <MenuItem value="All">
                <em>All</em>
              </MenuItem>
              <MenuItem value={10}>Active</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl> */}

          {employees && (
            <Autocomplete
              // value={autocompleteValue}
              id="combo-box-demo"
              options={employees}
              getOptionLabel={(option) =>
                `${option.first_name} ${option.last_name} (${option.emp_code})`
              }
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Employee"
                  variant="outlined"
                />
              )}
              onChange={(e) => {
                setPunchedLogs(allPunchedLogs);
                const regExp = /\(([^)]+)\)/;
                let matches = regExp.exec(e.target.innerText);

                if (matches) {
                  const indexes = allPunchedLogs.map((x, idx) => {
                    if (x.emp_id?.emp_code === matches[1]) return idx;
                    return "";
                  });
                  const filtered_indexes = indexes.filter((el) => {
                    return (
                      el !== null && typeof el !== "undefined" && el !== ""
                    );
                  });

                  setPunchedLogs(
                    getArrayViaIndexes(punchedLogs, filtered_indexes)
                  );
                }
              }}
            />
          )}
        </div>
        {punchedLogs.map((log, idx) => {
          return (
            <div key={idx} className={classes.listContainer}>
              <div className={classes.ProfileCircle}>
                <Typography
                  variant="h6"
                  style={{
                    color: "#1F299C",
                    fontWeight: "500",
                  }}
                >
                  {log.emp_id && getInitialLetters(log.emp_id)}
                </Typography>
              </div>

              {/* <Grid container>
                <Grid item xs={11}> */}
              <Grid
                container
                justifyContent="space-between"
                spacing={2}
                style={{
                  paddingLeft: "10px",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Grid item xs={12} lg={3}>
                  <Typography
                    variant="h6"
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    {getUserName(log.emp_id)} (
                    {log.emp_id && log.emp_id.emp_code})
                  </Typography>

                  <Typography
                    variant="body2"
                    style={{
                      color: "grey",
                      fontWeight: "500",
                    }}
                  >
                    {log.emp_id && log.emp_id.role}
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={3}
                  style={{
                    marginTop: "5px",
                  }}
                >
                  <Typography
                    variant="body2"
                    //   component={"span"}
                    style={{
                      color: "grey",
                      fontWeight: "500",
                    }}
                  >
                    Last Punched IN (Scheduled)&nbsp;
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    // component={"span"}
                    style={{
                      fontWeight: "600",
                    }}
                  >
                    <span style={{ color: "#3d9e5a", textAlign: "center" }}>
                      {getPunchInTime(log.punch_details)}
                    </span>
                    &nbsp;&nbsp;
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
                    marginTop: "5px",
                  }}
                >
                  <Typography
                    variant="body2"
                    // component={"span"}
                    style={{
                      color: "grey",
                      fontWeight: "600",
                    }}
                  >
                    Last Punched OUT (Scheduled)&nbsp;
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    // component={"span"}
                    style={{
                      fontWeight: "800",
                    }}
                  >
                    <span style={{ color: "#e9594a", textAlign: "center" }}>
                      {getPunchOutTime(log.punch_details)}
                    </span>
                    &nbsp;&nbsp;&nbsp; (06:00 PM)
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={12}
                  lg={3}
                  // style={{
                  //     positon:"relative",
                  //     display:"flex",
                  //     flexWrap:"wrap"
                  // }}
                  style={{
                    fontWeight: "700",
                    display: "flex",
                  }}
                >
                  <p style={{ marginTop: "0", marginBottom: "0" }}>
                    Not &nbsp;
                  </p>
                  <div style={{ color: "#e9594a" }}>Scheduled</div>
                </Grid>

                <Grid
                  item
                  xs={12}
                  lg={12}
                  style={{
                    display: "flex",
                  }}
                >
                  <div
                    onClick={(e) => {
                      handleViewDetails(e, log);
                    }}
                    style={{
                      backgroundColor: "#1F299C",
                      padding: "10px",
                      cursor: "pointer",
                      borderRadius: "5px",
                      justifyContent: "center",
                      alignItems: "center",
                      borderWidth: "2px",
                      borderStyle: "solid",
                      borderColor: "#1F299C",
                      height: "10px",
                      minWidth: "100px",
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "auto",
                    }}
                  >
                    <Typography variant="subtitle1" style={{ color: "white" }}>
                      View Details
                    </Typography>
                  </div>
                </Grid>
              </Grid>
              {/* </Grid>
              </Grid> */}
            </div>
          );
        })}
        <Backdrop style={{ zIndex: 9999, color: "#fff" }} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </React.Fragment>
    );
  };

  // --- menu config -------------
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    // setPositionSelected(props);
    // console.log("Opening options for Position ->", props);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // --------------------------------------------------

  // -------- hover events -----------

  const MouseOver = (event) => {
    event.target.style.border = "2px solid rgb(31,41,156)";
  };
  const MouseOut = (event) => {
    event.target.style.border = "2px solid white";
  };

  const getViewDetailsPage = () => {
    if (currentPunchedLog) {
      const log = currentPunchedLog;

      return (
        <Grid
          container
          style={{ textAlign: "left", padding: "0px", margin: "0px" }}
        >
          <Grid
            container
            direction="row"
            style={{ padding: "0px", margin: "0px" }}
          >
            <Grid item xs={12} md={12} lg={7}>
              <div
                onClick={handleViewDetails}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ArrowBack />
                </span>

                <Typography
                  component={"span"}
                  variant="h6"
                  style={{
                    fontWeight: "600",
                  }}
                >
                  &nbsp; {getUserName(log.emp_id)}({" "}
                  {log.emp_id && log.emp_id.emp_code}) &nbsp;
                  <Typography
                    component={"span"}
                    variant="subtitle1"
                    style={{
                      color: "grey",
                    }}
                  >
                    | {log.emp_id && log.emp_id.role}
                  </Typography>
                </Typography>
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              lg={5}
              style={{ display: "inline-flex", flexDirection: "row-reverse" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <KeyboardDatePicker />
                </MuiPickersUtilsProvider>

                <IconButton
                  style={{ padding: "10px" }}
                  id="basic-button"
                  aria-controls="basic-menu"
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={(event) => handleClick(event)}
                >
                  <MoreHoriz style={{ padding: "0px", color: "black" }} />
                </IconButton>

                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem>Share</MenuItem>
                  <MenuItem>Export</MenuItem>
                </Menu>
              </div>
            </Grid>
          </Grid>

          <div style={{ width: "100%" }}>
            <hr
              style={{
                margin: "0px -20px",
              }}
            />
          </div>

          <div
            style={{
              padding: "30px 0px 10px 10px",
              // width:"100%"
            }}
          >
            <Timeline align="left">
              <TimelineItem>
                <TimelineOppositeContent
                  style={{ flex: 0.01 }}
                ></TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot style={{ backgroundColor: "white" }}>
                    <EventIcon
                      style={{ backgroundColor: "white", color: "black" }}
                    />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Typography
                    variant="h6"
                    component={"span"}
                    style={{
                      fontWeight: "700",
                    }}
                  >
                    {log.created_at.substring(8, 10)}-
                    {log.created_at.substring(5, 7)}-
                    {log.created_at.substring(0, 4)}
                  </Typography>
                </TimelineContent>
              </TimelineItem>

              <TimelineItem>
                <TimelineOppositeContent
                  style={{ flex: 0.01 }}
                ></TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot style={{ backgroundColor: "green" }}>
                    <ExitToAppIcon
                      style={{ backgroundColor: "green", color: "white" }}
                    />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent style={{ marginBottom: "20px" }}>
                  <Typography
                    variant="h6"
                    component={"span"}
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    Punched IN: &nbsp;
                  </Typography>
                  <Typography
                    variant="h6"
                    component={"span"}
                    style={{
                      fontWeight: "500",
                      color: "green",
                    }}
                  >
                    {getPunchInTime(log.punch_details)}
                  </Typography>
                  <Typography
                    variant="body1"
                    component={"div"}
                    style={{
                      fontWeight: "500",
                      color: "grey",
                    }}
                  >
                    {getPunchInLocation(log.punch_details)}
                    {/* 198.2726.35142.26352.9098 */}
                  </Typography>
                  {console.log(log)}
                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        height: "150px",
                        width: "300px",
                        minWidth: "200px",
                        margin: "10px",
                      }}
                    >
                      <GoogleMapReact
                        bootstrapURLKeys={{
                          key: process.env.REACT_APP_GOOGLE_API_KEY,
                        }}
                        defaultCenter={{
                          lat:
                            log.punch_details[0]?.punchin_location
                              ?.coordinates[0] || center.lat,
                          lng:
                            log.punch_details[0]?.punchin_location
                              ?.coordinates[1] || center.lng,
                        }}
                        defaultZoom={6}
                        // size = { 200, 200 }
                      >
                        {!!log.punch_details[0]?.punchin_location
                          ?.coordinates[0] && (
                          <EventIcon
                            lat={
                              log.punch_details[0]?.punchin_location
                                ?.coordinates[0]
                            }
                            lng={
                              log.punch_details[0]?.punchin_location
                                ?.coordinates[1]
                            }
                            // lat = {location.coordinates.lat}
                            // lng = {location.coordinates.lng}
                          ></EventIcon>
                        )}
                      </GoogleMapReact>
                    </div>

                    <img
                      src={
                        getPunchInSnap(log.punch_details)
                          ? getPunchInSnap(log.punch_details)
                          : avatarDemo
                      }
                      style={{
                        width: "150px",
                        height: "150px",
                        margin: "10px",
                        border: "2px solid white",
                        borderRadius: "5px",
                      }}
                      alt="img1"
                      onMouseOver={MouseOver}
                      onMouseOut={MouseOut}
                    ></img>
                  </div>
                </TimelineContent>
              </TimelineItem>

              <TimelineItem>
                <TimelineOppositeContent
                  style={{ flex: 0.01 }}
                ></TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot style={{ backgroundColor: "rgb(31,41,156)" }}>
                    <ExitToAppIcon
                      style={{
                        backgroundColor: "rgb(31,41,156)",
                        color: "white",
                      }}
                    />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Typography
                    variant="h6"
                    component={"span"}
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    Punched OUT: &nbsp;
                  </Typography>
                  <Typography
                    variant="h6"
                    className={classes.colorBlue}
                    component={"span"}
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    {getPunchOutTime(log.punch_details)}
                  </Typography>
                  <Typography
                    variant="body1"
                    component={"div"}
                    style={{
                      fontWeight: "500",
                      color: "grey",
                    }}
                  >
                    {getPunchOutLocation(log.punch_details)}
                    {/* 198.2726.35142.26352.9098 */}
                  </Typography>

                  {/* <Typography
                    variant="body1"
                    component={"div"}
                    style={{
                      fontWeight: "500",
                      color: "grey",
                    }}
                  >
                    Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                    Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                    Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                    Lorem ipsum Lorem ipsum Lorem ipsum
                  </Typography> */}

                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        height: "150px",
                        width: "300px",
                        minWidth: "200px",
                        margin: "10px",
                      }}
                    >
                      <GoogleMapReact
                        bootstrapURLKeys={{
                          key: process.env.REACT_APP_GOOGLE_API_KEY,
                        }}
                        defaultCenter={{
                          lat:
                            log.punch_details?.[log.punch_details?.length - 1]
                              ?.punchout_location?.coordinates[0] || center.lat,
                          lng:
                            log.punch_details?.[log.punch_details?.length - 1]
                              .punchout_location?.coordinates[1] || center.lng,
                        }}
                        defaultZoom={6}
                        // size = { 200, 200 }
                      >
                        {!!log.punch_details?.[log.punch_details?.length - 1]
                          .punchout_location?.coordinates[0] && (
                          <EventIcon
                            lat={
                              log.punch_details?.[log.punch_details?.length - 1]
                                .punchout_location?.coordinates[0]
                            }
                            lng={
                              log.punch_details?.[log.punch_details?.length - 1]
                                .punchout_location?.coordinates[1]
                            }
                            // lat = {location.coordinates.lat}
                            // lng = {location.coordinates.lng}
                          ></EventIcon>
                        )}
                      </GoogleMapReact>
                    </div>

                    <img
                      src={
                        getPunchOutSnap(log.punch_details)
                          ? getPunchOutSnap(log.punch_details)
                          : avatarDemo
                      }
                      alt="img2"
                      style={{
                        width: "150px",
                        height: "150px",
                        margin: "10px",
                        border: "2px solid white",
                        borderRadius: "5px",
                      }}
                      onMouseOver={MouseOver}
                      onMouseOut={MouseOut}
                    ></img>
                  </div>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </div>
        </Grid>
        //         </div>
        //     </Grid>
        // </Grid>
      );
    }
  };

  return (
    <React.Fragment>
      {!viewDetails ? getPunchLogsLandingPage() : getViewDetailsPage()}
    </React.Fragment>
  );
};
