import React from "react";
import "@fontsource/roboto";
import {
  Grid,
  Backdrop,
  CircularProgress,
  Typography,
} from "@material-ui/core";
// import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
// import DateFnsUtils from '@date-io/date-fns';
import clsx from "clsx";
// import Api from "../../../hooks/AjaxAction";
import { useDasboardStyles } from "./Style";
import { KeyMetric } from "./keyMetric";
import CanvasJSReact from "../../../utils/canvasjs/canvasjs.react";
// import { ViewState } from '@devexpress/dx-react-scheduler';
// import {Scheduler,DayView,Appointments,} from '@devexpress/dx-react-scheduler-material-ui';
import { ThemeProvider } from "@material-ui/styles";
import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { useHistory } from "react-router-dom";
// import moment from "moment";
// import { useNavigate } from "react-router-dom";


var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const getDonutOptions = (no_of_males, no_of_females, no_of_others) => {
  const donutChartOption = {
    animationEnabled: true,
    title: {
      text: "",
    },
    // subtitles: [{
    //     text: "7",
    //     verticalAlign: "center",
    //     fontSize: 24,
    //     dockInsidePlotArea: true
    // }],
    data: [
      {
        type: "doughnut",
        showInLegend: false,
        // indexLabel: "{name}: {y}",
        // yValueFormatString: "#,###'%'",
        dataPoints: [
          { name: "Males", y: no_of_males, color: "#0067b8" },
          { name: "Females", y: no_of_females, color: "#fe4589" },
          { name: "Others/Unknowns", y: no_of_others, color: "#A95099" },
        ],
      },
    ],
  };

  return donutChartOption;
};

// const currentDate = '2018-11-01';
// const schedulerData = [
//   { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: '(Afternoon Shift) 9 Hrs'  },
//   { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: '(Evening Shift)' },
//   { startDate: '2018-11-02T12:00', endDate: '2018-11-02T13:30', title: '(Afternoon Shift)' }
// ];

export const Dashboard = (props) => {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  const classes = useDasboardStyles();
  const auth = useAuth();

  const [isLoading, setIsLoading] = React.useState(false);
  const [allEmployees, setAllEmployees] = React.useState([]);
  const history = useHistory();
  // const navigate = useNavigate();

  const [counts, setCounts] = React.useState({
    genderCount: {
      total: 0,
      male: 0,
      female: 0,
      others: 0,
    },
    absent: 0,
    attendence: 0,
    late: 0,
    totalProjects: 0,
    newJoiners: 0,
    onHoliday: 0,
    todaysTasks: 0,
    pendingRequests: 0,
    pendingLeaves: 0,
    pendingMissedPunches: 0,
  });

  const getAllEmployees = async () => {
    setIsLoading(true);
    var response;
    const orgId = auth.user.org_id._id;
    try {
      response = await axios.get(
        `${
          process.env.REACT_APP_API_BASE_URL
        }/users/getbyorg/${orgId}?page_number=${""}&limit=${""}`
      );
      if (response.status === 200) {
        const data = response.data.data;
        setAllEmployees(data.data);
      }
    } catch (e) {
      if (e.response) {
        console.log("Error >", e.response);
      }
    }
    // await getCounts(response.data.data.data);
  };

  const getAllCounts = async () => {
    setIsLoading(true);

    const orgId = auth.user.org_id._id;
    let count = {};
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/org/getCounts/${orgId}`,
        {
          headers: {
            token: auth.token,
          },
        }
      );

      if (response.data.status === true) {
        count = response.data.data;
      }
      setCounts({ ...count });
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  React.useEffect(async () => {
    await getAllEmployees();
    await getAllCounts();
  }, []);

  function pad(num) {
    num = num?.toString();
    if (num < 10 && num > 0) {
      num = "0" + num;
    }
    return num;
  }
  const handleNavigateClick = (link, key) => {
    let page = null;
    if (key === "leaves-approvals") page = "LEAVES_APPROVALS";
    if (key === "pending-tickets") page = "PENDING_TICKETS";
    if (key === "missed-punches") page = "MISSED_PUNCHS";
    history.push({
      pathname: `${link}`,
      state: {
        page,
      },
    });
  };
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
              Home {">"} Employee Management {">"} Dashboard
            </Typography>

            <Grid
              container
              spacing={2}
              style={{ marginTop: "10px", minWidth: "170px" }}
            >
              <Grid item xs={12}>
                {/* ---- Paper Cards -------- */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3} lg={2}>
                    <KeyMetric
                      data={{
                        title: "Today Tasks",
                        subTitle: "",
                        value: pad(counts.todaysTasks),
                        description: "Pending Approvals",
                        color: "#e9594a",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={2}>
                    <KeyMetric
                      data={{
                        title: "On Holiday",
                        subTitle: "Current Week",
                        value: pad(counts.onHoliday),
                        description: "Employee",
                        color: "#1F299C",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={2}>
                    <KeyMetric
                      data={{
                        title: "Absent",
                        subTitle: "Today",
                        value: pad(counts.absent),
                        description: "Employee",
                        color: "#1F299C",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={2}>
                    <KeyMetric
                      data={{
                        title: "New Joiners",
                        subTitle: "Current Month",
                        value: pad(counts.newJoiners),
                        description: "Employee",
                        color: "#1F299C",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={4}>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        handleNavigateClick("/shift-mngmt/projectsAndSites");
                      }}
                    >
                      <KeyMetric
                        data={{
                          title: "Projects",
                          subTitle: "2020  - 2021",
                          value: pad(counts.totalProjects),
                          description: "Total",
                          color: "#1F299C",
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={2}>
                    <KeyMetric
                      data={{
                        title: "Attendance",
                        subTitle: "Today",
                        value: pad(counts.attendence),
                        description: "Total",
                        color: "#1F299C",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={2}>
                    <KeyMetric
                      data={{
                        title: "Late",
                        subTitle: "Today",
                        value: pad(counts.late),
                        description: "Total",
                        color: "#e9594a",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={2}>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        handleNavigateClick(
                          "/LeavesAttendanceHR",
                          "leaves-approvals"
                        );
                      }}
                    >
                      <KeyMetric
                        data={{
                          title: "Leave Requests",
                          subTitle: "Pending Today",
                          value: pad(counts.pendingLeaves),
                          description: "Total",
                          color: "#1F299C",
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={2}>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        handleNavigateClick(
                          "/QueriesAllTicket",
                          "pending-tickets"
                        );
                      }}
                    >
                      <KeyMetric
                        data={{
                          title: "Query Requests",
                          subTitle: "Pending Today",
                          value: pad(counts.pendingRequests),
                          description: "Total",
                          color: "#1F299C",
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={2}>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        handleNavigateClick(
                          "/LeavesAttendanceHR",
                          "missed-punches"
                        );
                      }}
                    >
                      <KeyMetric
                        data={{
                          title: "Missed Punch Requests",
                          subTitle: "Pending Today",
                          value: pad(counts.pendingMissedPunches),
                          description: "Total",
                          color: "#1F299C",
                        }}
                      />
                    </div>
                  </Grid>
                  {/* second row */}
                  <Grid item xs={12} lg={8} style={{ paddingRight: "45px" }}>
                    <Grid
                      container
                      justifyContent='space-evenly'
                      style={{
                        backgroundColor: "#FFFFFF",
                        marginTop: "0px 10px 0px, 10px",
                        padding: "15px",
                        minHeight: "210px",
                        maxHeight: "400px",
                        width: "100%",
                        borderRadius: "10px",
                        overflow: "hidden",
                      }}
                    >
                      <Grid
                        item
                        // xs={8}
                        xs={12}
                        md={9}
                        // lg = {8}
                      >
                        <div
                          style={{
                            textAlign: "left",
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                          }}
                        >
                          <Typography
                            variant='h5'
                            style={{
                              color: "#000066",
                              fontWeight: "800",
                              margin: "0",
                              padding: "0",
                            }}
                          >
                            Total Employee &nbsp;&nbsp;
                          </Typography>

                          <p
                            style={{
                              margin: "0px",
                              fontSize: "1em",
                              color: "darkblue",
                            }}
                          >
                            &nbsp;|&nbsp;&nbsp; 2020 - 2021 &nbsp;&nbsp;&nbsp;
                          </p>

                          <div
                            style={{
                              textAlign: "left",
                              display: "flex",
                              alignItems: "center",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <span className={classes.dotBlue}></span>
                              <p style={{ fontSize: "1em", color: "darkblue" }}>
                                &nbsp; Male &nbsp;&nbsp;
                              </p>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <span className={classes.dotPink}></span>
                              <p style={{ fontSize: "1em", color: "darkblue" }}>
                                &nbsp; Female &nbsp;&nbsp;
                              </p>
                            </div>
                          </div>
                        </div>

                        <Grid
                          container
                          spacing={1}
                          justifyContent='flex-end'
                          alignItems='flex-end'
                          style={{
                            textAlign: "left",
                            marginTop: "10px",
                          }}
                        >
                          <Grid
                            item
                            xs={12}
                            // sm ={6}
                            md={3}
                            lg={3}
                            style={{
                              dislay: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <Typography
                              variant='h6'
                              style={{
                                color: "#000066",
                              }}
                            >
                              Male
                            </Typography>
                            <Typography
                              variant='h4'
                              style={{
                                color: "#0067b8",
                                fontWeight: "800",
                              }}
                            >
                              {pad(counts.genderCount.male)}
                            </Typography>
                          </Grid>

                          <Grid
                            item
                            xs={12}
                            // sm ={6}
                            md={3}
                            lg={3}
                            style={{
                              dislay: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <Typography
                              variant='h6'
                              style={{
                                color: "#000066",
                              }}
                            >
                              Female
                            </Typography>

                            <Typography
                              variant='h4'
                              style={{
                                color: "#fe4589",
                                fontWeight: "800",
                              }}
                            >
                              {pad(counts.genderCount.female)}
                            </Typography>
                          </Grid>

                          <Grid
                            item
                            xs={12}
                            // sm ={6}
                            md={3}
                            lg={3}
                            style={{
                              dislay: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <Typography
                              variant='h6'
                              style={{
                                color: "#000066",
                              }}
                            >
                              Others/ Unknowns
                            </Typography>

                            <Typography
                              variant='h4'
                              style={{
                                color: "#A95099",
                                fontWeight: "800",
                              }}
                            >
                              {pad(counts.genderCount.others)}
                            </Typography>
                          </Grid>

                          <Grid
                            item
                            xs={12}
                            // sm ={6}
                            md={3}
                            lg={3}
                            style={{
                              dislay: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <Typography
                              variant='h6'
                              style={{
                                color: "#000066",
                              }}
                            >
                              Total
                            </Typography>

                            <Typography
                              variant='h4'
                              style={{
                                color: "#16215b",
                                fontWeight: "800",
                              }}
                            >
                              {pad(counts.genderCount.total)}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        md={3}
                        // justifyContent="center"
                        alignItems='center'
                        style={{
                          position: "relative",
                          height: "100%",
                          maxHeight: "223px",
                        }}
                      >
                        <CanvasJSChart
                          options={getDonutOptions(
                            counts.genderCount.male,
                            counts.genderCount.female,
                            counts.genderCount.others
                          )}
                          containerProps={{ height: "250px" }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </main>
        </ThemeProvider>
      </div>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </React.Fragment>
  );
};
