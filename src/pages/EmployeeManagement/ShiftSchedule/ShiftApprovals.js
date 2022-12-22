import React from "react";
import "@fontsource/roboto";
import { Button, Grid, Paper,InputBase,IconButton, InputLabel, MenuItem, FormControl,
    Select, Dialog, DialogContent, Typography } from "@material-ui/core";
import useAuth from "hooks/useAuth";
import axios from "axios";
import { useShiftScheduleStyles } from "./style";
import SearchIcon from '@material-ui/icons/Search';
import CommentIcon from '@material-ui/icons/Comment';
import RemarkDialog from './RemarkDialog';

const mockedShiftApprovalsData = [
    {
        userName: 'Akash Vishwakarma',
        userId: 'E123456789',
        designation:'Software Engineer',
        requestedDate:'18-09-2021',
        daysLeft:'1 Day Left',
        shift:'Morning Shift',
        shiftDate:'18-09-2021 to 20-09-2021',
        time:'09:00AM to 06:00PM',
        duration:'02 Day',
        breakUnpaid:'30 Min',
        description:'Company sample name lorem ipsum is a placeholder text commonly used',
        status:'Pending'     
    },
    {
        userName: 'Akash Vishwakarma',
        userId: 'E123456789',
        designation:'Software Engineer',
        requestedDate:'18-09-2021',
        daysLeft:'1 Day Left',
        shift:'Morning Shift',
        shiftDate:'18-09-2021 to 20-09-2021',
        time:'09:00AM to 06:00PM',
        duration:'02 Day',
        breakUnpaid:'30 Min',
        description:'Company sample name lorem ipsum is a placeholder text commonly used',
        status:'Pending'     
    }
    
    
]

export const ShiftApprovals = () => {
    const classes = useShiftScheduleStyles();
    const [toggleRemarkPopup, setToggleRemarkPopup] = React.useState(false);

    const handleRemarkClick = () => setToggleRemarkPopup(!toggleRemarkPopup);

    const auth = useAuth();
    // const [isLoading, setIsLoading] = React.useState(false);
    const [shiftApprovals, setShiftApprovals] = React.useState([]);
    console.log(shiftApprovals)


    const getShiftApprovals = async () => {
        try {

            const response = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/leaves/getAllLeaves`,
                {
                    headers: {
                        token: auth.token,
                    },
                }
            );

            if (response.status === 200) {
                const data = response.data.data;
                setShiftApprovals(data);
                console.log(data);
            }

        } catch (e) {
            if (e.response) {
                console.log("Error >", e.response);
            }
        }
    }

    React.useEffect(() => {
        // API call goes here
        getShiftApprovals();
      });

    return (
        // <Grid container xs={12} md={12} lg={12} style={{marginTop: "50px"}}>
        // <div style={{ backgroundColor: "#FFFFFF", 
        //     margin: "100px 10px 0px, 10px",
        //     padding: "15px",
        //     height: "100%",
        //     width: "100%",
        //     borderRadius: "5px",
        //     display: "flex", flexDirection: "column" }}>

        //     <Grid container xs={12} md={12} lg={12} style={{ display: "flex", flexDirection: "column"}}>
        //             <Grid item xs={12} md={12} lg={12} style={{display: "flex", flexDirection: "row"}}>
        //                 <Grid item xs={12} md={12} lg={3} style={{}}>
        //                     <FormControl style={{ width: "250px"}}>
        //                         <InputLabel id="demo-simple-select-label">All</InputLabel>
        //                             <Select
        //                             labelId="demo-simple-select-label"
        //                             id="demo-simple-select"
        //                             label="Age"
        //                             >
        //                             <MenuItem value={10}>Ten</MenuItem>
        //                             <MenuItem value={20}>Twenty</MenuItem>
        //                             <MenuItem value={30}>Thirty</MenuItem>
        //                         </Select>
        //                     </FormControl>
        //                 </Grid>
        //                 <Grid item xs={12} md={12} lg={7} style={{}}>
        //                     <FormControl style={{ width: "250px"}}>
        //                         <InputLabel id="demo-simple-select-label">Selected Site</InputLabel>
        //                             <Select
        //                             labelId="demo-simple-select-label"
        //                             id="demo-simple-select"
        //                             label="Age"
        //                             >
        //                             <MenuItem value={10}>Ten</MenuItem>
        //                             <MenuItem value={20}>Twenty</MenuItem>
        //                             <MenuItem value={30}>Thirty</MenuItem>
        //                         </Select>
        //                     </FormControl>
        //                 </Grid>
        //                 <Grid item xs={12} md={6} lg={2} style={{}}>
        //                     <Input placeholder="Search" />
        //                 </Grid>
        //             </Grid>
        <React.Fragment>

            <div
                style={{
                display:"flex",
                flexWrap:"wrap",
                position:"relative"
                }}
            >

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

                <Paper
                style={{
                    width:"275px",
                    minWidth:"225px",
                    height:"56px",
                    backgroundColor:"rgb(248,248,248)",
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
            </div>

            {mockedShiftApprovalsData.map((shift,idx)=>{
                return (
                    // <Grid container xs={12} md={12} lg={12} style={{margin: "30px 0px 0px 0px", display: "flex", flexDirection: "row"}}>
                <div key = {idx} className={classes.listContainer}>
                    {/* <Grid container xs={12} md={12} lg={12} style={{display: "flex", flexWrap: "nowrap"}}>
                        <Grid item xs={12} md={10} lg={1} style={{flex: "0 0 4.16666%"}}> */}
                            <div className={classes.ProfileCircle}>
                                <Typography 
                                variant = "h6"
                                style={{ 
                                    color: "#1F299C", 
                                    fontWeight:"500" 
                                }}
                                >
                                    NL
                                </Typography>
                            </div>
                
                        <Grid container xs={12} style={{marginLeft: "15px"}}>
                            <Grid container xs={12} spacing ={2} style={{}}>
                                <Grid item xs={12} md={10} lg={8}>
                                    {/* <h2 style={{marginTop: "0", marginBottom: "0"}}>{shift.userName} ({shift.userId}) <span style={{fontSize: "20px"}}>| {shift.designation}</span></h2> */}
                                    <Typography
                                        variant = "h6"
                                        component = {"span"}
                                        style={{
                                            fontWeight:"800"
                                        }}
                                    >
                                        {shift.userName} ({shift.userId})
                                    </Typography>

                                    <Typography
                                        variant = "body2"
                                        // component = {"span"}
                                        style={{
                                            color:"grey",
                                            fontWeight:"500",
                                            display:'inline-block'
                                        }}
                                    >
                                        &nbsp; | &nbsp; {shift.designation}  
                                    </Typography>
                                </Grid>

                                <Grid container xs={12} lg={4} style={{justifyContent: "flex-end"}}>
                                    <Grid item xs={12} md={10} lg={7} style={{display: "flex", justifyContent: "flex-end",alignItems:"center"}}>
                                        {/* <p style={{marginTop: "0", marginBottom: "0"}}>Request Date: {shift.requestedDate}</p> */}
                                        <Typography
                                            variant = "body2"
                                            style={{
                                                color:"grey",
                                                fontWeight:"500"
                                            }}
                                        >
                                            Request Date: {shift.requestedDate}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} lg={3} style={{display: "flex", justifyContent: "flex-end",alignItems:"center"}}>
                                        {/* <p style={{marginTop: "0", marginBottom: "0", color: "#e9594a"}}>{shift.daysLeft}</p> */}
                                        <Typography
                                            variant = "body2"
                                            style={{
                                                // add color cond here based on days left 
                                                color:"#e9594a",
                                                fontWeight:"500"
                                            }}
                                        >
                                            {shift.daysLeft}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>

                            {/* <Grid container xs={12}spacing={1}> */}
                            <Grid container xs={12} spacing={1} style={{marginTop: "20px"}}>
                                <Grid item xs={12} md={6} lg={2}>
                                    {/* <p style={{marginTop: "0", marginBottom: "0"}}>Shift</p> */}
                                    <Typography
                                        variant = "body2"
                                        style={{
                                            color:"grey",
                                            fontWeight:"500"
                                        }}
                                    >
                                        Shift
                                    </Typography>
                                    {/* <h3 style={{marginTop: "5px", marginBottom: "0"}}>{shift.shift}</h3> */}
                                    <Typography
                                        variant = "body1"
                                        style={{
                                            fontWeight:"800"
                                        }}
                                    >
                                        {shift.shift}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} md={6} lg={3}>
                                    {/* <p style={{marginTop: "0", marginBottom: "0"}}>Shift Date</p> */}
                                    <Typography
                                        variant = "body2"
                                        style={{
                                            color:"grey",
                                            fontWeight:"500"
                                        }}
                                    >
                                        Shift Date
                                    </Typography>
                                    {/* <h3 style={{marginTop: "5px", marginBottom: "0"}}>{shift.shiftDate}</h3> */}
                                    <Typography
                                        variant = "body1"
                                        style={{
                                            fontWeight:"800"
                                        }}
                                    >
                                        {shift.shiftDate}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} md={6} lg={2}>
                                    {/* <p style={{marginTop: "0", marginBottom: "0"}}>Time</p> */}
                                    <Typography
                                        variant = "body2"
                                        style={{
                                            color:"grey",
                                            fontWeight:"500"
                                        }}
                                    >
                                        Time
                                    </Typography>
                                    {/* <h3 style={{marginTop: "5px", marginBottom: "0"}}>{shift.time}</h3> */}
                                    <Typography
                                        variant = "body1"
                                        style={{
                                            fontWeight:"800"
                                        }}
                                    >
                                        {shift.time}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} md={6} lg={1}>
                                    {/* <p style={{marginTop: "0", marginBottom: "0"}}>Duration</p> */}
                                    <Typography
                                        variant = "body2"
                                        style={{
                                            color:"grey",
                                            fontWeight:"500"
                                        }}
                                    >
                                        Duration
                                    </Typography>
                                    {/* <h3 style={{marginTop: "5px", marginBottom: "0"}}>{shift.duration}</h3> */}
                                    <Typography
                                        variant = "body1"
                                        style={{
                                            fontWeight:"800"
                                        }}
                                    >
                                        {shift.duration}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6} lg={2}>
                                    {/* <p style={{marginTop: "0", marginBottom: "0"}}>Brack Unpaid</p> */}
                                    <Typography
                                        variant = "body2"
                                        style={{
                                            color:"grey",
                                            fontWeight:"500"
                                        }}
                                    >
                                        Break Unpaid
                                    </Typography>
                                    {/* <h3 style={{marginTop: "5px", marginBottom: "0"}}>{shift.breakUnpaid}</h3> */}
                                    <Typography
                                        variant = "body1"
                                        style={{
                                            fontWeight:"800"
                                        }}
                                    >
                                        {shift.breakUnpaid}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} md={12} lg={1} style={{marginLeft: "auto"}}>
                                    <Typography
                                        variant = "body2"
                                        style={{
                                            color:"grey",
                                            fontWeight:"500"
                                        }}
                                    >
                                        Status
                                    </Typography>
                                    {/* <h3 style={{marginTop: "5px", marginBottom: "0", color: "#1F299C"}}>{shift.status}</h3> */}
                                    <Typography
                                        variant = "body1"
                                        style={{
                                            fontWeight:"800",
                                            // add color cond here 
                                            color: "#1F299C" 
                                        }}
                                    >
                                        {shift.status}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} md={10} lg={8}>
                                    {/* <p style={{marginTop: "0", marginBottom: "0"}}>Description</p> */}
                                    <Typography
                                        variant = "body2"
                                        style={{
                                            color:"grey",
                                            fontWeight:"500"
                                        }}
                                    >
                                        Description
                                    </Typography>
                                    {/* <h3 style={{marginTop: "5px", marginBottom: "0"}}>Company sample name lorem ipsum is a placeholder text commonly used</h3> */}
                                    <Typography
                                        variant = "body1"
                                        style={{
                                            fontWeight:"800"
                                        }}
                                    >
                                        Company sample name lorem ipsum is a placeholder text commonly used
                                    </Typography>
                                </Grid>

                                <Grid container spacing={1} xs={12} lg={4}
                                    justifyContent="flex-end"
                                    style={{ 
                                        display: "flex", 
                                        placeContent:"end",
                                        alignItems: "flex-end", 
                                        justifyContent: "space-evenly",
                                        textAlign:"right",
                                        paddingTop:"10px"
                                        }}
                                    >
                                    <Grid item xs={12} md={3} lg={2}>
                                        <h3 
                                            style={{ 
                                                marginBottom: "6px", 
                                                color: "#1F299C",
                                                display:"flex",
                                                alignItems:"flex-end",
                                                placeContent:"flex-end",
                                                textAlign:"right",
                                                cursor:"pointer"
                                            }}
                                            onClick={handleRemarkClick}
                                        >
                                            <CommentIcon/> &nbsp;
                                            Remark
                                        </h3>
                                    </Grid>
                                    <Grid item xs={12} md={3} lg={2}>
                                        <Button style={{ color: "#e9594a", borderColor: "#e9594a" }} variant="outlined">Reject</Button>
                                    </Grid>
                                    <Grid item xs={12}  md={3} lg={2}>
                                        <Button style={{ color: "#22b749", borderColor: "#22b749" }} variant="outlined">Approve</Button>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                </div>
                )
            })}

            {/* <Dialog
                open={toggleRemarkPopup}
                aria-labelledby="form-dialog-title"
                maxWidth="md"
                PaperProps={{
                style: {
                    position: "absolute",
                    margin: "0px",
                    padding: "0px",
                    right: "0px",
                    minHeight: "100vh",
                    top: "0px",
                    borderRadius: "0px"
                }
                }}
            >
                <DialogContent style={{ margin: "0px", padding: "0px", backgroundColor: "#f7f8fc", width: "500px" }}>
                        <Grid 
                            item 
                            xs={7} 
                            sm={8} 
                            lg={10}
                            style={{ 
                            position: 'relative' ,
                            borderLeft: '2px solid lightgrey',
                            minHeight: '100vh',
                            padding:'0px 20px',
                            // paddingRight: '20px'
                            }}
                        >

                            <Grid container xs={12} md={12} lg={12} style={{ display: "flex", flexDirection: "column"}}>
                                    <Grid item xs={12} md={12} lg={12} style={{display: "flex", flexDirection: "row"}}>
                                        <Grid item xs={6} md={6} lg={6} style={{}}>
                                            <h2>Comment</h2>
                                        </Grid>
                                        <Grid item xs={6} md={6} lg={6} style={{direction: "rtl"}}>
                                            <h2 style={{cursor: "pointer"}} onClick={handleRemarkClick}>X</h2>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={12} style={{}}>
                                            <div style={{ backgroundColor: "#FFFFFF", 
                                                    margin: "100px 10px 0px, 10px",
                                                    padding: "15px",
                                                    height: "100%",
                                                    width: "100%",
                                                    borderRadius: "5px",
                                                    display: "flex", flexDirection: "column" }}>

                                                    <Grid item xs={12} md={12} lg={12} style={{margin: "0"}}>
                                                        <h3 style={{color: "#1F299C"}}>Akash Vishwakarma (E123456789)</h3>
                                                    </Grid>
                                                    <Grid item xs={12} md={12} lg={12} style={{}}>
                                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={12} lg={12} style={{}}>
                                                        <p>18-09-2021 10:00AM</p>
                                                    </Grid>
                                            </div>
                                        </Grid>
                            </Grid>
                                            
                        </Grid>
                </DialogContent>
            </Dialog> */}


            <Dialog
                open={toggleRemarkPopup}
                maxWidth="sm"
                fullWidth
                // TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                  style: {
                    position: "absolute",
                    margin: "0px",
                    padding: "0px",
                    right: "0px",
                    minHeight: "100vh",
                    top: "0px",
                    borderRadius: "0px"
                  }
                }}
              >
                <DialogContent
                  style={{
                    margin: "0px",
                    padding: "0px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}
                >
                  <RemarkDialog
                    closeForm={handleRemarkClick}
                  />
                </DialogContent>
              </Dialog>
        
        </React.Fragment>
    );
}