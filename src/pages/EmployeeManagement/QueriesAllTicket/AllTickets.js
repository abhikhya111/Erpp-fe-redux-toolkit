import React from "react";
import axios from "axios";
import "@fontsource/roboto";
import {
  Button,
  Grid,
  Paper,
  Hidden,
  Divider,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Dialog,
  DialogContent,
  Select,
  IconButton,
  TextField,
  Backdrop,
  CircularProgress,
  TablePagination,
} from "@material-ui/core";
// import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
// import DateFnsUtils from '@date-io/date-fns';
// import useAuth from "hooks/useAuth";
// import clsx from "clsx";
// import Api from "../../../hooks/AjaxAction";
// import axios from "axios";
import { useQueriesAllTicketStyles } from "./style";
// import FilterAltOutlinedIcon from '@material-ui/icons/FilterAltOutlinedIcon';
import { Description, Add, GetApp } from "@material-ui/icons";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ScrollableTabsButtonAuto from "./Tabs";
import Autocomplete from "@material-ui/lab/Autocomplete";
import RaiseQueryDialog from "./RaiseQueryDialog";
import AssignToDialog from "./AssignToDialog";
import { QueriesAllTicketContext } from "./index";
import useAuth from "hooks/useAuth";

export const AllTickets = (props) => {
  // const auth = useAuth();

  const [isLoading] = React.useState(false);
  const [allTickets, setAllTickets] = React.useState([]);
  const classes = useQueriesAllTicketStyles();
  const [status, setStatus] = React.useState("");

  const [openRaiseQueryDialog, setOpenRaiseQueryDialog] = React.useState(false);
  const [assignToDialog, setAssignToDialog] = React.useState(false);
  const [empOptions, setEmpOptions] = React.useState([]);
  const [filteredByPriority, setfilteredByPriority] = React.useState([]);
  const [currentTicketData, setCurrentTicketData] = React.useState("");
  const [currentTicketNumber, setCurrentTicketNumber] = React.useState("");
  const [currentTicketId, setCurrentTicketId] = React.useState("");
  const [paginatedData, setPaginatedData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    // getAllLeavesApproval(newPage, rowsPerPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);

    // getAllLeavesApproval(0, parseInt(event.target.value, 10));
  };
  const { setFetchAllTickets, viewDetails, funViewDetails, getAllTickets } =
    React.useContext(QueriesAllTicketContext);
  const auth = useAuth();
  // const [approverComment, setApproverComment] = React.useState("");

  function pad(num = 0, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
  }

  const getAssignedtoInfo = (user) => {
    let user_name = "";
    if (user) {
      user_name = user.first_name;
      if (user.last_name) {
        user_name += " " + user.last_name;
      }
    } else {
      user_name = "Unassigned";
    }
    if (!user_name) user_name = "Unassigned";
    return user_name;
  };

  const getUserName = (user) => {
    let user_name = "";
    if (user) {
      user_name = user.first_name;
      if (user.last_name) {
        user_name += " " + user.last_name;
      }
    }
    return user_name;
  };

  const handleFilterByPriority = (e, priority) => {
    e.preventDefault();
    const indexes = props.all_tickets.map((x, idx) =>
      x.priority === priority ? idx : ""
    );
    const filtered = indexes.filter((el) => {
      return el !== null && typeof el !== "undefined" && el !== "";
    });

    const newArr = filtered.map((idx) => {
      return props.all_tickets[idx];
    });

    setfilteredByPriority(newArr);
    setAllTickets(newArr);
    updateEmpOptions(newArr);
    // setAutocompleteValue({title:""});
  };

  //   ====================================================

  const createSearchBarData = (optionData) => {
    // user_id is actually object with populated user data
    const user_data = optionData.user_id;
    if (user_data.first_name) {
      return {
        title: `${user_data.first_name} ${user_data.last_name}`,
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
      if (item.user_id) return optionsDataArray.push(createSearchBarData(item));
    });
    let newArray = [];
    let uniqueObject = {};
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
    setEmpOptions(newArray);
  };

  React.useEffect(() => {
    getPaginatedData(allTickets);
  }, [page, rowsPerPage, allTickets]);

  React.useEffect(() => {
    let sortedQueries = props.all_tickets.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.created_at) - new Date(a.created_at);
    });
    setAllTickets(sortedQueries);
    getPaginatedData(sortedQueries);
    setfilteredByPriority(props.all_tickets);
    updateEmpOptions(props.all_tickets);
    const ticket = props.all_tickets.find(({ _id }) => currentTicketId === _id);
    setCurrentTicketData(ticket);
  }, [props.all_tickets, currentTicketData]);
  // eslint-disable-line react-hooks/exhaustive-deps
  const getPaginatedData = (allTickets) => {
    let startIndex = page * rowsPerPage;
    let lastIndex = startIndex + rowsPerPage;
    const filteredData = allTickets.filter(
      (item, index) => index >= startIndex && index < lastIndex
    );
    setPaginatedData(filteredData);
  };

  const handleOpenViewDetails = (e, ticket_data, idx) => {
    setCurrentTicketData(ticket_data);
    setCurrentTicketNumber(
      ticket_data.ticket_no ? pad(ticket_data.ticket_no, 3) : idx
    );
    setCurrentTicketId(ticket_data._id);
    funViewDetails(true);
    setStatus(ticket_data.status);
    console.log(ticket_data.status);
  };

  const raiseQueryDialogOpen = () => {
    setOpenRaiseQueryDialog(true);
  };

  const handleCloseDialog = () => {
    // handleClose();
    setOpenRaiseQueryDialog(false);
    funViewDetails(false);
  };

  const handleAssignTo = () => {
    setAssignToDialog(true);
  };

  function removeUserData(comments) {
    comments?.length &&
      comments.forEach((comment, idx, arr) => {
        arr[idx].user_id = comment.user_id._id;
        if (comment._id) delete arr[idx]._id;
      });
    return comments;
  }

  const handleStatusChange = async () => {
    console.log(currentTicketData);
    const data = {
      ...currentTicketData,
      category:
        currentTicketData.category === null ? "" : currentTicketData.category,
      sub_category:
        currentTicketData.sub_category === null
          ? ""
          : currentTicketData.sub_category,
      user_id: currentTicketData.user_id?._id,
      comments: removeUserData(currentTicketData.comments),
      assigned_to: currentTicketData.assigned_to?._id,
      approver_id: currentTicketData.approver_id?._id,
      status,
    };

    var newData = { ...data };
    if (!currentTicketData.status) {
      if (data.updated_at) delete data.updated_at;
      if (data.created_at) delete data.created_at;
    }

    try {
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/requests/update`,
        data,
        {
          headers: {
            token: auth.token,
          },
        }
      );

      if (!currentTicketData.status) {
        setCurrentTicketData({ ...newData });
      } else setCurrentTicketData({ ...data });
      setFetchAllTickets(true);
    } catch (err) {
      console.log("Error -> ", err);
    }
  };

  const getAllTicketLandingPage = () => {
    return (
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
          <FormControl
            variant='outlined'
            style={{
              minWidth: "225px",
              marginRight: "20px",
              marginBottom: "10px",
            }}
          >
            <InputLabel
              // style={{
              //   paddingLeft:"5px"
              // }}
              id='demo-simple-select-label-1'
            >
              Priority
            </InputLabel>
            <Select
              labelId='demo-simple-select-label-1'
              label='Priority'
              id='demo-simple-select'
              onChange={(event) => {
                if (event.target.value === "All") {
                  setfilteredByPriority(props.all_tickets);
                  updateEmpOptions(props.all_tickets);
                  setAllTickets(props.all_tickets);
                } else {
                  handleFilterByPriority(event, event.target.value);
                }
              }}
            >
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"Low"}>Low</MenuItem>
              <MenuItem value={"Medium"}>Medium</MenuItem>
              <MenuItem value={"Highest"}>Highest</MenuItem>
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
              style={{ width: "225px", marginRight: "20px" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Search Employee'
                  variant='outlined'
                />
              )}
              onChange={(e) => {
                setAllTickets(filteredByPriority);

                const regExp = /\(([^)]+)\)/;
                let matches = regExp.exec(e.target.innerText);

                if (matches) {
                  const indexes = filteredByPriority.map((x, idx) =>
                    x.user_id.emp_code === matches[1] ? idx : ""
                  );
                  const filtered_indexes = indexes.filter((el) => {
                    return (
                      el !== null && typeof el !== "undefined" && el !== ""
                    );
                  });
                  // arrayMove(allLeavesApproval, indexes, 0);
                  setAllTickets(
                    getArrayViaIndexes(filteredByPriority, filtered_indexes)
                  );
                }
              }}
            />
          )}

          <div
            style={{
              backgroundColor: "#1F299C",
              cursor: "pointer",
              height: "56px",
              minWidth: "150px",
              borderRadius: "10px",
              justifyContent: "center",
              alignItems: "center",
              borderWidth: "2px",
              borderStyle: "solid",
              borderColor: "#1F299C",
              display: "flex",
              flexDirection: "column",
              marginLeft: "auto",
            }}
            onClick={raiseQueryDialogOpen}
          >
            {/* <p style={{color:  "#FFFFFF" }}> <Add style={{marginBottom:'-5px'}} /> Raise A Query</p> */}

            <Typography variant='subtitle1' style={{ color: "#FFFFFF" }}>
              <Add style={{ marginBottom: "-5px" }} />
              Raise A Query
            </Typography>
          </div>
        </div>

        {allTickets.length ? (
          paginatedData.map((ticket, idx) => {
            return (
              <React.Fragment>
                <div
                  key={idx}
                  className={classes.listContainer}
                  style={{ borderRadius: "10px 10px 0px 0px" }}
                >
                  <Grid
                    container
                    xs={12}
                    md={12}
                    lg={12}
                    style={{ display: "flex", flexWrap: "nowrap" }}
                  >
                    <Grid
                      item
                      xs={12}
                      md={10}
                      lg={1}
                      style={{ flex: "0 0 4.16666%" }}
                    >
                      <div className={classes.ProfileCircle}>
                        <p style={{ margin: "0", color: "#1F299C" }}>
                          <Description />
                        </p>
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={12}
                      lg={12}
                      style={{
                        marginLeft: "15px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {/* <Grid container spacing = {1} xs={12}>
                                <Grid item xs={12} md={2} lg={2} style={{display:"flex",alignItems: "center" }}> */}

                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant='h5'
                          style={{
                            fontWeight: "800",
                            color: "#1F299C",
                            marginRight: "20px",
                          }}
                        >
                          {ticket.ticket_no
                            ? pad(ticket.ticket_no, 3)
                            : pad(
                                allTickets?.length - page * rowsPerPage - idx,
                                3
                              )}
                        </Typography>

                        <Typography
                          variant='h6'
                          style={{
                            fontWeight: "500",
                            color: "black",
                            marginRight: "20px",
                          }}
                        >
                          {/* Leaves & Attendance */}
                          {ticket.category}
                        </Typography>
                        <Typography
                          variant='body1'
                          style={{
                            fontWeight: "500",
                            color: "gray",
                            marginRight: "20px",
                          }}
                        >
                          {/* Punch In/Out not working */}
                          {ticket.sub_category}
                        </Typography>
                      </div>
                    </Grid>
                  </Grid>
                </div>
                {/* <Grid container xs={12} md={12} lg={12} style={{ margin: "0px 0px 0px 0px", display: "flex", flexDirection: "row" }}> */}
                <div
                  className={classes.listContainer}
                  style={{
                    borderRadius: "0px 0px 10px 10px",
                    margin: "0px",
                    borderTop: "None",
                  }}
                >
                  <Grid
                    container
                    xs={12}
                    style={{ display: "flex", flexWrap: "nowrap" }}
                  >
                    <Grid container xs={12} style={{ marginLeft: "15px" }}>
                      <Grid
                        container
                        xs={12}
                        style={{ display: "flex", flexWrap: "nowrap" }}
                      >
                        <Grid
                          container
                          spacing={1}
                          xs={12}
                          justifyContent='space-between'
                          style={{ marginTop: "0px" }}
                        >
                          <Grid item xs={12} md={6} lg={4}>
                            {/* <p style={{ marginTop: "0", marginBottom: "0" }}>Requester</p> */}
                            <Typography
                              variant='body1'
                              style={{
                                fontWeight: "500",
                                color: "gray",
                              }}
                            >
                              Requester
                            </Typography>

                            <div>
                              <Typography
                                variant='body1'
                                component={"span"}
                                style={{
                                  fontWeight: "600",
                                  color: "black",
                                }}
                              >
                                {getUserName(ticket.user_id)} &nbsp; | &nbsp;
                              </Typography>
                              <Typography
                                variant='body1'
                                component={"span"}
                                style={{
                                  fontWeight: "500",
                                  color: "gray",
                                }}
                              >
                                {ticket?.user_id?.role}
                                {/* &nbsp; | &nbsp; */}
                              </Typography>
                              {ticket.assigned_to_deparment ||
                                (ticket.category && (
                                  <>
                                    <Typography
                                      variant='body1'
                                      component={"span"}
                                      style={{
                                        fontWeight: "600",
                                        color: "black",
                                      }}
                                    >
                                      &nbsp; | &nbsp;
                                    </Typography>

                                    <Typography
                                      variant='body1'
                                      component={"span"}
                                      style={{
                                        fontWeight: "500",
                                        color: "gray",
                                      }}
                                    >
                                      {ticket.assigned_to_deparment ||
                                        ticket.category}
                                      {/* &nbsp; | &nbsp; */}
                                    </Typography>
                                  </>
                                ))}
                            </div>
                          </Grid>

                          <Grid item xs={12} md={3} lg={2}>
                            {/* <p style={{ marginTop: "0", marginBottom: "0" }}>Request Date</p> */}
                            <Typography
                              variant='body1'
                              style={{
                                fontWeight: "500",
                                color: "gray",
                              }}
                            >
                              Request Date
                            </Typography>
                            {/* <h3 style={{ marginTop: "5px", marginBottom: "0" }}>{leave.requestDate}</h3> */}
                            <Typography
                              variant='body1'
                              style={{
                                fontWeight: "600",
                                color: "black",
                              }}
                            >
                              {ticket.created_at.substring(8, 10)}-
                              {ticket.created_at.substring(5, 7)}-
                              {ticket.created_at.substring(0, 4)}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} md={3} lg={2}>
                            {/* <p style={{ marginTop: "0", marginBottom: "0" }}>Priority</p> */}
                            <Typography
                              variant='body1'
                              style={{
                                fontWeight: "500",
                                color: "gray",
                              }}
                            >
                              Priority
                            </Typography>
                            <Typography
                              variant='body1'
                              style={{
                                fontWeight: "600",
                                color:
                                  ticket.priority === "Highest"
                                    ? "red"
                                    : ticket.priority === "Medium"
                                    ? "orange"
                                    : "black",
                              }}
                            >
                              {ticket.priority}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} md={3} lg={2}>
                            {/* <p style={{ marginTop: "0", marginBottom: "0" }}>Assigned</p> */}
                            <Typography
                              variant='body1'
                              style={{
                                fontWeight: "500",
                                color: "gray",
                              }}
                            >
                              Assigned
                            </Typography>
                            <Typography
                              variant='body1'
                              style={{
                                fontWeight: "600",
                                color: "#1F299C",
                              }}
                            >
                              {getAssignedtoInfo(ticket.assigned_to)}
                            </Typography>
                          </Grid>

                          <Grid
                            item
                            xs={12}
                            lg={1}
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <div
                              onClick={(e) => {
                                let no = pad(allTickets?.length - idx, 3);
                                handleOpenViewDetails(e, ticket, no);
                              }}
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                backgroundColor: "#1F299C",
                                cursor: "pointer",
                                alignItems: "center",
                                borderRadius: "10px",
                                justifyContent: "center",
                                borderWidth: "2px",
                                borderStyle: "solid",
                                borderColor: "#1F299C",
                                height: "50px",
                                width: "80px",
                              }}
                            >
                              <p style={{ color: "#FFFFFF" }}> View</p>
                            </div>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>

                {/* </Grid> */}
              </React.Fragment>
            );
          })
        ) : (
          <div style={{ width: "100%", textAlign: "left", paddingTop: "2rem" }}>
            <p>Nothing Show</p>
          </div>
        )}

        <TablePagination
          style={{ backgroundColor: "#F7F8FC" }}
          rowsPerPageOptions={[25, 50]}
          component='div'
          count={allTickets.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        <Backdrop className={classes.backdrop} open={isLoading}>
          <CircularProgress color='inherit' />
        </Backdrop>

        <Dialog
          open={openRaiseQueryDialog}
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
              minHeight: "111vh",
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
            <RaiseQueryDialog closeForm={handleCloseDialog} />
          </DialogContent>
        </Dialog>
      </Paper>
    );
  };

  const getViewDetailsPage = () => {
    if (currentTicketData && currentTicketNumber) {
      const ticket = currentTicketData;
      const ticket_number = currentTicketNumber;

      return (
        <Paper>
          <Grid
            container
            style={{
              textAlign: "left",
              border: "2px solid lightgrey",
            }}
          >
            <Grid
              container
              direction='row'
              style={{
                borderBottom: "2px solid lightgrey",
                padding: "0px",
                margin: "0px",
              }}
            >
              <Grid item xs={12} md={12} lg={6}>
                <div
                  onClick={handleCloseDialog}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    margin: "20px",
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
                  <h2
                    style={{ marginRight: "10px" }}
                    className={classes.colorBlue}
                  >
                    &nbsp; Requester No : &nbsp; {ticket_number}
                  </h2>
                </div>
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                lg={6}
                style={{ display: "inline-flex", flexDirection: "row-reverse" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div className='p-2 my-1 mx-5 rounded border-2'>
                    <Typography
                      variant='h7'
                      className={classes.colorDarkBlue}
                      style={{
                        fontWeight: "600",
                        marginRight: "10px",
                      }}
                    >
                      Status*
                    </Typography>

                    <FormControl
                      variant='outlined'
                      style={{
                        width: "200px",
                      }}
                    >
                      <Select
                        value={status}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        style={{
                          backgroundColor: "rgb(247,248,252)",
                          height: "36px",
                          marginRight: "10px",
                        }}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <MenuItem value='Accepted'>Accepted</MenuItem>
                        <MenuItem value='Cancelled'>Cancelled</MenuItem>
                        <MenuItem value='Closed'>Closed</MenuItem>
                        <MenuItem value='In Progress'>In Progress</MenuItem>
                        <MenuItem value='Pending'>Pending</MenuItem>
                        <MenuItem value='Rejected'>Rejected</MenuItem>
                      </Select>
                    </FormControl>

                    <button
                      className='bg-blue-900 px-3 py-2 rounded text-gray-100 ml-0'
                      onClick={handleStatusChange}
                    >
                      Save
                    </button>
                  </div>

                  <Button
                    variant='outlined'
                    color='primary'
                    style={{ margin: "5px", marginRight: "20px" }}
                    onClick={handleAssignTo}
                    disabled={
                      currentTicketData.status === "Closed" ||
                      currentTicketData.status === "Cancelled"
                    }
                  >
                    Assign To
                  </Button>
                </div>
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              md={12}
              lg={6}
              style={{
                display: "flex",
                flexDirection: "column",
                borderRight: "2px solid lightgrey",
                borderLeft: "2px solid lightgrey",
                padding: "0px 20px",
              }}
            >
              <Typography
                variant='h6'
                className={classes.colorBlue}
                style={{
                  paddingBottom: "20px",
                  paddingTop: "20px",
                  fontWeight: "600",
                }}
              >
                Ticket Details
              </Typography>

              <div
                style={{
                  marginBottom: "10px",
                }}
              >
                <Typography
                  className={classes.colorBlue}
                  style={{
                    width: "150px",
                    fontWeight: "500",
                    display: "inline-block",
                  }}
                >
                  Category:
                </Typography>

                <Typography
                  style={{
                    width: "300px",
                    display: "inline-flex",
                    fontWeight: "600",
                  }}
                  component={"span"}
                >
                  {ticket.category}
                </Typography>
              </div>
              <div
                style={{
                  marginBottom: "10px",
                }}
              >
                <Typography
                  className={classes.colorBlue}
                  style={{
                    width: "150px",
                    fontWeight: "500",
                    display: "inline-block",
                  }}
                >
                  Sub Category:
                </Typography>

                <Typography
                  style={{
                    width: "300px",
                    display: "inline-flex",
                    fontWeight: "600",
                  }}
                  component={"span"}
                >
                  {ticket.sub_category}
                </Typography>
              </div>
              <div
                style={{
                  marginBottom: "10px",
                }}
              >
                <Typography
                  className={classes.colorBlue}
                  style={{
                    width: "150px",
                    fontWeight: "500",
                    display: "inline-block",
                  }}
                >
                  Description:
                </Typography>

                <Typography
                  style={{
                    width: "300px",
                    display: "inline-flex",
                    fontWeight: "600",
                  }}
                  component={"span"}
                >
                  {ticket.query}
                </Typography>
              </div>
              <div
                style={{
                  marginBottom: "10px",
                }}
              >
                <Typography
                  className={classes.colorBlue}
                  style={{
                    width: "150px",
                    fontWeight: "500",
                    display: "inline-block",
                  }}
                >
                  Priority:
                </Typography>

                <Typography
                  component={"span"}
                  style={{
                    width: "300px",
                    fontWeight: "600",
                    display: "inline-flex",
                    color:
                      ticket.priority === "Highest"
                        ? "red"
                        : ticket.priority === "Medium"
                        ? "orange"
                        : "black",
                  }}
                >
                  {ticket.priority}
                </Typography>
              </div>
              <div
                style={{
                  marginBottom: "10px",
                }}
              >
                <Typography
                  className={classes.colorBlue}
                  style={{
                    width: "150px",
                    fontWeight: "500",
                    display: "inline-block",
                  }}
                >
                  Request Date:
                </Typography>

                <Typography
                  style={{
                    width: "300px",
                    display: "inline-flex",
                    fontWeight: "600",
                  }}
                  component={"span"}
                >
                  {ticket.created_at.substring(8, 10)}-
                  {ticket.created_at.substring(5, 7)}-
                  {ticket.created_at.substring(0, 4)}
                </Typography>
              </div>
              <div
                style={{
                  marginBottom: "10px",
                }}
              >
                <Typography
                  className={classes.colorBlue}
                  style={{
                    width: "150px",
                    fontWeight: "500",
                    display: "inline-block",
                  }}
                >
                  Requester:
                </Typography>

                <Typography
                  style={{
                    width: "300px",
                    display: "inline-flex",
                    fontWeight: "600",
                  }}
                  component={"span"}
                >
                  {getUserName(ticket.user_id)}
                </Typography>
              </div>

              <div style={{ marginBottom: "10px" }}>
                <Typography
                  className={classes.colorBlue}
                  style={{
                    width: "150px",
                    fontWeight: "500",
                    display: "inline-block",
                  }}
                >
                  Status:
                </Typography>

                <Typography
                  style={{
                    width: "300px",
                    display: "inline-flex",
                    fontWeight: "600",
                  }}
                  component={"span"}
                >
                  {ticket.status || "None"}
                </Typography>
              </div>

              <Typography
                variant='h6'
                className={classes.colorBlue}
                style={{
                  paddingBottom: "20px",
                  marginTop: "20px",
                  fontWeight: "600",
                }}
              >
                Attachments
              </Typography>

              <div
                style={{
                  padding: "5px",
                  backgroundColor: "#F1F2F6",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  style={{
                    fontWeight: "600",
                  }}
                  component={"span"}
                >
                  {ticket.attachment &&
                    ticket.attachment.substring(
                      ticket.attachment.lastIndexOf("/") + 1
                    )}
                  {!ticket.attachment && <p>No attachements</p>}
                </Typography>

                {ticket.attachment ? (
                  <a
                    href={ticket.attachment}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <IconButton>
                      <GetApp className={classes.colorBlue} />
                    </IconButton>
                  </a>
                ) : (
                  <></>
                )}
              </div>

              <Typography
                variant='h6'
                className={classes.colorBlue}
                style={{
                  paddingBottom: "20px",
                  marginTop: "20px",
                  fontWeight: "600",
                }}
              >
                Assigned To
              </Typography>

              <div
                style={{
                  marginBottom: "10px",
                }}
              >
                <Typography
                  className={classes.colorBlue}
                  style={{
                    width: "150px",
                    fontWeight: "500",
                    display: "inline-block",
                  }}
                >
                  Assigned:
                </Typography>

                <Typography
                  style={{
                    width: "300px",
                    display: "inline-flex",
                    fontWeight: "600",
                  }}
                  component={"span"}
                >
                  {getUserName(ticket.assigned_to)}
                </Typography>
              </div>
            </Grid>

            <Hidden lgUp>
              <Grid item>
                <Divider
                  orientation='horizontal'
                  flexItem
                  style={{
                    backgroundColor: "grey",
                    marginRight: "10px",
                    marginBottom: "-35px",
                  }}
                ></Divider>
              </Grid>
            </Hidden>

            <Grid
              item
              xs={12}
              md={12}
              lg={6}
              style={{
                display: "flex",
                flexDirection: "column",
                borderRight: "2px solid lightgrey",
                borderLeft: "2px solid lightgrey",
              }}
            >
              <Typography
                variant='h6'
                className={classes.colorBlue}
                style={{
                  paddingBottom: "20px",
                  marginTop: "20px",
                  marginLeft: "20px",
                  fontWeight: "600",
                }}
              >
                Average Estimation Duration
              </Typography>

              <div
                style={{
                  marginBottom: "10px",
                  marginLeft: "20px",
                }}
              >
                <Typography
                  className={classes.colorBlue}
                  style={{
                    width: "150px",
                    fontWeight: "500",
                    display: "inline-block",
                  }}
                >
                  Cycle Time:
                </Typography>

                <Typography
                  style={{
                    width: "150px",
                    display: "inline-flex",
                    fontWeight: "800",
                    color: "#F7872A",
                  }}
                  component={"span"}
                >
                  {ticket.cycle_time}
                </Typography>
              </div>

              <div
                style={{
                  marginBottom: "10px",
                  marginLeft: "20px",
                }}
              >
                <Typography
                  className={classes.colorBlue}
                  style={{
                    width: "150px",
                    fontWeight: "500",
                    display: "inline-block",
                  }}
                >
                  Acceptance Time:
                </Typography>

                <Typography
                  style={{
                    width: "150px",
                    display: "inline-flex",
                    fontWeight: "800",
                    color: "#222D9B",
                  }}
                  component={"span"}
                >
                  {ticket.acceptance_time}
                </Typography>
              </div>

              <div
                style={{
                  marginBottom: "10px",
                  marginLeft: "20px",
                }}
              >
                <Typography
                  className={classes.colorBlue}
                  style={{
                    width: "150px",
                    fontWeight: "500",
                    display: "inline-block",
                  }}
                >
                  Resolution:
                </Typography>

                <Typography
                  style={{
                    width: "150px",
                    display: "inline-flex",
                    fontWeight: "800",
                    color: "#3D9E5A",
                  }}
                  component={"span"}
                >
                  {ticket.resolution_time}
                </Typography>
              </div>

              <ScrollableTabsButtonAuto ticket_data={currentTicketData} />
            </Grid>
          </Grid>
          <Dialog
            open={assignToDialog}
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
                minHeight: "111vh",
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
                height: "100vh",
              }}
            >
              <AssignToDialog
                closeForm={() => setAssignToDialog(false)}
                requester={currentTicketNumber}
                ticketData={currentTicketData}
              />
            </DialogContent>
          </Dialog>
        </Paper>
      );
    }
  };

  return (
    <React.Fragment>
      {!viewDetails ? getAllTicketLandingPage() : getViewDetailsPage()}
    </React.Fragment>
  );
};
