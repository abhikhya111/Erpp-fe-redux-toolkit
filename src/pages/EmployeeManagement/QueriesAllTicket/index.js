import React from "react";
import "@fontsource/roboto";
import { Backdrop, CircularProgress, Typography } from "@material-ui/core";
// import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
// import DateFnsUtils from '@date-io/date-fns';
import useAuth from "hooks/useAuth";
import clsx from "clsx";
import axios from "axios";
// import Api from "../../../hooks/AjaxAction";
// import { useHistory } from "react-router-dom";
import { useQueriesAllTicketStyles } from "./style";
import { AllTickets } from "./AllTickets";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";

export const QueriesAllTicketContext = React.createContext(null);

export const QueriesAllTicket = (props) => {
  // const history = useHistory();

  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  const All_TICKETS = "All_TICKETS";
  const UNASSIGNED_TICKETS = "UNASSIGNED_TICKETS";
  const INPROGRESS_TICKETS = "INPROGRESS_TICKETS";
  const CANCELLED_TICKETS = "CANCELLED_TICKETS";
  const PENDING_TICKETS = "PENDING_TICKETS";
  const CLOSED_TICKETS = "CLOSED_TICKETS";
  const REJECTED_TICKETS = "REJECTED_TICKETS";

  const classes = useQueriesAllTicketStyles();
  const auth = useAuth();

  const [isLoading, setIsLoading] = React.useState(false);
  const [pageType, setPageType] = React.useState(All_TICKETS);
  const [allTickets, setAllTickets] = React.useState([]);
  const [allEmployees, setAllEmployees] = React.useState([]);
  const [fetchAllTickets, setFetchAllTickets] = React.useState(true);
  const [unAssignedTickets, setUnassignedTickets] = React.useState([]);
  const [inprogressTickets, setInprogressTickets] = React.useState([]);
  const [closedTickets, setClosedTickets] = React.useState([]);
  const [pendingTickets, setPendingTickets] = React.useState([]);
  const [cancelledTickets, setCancelledTickets] = React.useState([]);
  const [rejectedTickets, setRejectedTickets] = React.useState([]);
  const [viewDetails, setViewDetails] = React.useState(false);
  const [initialRender, setInitialRender] = React.useState(true);
  const getAllTickets = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/requests/getAllRequests`,
        {
          headers: {
            token: auth.token,
          },
        }
      );

      if (response.status === 200) {
        const data = response.data.data;
        setAllTickets(data);
        try {
          const unassigned = data.filter((ticket) => !ticket.assigned_to);
          setUnassignedTickets(unassigned);

          const inprogress = data.filter(
            (ticket) => ticket.status === "In Progress"
          );
          setInprogressTickets(inprogress);

          const closed = data.filter((ticket) => ticket.status === "Closed");
          setClosedTickets(closed);

          const pending = data.filter((ticket) => ticket.status === "Pending");
          setPendingTickets(pending);

          const cancelled = data.filter(
            (ticket) => ticket.status === "Cancelled"
          );
          setCancelledTickets(cancelled);

          const rejected = data.filter(
            (ticket) => ticket.status === "Rejected"
          );
          setRejectedTickets(rejected);
        } catch (err) {
          console.log("Error setting state", err);
        }
      }
    } catch (e) {
      if (e.response) {
        console.log("Error >", e.response);
      }
    }
    setIsLoading(false);
    setFetchAllTickets(false);
  };

  const getAllEmployees = async () => {
    try {
      const orgId = auth.user.org_id._id;
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/users/getbyorg/${orgId}?page_number=1&limit=${Number.MAX_SAFE_INTEGER}`,
        {
          headers: {
            token: auth.token,
          },
        }
      );

      if (response.status === 200) {
        const data = response.data.data.data;
        setAllEmployees(data);
      }
    } catch (e) {
      if (e.response) {
        console.log("Error >", e.response);
      }
    }
  };

  function pad(num) {
    num = num.toString();
    if (num < 10 && num > 0) {
      num = "0" + num;
    }
    return num;
  }

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (initialRender) {
      setInitialRender(false);
      if (props.location?.state?.page) {
        setPageType(props.location.state.page);
      }
    }
    // API call goes here
    getAllEmployees();
    if (fetchAllTickets) getAllTickets();
  }, [fetchAllTickets]); //eslint-disable-line react-hooks/exhaustive-deps

  const getTabContent = (type) => {
    switch (type) {
      case All_TICKETS:
        if (allTickets.length) {
          return <AllTickets all_tickets={allTickets} />;
        } else {
          return <></>;
        }

      // pass paramter as props in AllTickets
      case UNASSIGNED_TICKETS:
        if (allTickets.length) {
          return <AllTickets all_tickets={unAssignedTickets} />;
        } else {
          return <></>;
        }

      case INPROGRESS_TICKETS:
        if (allTickets.length) {
          return <AllTickets all_tickets={inprogressTickets} />;
        } else {
          return <></>;
        }

      case CLOSED_TICKETS:
        if (allTickets.length) {
          return <AllTickets all_tickets={closedTickets} />;
        } else {
          return <></>;
        }

      case PENDING_TICKETS:
        if (allTickets.length) {
          return <AllTickets all_tickets={pendingTickets} />;
        } else {
          return <></>;
        }

      case CANCELLED_TICKETS:
        if (allTickets.length) {
          return <AllTickets all_tickets={cancelledTickets} />;
        } else {
          return <></>;
        }

      case REJECTED_TICKETS:
        if (allTickets.length) {
          return <AllTickets all_tickets={rejectedTickets} />;
        } else {
          return <></>;
        }

      default:
        return <div>Nothing to show</div>;
    }
  };

  function funViewDetails(value) {
    setViewDetails(value);
  }

  const buttonClicked = (type) => {
    funViewDetails(false);
    setPageType(type);
  };
  return (
    <React.Fragment>
      <QueriesAllTicketContext.Provider
        value={{
          allEmployees,
          setFetchAllTickets,
          funViewDetails,
          getAllTickets,
          viewDetails,
        }}
      >
        <div className={classes.root}>
          <ThemeProvider theme={theme}>
            <main
              className={clsx(classes.content, {
                [classes.contentShift]: props.isDrawerOpen,
              })}
              // style={{backgroundColor:"#F7F8FC"}}
            >
              <Typography
                style={{
                  textAlign: "left",
                  minWidth: "230px",
                }}
              >
                Home {">"} Employee Management {">"} Queries
              </Typography>

              <div
                style={{
                  display: "flex",
                  margin: "10px",
                  marginLeft: "0px",
                  flexWrap: "wrap",
                }}
              >
                <div
                  onClick={() => buttonClicked(All_TICKETS)}
                  style={{
                    backgroundColor:
                      pageType === All_TICKETS ? "#1F299C" : "#FFFFFF",
                    padding: "15px",
                    cursor: "pointer",
                    borderRadius: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: "2px",
                    borderStyle: "solid",
                    borderColor: "#1F299C",
                    display: "flex",
                    flexDirection: "column",
                    margin: "5px 10px 5px 0px",
                  }}
                >
                  {/* <p style={{margin: "0px", fontSize: "20px", color: pageType === All_TICKETS ? "#FFFFFF" : "#1F299C"}}>All Tickets 003</p> */}

                  <Typography
                    variant='subtitle1'
                    style={{
                      color: pageType === All_TICKETS ? "#FFFFFF" : "#1F299C",
                    }}
                  >
                    All Tickets &nbsp; <b>{pad(allTickets.length)}</b>
                  </Typography>
                </div>

                <div
                  onClick={() => buttonClicked(UNASSIGNED_TICKETS)}
                  style={{
                    backgroundColor:
                      pageType === UNASSIGNED_TICKETS ? "#1F299C" : "#FFFFFF",
                    padding: "15px",
                    cursor: "pointer",
                    borderRadius: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: "2px",
                    borderStyle: "solid",
                    borderColor: "#1F299C",
                    display: "flex",
                    margin: "5px 10px 5px 0px",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant='subtitle1'
                    style={{
                      color:
                        pageType === UNASSIGNED_TICKETS ? "#FFFFFF" : "#1F299C",
                    }}
                  >
                    Unassigned Tickets &nbsp;{" "}
                    <b>{pad(unAssignedTickets.length)}</b>
                  </Typography>
                </div>

                <div
                  onClick={() => buttonClicked(PENDING_TICKETS)}
                  style={{
                    backgroundColor:
                      pageType === PENDING_TICKETS ? "#1F299C" : "#FFFFFF",
                    padding: "15px",
                    cursor: "pointer",
                    borderRadius: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: "2px",
                    borderStyle: "solid",
                    borderColor: "#1F299C",
                    display: "flex",
                    margin: "5px 10px 5px 0px",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant='subtitle1'
                    style={{
                      color:
                        pageType === PENDING_TICKETS ? "#FFFFFF" : "#1F299C",
                    }}
                  >
                    Pending Tickets &nbsp; <b>{pad(pendingTickets.length)}</b>
                  </Typography>
                </div>

                <div
                  onClick={() => buttonClicked(INPROGRESS_TICKETS)}
                  style={{
                    backgroundColor:
                      pageType === INPROGRESS_TICKETS ? "#1F299C" : "#FFFFFF",
                    padding: "15px",
                    cursor: "pointer",
                    borderRadius: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: "2px",
                    borderStyle: "solid",
                    borderColor: "#1F299C",
                    display: "flex",
                    margin: "5px 10px 5px 0px",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant='subtitle1'
                    style={{
                      color:
                        pageType === INPROGRESS_TICKETS ? "#FFFFFF" : "#1F299C",
                    }}
                  >
                    In-Progress Tickets &nbsp;{" "}
                    <b>{pad(inprogressTickets.length)}</b>
                  </Typography>
                </div>

                <div
                  onClick={() => buttonClicked(CANCELLED_TICKETS)}
                  style={{
                    backgroundColor:
                      pageType === CANCELLED_TICKETS ? "#1F299C" : "#FFFFFF",
                    padding: "15px",
                    cursor: "pointer",
                    borderRadius: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: "2px",
                    borderStyle: "solid",
                    borderColor: "#1F299C",
                    display: "flex",
                    margin: "5px 10px 5px 0px",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant='subtitle1'
                    style={{
                      color:
                        pageType === CANCELLED_TICKETS ? "#FFFFFF" : "#1F299C",
                    }}
                  >
                    Cancelled Tickets &nbsp;{" "}
                    <b>{pad(cancelledTickets.length)}</b>
                  </Typography>
                </div>

                <div
                  onClick={() => buttonClicked(REJECTED_TICKETS)}
                  style={{
                    backgroundColor:
                      pageType === REJECTED_TICKETS ? "#1F299C" : "#FFFFFF",
                    padding: "15px",
                    cursor: "pointer",
                    borderRadius: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: "2px",
                    borderStyle: "solid",
                    borderColor: "#1F299C",
                    display: "flex",
                    margin: "5px 10px 5px 0px",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant='subtitle1'
                    style={{
                      color:
                        pageType === REJECTED_TICKETS ? "#FFFFFF" : "#1F299C",
                    }}
                  >
                    Rejected Tickets &nbsp; <b>{pad(rejectedTickets.length)}</b>
                  </Typography>
                </div>

                <div
                  onClick={() => buttonClicked(CLOSED_TICKETS)}
                  style={{
                    backgroundColor:
                      pageType === CLOSED_TICKETS ? "#1F299C" : "#FFFFFF",
                    padding: "15px",
                    cursor: "pointer",
                    borderRadius: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: "2px",
                    borderStyle: "solid",
                    borderColor: "#1F299C",
                    display: "flex",
                    margin: "5px 10px 5px 0px",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant='subtitle1'
                    style={{
                      color:
                        pageType === CLOSED_TICKETS ? "#FFFFFF" : "#1F299C",
                    }}
                  >
                    Closed Tickets &nbsp; <b>{pad(closedTickets.length)}</b>
                  </Typography>
                </div>
              </div>

              {getTabContent(pageType)}
            </main>
          </ThemeProvider>
        </div>
        <Backdrop className={classes.backdrop} open={isLoading}>
          <CircularProgress color='inherit' />
        </Backdrop>
      </QueriesAllTicketContext.Provider>
    </React.Fragment>
  );
};
