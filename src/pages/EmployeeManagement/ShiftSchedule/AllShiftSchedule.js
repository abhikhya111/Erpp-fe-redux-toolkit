import React from "react";
import "@fontsource/roboto";
import {
  Grid,
  InputBase,
  IconButton,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Paper
} from "@material-ui/core";
import {
  Scheduler,
  DayView,
  Appointments
} from "@devexpress/dx-react-scheduler-material-ui";
import { ViewState } from "@devexpress/dx-react-scheduler";
// import DateFnsUtils from '@date-io/date-fns';
import useAuth from "hooks/useAuth";
// import clsx from "clsx";
// import Api from "../../../hooks/AjaxAction";
import axios from "axios";
import SearchIcon from '@material-ui/icons/Search';
// import { useShiftScheduleStyles } from "./style";

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

export const AllShiftSchedule = () => {
  // const classes = useShiftScheduleStyles();

  const auth = useAuth();
  //   const [isLoading, setIsLoading] = React.useState(false);
  const [allShiftSchedule, setAllShiftSchedule] = React.useState([]);
  console.log(allShiftSchedule);
  const getAllShiftSchedule = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/leaves/getAllLeaves`,
        {
          headers: {
            token: auth.token
          }
        }
      );

      if (response.status === 200) {
        const data = response.data.data;
        setAllShiftSchedule(data);
        console.log(data);
      }
    } catch (e) {
      if (e.response) {
        console.log("Error >", e.response);
      }
    }
  };

  React.useEffect(() => {
    // API call goes here
    getAllShiftSchedule();
  });

  return (
    <React.Fragment>

        <div
            style={{
            display:"flex",
            flexWrap:"wrap",
            position:"relative"
            }}
        >

          <Paper
            style={{
                width:"275px",
                minWidth:"225px",
                height:"56px",
                backgroundColor:"rgb(248,248,248)",
                marginRight:"20px",
                marginBottom:"20px",
                display:"flex",
                justifyContent:'center',
                alignItems:"center"
            }}
            >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                style={{
                paddingLeft:"5px"
                }}
                placeholder="  Search..."
            />
            <IconButton style={{paddingleft:"-5px", paddingRight:"0px"}} aria-label="search">
                <SearchIcon style={{paddingleft:"-5px", paddingRight:"0px"}} />
            </IconButton>
          </Paper>

          <FormControl 
            variant = "outlined"
            style={{ 
                minWidth: "225px",
                marginRight:"20px",
                marginBottom:"10px",
            }}
            >
            <InputLabel 
                // style={{
                //   paddingLeft:"5px"
                // }}
                id="demo-simple-select-label-1"
            >
                All
            </InputLabel>
            <Select
                labelId="demo-simple-select-label-1"
                label="Schedules"
                id="demo-simple-select"
                >
                <MenuItem value=""><em>All</em></MenuItem>
                <MenuItem value={10}>Active</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>

          <FormControl 
            variant = "outlined"
            style={{ 
                width:"275px",
                minWidth: "225px",
                marginRight:"auto",
                marginBottom:"10px",
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
                <MenuItem value="All"><em>All</em></MenuItem>
                <MenuItem value={10}>Active</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>

          
          
          <Grid
            container
            xs={12}
            md={12}
            lg={12}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Paper>
              <Scheduler data={schedulerData}>
                <ViewState currentDate={currentDate} />
                <DayView startDayHour={9} endDayHour={14} />
                <Appointments />
              </Scheduler>
            </Paper>
          </Grid>
        </div>
    </React.Fragment>
  );
};
