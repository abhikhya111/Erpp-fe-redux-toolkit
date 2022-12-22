import React from "react";
import "@fontsource/roboto";
import {
  Button,
  Grid,
  Paper,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  Typography
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
// import useAuth from "hooks/useAuth";
// import clsx from "clsx";
// import Api from "../../../hooks/AjaxAction";
// import axios from "axios";
import { useLeavesAttendanceHRStyles } from "./style";
import ArrowBack from "@material-ui/icons/ArrowBack";
import {
  Scheduler,
  DayView,
  Appointments
} from "@devexpress/dx-react-scheduler-material-ui";
import { ViewState } from "@devexpress/dx-react-scheduler";
import Autocomplete from "@material-ui/lab/Autocomplete";

const currentDate = "2018-11-01";
const schedulerData = [
  {
    startDate: "2018-11-01T09:45",
    endDate: "2018-11-01T11:00",
    title: "(Afternoon Shift) 9 Hrs"
  },
  {
    startDate: "2018-11-01T12:00",
    endDate: "2018-11-01T13:30",
    title: "(Evening Shift)"
  },
  {
    startDate: "2018-11-02T12:00",
    endDate: "2018-11-02T13:30",
    title: "(Afternoon Shift)"
  }
];

export const TimeTracker = props => {
  // const auth = useAuth();
  // const [isLoading, setIsLoading] = React.useState(false);
  const [timeTracker, setTimeTracker] = React.useState([]);
  const [viewDetails, setViewDetils] = React.useState(false);
  const [empOptions, setEmpOptions] = React.useState([]);

  const handleViewDetails = () => setViewDetils(!viewDetails);

  const getInitialLetters = user => {
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
  const createSearchBarData = optionData => {
    // user_id is actually object with populated user data
    console.log("Create search bar iterative data: ", optionData);
    const user_data = optionData.emp_id;
    if (user_data && user_data.first_name) {
      return {
        title: `${user_data.first_name} ${user_data.last_name}`,
        ...user_data
      };
    }
  };

  const getArrayViaIndexes = (arr, indexesToKeep) => {
    // let element = arr[fromIndex];
    console.log("Array: ", arr);
    console.log("Keep Indexes: ", indexesToKeep);

    let newArr = indexesToKeep.map(idx => {
      return arr[idx];
    });
    console.log("Filter Leaves to display: ", newArr);
    return newArr;
  };

  const updateEmpOptions = arr => {
    let optionsDataArray = [];

    arr.map(item => {
      return optionsDataArray.push(createSearchBarData(item));
    });

    console.log("Options Data Array: ", optionsDataArray);
    // removing undefined
    optionsDataArray = optionsDataArray.filter(n => n);
    console.log("Options Data Array non null: ", optionsDataArray);

    // removing duplicates from options

    // Declare a new array
    let newArray = [];

    // Declare an empty object
    let uniqueObject = {};

    // Loop for the array elements
    for (let i in optionsDataArray) {
      // Extract the emp code
      let emp_code = optionsDataArray[i]["emp_code"];

      // Use the emp code as the index
      uniqueObject[emp_code] = optionsDataArray[i];
    }

    // Loop to push unique object into array
    for (let i in uniqueObject) {
      newArray.push(uniqueObject[i]);
    }

    console.log("Options Data Array non null without duplicates: ", newArray);
    setEmpOptions(newArray);
  };

  React.useEffect(() => {
    // API call goes here
    setTimeTracker(props.all_attendances);
    if (props.all_attendances) {
      updateEmpOptions(props.all_attendances);
    }
  }, [props.all_attendances]); // eslint-disable-line react-hooks/exhaustive-deps

  const getTimeTrackerLandingPage = () => {
    return (
      <React.Fragment>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            position: "relative"
          }}
        >
          {empOptions && (
            <Autocomplete
              // value={autocompleteValue}
              id="combo-box-demo"
              options={empOptions}
              getOptionLabel={option =>
                `${option.first_name} (${option.emp_code})`
              }
              style={{ width: 300 }}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Search Employee"
                  variant="outlined"
                />
              )}

              onChange={e => {
                console.log("Selected Employee -------->", e.target.innerText);

                setTimeTracker(props.all_attendances);

                const regExp = /\(([^)]+)\)/;
                let matches = regExp.exec(e.target.innerText);
                matches && console.log("matches --> ", matches[1]);

                console.log("props.all_attendances: ", props.all_attendances);

                if (matches) {
                  const indexes = props.all_attendances.map((x, idx) =>
                    (x.emp_id && x.emp_id.emp_code) === matches[1] ? idx : ""
                  );
                  console.log(
                    "Total unfiltered timesheets indexes: ",
                    indexes
                  );
                  const filtered_indexes = indexes.filter(el => {
                    return (
                      el !== null && typeof el !== "undefined" && el !== ""
                    );
                  });
                  console.log(
                    "Total Filtered leaves indexes: ",
                    filtered_indexes
                  );
                  // arrayMove(allLeavesApproval, indexes, 0);
                  setTimeTracker(
                    getArrayViaIndexes(
                      props.all_attendances,
                      filtered_indexes
                    )
                  );
                }
              }}
            />
          )}

          {/* <FormControl
            variant="outlined"
            style={{
              // width:"375px",
              width: "48%",
              minWidth: "225px",
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
        </div>

        {timeTracker.map((log, idx) => {
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
                    {getUserName(log.emp_id)} (
                    {log.emp_id && log.emp_id.emp_code})
                  </Typography>

                  <Typography
                    variant="body2"
                    style={{
                      color: "grey",
                      fontWeight: "500"
                    }}
                  >
                    {log.emp_id && log.emp_id.role} | Site Sample Name
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={3}
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
                    Last Punched IN (Scheduled)&nbsp;
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    // component={"span"}
                    style={{
                      fontWeight: "600"
                    }}
                  >
                    <span style={{ color: "#3d9e5a", textAlign: "center" }}>
                      {getPunchInTime(log.punch_details)}
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
                    Last Punched OUT (Scheduled)&nbsp;
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    // component={"span"}
                    style={{
                      fontWeight: "800"
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
                  lg={2}
                  style={{
                    display: "flex"
                  }}
                >
                  <div
                    onClick={handleViewDetails}
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
                      marginLeft: "auto"
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
      </React.Fragment>
    );
  };

  const getViewDetailsPage = () => {
    return (
      // <Grid xs={12} md={6} lg={12} direction="row" style={{textAlign: "left", padding: "0px 0px 20px 10px"}}>
      //     <Grid container xs={12} md={12} lg={12} style={{marginTop: "50px"}}>
      //         <div style={{ backgroundColor: "#FFFFFF",
      //             margin: "100px 10px 0px, 10px",
      //             padding: "15px",
      //             height: "100%",
      //             width: "100%",
      //             borderRadius: "5px",
      //             display: "flex", flexDirection: "column" }}>
      // <Grid direction="row" style={{textAlign: "left", padding: "0px 10px 20px 10px"}}>
      //     <Grid direction="row">
      //     <Grid direction="row" style={{display: "flex", flexDirection: "row"}}>
      //             <Grid item xs={12} md={12} lg={10} style={{}}>
      <Grid
        container
        style={{ textAlign: "left", padding: "0px", margin: "0px" }}
      >
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          style={{ padding: "0px", margin: "0px" }}
        >
          <Grid item xs={12} md={12} lg={7}>
            <div
              onClick={handleViewDetails}
              style={{ display: "flex", flexDirection: "row" }}
            >
              <span
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <ArrowBack />
              </span>

              {/* <h2 style={{marginRight: "10px"}}>Name LastName (E123456789) </h2> <p style={{display: "flex", alignItems: "center", marginRight: "10px"}}> | Business Analyst | Site Simple name</p> */}

              <Typography
                component={"span"}
                variant="h6"
                style={{
                  fontWeight: "600"
                }}
              >
                &nbsp; Name LastName (E234567) &nbsp;
                <Typography
                  component={"span"}
                  variant="subtitle1"
                  style={{
                    color: "grey"
                  }}
                >
                  | Business Analyst | Site Sample Name
                </Typography>
              </Typography>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={2}
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center"
            }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{
                backgroundColor: "#1F299C",
                marginLeft: "auto"
              }}
            >
              Add Break
            </Button>
          </Grid>
        </Grid>

        <div style={{ width: "100%" }}>
          <hr
            style={{
              margin: "10px -20px"
            }}
          />
        </div>

        <Grid
          item
          xs={12}
          md={12}
          lg={12}
          style={{ display: "flex", flexDirection: "row" }}
        >
          <Grid item xs={12} md={12} lg={3} style={{}}>
            <FormControl style={{ width: "250px" }}>
              <InputLabel id="demo-simple-select-label">Last Week</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12} lg={3} style={{}}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label=""
                name="expected_relieving_date"
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            lg={2}
            style={{
              paddingRight: "45px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: "35px"
            }}
          >
            <span className={classes.dotBlue}></span>
            <p style={{ margin: "0px 0px 0px 2px", fontSize: "1em" }}>
              Scheduled Shift
            </p>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            lg={2}
            style={{
              paddingRight: "45px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: "35px"
            }}
          >
            <span className={classes.dotPink}></span>
            <p style={{ margin: "0px 0px 0px 2px", fontSize: "1em" }}>
              Lunch Break
            </p>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            lg={2}
            style={{
              paddingRight: "45px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: "35px"
            }}
          >
            <span className={classes.dotBlue}></span>
            <p style={{ margin: "0px 0px 0px 2px", fontSize: "1em" }}>
              Shift in Progress
            </p>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            lg={2}
            style={{
              paddingRight: "45px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: "35px"
            }}
          >
            <span className={classes.dotPink}></span>
            <p style={{ margin: "0px 0px 0px 2px", fontSize: "1em" }}>
              Completed
            </p>
          </Grid>
        </Grid>
        <Grid
          container
          xs={12}
          md={12}
          lg={12}
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Paper>
            <Scheduler data={schedulerData}>
              <ViewState currentDate={currentDate} />
              <DayView startDayHour={9} endDayHour={14} />
              <Appointments />
            </Scheduler>
          </Paper>
        </Grid>
      </Grid>
      //          </div>
      //     </Grid>
      // </Grid>
    );
  };

  const classes = useLeavesAttendanceHRStyles();
  return (
    <React.Fragment>
      {!viewDetails ? getTimeTrackerLandingPage() : getViewDetailsPage()}
    </React.Fragment>
  );
};
