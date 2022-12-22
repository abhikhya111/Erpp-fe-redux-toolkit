import React, { useContext } from "react";
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

import useAuth from "hooks/useAuth";

import axios from "axios";
import { useLeavesAttendanceHRStyles } from "./style";
import CommentIcon from "@material-ui/icons/Comment";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import RemarkDialog from "./RemarkDialog";
import Autocomplete from "@material-ui/lab/Autocomplete";
import moment from "moment";
import { ReFetchContext } from "./index";

export const MissedPunchs = (props) => {
  const auth = useAuth();
  const classes = useLeavesAttendanceHRStyles();

  const { getAllAttendance } = useContext(ReFetchContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [allLeavesApproval, setLeavesApproval] = React.useState([]);
  const [openApprove, setOpenApprove] = React.useState(false);
  const [openReject, setOpenReject] = React.useState(false);
  const [openRemarks, setOpenRemarks] = React.useState(false);
  const [currentMissedPunchs, setCurrentMissedPunchs] = React.useState({});
  const [empOptions, setEmpOptions] = React.useState([]);
  const [filteredByStatus, setFilteredByStatus] = React.useState([]);

  const handleApproveDialogOpen = (e, leave_data) => {
    setCurrentMissedPunchs(leave_data);
    setOpenApprove(true);
  };

  const handleRejectDialogOpen = (e, leave_data) => {
    setCurrentMissedPunchs(leave_data);
    setOpenReject(true);
  };

  const handleRemarksDialogOpen = (e, leave_data) => {
    setOpenRemarks(true);
    setCurrentMissedPunchs(leave_data);
  };

  const handleDialogClose = () => {
    setOpenApprove(false);
    setOpenReject(false);
    setOpenRemarks(false);
  };

  const updatePunch = async (leave_status) => {
    setIsLoading(true);
    const missedPunch = currentMissedPunchs.missed_punch_details[0];
    try {
      const userId = currentMissedPunchs.emp_id._id;
      let day = currentMissedPunchs.day;
      let month = currentMissedPunchs.month;
      let year = currentMissedPunchs.year;
      let fromTime = moment(missedPunch[0]?.punchin_time).format(
        "YYYY-MM-DD hh:mm:ss A"
      );
      let toTime = moment(missedPunch[0]?.punchout_time).format(
        "YYYY-MM-DD hh:mm:ss A"
      );
      console.log(day);
      let missedPunchNote = currentMissedPunchs[0]?.missed_punch_note;
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/attendance/missed-punchin`,
        {
          emp_id: userId,
          day: `${day}`,
          month: `${month}`,
          year: `${year}`,
          punchin_time: fromTime,
          punchout_time: toTime,
          missed_punch_note: missedPunchNote || "",
          type: currentMissedPunchs.type,
          status: leave_status.toString(),
        },
        {
          headers: {
            token: auth.token,
          },
        }
      );

      if (response.data.status === true) {
        // setDisplayMessage("Missed Punchin submission successful!");
        await getAllAttendance();
      }
    } catch (err) {
      console.log(err.message);
    }
    setIsLoading(false);
    handleDialogClose();
  };

  //   ==============================================================

  const handleFilterByStatus = (e, status) => {
    e.preventDefault();
    const indexes = props.all_attendances.map((x, idx) =>
      x.status === status ||
      x.status.toUpperCase().includes(status.toUpperCase())
        ? idx
        : ""
    );
    const filtered = indexes.filter((el) => {
      return el !== null && typeof el !== "undefined" && el !== "";
    });

    const newArr = filtered.map((idx) => {
      return props.all_attendances[idx];
    });

    console.log("Filtered by status: ", status, " ", newArr);
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
    // emp_id is actually object with populated user data
    const user_data = optionData.emp_id;
    if (user_data?.first_name) {
      return {
        title: `${user_data.first_name} ${user_data.last_name}`,
        ...user_data,
      };
    }
  };

  const getArrayViaIndexes = (arr, indexesToKeep) => {
    // let element = arr[fromIndex];
    console.log("Array: ", arr);
    console.log("Keep Indexes: ", indexesToKeep);

    let newArr = indexesToKeep.map((idx) => {
      return arr[idx];
    });
    console.log("Filter Leaves to display: ", newArr);
    return newArr;
  };

  const updateEmpOptions = (arr) => {
    let optionsDataArray = [];
    arr.map((item) => {
      return optionsDataArray.push(createSearchBarData(item));
    });

    const filtered = arr.filter((item) => item.emp_id);
    const arrayUniqueByKey = [
      ...new Map(filtered.map((item) => [item.emp_id.emp_code, item])).values(),
    ];

    setEmpOptions(arrayUniqueByKey);
  };

  // =====================================================================
  React.useEffect(() => {
    // ##### used by search box
    if (props.all_attendances) {
      props.all_attendances.sort(function (a, b) {
        var c = new Date(a.created_at);
        var d = new Date(b.created_at);
        return d - c;
      });
      setLeavesApproval(props.all_attendances);
      setFilteredByStatus(props.all_attendances);
      updateEmpOptions(props.all_attendances);
    }
  }, [props]);

  const getInitialLetters = (user) => {
    let initial_letters = "";
    if (user) {
      initial_letters = user.first_name.charAt(0);

      if (user.last_name) {
        initial_letters += user.last_name.charAt(0);
      }
    }
    initial_letters = initial_letters.toUpperCase();
    return initial_letters;
  };

  const getUserName = (user) => {
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

  const getDaysLeft = (leave) => {
    let today_date = new Date();
    let leave_start_date = new Date(leave);

    const days_left = Math.ceil(
      (leave_start_date - today_date) / (1000 * 60 * 60 * 24)
    );

    if (leave.status.toUpperCase().includes("PENDING")) {
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

  const getDuration = (duration) => {
    let numberOfHours = parseFloat(duration).toFixed(2);
    var days = Math.floor(numberOfHours / 24);
    var remainder = numberOfHours % 24;
    var hours = Math.floor(remainder);
    var minutes = Math.floor(60 * (remainder - hours));
    var duration = "Invalid time";
    if (days === 0) {
      if (hours === 0 && minutes > 0) duration = minutes + " minute(s) ";
      else if (hours > 0 && minutes > 0)
        duration = hours + " hour(s) " + minutes + " minute(s) ";
      else if (hours > 0 && minutes === 0) duration = hours + " hour(s) ";
    } else if (days > 0) {
      if (minutes > 0)
        duration =
          days + " day(s) " + hours + " hour(s) " + minutes + " minute(s) ";
      else duration = days + " day(s) " + hours + " hour(s) ";
      if (hours === 0 && minutes === 0) duration = days + " day(s) ";
    }
    return duration;
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
            label='Status'
            id='demo-simple-select'
            onChange={(event) => {
              if (event.target.value === "All") {
                allLeavesApproval.sort(function (a, b) {
                  var c = new Date(a.created_at);
                  var d = new Date(b.created_at);
                  return d - c;
                });
                setFilteredByStatus(allLeavesApproval);
                updateEmpOptions(allLeavesApproval);
                setLeavesApproval(allLeavesApproval);
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
              `${option.emp_id.first_name} ${option.emp_id.last_name} (${option.emp_id.emp_code})`
            }
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Search Employee'
                variant='outlined'
              />
            )}
            onChange={(e) => {
              setLeavesApproval(filteredByStatus);
              const regExp = /\(([^)]+)\)/;
              let matches = regExp.exec(e.target.innerText);
              if (matches) {
                const indexes = filteredByStatus.map((x, idx) =>
                  x.emp_id?.emp_code === matches[1] ? idx : ""
                );

                const filtered_indexes = indexes.filter((el) => {
                  return el !== null && typeof el !== "undefined" && el !== "";
                });
                setFilteredByStatus(filtered_indexes);
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
          return (
            <div key={idx} className={classes.listContainer}>
              <div className={classes.ProfileCircle}>
                <Typography
                  variant='h6'
                  style={{
                    color: "#1F299C",
                    fontWeight: "500",
                  }}
                >
                  {getInitialLetters(leave.emp_id)}
                  {/* NL */}
                </Typography>
              </div>
              {console.log(leave)}
              <Grid container xs={12} style={{ marginLeft: "15px" }}>
                <Grid container xs={12} spacing={2}>
                  <Grid item xs={12} md={10} lg={8}>
                    <Typography
                      variant='h6'
                      style={{
                        fontWeight: "800",
                      }}
                    >
                      {getUserName(leave.emp_id)} (
                      {leave.emp_id && leave.emp_id?.emp_code})
                    </Typography>

                    <Typography
                      variant='body2'
                      style={{
                        color: "grey",
                        fontWeight: "500",
                      }}
                    >
                      {leave.emp_id?.role} | Site Sample Name
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
                        {leave.created_at.substring(8, 10)}-
                        {leave.created_at.substring(5, 7)}-
                        {leave.created_at.substring(0, 4)}
                      </Typography>
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
                    {/* <Grid item xs={12} md={6} lg={2}> */}
                    {/* <Typography
                        variant='body2'
                        style={{
                          color: "grey",
                          fontWeight: "500",
                        }}
                      >
                        Punch Type
                      </Typography>

                      <Typography
                        variant='body1'
                        style={{
                          fontWeight: "800",
                        }}
                      >
                        {leave.type}
                      </Typography> */}
                    {/* </Grid> */}
                    <Grid item xs={12} md={6} lg={4}>
                      <Typography
                        variant='body2'
                        style={{
                          color: "grey",
                          fontWeight: "500",
                        }}
                      >
                        Punchin time
                      </Typography>

                      <Typography
                        variant='body1'
                        style={{
                          fontWeight: "800",
                        }}
                      >
                        {moment(
                          leave.missed_punch_details[0]?.punchin_time
                        ).format("DD-MM-YYYY hh:mm A")}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <Typography
                        variant='body2'
                        style={{
                          color: "grey",
                          fontWeight: "500",
                        }}
                      >
                        Punchout time
                      </Typography>

                      <Typography
                        variant='body1'
                        style={{
                          fontWeight: "800",
                        }}
                      >
                        {moment(
                          leave.missed_punch_details[0]?.punchout_time
                        ).format("DD-MM-YYYY hh:mm A")}
                      </Typography>
                    </Grid>
                    {/* <Grid item xs={12} md={6} lg={2}>
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
                        {getDuration(leave.duration_in_hrs)}
                      </Typography>
                    </Grid> */}
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
                        {leave.status.toUpperCase().includes("PENDING")
                          ? "Pending"
                          : leave.status}
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
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <Typography
              variant='h5'
              style={{
                color: "black",
              }}
            >
              Do you want to <span style={{ color: "#22b749" }}> approve </span>{" "}
              this punch in ?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color='primary'>
            No
          </Button>
          <Button
            onClick={() => {
              updatePunch("Approved");
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
              this punch in ?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color='primary'>
            No
          </Button>
          <Button
            onClick={() => {
              updatePunch("Rejected");
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
            leave_data={currentMissedPunchs}
            after_opn={props.after_opn}
          />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};
