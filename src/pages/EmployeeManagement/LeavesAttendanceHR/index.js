import React, { createContext, useState } from "react";
import "@fontsource/roboto";
import {
  Backdrop,
  CircularProgress,
  Typography,
  Paper,
  TablePagination,
} from "@material-ui/core";
import useAuth from "hooks/useAuth";
import axios from "axios";
import clsx from "clsx";
// import Api from "../../../hooks/AjaxAction";
import { useLeavesAttendanceHRStyles } from "./style";
import { LeavesApprovals } from "./LeavesApprovals";
// import { AttandanceNotice } from "./AttandanceNotice";
import { PunchedLogs } from "./PunchedLogs";
// import { TimeSheet } from "./TimeSheet";
// import { TimeTracker } from "./TimeTracker";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { MissedPunchs } from "./MissedPunchs";
// import { ThemeContext } from "styled-components";
// import { get } from "lodash";
export const ReFetchContext = createContext(null);

export const LeavesAttendanceHR = (props) => {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  const LEAVES_APPROVALS = "LEAVES_APPROVALS";
  // const ATTENDANCE_NOTICE = "ATTENDANCE_NOTICE";
  const PUNCH_LOGS = "PUNCH_LOGS";
  // const TIMESHEET = "TIMESHEET";
  // const TIME_TRACKER = "TIME_TRACKER";
  const MISSED_PUNCHS = "MISSED_PUNCHS";

  const classes = useLeavesAttendanceHRStyles();
  const auth = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);
  const [pageType, setPageType] = React.useState(LEAVES_APPROVALS);
  const [leaveApprovalsQty, setLeaveApprovalsQty] = React.useState(0);
  const [attendanceNoticeQty, setAttendanceNoticeQty] = React.useState("00");
  const [allAttendance, setAllAttendance] = React.useState([]);
  const [allLeavesApprovals, setAllLeavesApprovals] = React.useState([]);
  // const [reload, setReload] = React.useState(false);
  const [missedPunchs, setMissedPunches] = useState([]);
  const [initialRender, setInitialRender] = React.useState(true);

  function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
  }

  const getAllAttendance = async (page_number = 0, limit = 50) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/attendance/getbyorg/${
          auth.user.org_id._id
        }?year=${""}&page_number=${page_number + 1}&limit=${limit}`,
        {
          headers: {
            token: auth.token,
          },
        }
      );

      if (response.status === 200) {
        const { attendances, count, allAttendances: data } = response.data.data;
        setAllAttendance(attendances);
        var counter = 0;
        data.map((element) => {
          element.punch_details.map((punch) => {
            counter++;
          });
        });
        const qty = await pad(counter, 2);
        setAttendanceNoticeQty(qty);
        const missed_punch_details = data.filter((attendence) => {
          return (
            attendence.hasOwnProperty("missed_punch_details") &&
            attendence.missed_punch_details.length > 0
          );
        });
        setMissedPunches(missed_punch_details);
        console.log(missed_punch_details);
      }
    } catch (e) {
      if (e.response) {
        console.log("Error >", e.response);
      }
    }
    setIsLoading(false);
  };
  const [pageLA, setPageLA] = React.useState(0);
  const [rowsPerPageLA, setRowsPerPageLA] = React.useState(25);

  const [pageMP, setPageMP] = React.useState(0);
  const [rowsPerPageMP, setRowsPerPageMP] = React.useState(25);

  const [pageA, setPageA] = React.useState(0);
  const [rowsPerPageA, setRowsPerPageA] = React.useState(25);

  const handleChangePageLA = (event, newPage) => {
    setPageLA(newPage);
    getAllLeavesApproval(newPage, rowsPerPageLA);
  };
  const handleChangeRowsPerPageLA = (event) => {
    setRowsPerPageLA(parseInt(event.target.value, 10));
    setPageLA(0);
    getAllLeavesApproval(0, parseInt(event.target.value, 10));
  };
  const handleChangePageA = (event, newPage) => {
    setPageA(newPage);
    getAllAttendance(newPage, rowsPerPageA);
  };
  const handleChangeRowsPerPageA = (event) => {
    setRowsPerPageA(parseInt(event.target.value, 10));
    setPageA(0);
    getAllAttendance(0, parseInt(event.target.value, 10));
    // getAllLeavesApproval(1, parseInt(event.target.value, 10));
  };

  const handleChangePageMP = (event, newPage) => {
    setPageMP(newPage);
    // getAllLeavesApproval(newPage, rowsPerPage);
    // getAllLeavesApproval(newPage, rowsPerPage);
  };
  const handleChangeRowsPerPageMP = (event) => {
    setRowsPerPageMP(parseInt(event.target.value, 10));
    setPageMP(0);
    // getAllLeavesApproval(1, parseInt(event.target.value, 10));
  };

  const getAllLeavesApproval = async (page_number = 0, limit = 50) => {
    try {
      const response = await axios.get(
        `${
          process.env.REACT_APP_API_BASE_URL
        }/leaves/getAllLeaves?page_number=${page_number + 1}&limit=${limit}`,
        {
          headers: {
            token: auth.token,
          },
        }
      );
      if (response.status === 200) {
        const { allLeaves, count } = response.data.data;
        setAllLeavesApprovals(allLeaves);
        setLeaveApprovalsQty(parseInt(count));
      }
    } catch (e) {
      if (e.response) {
        console.log("Error >", e.response);
      }
    }
  };
  const getTabContent = (type) => {
    switch (type) {
      case LEAVES_APPROVALS:
        if (allLeavesApprovals && allLeavesApprovals.length) {
          return (
            <>
              <LeavesApprovals
                all_leaves={allLeavesApprovals}
                after_opn={getAllLeavesApproval}
              />
              <TablePagination
                style={{ backgroundColor: "#F7F8FC" }}
                rowsPerPageOptions={[25, 50]}
                component='div'
                count={leaveApprovalsQty}
                rowsPerPage={rowsPerPageLA}
                page={pageLA}
                onPageChange={handleChangePageLA}
                onRowsPerPageChange={handleChangeRowsPerPageLA}
              />
            </>
          );
        } else {
          return <></>;
        }

      case PUNCH_LOGS:
        if (allLeavesApprovals.length) {
          return (
            <>
              <PunchedLogs all_attendances={allAttendance} />;
              <TablePagination
                style={{ backgroundColor: "#F7F8FC" }}
                rowsPerPageOptions={[25, 50]}
                component='div'
                count={attendanceNoticeQty}
                rowsPerPage={rowsPerPageA}
                page={pageA}
                onPageChange={handleChangePageA}
                onRowsPerPageChange={handleChangeRowsPerPageA}
              />
            </>
          );
        } else {
          return <></>;
        }

      case MISSED_PUNCHS:
        if (allLeavesApprovals.length) {
          return (
            <>
              <MissedPunchs all_attendances={missedPunchs} />;
              <TablePagination
                style={{ backgroundColor: "#F7F8FC" }}
                rowsPerPageOptions={[25, 50]}
                component='div'
                count={100}
                rowsPerPage={rowsPerPageMP}
                page={pageMP}
                onPageChange={handleChangePageMP}
                onRowsPerPageChange={handleChangeRowsPerPageMP}
              />
            </>
          );
        } else {
          return <></>;
        }

      // case TIMESHEET:
      //   if (allLeavesApprovals.length) {
      //     return <TimeSheet all_attendances={allAttendance} />;
      //   } else {
      //     return <></>;
      //   }

      // case TIME_TRACKER:
      //   if (allLeavesApprovals.length) {
      //     return <TimeTracker all_attendances={allAttendance} />;
      //   } else {
      //     return <></>;
      //   }

      default:
        return <div>Nothing to show</div>;
    }
  };

  const buttonClicked = (type) => {
    setPageType(type);
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    // API call goes here
    const fetch = async () => {
      setIsLoading(true);
      await getAllLeavesApproval();
      await getAllAttendance();
      setIsLoading(false);
    };
    fetch();
    if (initialRender) {
      setInitialRender(false);
      if (props.location?.state?.page) {
        setPageType(props.location.state.page);
      }
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      <ReFetchContext.Provider value={{ getAllAttendance }}>
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
                Home {">"} Employee Management {">"} Leaves & Attendance
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
                  onClick={() => buttonClicked(LEAVES_APPROVALS)}
                  style={{
                    backgroundColor:
                      pageType === LEAVES_APPROVALS ? "#1F299C" : "#FFFFFF",
                    padding: "10px",
                    cursor: "pointer",
                    borderRadius: "10px",
                    borderWidth: "2px",
                    borderStyle: "solid",
                    borderColor: "#1F299C",
                    margin: "5px 10px 5px 0px",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant='subtitle1'
                    style={{
                      color:
                        pageType === LEAVES_APPROVALS ? "#FFFFFF" : "#1F299C",
                    }}
                  >
                    Leaves Approvals &nbsp; <b>{leaveApprovalsQty}</b>
                  </Typography>
                </div>

                {/* <div
                  onClick={() => buttonClicked(ATTENDANCE_NOTICE)}
                  style={{
                    backgroundColor:
                      pageType === ATTENDANCE_NOTICE ? "#1F299C" : "#FFFFFF",
                    padding: "10px",
                    cursor: "pointer",
                    borderRadius: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: "2px",
                    margin: "5px 10px 5px 0px",
                    borderStyle: "solid",
                    borderColor: "#1F299C",
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    style={{
                      color:
                        pageType === ATTENDANCE_NOTICE ? "#FFFFFF" : "#1F299C"
                    }}
                  >
                    Attendance Notice &nbsp; <b>{attendanceNoticeQty}</b>
                  </Typography>
                </div> */}

                <div
                  onClick={() => buttonClicked(PUNCH_LOGS)}
                  style={{
                    backgroundColor:
                      pageType === PUNCH_LOGS ? "#1F299C" : "#FFFFFF",
                    padding: "10px",
                    cursor: "pointer",
                    borderRadius: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: "2px",
                    margin: "5px 10px 5px 0px",
                    borderStyle: "solid",
                    borderColor: "#1F299C",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant='subtitle1'
                    style={{
                      color: pageType === PUNCH_LOGS ? "#FFFFFF" : "#1F299C",
                    }}
                  >
                    Punched Logs &nbsp; <b>{attendanceNoticeQty}</b>
                  </Typography>
                </div>

                <div
                  onClick={() => buttonClicked(MISSED_PUNCHS)}
                  style={{
                    backgroundColor:
                      pageType === MISSED_PUNCHS ? "#1F299C" : "#FFFFFF",
                    padding: "10px",
                    cursor: "pointer",
                    borderRadius: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: "2px",
                    margin: "5px 10px 5px 0px",
                    borderStyle: "solid",
                    borderColor: "#1F299C",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant='subtitle1'
                    style={{
                      color: pageType === MISSED_PUNCHS ? "#FFFFFF" : "#1F299C",
                    }}
                  >
                    Missed Punchs &nbsp; <b>{pad(missedPunchs.length, 2)}</b>
                  </Typography>
                </div>

                {/*<div
                onClick={() => buttonClicked(TIMESHEET)}
                style={{
                  backgroundColor:
                    pageType === TIMESHEET ? "#1F299C" : "#FFFFFF",
                  padding: "10px",
                  cursor: "pointer",
                  borderRadius: "10px",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "5px 10px 5px 0px",
                  borderWidth: "2px",
                  borderStyle: "solid",
                  borderColor: "#1F299C",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant='subtitle1'
                  style={{
                    color: pageType === TIMESHEET ? "#FFFFFF" : "#1F299C",
                  }}
                >
                  Timesheet
                </Typography>
              </div>

              <div
                onClick={() => buttonClicked(TIME_TRACKER)}
                style={{
                  backgroundColor:
                    pageType === TIME_TRACKER ? "#1F299C" : "#FFFFFF",
                  padding: "10px",
                  cursor: "pointer",
                  borderRadius: "10px",
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: "2px",
                  margin: "5px 10px 5px 0px",
                  borderStyle: "solid",
                  borderColor: "#1F299C",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant='subtitle1'
                  style={{
                    color: pageType === TIME_TRACKER ? "#FFFFFF" : "#1F299C",
                  }}
                >
                  Time Tracker
                </Typography>
              </div>*/}
              </div>

              <Paper
                style={{
                  padding: "20px 20px 50px 20px",
                  minWidth: "230px",
                  marginTop: "20px",
                  minHeight: "800px",
                }}
              >
                {getTabContent(pageType)}
              </Paper>
            </main>
          </ThemeProvider>
        </div>

        <Backdrop className={classes.backdrop} open={isLoading}>
          <CircularProgress color='inherit' />
        </Backdrop>
      </ReFetchContext.Provider>
    </React.Fragment>
  );
};
