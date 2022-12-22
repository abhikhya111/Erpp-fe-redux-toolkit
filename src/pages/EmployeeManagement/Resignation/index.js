import React from "react";
import "@fontsource/roboto";
import {
  Button,
  Grid,
  Input,
  Backdrop,
  Paper,
  TablePagination,
  TextField,
  Checkbox,
  InputLabel,
  MenuItem,
  FormControl,
  Typography,
  Select,
  CircularProgress,
  Dialog,
  DialogContent,
  Hidden,
} from "@material-ui/core";
// import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
// import DateFnsUtils from '@date-io/date-fns';
import useAuth from "hooks/useAuth";
import clsx from "clsx";
// import Api from "../../../hooks/AjaxAction";
import { useResignationHRStyles } from "./style";
import axios from "axios";
import ArrowBack from "@material-ui/icons/ArrowBack";
import CloudDownload from "@material-ui/icons/CloudDownload";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";
import CommentIcon from "@material-ui/icons/Comment";
import RemarkDialog from "./RemarkDialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import Autocomplete from "@material-ui/lab/Autocomplete";

export const ResignationHR = (props) => {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  const classes = useResignationHRStyles();
  const auth = useAuth();

  const [isLoading, setIsLoading] = React.useState(false);
  const [allResignations, setAllResignations] = React.useState([]);
  const [viewDetails, setViewDetails] = React.useState(false);
  const [openRemarks, setOpenRemarks] = React.useState(false);
  const [currentResignData, setCurrentResignData] = React.useState("");
  const [openApprove, setOpenApprove] = React.useState(false);
  const [openReject, setOpenReject] = React.useState(false);
  const [approverComment, setApproverComment] = React.useState("");
  const [isChecked, setIsChecked] = React.useState(false);
  const [empOptions, setEmpOptions] = React.useState([]);
  const [filteredByStatus, setFilteredByStatus] = React.useState([]);
  const [staticAllResignations, setStaticAllResignations] = React.useState([]);
  const [paginatedData, setPaginatedData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const QueriesAllTicketContext = React.createContext(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    // getAllLeavesApproval(newPage, rowsPerPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  const handleApproveDialogOpen = (e, rs) => {
    // setCurrentLeaveData(leave_data)
    setOpenApprove(true);
  };

  const handleRejectDialogOpen = (e, rs) => {
    // setCurrentLeaveData(leave_data)
    setOpenReject(true);
  };

  const handleRemarksDialogOpen = (e, leave_data) => {
    setOpenRemarks(true);
    setCurrentResignData(leave_data);
  };

  const handleDialogClose = () => {
    setOpenRemarks(false);
    setOpenApprove(false);
    setOpenReject(false);
    setIsChecked(false);
    setApproverComment("");
    setViewDetails(false);
  };

  const handleViewDetails = (e, rs) => {
    setCurrentResignData(rs);
    setViewDetails(!viewDetails);
  };

  const updateResignation = async (rs_status) => {
    setIsLoading(true);
    let body = {
      _id: currentResignData._id,
      // 'user_id': currentResignData.user_id._id,
      date_of_resign: currentResignData.date_of_resign,
      reason_of_leave: currentResignData.reason_of_leave,
      expected_relieving_date: currentResignData.expected_relieving_date,
      attachment_url: currentResignData.attachment_url,
      terms_n_conditions: currentResignData.terms_n_conditions,
      leaving_comment: currentResignData.leaving_comment,
      resignationStatus: rs_status,
      approver_comment: {
        comment: approverComment,
        user_id: auth.user._id,
        date_time: new Date(),
      },
    };

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/resignation/update`,
        body,
        {
          headers: {
            token: auth.token,
          },
        }
      );

      if (response.status === 200) {
        const data = response.data.data;
        // setLeavesApproval(data);
        console.log("Resignation updated: ", data);
        getAllResignApplications();
        setIsLoading(false);
      }
    } catch (e) {
      if (e.response) {
        console.log("Error >", e.response);
      }
    }

    setTimeout(() => {
      setIsLoading(false);
      handleDialogClose();
    }, 2000);
  };

  const getAllResignApplications = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/resignation/getAllResignations`,
        {
          headers: {
            token: auth.token,
          },
        }
      );

      if (response.status === 200) {
        const data = response.data.data;
        setStaticAllResignations(data);
        setAllResignations(data);
        setFilteredByStatus(data);
        updateEmpOptions(data);
        setIsLoading(false);
        console.log("AllResignations: ", data);
      }
    } catch (e) {
      if (e.response) {
        console.log("Error >", e.response);
      }
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleFilterByStatus = (e, status) => {
    e.preventDefault();
    const indexes = staticAllResignations.map((x, idx) =>
      x.resignationStatus === status ? idx : ""
    );
    const filtered = indexes.filter((el) => {
      return el !== null && typeof el !== "undefined" && el !== "";
    });

    const newArr = filtered.map((idx) => {
      return staticAllResignations[idx];
    });

    console.log("Filtered by status: ", status, " ", newArr);
    setFilteredByStatus(newArr);
    setAllResignations(newArr);
    updateEmpOptions(newArr);
    // setAutocompleteValue({title:""});
  };

  //   ====================================================
  //Edited by abhikhya 
  const getPaginatedData = (resignationData) => {
    let startIndex = page * rowsPerPage;
    let lastIndex = startIndex + rowsPerPage;
    const filteredData = resignationData.filter((item, index) => (index >= startIndex && index < lastIndex));
    setPaginatedData(filteredData);

  }
  //Edited by abhikhya




  const createSearchBarData = (optionData) => {
    // user_id is actually object with populated user data
    console.log("Create search bar iterative data: ", optionData);
    const user_data = optionData.user_id;
    if (user_data) {
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

    console.log("Options Data Array: ", optionsDataArray);

    // removing duplicates from options

    // Declare a new array
    let newArray = [];

    // Declare an empty object
    let uniqueObject = {};

    // Loop for the array elements
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

    console.log("Options Data Array non null without duplicates: ", newArray);
    // removing undefined
    newArray.pop();
    setEmpOptions(newArray);
  };

  //   ========================================================

  React.useEffect(() => {
    // API call goes here
    getAllResignApplications();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  //   ========================================================
  React.useEffect(() => {
    getPaginatedData(allResignations);
  }, [page, rowsPerPage, allResignations]);
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

  const getUserName = (user) => {
    // const user = getUserById(user_id);
    console.log("user: ", user);
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

  const getDaysLeft = (rs) => {
    let today_date = new Date();
    let rs_start_date = rs.date_of_resign.substring(0, 10).split("-");
    rs_start_date = new Date(rs_start_date);

    const days_left = Math.ceil(
      (rs_start_date - today_date) / (1000 * 60 * 60 * 24)
    );

    if (rs.resignationStatus) {
      if (rs.resignationStatus.startsWith("Pending")) {
        if (days_left === 1) {
          return (
            <Grid
              item
              xs={12}
              lg={2}
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
              lg={2}
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
              lg={2}
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
    }
  };

  const getResignationLandingPage = () => {
    return (
      <React.Fragment>
        <div className={classes.root}>
          <ThemeProvider theme={theme}>
            <main
              className={clsx(classes.content, {
                [classes.contentShift]: props.isDrawerOpen,
              })}
            >
              <Typography
                style={{
                  textAlign: "left",
                  minWidth: "230px",
                }}
              >
                Home {">"} Employee Management {">"} Resignation
              </Typography>

              <Paper
                style={{
                  padding: "20px 20px 50px 20px",
                  minWidth: "230px",
                  marginTop: "20px",
                  minHeight: "800px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    position: "relative",
                  }}
                >
                  <Typography
                    variant='h4'
                    style={{
                      color: "#1F299C",
                      width: "100%",
                      textAlign: "left",
                      marginBottom: "30px",
                      fontWeight: "600",
                    }}
                  >
                    Resignations ({allResignations.length})
                  </Typography>

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
                          setFilteredByStatus(staticAllResignations);
                          updateEmpOptions(staticAllResignations);
                          setAllResignations(staticAllResignations);
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
                        `${option.first_name} (${option.emp_code})`
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
                        console.log(
                          "Selected Employee -------->",
                          e.target.innerText
                        );

                        setAllResignations(filteredByStatus);

                        const regExp = /\(([^)]+)\)/;
                        let matches = regExp.exec(e.target.innerText);
                        matches && console.log("matches --> ", matches[1]);

                        if (matches) {
                          const indexes = filteredByStatus.map((x, idx) =>
                            x.user_id && x.user_id.emp_code === matches[1]
                              ? idx
                              : ""
                          );
                          console.log(
                            "Total unfiltered resignations indexes: ",
                            indexes
                          );
                          const filtered_indexes = indexes.filter((el) => {
                            return (
                              el !== null &&
                              typeof el !== "undefined" &&
                              el !== ""
                            );
                          });
                          console.log(
                            "Total Filtered Resignations indexes: ",
                            filtered_indexes
                          );
                          // arrayMove(allLeavesApproval, indexes, 0);
                          setAllResignations(
                            getArrayViaIndexes(
                              filteredByStatus,
                              filtered_indexes
                            )
                          );
                        }
                      }}
                    />
                  )}
                </div>

                {paginatedData.map((rs, idx) => {
                  return (
                    // <Grid container xs={12} md={12} lg={12} style={{margin: "30px 0px 0px 0px", display: "flex", flexDirection: "row"}}>
                    <div key={idx} className={classes.listContainer}>
                      {/* <Grid container xs={12} md={12} lg={12} style={{display: "flex", flexWrap: "nowrap"}}>
                            <Grid item xs={12} md={10} lg={1} style={{flex: "0 0 4.16666%"}}> */}
                      <div className={classes.ProfileCircle}>
                        <Typography
                          variant='h6'
                          style={{
                            color: "#1F299C",
                            fontWeight: "500",
                          }}
                        >
                          {/* NL */}
                          {getInitialLetters(rs.user_id)}
                        </Typography>
                      </div>

                      <Grid container style={{ marginLeft: "15px" }}>
                        <Grid container spacing={2} style={{}}>
                          <Grid item xs={12} md={10} lg={7}>
                            {/* <h2 style={{marginTop: "0", marginBottom: "0"}}>{shift.userName} ({shift.userId}) <span style={{fontSize: "20px"}}>| {shift.designation}</span></h2> */}
                            <Typography
                              variant='h6'
                              component={"span"}
                              style={{
                                fontWeight: "800",
                              }}
                            >
                              {getUserName(rs.user_id)} (
                              {rs.user_id && rs.user_id.emp_code})
                            </Typography>

                            <Typography
                              variant='body2'
                              // component = {"span"}
                              style={{
                                color: "grey",
                                fontWeight: "500",
                                display: "inline-block",
                              }}
                            >
                              &nbsp; | &nbsp; {rs.user_id && rs.user_id.role}
                            </Typography>
                          </Grid>

                          {/* <Grid container style={{justifyContent: "flex-end"}}> */}
                          <Grid
                            item
                            xs={12}
                            lg={2}
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                              alignItems: "center",
                              marginLeft: "auto",
                            }}
                          >
                            {/* <p style={{marginTop: "0", marginBottom: "0"}}>Request Date: {shift.requestedDate}</p> */}
                            <Typography
                              variant='body2'
                              style={{
                                color: "grey",
                                fontWeight: "500",
                              }}
                            >
                              Request Date: &nbsp;
                              {rs.created_at.substring(8, 10)}-
                              {rs.created_at.substring(5, 7)}-
                              {rs.created_at.substring(0, 4)}
                            </Typography>
                          </Grid>

                          {getDaysLeft(rs)}
                          {/* </Grid> */}
                        </Grid>

                        {/* <Grid container xs={12}spacing={1}> */}
                        <Grid container style={{ marginTop: "20px" }}>
                          <Grid item xs={12} md={6} lg={2}>
                            {/* <p style={{marginTop: "0", marginBottom: "0"}}>Shift</p> */}
                            <Typography
                              variant='body2'
                              style={{
                                color: "grey",
                                fontWeight: "500",
                              }}
                            >
                              Date of Resignation
                            </Typography>
                            {/* <h3 style={{marginTop: "5px", marginBottom: "0"}}>{shift.shift}</h3> */}
                            <Typography
                              variant='body1'
                              style={{
                                fontWeight: "800",
                              }}
                            >
                              {rs.date_of_resign.substring(8, 10)}-
                              {rs.date_of_resign.substring(5, 7)}-
                              {rs.date_of_resign.substring(0, 4)}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} md={6} lg={2}>
                            {/* <p style={{marginTop: "0", marginBottom: "0"}}>Shift Date</p> */}
                            <Typography
                              variant='body2'
                              style={{
                                color: "grey",
                                fontWeight: "500",
                              }}
                            >
                              Expected Relieving Date
                            </Typography>
                            {/* <h3 style={{marginTop: "5px", marginBottom: "0"}}>{shift.shiftDate}</h3> */}
                            <Typography
                              variant='body1'
                              style={{
                                fontWeight: "800",
                              }}
                            >
                              {rs.expected_relieving_date.substring(8, 10)}-
                              {rs.expected_relieving_date.substring(5, 7)}-
                              {rs.expected_relieving_date.substring(0, 4)}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} md={6} lg={3}>
                            {/* <p style={{marginTop: "0", marginBottom: "0"}}>Time</p> */}
                            <Typography
                              variant='body2'
                              style={{
                                color: "grey",
                                fontWeight: "500",
                              }}
                            >
                              Reason for Leaving
                            </Typography>
                            {/* <h3 style={{marginTop: "5px", marginBottom: "0"}}>{shift.time}</h3> */}
                            <Typography
                              variant='body1'
                              style={{
                                fontWeight: "800",
                              }}
                            >
                              {rs.reason_of_leave}
                            </Typography>
                          </Grid>

                          <Grid
                            item
                            xs={12}
                            md={12}
                            lg={1}
                            style={{ marginLeft: "auto" }}
                          >
                            <Typography
                              variant='body2'
                              style={{
                                color: "grey",
                                fontWeight: "500",
                              }}
                            >
                              Status
                            </Typography>
                            {/* <h3 style={{marginTop: "5px", marginBottom: "0", color: "#1F299C"}}>{shift.status}</h3> */}
                            <Typography
                              variant='body1'
                              style={{
                                fontWeight: "800",
                                // add color cond here
                                color: "#1F299C",
                              }}
                            >
                              {rs.resignationStatus
                                ? rs.resignationStatus
                                : "------"}
                            </Typography>
                          </Grid>

                          <Grid
                            item
                            xs={12}
                            md={9}
                            lg={2}
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                              alignItems: "center",
                            }}
                          >
                            <h3
                              style={{
                                marginBottom: "6px",
                                color: "#1F299C",
                                display: "flex",
                                alignItems: "flex-end",
                                placeContent: "flex-end",
                                textAlign: "right",
                                cursor: "pointer",
                              }}
                              onClick={(e) => handleRemarksDialogOpen(e, rs)}
                            >
                              <CommentIcon /> &nbsp; Remark
                            </h3>
                          </Grid>

                          <Grid
                            item
                            xs={12}
                            md={3}
                            lg={2}
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                backgroundColor: "#1F299C",
                                cursor: "pointer",
                                height: "40px",
                                width: "100px",
                                borderRadius: "10px",
                                justifyContent: "center",
                                alignItems: "center",
                                borderWidth: "2px",
                                borderStyle: "solid",
                                borderColor: "#1F299C",
                                display: "flex",
                                flexDirection: "column",
                              }}
                              onClick={(e) => {
                                handleViewDetails(e, rs);
                              }}
                            >
                              <Typography
                                variant='subtitle2'
                                style={{ color: "#FFFFFF" }}
                              >
                                View Details
                              </Typography>
                            </div>
                          </Grid>
                        </Grid>
                      </Grid>
                    </div>
                  );
                })}
                <TablePagination
                  style={{ backgroundColor: "#F7F8FC" }}
                  rowsPerPageOptions={[25, 50]}
                  component="div"
                  count={allResignations.length}
                  rowsPerPage={rowsPerPage}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  page={page}
                />

                Resignations

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
                      minHeight: "100vh",
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
                      resign_data={currentResignData}
                    />
                  </DialogContent>
                </Dialog>
              </Paper>
            </main>
          </ThemeProvider>
        </div>
        <Backdrop className={classes.backdrop} open={isLoading}>
          <CircularProgress color='inherit' />
        </Backdrop>
      </React.Fragment>
    );
  };

  const getViewDetailsPage = () => {
    if (currentResignData) {
      const rs = currentResignData;
      let enable_changes = true;
      if (rs.resignationStatus && rs.resignationStatus !== "Pending") {
        enable_changes = false;
      }

      return (
        <React.Fragment>
          <div className={classes.root}>
            <ThemeProvider theme={theme}>
              <main
                className={clsx(classes.content, {
                  [classes.contentShift]: props.isDrawerOpen,
                })}
              >
                <Typography
                  style={{
                    textAlign: "left",
                    minWidth: "230px",
                  }}
                >
                  Home {">"} Employee Management {">"} Resignation
                </Typography>

                <Paper
                  style={{
                    padding: "20px",
                    minWidth: "230px",
                    marginTop: "20px",
                    // minHeight: "800px"
                  }}
                >
                  <Grid
                    container
                    style={{ textAlign: "left", padding: "0px", margin: "0px" }}
                  >
                    {/* <Grid container direction="row" style={{ padding: "0px", margin:'0px'}}> */}
                    <Grid item xs={12} md={12} lg={7}>
                      <div
                        onClick={handleViewDetails}
                        style={{ display: "flex", flexDirection: "row" }}
                      >
                        <span
                          style={{
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            paddingRight: "10px",
                          }}
                        >
                          <ArrowBack />
                        </span>
                        <Typography
                          component={"span"}
                          variant='h6'
                          style={{
                            fontWeight: "600",
                          }}
                        >
                          {/* Name LastName (E234567) &nbsp; */}
                          {rs.user_id && getUserName(rs.user_id)} (
                          {rs.user_id && rs.user_id._id}) &nbsp;
                          <Typography
                            component={"span"}
                            variant='subtitle1'
                            style={{
                              color: "grey",
                            }}
                          >
                            {/* | Business Analyst | Site Sample Name */}
                            &nbsp; | &nbsp; {rs.user_id && rs.user_id.role}
                          </Typography>
                        </Typography>
                      </div>
                    </Grid>

                    <div style={{ width: "100%", marginTop: "10px" }}>
                      <hr
                        style={{
                          margin: "0px -20px",
                        }}
                      />
                    </div>

                    <Typography
                      variant='h6'
                      style={{
                        color: "#0D47A1",
                        fontWeight: "600",
                        margin: "20px 0px",
                      }}
                    >
                      Employee Profile
                    </Typography>

                    <Grid container justifyContent='space-between' spacing={1}>
                      <Grid item xs={6} md={4} lg={3}>
                        <Typography
                          variant='body1'
                          style={{
                            fontWeight: "800",
                            color: "#1A237E",
                          }}
                        >
                          Date of Joining
                        </Typography>

                        <Typography
                          variant='body1'
                          style={{
                            color: "grey",
                            // fontWeight:"500"
                          }}
                        >
                          {/* 12-05-2021 */}
                          {rs.user_id && rs.user_id.doj.substring(8, 10)}-
                          {rs.user_id && rs.user_id.doj.substring(5, 7)}-
                          {rs.user_id && rs.user_id.doj.substring(0, 4)}
                        </Typography>
                      </Grid>

                      <Grid item xs={6} md={4} lg={3}>
                        <Typography
                          variant='body1'
                          style={{
                            fontWeight: "800",
                            color: "#1A237E",
                          }}
                        >
                          Last Working Day
                        </Typography>

                        <Typography
                          variant='body1'
                          style={{
                            color: "grey",
                            // fontWeight:"500"
                          }}
                        >
                          {/* 12-05-2022 */}
                          ------
                        </Typography>
                      </Grid>

                      <Grid item xs={6} md={4} lg={3}>
                        <Typography
                          variant='body1'
                          style={{
                            fontWeight: "800",
                            color: "#1A237E",
                          }}
                        >
                          Notice Period
                        </Typography>

                        <Typography
                          variant='body1'
                          style={{
                            color: "grey",
                            // fontWeight:"500"
                          }}
                        >
                          {/* 60 Days */}

                          {rs.notice_period
                            ? rs.notice_period + " Days"
                            : "60 Days"}
                        </Typography>
                      </Grid>

                      <Grid item xs={6} md={4} lg={3}>
                        <Typography
                          variant='body1'
                          style={{
                            fontWeight: "800",
                            color: "#1A237E",
                          }}
                        >
                          Shift Manager
                        </Typography>

                        <Typography
                          variant='body1'
                          style={{
                            color: "grey",
                            // fontWeight:"500"
                          }}
                        >
                          {/* Rahul Jameson */}
                          ------
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={4} lg={3}>
                        <Typography
                          variant='body1'
                          style={{
                            fontWeight: "800",
                            color: "#1A237E",
                          }}
                        >
                          Site Manager
                        </Typography>

                        <Typography
                          variant='body1'
                          style={{
                            color: "grey",
                            // fontWeight:"500"
                          }}
                        >
                          {/* Jonathan Misu */}
                          ------
                        </Typography>
                      </Grid>

                      <Grid item xs={6} md={4} lg={3}>
                        <Typography
                          variant='body1'
                          style={{
                            fontWeight: "800",
                            color: "#1A237E",
                          }}
                        >
                          Official Email ID
                        </Typography>

                        <Typography
                          variant='body1'
                          style={{
                            color: "grey",
                            // fontWeight:"500"
                          }}
                        >
                          {/* test@test.com */}
                          {rs.user_id && rs.user_id.username}
                        </Typography>
                      </Grid>

                      <Grid item xs={6} md={4} lg={3}>
                        <Typography
                          variant='body1'
                          style={{
                            fontWeight: "800",
                            color: "#1A237E",
                          }}
                        >
                          Location
                        </Typography>

                        <Typography
                          variant='body1'
                          style={{
                            color: "grey",
                            // fontWeight:"500"
                          }}
                        >
                          {/* 126 Scarlet Road, Ontario, Tornto */}
                          ------
                        </Typography>
                      </Grid>

                      <Grid item xs={6} md={4} lg={3}></Grid>
                    </Grid>

                    <Typography
                      variant='h6'
                      style={{
                        color: "#0D47A1",
                        fontWeight: "600",
                        marginTop: "30px",
                        marginBottom: "20px",
                      }}
                    >
                      Relieving Information
                    </Typography>

                    <Grid container justifyContent='space-between' spacing={1}>
                      <Grid item xs={6} md={4} lg={3}>
                        <Typography
                          variant='body1'
                          style={{
                            fontWeight: "800",
                            color: "#1A237E",
                          }}
                        >
                          Date of Resignation *
                        </Typography>

                        <Typography
                          variant='body1'
                          style={{
                            color: "grey",
                            // fontWeight:"500"
                          }}
                        >
                          {/* 12-05-2021 */}
                          {/* {rs.date_of_resign} */}
                          {rs.date_of_resign.substring(8, 10)}-
                          {rs.date_of_resign.substring(5, 7)}-
                          {rs.date_of_resign.substring(0, 4)}
                        </Typography>
                      </Grid>

                      <Grid item xs={6} md={4} lg={3}>
                        <Typography
                          variant='body1'
                          style={{
                            fontWeight: "800",
                            color: "#1A237E",
                          }}
                        >
                          Reason For Leaving *
                        </Typography>

                        <Typography
                          variant='body1'
                          style={{
                            color: "grey",
                            // fontWeight:"500"
                          }}
                        >
                          {/* Pursue Post Graduation */}
                          {rs.reason_of_leave}
                        </Typography>
                      </Grid>

                      <Grid item xs={6} md={4} lg={3}>
                        <Typography
                          variant='body1'
                          style={{
                            fontWeight: "800",
                            color: "#1A237E",
                          }}
                        >
                          Expected Relieving Date *
                        </Typography>

                        <Typography
                          variant='body1'
                          style={{
                            color: "grey",
                            // fontWeight:"500"
                          }}
                        >
                          {/* 12-05-2022 */}
                          {/* {rs.expected_relieving_date} */}
                          {rs.expected_relieving_date.substring(8, 10)}-
                          {rs.expected_relieving_date.substring(5, 7)}-
                          {rs.expected_relieving_date.substring(0, 4)}
                        </Typography>
                      </Grid>

                      <Hidden mdDown>
                        <Grid item lg={3}>
                          {/* maintaining layout */}
                        </Grid>
                      </Hidden>

                      <Grid item xs={12} md={6} lg={4}>
                        <Typography
                          variant='body1'
                          style={{
                            fontWeight: "800",
                            color: "#1A237E",
                          }}
                        >
                          Leaving Comment * *
                        </Typography>

                        <Typography
                          variant='body1'
                          style={{
                            color: "grey",
                            // fontWeight:"500"
                          }}
                        >
                          {/* Sample Reason For Leaving ... */}
                          {rs.leaving_comment}
                        </Typography>
                      </Grid>
                    </Grid>

                    <div style={{ width: "100%" }}>
                      <Typography
                        variant='h6'
                        component={"div"}
                        style={{
                          color: "#0D47A1",
                          fontWeight: "600",
                          marginTop: "30px",
                          marginBottom: "20px",
                        }}
                      >
                        Attachments
                      </Typography>

                      <div
                        style={{
                          display: "flex",
                          height: "60px",
                          width: "300px",
                          backgroundColor: "#F7F8FC",
                          alignItems: "center",
                          paddingLeft: "25px",
                          justifyContent: "space-between",
                          paddingRight: "25px",
                        }}
                      >
                        <p>
                          {/* FileName abcd.pdf */}
                          {rs.attachment_url &&
                            rs.attachment_url.substring(
                              rs.attachment_url.lastIndexOf("/") + 1
                            )}
                        </p>

                        {rs.attachment_url ? (
                          <a
                            href={rs.attachment_url}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <CloudDownload />
                          </a>
                        ) : (
                          <CloudDownload />
                        )}
                      </div>
                    </div>

                    <div
                      style={{
                        width: "100%",
                        marginTop: "30px",
                      }}
                    >
                      <Typography
                        variant='body1'
                        style={{
                          fontWeight: "800",
                          color: "#1A237E",
                          display: "block",
                          marginBottom: "10px",
                        }}
                      >
                        Comment *
                      </Typography>

                      <Input
                        disabled={!enable_changes}
                        defaultValue={
                          (rs.approver_comment &&
                            rs.approver_comment[0].comment) ||
                          "Enter Your Remark"
                        }
                        // placeholder="Enter Your Remark"
                        style={{
                          display: "block",
                        }}
                        onChange={(e) => {
                          setApproverComment(e.target.value);
                        }}
                      />
                    </div>

                    <div style={{ width: "100%", marginTop: "10px" }}>
                      <hr
                        style={{
                          margin: "20px -20px",
                        }}
                      />
                    </div>

                    <Grid
                      container
                      spacing={2}
                      justifyContent='space-between'
                      alignItems='center'
                    >
                      <Grid item xs={12} lg={8}>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <Checkbox
                            name='terms_n_conditions'
                            disabled={!enable_changes}
                            checked={isChecked}
                            onChange={() => {
                              setIsChecked(!isChecked);
                            }}
                            color='primary'
                            inputProps={{ "aria-label": "secondary checkbox" }}
                          />
                          <h3 style={{ color: "#161b5a" }}>
                            I Choose to the Term & Condition of this resignation
                          </h3>
                        </div>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                        lg={4}
                        style={{ marginLeft: "auto" }}
                      >
                        <Grid
                          container
                          spacing={2}
                          justifyContent='space-around'
                        >
                          <Grid item xs={3}>
                            <Button
                              onClick={handleDialogClose}
                              color='primary'
                              variant='outlined'
                            >
                              Cancel
                            </Button>
                          </Grid>
                          <Grid item xs={3}>
                            <Button
                              disabled={!isChecked}
                              variant='outlined'
                              color='secondary'
                              onClick={(e) => {
                                handleRejectDialogOpen(e, rs);
                              }}
                            >
                              Reject
                            </Button>
                          </Grid>
                          <Grid item xs={3}>
                            <Button
                              disabled={!isChecked}
                              variant='outlined'
                              color='secondary'
                              style={
                                isChecked
                                  ? { color: "green", borderColor: "green" }
                                  : {}
                              }
                              onClick={(e) => {
                                handleApproveDialogOpen(e, rs);
                              }}
                            >
                              Approve
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </main>
            </ThemeProvider>
          </div>

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
                  Do you want to{" "}
                  <span style={{ color: "#22b749" }}> approve </span> this
                  resignation ?
                </Typography>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setOpenApprove(false);
                }}
                color='primary'
              >
                No
              </Button>
              <Button
                onClick={() => {
                  updateResignation("Approved");
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
                  Do you want to{" "}
                  <span style={{ color: "#e9594a" }}> reject </span> this
                  resignation ?
                </Typography>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setOpenApprove(false);
                }}
                color='primary'
              >
                No
              </Button>
              <Button
                onClick={() => {
                  updateResignation("Rejected");
                }}
                color='primary'
                autoFocus
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      );
    }
  };

  return (
    <React.Fragment>
      {!viewDetails ? getResignationLandingPage() : getViewDetailsPage()}
    </React.Fragment>
  );
};
