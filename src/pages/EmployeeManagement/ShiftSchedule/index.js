import React from "react";
import "@fontsource/roboto";
import { Backdrop, CircularProgress, Typography, Paper } from "@material-ui/core";
// import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
// import DateFnsUtils from '@date-io/date-fns';
// import useAuth from "hooks/useAuth";
import clsx from "clsx";
// import Api from "../../../hooks/AjaxAction";
import { useShiftScheduleStyles } from "./style";
import { ShiftApprovals } from "./ShiftApprovals";
import { AllShiftSchedule } from "./AllShiftSchedule";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";


export const ShiftSchedule = props => {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  const classes = useShiftScheduleStyles();
  // const auth = useAuth();

  const SHIFT_APPROVALS = "SHIFT_APPROVALS";
  const VIEW_ALL_SHIFT_SCHEDULE = "VIEW_ALL_SHIFT_SCHEDULE";

  const [isLoading] = React.useState(false);
  const [pageType, setPageType] = React.useState(SHIFT_APPROVALS);

  React.useEffect(() => {
    // API call goes here
    //getResignByUser(auth.user._id);
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const getTabContent = type => {
    switch (type) {
      case SHIFT_APPROVALS:
        return <ShiftApprovals />;

      case VIEW_ALL_SHIFT_SCHEDULE:
        return <AllShiftSchedule />;

      default:
        return <div>No Component to render</div>;
    }
  };

  const buttonClicked = type => {
    setPageType(type);
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <ThemeProvider theme={theme}>
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: props.isDrawerOpen
            })}
          >
            <Typography
              style={{
                textAlign: "left",
                minWidth: "230px"
              }}
            >
              Home {">"} Employee Management {">"} Shift Schedule
            </Typography>

            <div
              style={{
                display: "flex",
                margin: "10px",
                marginLeft: "0px",
                flexWrap: "wrap"
              }}
            >
              <div
                onClick={() => buttonClicked(SHIFT_APPROVALS)}
                style={{
                  backgroundColor:
                    pageType === SHIFT_APPROVALS ? "#1F299C" : "#FFFFFF",
                  padding: "15px",
                  cursor: "pointer",
                  borderRadius: "10px",
                  borderWidth: "2px",
                  borderStyle: "solid",
                  borderColor: "#1F299C",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  margin: "5px 10px 5px 0px"
                }}
              >
                <Typography
                  variant="subtitle1"
                  style={{
                    color:
                      pageType === SHIFT_APPROVALS ? "#FFFFFF" : "#1F299C"
                  }}
                >
                  Shift Approvals 003
                </Typography>
              </div>
          
              <div
                onClick={() => buttonClicked(VIEW_ALL_SHIFT_SCHEDULE)}
                style={{
                  backgroundColor:
                    pageType === VIEW_ALL_SHIFT_SCHEDULE
                      ? "#1F299C"
                      : "#FFFFFF",
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
                  margin: "5px 10px 5px 0px"
                }}
              >
                <Typography
                  variant="subtitle1"
                  style={{
                    color:
                      pageType === VIEW_ALL_SHIFT_SCHEDULE
                        ? "#FFFFFF"
                        : "#1F299C"
                  }}
                >
                  View All Shift Schedule
                </Typography>
              </div>
            </div>
        
            <Paper
              style={{
                padding: "20px 20px 50px 20px",
                minWidth: "230px",
                marginTop: "20px",
                minHeight: "800px"
              }}
            >
              {getTabContent(pageType)}
            </Paper>
          </main>
        </ThemeProvider>
      </div>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
};
