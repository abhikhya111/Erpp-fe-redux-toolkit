import React, { useEffect } from "react";
// import styled from "styled-components/macro";
import clsx from "clsx";
import "../../../../node_modules/jspreadsheet-ce/dist/jspreadsheet.css";
import {
  Avatar,
  Button,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  DialogContentText,
  FormControl,
  InputLabel,
  Select,
  Snackbar,
  MenuItem,
  TextField,
  DialogActions,
  ListItemAvatar,
  ListItemSecondaryAction,
  Checkbox,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./index.css";
import useAuth from "hooks/useAuth";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import { CSVLink } from "react-csv";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import MuiAlert from "@material-ui/lab/Alert";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import "date-fns";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
// const Container = styled.div`
//   width: 100%;
//   height: 100vh;
// `;

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "#f7f8fc",
    height: "100vh",
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: "center",
    borderRadius: "6px ",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: "#ffffff",
    color: "#1F299C",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 0,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    border: "2px solid #FFFFFF",
  },
}));
const Projects = function (props) {
  // const auth = useAuth();
  const classes = useStyles();
  const auth = useAuth();
  const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
  const checkedIcon = <CheckBoxIcon fontSize='small' />;
  const [page] = React.useState(0);
  const [rowsPerPage] = React.useState(10);
  const [empData, setEmpdata] = React.useState();

  const getAllEmployees = async () => {
    const orgId = auth.user.org_id._id;
    try {
      const response = await axios.get(
        `${
          process.env.REACT_APP_API_BASE_URL
        }/users/getbyorg/${orgId}?page_number=${page + 1}&limit=${rowsPerPage}`
      );
      if (response.status === 200) {
        console.log("all users", response.data.data);
        const data = response.data.data;
        setEmpdata(data.data);
      }
    } catch (e) {
      if (e.response) {
        console.log("Error >", e.response);
      }
    }
  };

  useEffect(() => {
    getAllProjects();
    getAllEmployees();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  const [open, setOpen] = React.useState(false);
  const [projectData, setProjectData] = React.useState("");
  const [projectName, setProjectName] = React.useState("");
  const [projectDescription, setProjectDescription] = React.useState("");
  const [openMemberDialog, setOpenMemberDialog] = React.useState(false);
  const [priority, setPriority] = React.useState("high");
  const [projectOwner, setProjectOwner] = React.useState("");
  const [checked, setChecked] = React.useState([]);
  const [addedMembers, setAddedMembers] = React.useState([]);
  const [projectFormError, setProjectFormError] = React.useState(false);
  const [currProjectData, setCurrProjectData] = React.useState("");
  const [dataForCsv, setDataForCsv] = React.useState([]);

  const removeMember = (emp) => {
    let newArray = addedMembers.filter((el) => {
      return el._id !== emp._id;
    });
    setAddedMembers(newArray);
  };

  const handleTypeChange = (event) => {
    setPriority(event.target.value);
  };
  const handleOwnerTypeChange = (event) => {
    setProjectOwner(event.target.value);
  };
  // const [selectedRadioValue, setRadioSelectedValue] = React.useState(
  //   "half_day"
  // );

  const [selectedStartDate, setStartSelectedDate] = React.useState(new Date());

  const handleStartDateChange = (date) => {
    setStartSelectedDate(date);
  };
  const [selectedEndDate, setEndSelectedDate] = React.useState(new Date());

  const handleEndDateChange = (date) => {
    setEndSelectedDate(date);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setProjectName("");
    setProjectDescription("");
    setProjectOwner("");
  };

  const handleClickOpenAddMember = (data) => {
    setOpenMemberDialog(true);
    console.log("Selected Project Data-->", data);
    setCurrProjectData(data);
    setAddedMembers(data.members);
  };

  const handleCloseAddMember = () => {
    setChecked([]);
    setAddedMembers([]);
    setOpenMemberDialog(false);
  };
  const getAllProjects = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/project/getAllProjects`
      );
      if (response.status === 200) {
        console.log("all projects", response.data.data);
        const data = response.data.data;
        setProjectData(data);
        setDataForCsv(data);
      }
    } catch (e) {
      if (e.response) {
        console.log("Error >", e.response);
      }
    }
  };
  const handleSaveProject = async (e) => {
    e.preventDefault();
    const orgId = auth.user.org_id._id;
    const projectOwnerId = auth.user._id;
    try {
      let data = {
        org_id: orgId,
        project_name: projectName,
        date_of_start: selectedStartDate,
        date_of_end: selectedEndDate,
        description: projectDescription,
        point_contact_id: projectOwnerId,
        members: [],
        duration: "",
        budget: "",
        is_active: "true",
        is_completed: "false",
        status: "On Going",
        client_details: {
          name: "",
          contact_no: "",
          email: "",
        },
        hours_spent: "0",
      };

      if (
        !projectName ||
        !projectDescription ||
        !projectOwner ||
        !selectedStartDate ||
        !selectedEndDate
      ) {
        setProjectFormError(true);
        //useState is asynchronous , so the updated value is not logged in console immediately
        // console.log("projectFormError>", projectFormError);
      } else {
        // console.log("projectFormError>", projectFormError);
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/project/create`,
          data
        );
        if (response.status === 200) {
          console.log("project creation", response.data.data);

          getAllProjects();
          setOpen(false);
          setProjectName("");
          setProjectDescription("");
          setProjectOwner("");
        }
      }
    } catch (e) {
      if (e.response) {
        console.log("Error >", e.response);
      }
    }
  };

  const handleAddMemberProject = async (e) => {
    e.preventDefault();

    let array = addedMembers;
    checked.forEach((emp) => {
      array.push(emp);
    });

    let memberIdArray = [];
    array.forEach((member) => {
      memberIdArray.push(member._id);
    });
    try {
      currProjectData.members = memberIdArray;
      //replace this with a hook later
      currProjectData.is_active = "true";
      currProjectData.is_completed = "false";
      console.log("sending data for updation: ", currProjectData);
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/project/update`,
        currProjectData
      );
      if (response.status === 200) {
        console.log("project updation", response);
        setOpenMemberDialog(false);
        setChecked([]);
      }
    } catch (e) {
      if (e.response) {
        console.log("Error >", e.response);
      }
    }
  };

  //defining headers for csv
  const headersCsv = [
    { label: "Project Name", key: "project_name" },
    { label: "Status", key: "status" },
    { label: "Created At", key: "created_at" },
    { label: "Date of Start", key: "date_of_start" },
    { label: "Date of Completion", key: "date_of_end" },
    { label: "Description", key: "description" },
    { label: "Duration", key: "duration" },
    { label: "Hours Spent", key: "hours_spent" },
    { label: "Is Active", key: "is_active" },
    { label: "Is Completed", key: "is_completed" },
    { label: "Members", key: "members" },
    { label: "Organisation Id", key: "org_id" },
    { label: "Point Contact Id", key: "point_contact_id" },
    // { label: "Client Contact No", key: "client_details.contact_no" },
    // { label: "Client Email", key: "client_details.email" },
    // { label: "Client Name", key: "client_details.name" },
    // { label: "Client Id", key: "client_details._id" },
    { label: "Updated At", key: "updated_at" },
  ];

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
              Home {">"} Employee Management {">"} Shift Schedule
            </Typography>

            <Paper
              className={classes.paper}
              style={{
                minWidth: "230px",
                marginTop: "20px",
                minHeight: "800px",
              }}
            >
              <div
                style={{
                  padding: "0.5em",
                }}
              >
                <Typography
                  variant='h4'
                  align='left'
                  style={{
                    color: "#1F299C",
                    fontWeight: "600",
                    padding: "10px 0px 20px 20px",
                  }}
                >
                  All Projects
                </Typography>
                {/* <h2 style={{ color: "#1F299C", textAlign: "left" }}>
                  All Projects
                </h2> */}
                <hr
                  style={{
                    margin: "-10px",
                  }}
                ></hr>
                <div
                  style={{
                    color: "#1F299C",
                    textAlign: "left",
                    padding: "12px",
                    display: "flex",
                  }}
                ></div>
              </div>
              <Grid container justify='space-between'>
                <Grid item xs={3}>
                  <Typography
                    variant='h2'
                    style={{ color: "#0373FF", fontWeight: "500" }}
                    display='block'
                  >
                    {projectData && projectData.length}
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    style={{ color: "#0373FF", lineHeight: "1" }}
                    display='block'
                  >
                    Total
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    variant='h2'
                    style={{ color: "#EDBE00", fontWeight: "500" }}
                    display='block'
                  >
                    {projectData && projectData.length}
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    style={{ color: "#EDBE00", lineHeight: "1" }}
                    display='block'
                  >
                    On-going
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    variant='h2'
                    style={{ color: "#3D9E5A", fontWeight: "500" }}
                    display='block'
                  >
                    0
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    style={{ color: "#3D9E5A", lineHeight: "1" }}
                    display='block'
                  >
                    Complete
                  </Typography>
                </Grid>

                <Grid item xs={6} sm={4} lg={3} style={{ paddingTop: "5%" }}>
                  <Button
                    variant='contained'
                    style={{ backgroundColor: "#1F299C", color: "white" }}
                    onClick={handleClickOpen}
                  >
                    ADD PROJECT
                  </Button>
                </Grid>
              </Grid>

              <br></br>
              <hr></hr>
              <br></br>
              <Grid container>
                <Grid item xs={12} lg={12} md={12}>
                  {projectData &&
                    projectData.map((data, index) => {
                      return (
                        <Paper
                          key={index}
                          className={classes.paper}
                          style={{
                            minHeight: "200px",
                            margin: "10px",
                            borderLeft: "8px solid #1F299C",
                            textAlign: "left",
                            padding: "1px 12px",
                          }}
                        >
                          <h5 style={{ margin: "18px 0px" }}>
                            {auth.user.first_name}
                          </h5>
                          <h2 style={{ color: "#1F299C", textAlign: "left" }}>
                            {data.project_name}
                          </h2>
                          <Button
                            variant='contained'
                            style={{
                              border: "1px solid #1F299C",
                              color: "#1F299C",
                              backgroundColor: "white",
                              marginBottom: "5px",
                            }}
                            onClick={() => {
                              handleClickOpenAddMember(data);
                            }}
                          >
                            Add / remove members
                          </Button>{" "}
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <span
                            style={{
                              display: "inline-block",
                              width: "200px",
                              marginBottom: "10px",
                            }}
                          >
                            <b style={{ color: "#1F299C", textAlign: "left" }}>
                              {/* {addedMembers.length}{" "} */}
                              {data.members.length}{" "}
                            </b>
                            Members on the Project
                          </span>
                        </Paper>
                      );
                    })}
                  <br></br>
                </Grid>
              </Grid>

              <CSVLink data={dataForCsv} headers={headersCsv}>
                Download CSV
              </CSVLink>

              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='form-dialog-title'
                style={{ padding: "12px" }}
              >
                <DialogTitle
                  style={{ color: "#1F299C" }}
                  id='form-dialog-title'
                >
                  Add Project
                </DialogTitle>
                <Divider />
                <DialogContent>
                  <DialogContentText>
                    To add a project, please fill in the details below.
                  </DialogContentText>
                  <FormControl component='fieldset'>
                    <TextField
                      required
                      autoFocus
                      margin='dense'
                      id='name'
                      label='Name of the project'
                      type='text'
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      placeholder='Enter name'
                      fullWidth
                    />
                    <TextField
                      required
                      margin='dense'
                      id='name'
                      label='Project description'
                      type='text'
                      onChange={(e) => setProjectDescription(e.target.value)}
                      value={projectDescription}
                      placeholder='Enter description'
                      fullWidth
                    />
                    <br></br>
                    <FormControl variant='outlined'>
                      <InputLabel id='demo-simple-select-outlined-label'>
                        Project Owner
                      </InputLabel>
                      <Select
                        labelId='demo-simple-select-outlined-label'
                        id='demo-simple-select-outlined1'
                        value={projectOwner}
                        onChange={handleOwnerTypeChange}
                        label=' Project Owner'
                      >
                        {empData &&
                          empData.map((emp) => {
                            return (
                              <MenuItem value={emp.first_name}>
                                {emp.first_name}
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </FormControl>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <Grid container justify='space-around'>
                        <KeyboardDatePicker
                          margin='normal'
                          id='date-picker-dialog1'
                          label='Start Date'
                          format='DD/mm/yyyy'
                          value={selectedStartDate}
                          onChange={handleStartDateChange}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                        <KeyboardDatePicker
                          margin='normal'
                          id='date-picker-dialog2'
                          label='Expected End Date'
                          format='DD/mm/yyyy'
                          value={selectedEndDate}
                          onChange={handleEndDateChange}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
                    <br></br>
                    <br></br>
                    <FormControl variant='outlined'>
                      <InputLabel id='demo-simple-select-outlined-label'>
                        Priority
                      </InputLabel>
                      <Select
                        labelId='demo-simple-select-outlined-label'
                        id='demo-simple-select-outlined'
                        value={priority}
                        onChange={handleTypeChange}
                        label='Priority'
                      >
                        <MenuItem value='high'>High</MenuItem>
                        <MenuItem value='medium'>Medium</MenuItem>
                        <MenuItem value='low'>Low</MenuItem>
                      </Select>
                    </FormControl>
                    <br></br>
                    <br></br>
                  </FormControl>
                </DialogContent>
                <br></br>
                <br></br>
                <Divider />
                <br></br>

                <DialogActions>
                  <Button
                    variant='contained'
                    style={{
                      color: "#1F299C",
                      border: "1px solid #1F299C",
                      backgroundColor: "white",
                    }}
                    onClick={handleClose}
                    color='primary'
                  >
                    Cancel
                  </Button>
                  <Button
                    variant='contained'
                    style={{ backgroundColor: "#1F299C", color: "white" }}
                    onClick={handleSaveProject}
                    color='primary'
                  >
                    Save
                  </Button>
                </DialogActions>
                <br></br>
                <br></br>
                <Snackbar
                  open={!!projectFormError}
                  onClose={() => setProjectFormError(false)}
                  key={"Form Error"}
                  autoHideDuration={3000}
                >
                  <Alert severity='error'>All fields are mandatory</Alert>
                </Snackbar>
              </Dialog>
              <Dialog
                open={openMemberDialog}
                onClose={handleClickOpenAddMember}
                aria-labelledby='form-dialog-title'
                style={{ padding: "12px" }}
              >
                <DialogTitle
                  style={{ color: "#1F299C" }}
                  id='form-dialog-title'
                >
                  Add/Remove Team Member
                </DialogTitle>
                <Divider />
                <DialogContent>
                  <DialogContentText>
                    To add a team member, please select one of them.
                  </DialogContentText>
                  <Grid container spacing={3}>
                    <Grid
                      item
                      xs={12}
                      lg={6}
                      style={{ borderRight: "1px solid #F2F2F2" }}
                    >
                      <Typography variant='h6' className={classes.title}>
                        Current members in the project
                      </Typography>
                      <div className={classes.demo}>
                        {console.log("addedMembers-->", addedMembers)}
                        <List>
                          {addedMembers &&
                            addedMembers.map((emp) => {
                              return (
                                <ListItem
                                  style={{ borderBottom: "1px solid #F2F2F2" }}
                                >
                                  <ListItemAvatar>
                                    <Avatar>
                                      <FolderIcon />
                                    </Avatar>
                                  </ListItemAvatar>
                                  <ListItemText primary={emp.first_name} />
                                  <ListItemSecondaryAction>
                                    <IconButton
                                      edge='end'
                                      aria-label='delete'
                                      style={{ color: "#ED544E" }}
                                    >
                                      <DeleteIcon onClick={removeMember(emp)} />
                                    </IconButton>
                                  </ListItemSecondaryAction>
                                </ListItem>
                              );
                            })}
                        </List>
                      </div>
                    </Grid>

                    <Grid item xs={12} lg={6}>
                      <Autocomplete
                        multiple
                        onChange={(event, newValue) => {
                          setChecked(newValue);
                        }}
                        id='checkboxes-tags-demo'
                        options={empData}
                        getOptionSelected={(option, value) =>
                          option.first_name === value.first_name
                        }
                        value={checked}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option.first_name}
                        renderOption={(option, { selected }) => (
                          <React.Fragment>
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              checked={selected}
                              style={{ marginRight: 8, color: "#1F299C" }}
                            />
                            {option.first_name}
                          </React.Fragment>
                        )}
                        style={{ width: 250 }}
                        renderInput={(params) => (
                          <div>
                            <TextField
                              {...params}
                              variant='outlined'
                              label='Add NewTeam Member'
                              placeholder='Search '
                            />
                          </div>
                        )}
                      />
                    </Grid>
                  </Grid>
                </DialogContent>
                <br></br>
                <br></br>
                <Divider />
                <br></br>

                <DialogActions>
                  <Button
                    variant='contained'
                    style={{
                      color: "#1F299C",
                      border: "1px solid #1F299C",
                      backgroundColor: "white",
                    }}
                    onClick={handleCloseAddMember}
                    color='primary'
                  >
                    Cancel
                  </Button>
                  <Button
                    variant='contained'
                    style={{ backgroundColor: "#1F299C", color: "white" }}
                    onClick={handleAddMemberProject}
                    color='primary'
                  >
                    Save
                  </Button>
                </DialogActions>
                <br></br>
                <br></br>
              </Dialog>
            </Paper>
          </main>
        </ThemeProvider>
      </div>
    </React.Fragment>
  );
};
export default Projects;
