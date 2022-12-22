import React from "react";
import {
  Box,
  createTheme,
  Grid,
  IconButton,
  Typography
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { ThemeProvider } from "styled-components";
import { useAssetStyles } from "../Style";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem as MuiTimelineItem,
  TimelineSeparator
} from "@material-ui/lab";
import { withStyles } from "@material-ui/styles";

export const ActivityDialog = props => {
  const { setOpenDialog, selectedAsset } = props;
  let theme = createTheme();

  const TimelineItem = withStyles({
    missingOppositeContent: {
      "&:before": {
        display: "none"
      }
    }
  })(MuiTimelineItem);

  const classes = useAssetStyles();
  const handleClose = () => {
    setOpenDialog(false);
  };

  // const today = new Date();
  // date =
  //   today.getDate() +
  //   "-" +
  //   (today.getMonth() + 1) +
  //   "-" +
  //   today.getFullYear();

  return (
    <React.Fragment>
      <div className="root">
        <ThemeProvider theme={theme}>
          <Grid container>
            <Grid container item xs={10}>
              <Typography
                variant="h5"
                className={classes.fontWeight500}
                style={{
                  padding: "10px 20px"
                }}
              >
                <span>Activity</span>
              </Typography>
            </Grid>
            <Grid container item xs={2} justify="flex-end">
              <IconButton
                className={classes.colorBlack}
                onClick={handleClose}
                style={{
                  padding: "10px 20px"
                }}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
          <hr
            style={{
              margin: "0"
            }}
          ></hr>
          <Box
            sx={{
              width: "100%"
              //   height: "90%",
            }}
            margin="30px"
            style={
              {
                //   border: "1px solid rgba(163,163,163,0.5)",
                //   borderRadius: "7px",
              }
            }
          >
            <Timeline
              position="left"
              style={{
                padding: "6px"
              }}
            >
              {selectedAsset.activities.map(
                (activity, activityIdx, { activitiesLength }) => {
                  return (
                    // <Timeline
                    //   position="left"
                    //   style={{
                    //     padding: "6px",
                    //   }}
                    // >
                    <div>
                      <TimelineItem
                        style={{
                          margin: "0px"
                        }}
                      >
                        <TimelineSeparator>
                          <TimelineDot color="primary" />
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent
                          style={{
                            height: "80%",
                            marginTop: "-9px"
                          }}
                        >
                          <Typography
                            className={classes.colorBlue}
                            variant="h6"
                          >
                            {activity.date}
                          </Typography>
                        </TimelineContent>
                      </TimelineItem>

                      {activity.acts.map((act, idx, { length }) => {
                        return (
                          <TimelineItem
                            style={{
                              margin: "0px",
                              height: idx === length - 1 ? "80px" : ""
                            }}
                          >
                            <TimelineSeparator
                              style={{
                                height: "100px"
                              }}
                            >
                              <TimelineDot variant="outlined" color="primary" />
                              {/* {activityIdx != activitiesLength - 1 } */}
                              {idx === length - 1 ? "" : <TimelineConnector />}
                            </TimelineSeparator>
                            <TimelineContent
                              style={{
                                marginTop: "-30px"
                              }}
                            >
                              <Box
                                sx={{
                                  width: "80%"
                                }}
                                style={{
                                  border: "1px solid rgba(163,163,163,0.5)",
                                  borderRadius: "7px"
                                }}
                              >
                                <Grid
                                  container
                                  xs={12}
                                  style={{
                                    margin: "14px",
                                    width: "auto"
                                  }}
                                >
                                  <Grid item xs={12}>
                                    <Typography
                                      className={classes.colorBlue}
                                      variant="body1"
                                      style={{
                                        fontSize: "0.90rem"
                                      }}
                                    >
                                      {act.time}
                                      &nbsp;|&nbsp;Modify By:&nbsp;
                                      {act.empName}
                                      &nbsp;(
                                      {act.empId})
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Typography
                                      variant="h6"
                                      className={classes.colorBlue}
                                      style={{
                                        fontSize: "1.10rem",
                                        color: act.status.includes("Delete")
                                          ? "rgb(204, 0, 0)"
                                          : ""
                                      }}
                                    >
                                      {act.status}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Box>
                            </TimelineContent>
                          </TimelineItem>
                        );
                      })}
                      {/* </Timeline> */}
                    </div>
                  );
                }
              )}
            </Timeline>
          </Box>
        </ThemeProvider>
      </div>
    </React.Fragment>
  );
};
