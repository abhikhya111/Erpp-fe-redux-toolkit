import React from "react";
import "@fontsource/roboto";
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Backdrop,
  CircularProgress,
  TextField,
  Typography,
} from "@material-ui/core";
// import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
// import DateFnsUtils from '@date-io/date-fns';
import useAuth from "hooks/useAuth";
// import clsx from "clsx";
// import Api from "../../../hooks/AjaxAction";
import axios from "axios";
import { useLeavesAttendanceHRStyles } from "./style";
// import SearchIcon from "@material-ui/icons/Search";
import CommentIcon from "@material-ui/icons/Comment";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from '@material-ui/core/DialogTitle';
import RemarkDialog from "./RemarkDialog";
import Autocomplete from "@material-ui/lab/Autocomplete";
import moment from "moment";

export const LeavesApprovals = (props) => {
  const auth = useAuth();
  const classes = useLeavesAttendanceHRStyles();

  const [isLoading, setIsLoading] = React.useState(false);
  const [allLeavesApproval, setLeavesApproval] = React.useState([]);
  // const [ allUsers, setAllUsers] = React.useState([{}]);
  // const [currentUserInLoop, setCurrentUserInLoop] = React.useState();
  const [openApprove, setOpenApprove] = React.useState(false);
  const [openReject, setOpenReject] = React.useState(false);
  const [openRemarks, setOpenRemarks] = React.useState(false);
  const [currentLeaveData, setCurrentLeaveData] = React.useState("");
  const [empOptions, setEmpOptions] = React.useState([]);
  const [filteredByStatus, setFilteredByStatus] = React.useState([]);
  // const [ autocompleteValue, setAutocompleteValue] = React.useState({title:""});

  const handleApproveDialogOpen = (e, leave_data) => {
    setCurrentLeaveData(leave_data);
    setOpenApprove(true);
  };

  const handleRejectDialogOpen = (e, leave_data) => {
    setCurrentLeaveData(leave_data);
    setOpenReject(true);
  };

  const handleRemarksDialogOpen = (e, leave_data) => {
    setOpenRemarks(true);
    setCurrentLeaveData(leave_data);
  };

  const handleDialogClose = () => {
    setOpenApprove(false);
    setOpenReject(false);
    setOpenRemarks(false);
  };

  const updateLeave = async (leave_status) => {
    setIsLoading(true);

    let body = {
      // '_id': `${currentLeaveData._id}`,
      _id: currentLeaveData._id,
      user_id: currentLeaveData.user_id._id,
      // 'created_at': currentLeaveData.created_at,
      description: currentLeaveData.description,
      duration: currentLeaveData.duration,
      from: currentLeaveData.from,
      org_id: currentLeaveData.org_id,
      status: leave_status,
      to: currentLeaveData.to,
      type: currentLeaveData.type,
      // 'updated_at': date_now,
    };

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/leaves/update`,
        body,
        {
          headers: {
            token: auth.token,
          },
        }
      );

      if (response.status === 200) {
        const data = response.data.data;
        setIsLoading(false);
        props.after_opn();
      }
    } catch (e) {
      if (e.response) {
        console.log("Error >", e.response);
      }
    }
    handleDialogClose();
  };

  //   ==============================================================

  const handleFilterByStatus = (e, status) => {
    e.preventDefault();
    const indexes = props.all_leaves.map((x, idx) =>
      x.status === status ? idx : ""
    );
    const filtered = indexes.filter((el) => {
      return el !== null && typeof el !== "undefined" && el !== "";
    });

    const newArr = filtered.map((idx) => {
      return props.all_leaves[idx];
    });

    newArr.sort(function (a, b) {
      var c = new Date(a.created_at);
      var d = new Date(b.created_at);
      return d - c;
    });
    setFilteredByStatus(newArr);
    setLeavesApproval(newArr);
    updateEmpOptions(newArr);
  };

  //   ====================================================

  const createSearchBarData = (optionData) => {
    // user_id is actually object with populated user data

    const user_data = optionData.user_id;
    if (user_data?.first_name) {
      return {
        title: `${user_data?.first_name} ${user_data?.last_name}`,
        ...user_data,
      };
    }
  };

  const getArrayViaIndexes = (arr, indexesToKeep) => {
    // let element = arr[fromIndex];
    let newArr = indexesToKeep.map((idx) => {
      return arr[idx];
    });
    return newArr;
  };

  const updateEmpOptions = (arr) => {
    let optionsDataArray = [];
    arr.map((item) => {
      return optionsDataArray.push(createSearchBarData(item));
    });
    let newArray = [];
    let uniqueObject = {};
    for (let i in optionsDataArray) {
      if (optionsDataArray[i]) {
        // Extract the emp code
        let emp_code = optionsDataArray[i]["emp_code"];
        // Use the emp code as the index
        uniqueObject[emp_code] = optionsDataArray[i];
      }
    }
    // Loop to push unique object into array
    for (let i in uniqueObject) {
      newArray.push(uniqueObject[i]);
    }
    setEmpOptions(newArray);
  };
  try {
    // =====================================================================
    React.useEffect(() => {
      // getAllLeavesApproval();

      // ##### used by search box
      if (props.all_leaves) {
        props.all_leaves.sort(function (a, b) {
          var c = new Date(a.created_at);
          var d = new Date(b.created_at);
          return d - c;
        });

        setLeavesApproval(props.all_leaves);
        setFilteredByStatus(props.all_leaves);
        updateEmpOptions(props.all_leaves);
      }
    }, [props]); //eslint-disable-line react-hooks/exhaustive-deps

    // =====================================================================
  } catch (e) {
    console.log(e);
  }
  const getInitialLetters = (user) => {
    // const user =  getUserById(user_id);

    //  using this causing infinite Loop!!!!!!!!!!
    // setCurrentUserInLoop(user);

    let initial_letters = "";
    if (user) {
      initial_letters = user?.first_name?.charAt(0);

      if (user?.last_name) {
        initial_letters += user.last_name?.charAt(0);
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
      user_name = user?.first_name;

      if (user.last_name) {
        user_name += " " + user?.last_name;
      }
    }
    // console.log("Username: ", user_name);
    return user_name;
  };

  // ==============================================

  // const getuserRole = (user) => {
  //     // const user = getUserById(user_id);
  //     if (user){
  //         return user.role
  //     }
  // }

  // ===============================================

  const getDaysLeft = (leave) => {
    let today_date = new Date();
    let leave_start_date = leave.from.split("-");
    leave_start_date = new Date(
      +leave_start_date[2],
      leave_start_date[1] - 1,
      +leave_start_date[0]
    );

    const days_left = Math.ceil(
      (leave_start_date - today_date) / (1000 * 60 * 60 * 24)
    );

    if (leave.status.startsWith("Pending")) {
      if (days_left === 1) {
        return (
          <Grid
            item
            xs={12}
            lg={3}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Typography
              variant='body2'
              style={{
                // add color cond here based on days left
                color: "#e9594a",
                fontWeight: "500",
              }}
            >
              {days_left} Day Left
            </Typography>
          </Grid>
        );
      } else if (days_left <= 0) {
        return (
          <Grid
            item
            xs={12}
            lg={3}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Typography
              variant='body2'
              style={{
                // add color cond here based on days left
                color: "#e9594a",
                fontWeight: "500",
              }}
            >
              Not Responded
            </Typography>
          </Grid>
        );
      } else if (days_left > 1) {
        return (
          <Grid
            item
            xs={12}
            lg={3}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Typography
              variant='body2'
              style={{
                // add color cond here based on days left
                color: "#1F299C",
                fontWeight: "500",
              }}
            >
              {days_left} Days Left
            </Typography>
          </Grid>
        );
      }
    }
  };

  const leaveDuration = (duration) => {
    let numberOfHours = parseFloat(duration).toFixed(2);
    var days = Math.floor(numberOfHours / 8);
    var remainder = numberOfHours % 8;
    var hours = Math.floor(remainder);
    var minutes = Math.floor(60 * (remainder - hours));
    var leaveDuration = "Invalid time";
    if (days === 0) {
      if (hours === 0 && minutes > 0) leaveDuration = minutes + " minute(s) ";
      else if (hours > 0 && minutes > 0)
        leaveDuration = hours + " hour(s) " + minutes + " minute(s) ";
      else if (hours > 0 && minutes === 0) leaveDuration = hours + " hour(s) ";
    } else if (days > 0) {
      if (minutes > 0)
        leaveDuration =
          days + " day(s) " + hours + " hour(s) " + minutes + " minute(s) ";
      else leaveDuration = days + " day(s) " + hours + " hour(s) ";
      if (hours === 0 && minutes === 0) leaveDuration = days + " day(s) ";
    }
    return leaveDuration;
  };

  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          // position:"relative"
        }}
      >
        <FormControl
          variant='outlined'
          style={{
            minWidth: "225px",
            marginRight: "auto",
            marginBottom: "10px",
          }}
        >
          <InputLabel
            // style={{
            //   paddingLeft:"5px"
            // }}
            id='demo-simple-select-label-1'
          >
            Status
          </InputLabel>
          <Select
            labelId='demo-simple-select-label-1'
            label='Schedules'
            id='demo-simple-select'
            onChange={(event) => {
              if (event.target.value === "All") {
                props.all_leaves.sort(function (a, b) {
                  var c = new Date(a.created_at);
                  var d = new Date(b.created_at);
                  return d - c;
                });
                setFilteredByStatus(props.all_leaves);
                updateEmpOptions(props.all_leaves);
                setLeavesApproval(props.all_leaves);
              } else {
                handleFilterByStatus(event, event.target.value);
              }
            }}
          >
            <MenuItem value={"All"}>All</MenuItem>
            <MenuItem value={"Pending"}>Pending</MenuItem>
            <MenuItem value={"Approved"}>Approved</MenuItem>
            <MenuItem value={"Rejected"}>Rejected</MenuItem>
          </Select>
        </FormControl>

        {empOptions && (
          <Autocomplete
            // value={autocompleteValue}
            id='combo-box-demo'
            options={empOptions}
            getOptionLabel={(option) =>
              `${option?.first_name} (${option?.emp_code})`
            }
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Search Employee'
                variant='outlined'
              />
            )}
            // How to add onClick function to close icon?????
            // onClose = {() =>{
            //     console.log("closed");
            //     setLeavesApproval(props.all_leaves)
            // }}
            // closeIcon=""
            onChange={(e) => {
              setLeavesApproval(filteredByStatus);
              const regExp = /\(([^)]+)\)/;
              let matches = regExp.exec(e.target.innerText);

              if (matches) {
                const indexes = filteredByStatus.map((x, idx) =>
                  x.user_id.emp_code === matches[1] ? idx : ""
                );
                const filtered_indexes = indexes.filter((el) => {
                  return el !== null && typeof el !== "undefined" && el !== "";
                });

                // arrayMove(allLeavesApproval, indexes, 0);
                setLeavesApproval(
                  getArrayViaIndexes(filteredByStatus, filtered_indexes)
                );
              }
            }}
          />
        )}
      </div>
      {allLeavesApproval &&
        allLeavesApproval.map((leave, idx) => {
          if (leave.user_id)
            return (
              // <Grid key={idx} container xs={12} md={12} lg={12} style={{ margin: "30px 0px 0px 0px", display: "flex", flexDirection: "row" , textAlign:"left"}}>
              <div key={idx} className={classes.listContainer}>
                {/* <Grid container xs={12} md={12} lg={12} style={{ display: "flex", flexWrap: "nowrap" }}>
                                <Grid item xs={12} md={10} lg={1} style={{ flex: "0 0 4.16666%" }}> */}

                {/* ---------  leave.user_id --> is not just id but all user details --------- */}
                <div className={classes.ProfileCircle}>
                  <Typography
                    variant='h6'
                    style={{
                      color: "#1F299C",
                      fontWeight: "500",
                    }}
                  >
                    {getInitialLetters(leave.user_id)}
                    {/* NL */}
                  </Typography>
                </div>
                {/* </Grid> */}
                <Grid container xs={12} style={{ marginLeft: "15px" }}>
                  <Grid container xs={12} spacing={2}>
                    <Grid item xs={12} md={10} lg={8}>
                      <Typography
                        variant='h6'
                        style={{
                          fontWeight: "800",
                        }}
                      >
                        {getUserName(leave.user_id)} (
                        {leave.user_id && leave.user_id.emp_code})
                      </Typography>

                      <Typography
                        variant='body2'
                        style={{
                          color: "grey",
                          fontWeight: "500",
                        }}
                      >
                        {leave.user_id?.role
                          ? `${leave.user_id.role} | Site Sample Name`
                          : "Not assigned"}
                      </Typography>
                    </Grid>
                    <Grid
                      container
                      xs={12}
                      lg={4}
                      style={{ justifyContent: "flex-end" }}
                    >
                      <Grid
                        item
                        xs={12}
                        md={10}
                        lg={6}
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant='body2'
                          style={{
                            color: "grey",
                            fontWeight: "500",
                          }}
                        >
                          Request Date: &nbsp;
                          {moment(leave.created_at).utc().format("DD-MM-YYYY")}
                        </Typography>
                        {/* <p style={{ marginTop: "0", marginBottom: "0" }}>Request Date: {leave.RequestedDate}</p> */}
                      </Grid>

                      {getDaysLeft(leave)}
                    </Grid>
                  </Grid>

                  <Grid container spacing={1} xs={12}>
                    <Grid
                      container
                      xs={12}
                      lg={8}
                      justifyContent='space-between'
                      style={{ marginTop: "20px" }}
                    >
                      <Grid item xs={12} md={6} lg={2}>
                        {/* <p style={{ marginTop: "0", marginBottom: "0" }}>Leave Type</p> */}
                        <Typography
                          variant='body2'
                          style={{
                            color: "grey",
                            fontWeight: "500",
                          }}
                        >
                          Leave Type
                        </Typography>

                        <Typography
                          variant='body1'
                          style={{
                            fontWeight: "800",
                          }}
                        >
                          {leave.type}
                        </Typography>

                        {/* <h3 style={{ marginTop: "5px", marginBottom: "0" }}>{leave.leaveType}</h3> */}
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        {/* <p style={{ marginTop: "0", marginBottom: "0" }}>Leave Date</p> */}

                        <Typography
                          variant='body2'
                          style={{
                            color: "grey",
                            fontWeight: "500",
                          }}
                        >
                          Leave Date
                        </Typography>

                        <Typography
                          variant='body1'
                          style={{
                            fontWeight: "800",
                          }}
                        >
                          {moment(leave.from).isSame(leave.to) ? (
                            moment(leave.from).utc().format("DD-MM-YYYY")
                          ) : (
                            <>
                              {moment(leave.from).utc().format("DD-MM-YYYY")}
                              <Typography
                                variant='body2'
                                style={{
                                  color: "grey",
                                  display: "inline",
                                  margin: "5px",
                                  fontWeight: "800",
                                }}
                              >
                                to
                              </Typography>
                              {moment(leave.to).utc().format("DD-MM-YYYY")}
                            </>
                          )}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6} lg={2}>
                        <Typography
                          variant='body2'
                          style={{
                            color: "grey",
                            fontWeight: "500",
                          }}
                        >
                          Duration
                        </Typography>

                        <Typography
                          variant='body1'
                          style={{
                            fontWeight: "800",
                          }}
                        >
                          {leaveDuration(leave.duration)}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6} lg={3}>
                        <Typography
                          variant='body2'
                          style={{
                            color: "grey",
                            fontWeight: "500",
                          }}
                        >
                          Status
                        </Typography>

                        <Typography
                          variant='body1'
                          style={{
                            fontWeight: "800",
                            // add color cond here
                            color:
                              leave.status === "Approved"
                                ? "#22b749"
                                : leave.status === "Rejected"
                                ? "#e9594a"
                                : "#1F299C",
                          }}
                        >
                          {leave.status}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      spacing={1}
                      xs={12}
                      lg={4}
                      style={{
                        display: "flex",
                        placeContent: "end",
                        alignItems: "flex-end",
                        justifyContent: "space-evenly",
                        textAlign: "right",
                        cursor: "pointer",
                      }}
                    >
                      <Grid item xs={12} md={3} lg={2}>
                        <h3
                          style={{
                            marginBottom: "6px",
                            color: "#1F299C",
                            display: "flex",
                            alignItems: "flex-end",
                            placeContent: "flex-end",
                            textAlign: "right",
                          }}
                          onClick={(e) => handleRemarksDialogOpen(e, leave)}
                        >
                          <CommentIcon /> &nbsp; Remark
                        </h3>
                      </Grid>
                      <Grid item xs={12} md={3} lg={2}>
                        <Button
                          style={{ color: "#e9594a", borderColor: "#e9594a" }}
                          variant='outlined'
                          onClick={(e) => {
                            handleRejectDialogOpen(e, leave);
                          }}
                        >
                          Reject
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={3} lg={2}>
                        <Button
                          style={{ color: "#22b749", borderColor: "#22b749" }}
                          variant='outlined'
                          onClick={(e) => {
                            handleApproveDialogOpen(e, leave);
                          }}
                        >
                          Approve
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            );
        })}

      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color='inherit' />
      </Backdrop>

      {/* ----------  Approve Dialog ---------------------- */}
      <Dialog
        open={openApprove}
        onClose={handleDialogClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        {/* <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <Typography
              variant='h5'
              style={{
                color: "black",
              }}
            >
              Do you want to <span style={{ color: "#22b749" }}> approve </span>{" "}
              this leave ?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color='primary'>
            No
          </Button>
          <Button
            onClick={() => {
              updateLeave("Approved");
            }}
            color='primary'
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/*------------- Reject Dialog ----------------------  */}
      <Dialog
        open={openReject}
        onClose={handleDialogClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        {/* <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <Typography
              variant='h5'
              style={{
                color: "black",
              }}
            >
              Do you want to <span style={{ color: "#e9594a" }}> reject </span>{" "}
              this leave ?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color='primary'>
            No
          </Button>
          <Button
            onClick={() => {
              updateLeave("Rejected");
            }}
            color='primary'
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/*------------------- Remark Dialog -------------  */}
      <Dialog
        open={openRemarks}
        maxWidth='sm'
        fullWidth
        // TransitionComponent={Transition}
        keepMounted
        aria-describedby='alert-dialog-slide-description'
        PaperProps={{
          style: {
            position: "absolute",
            margin: "0px",
            padding: "0px",
            right: "0px",
            minHeight: "115vh",
            top: "0px",
            borderRadius: "0px",
          },
        }}
      >
        <DialogContent
          style={{
            margin: "0px",
            padding: "0px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <RemarkDialog
            closeForm={handleDialogClose}
            leave_data={currentLeaveData}
            after_opn={props.after_opn}
          />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};
