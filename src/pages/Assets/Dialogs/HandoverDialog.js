import {
  Box,
  Button,
  createTheme,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@material-ui/core";
import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import { useAssetStyles } from "../Style";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import CalendarTodayOutlinedIcon from "@material-ui/icons/CalendarTodayOutlined";
import DateFnsUtils from "@date-io/date-fns";

const conditions = ["Condition-1", "Condition-2", "Conddition-3"];
const branches = ["Branch-1", "Branch-2"];

export const HandoverDialog = props => {
  const { setOpenDialog, selectedAsset, rows } = props;
  let theme = createTheme({
    datePicker: {
      input: { color: "rgb(31,41,156)", fontWeight: "500" }
    }
  });

  const classes = useAssetStyles();
  const handleClose = () => {
    setOpenDialog(false);
  };
  const [values, setValues] = useState({
    condition: "",
    handoverTo: "",
    branchTo: "",
    remark: ""
  });

  const [handoverDate, setHandoverDate] = useState(new Date());
  const handleChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  // const handleDateClose = (event) => {
  //   setHandoverDate(event.target.value);
  // };

  const handleSubmitClick = () => {
    console.log(values);
    // API call goes here

    setOpenDialog(false);
  };

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
                <span>Handover</span>
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
            }}
            margin="30px 30px"
            style={{
              border: "1px solid rgba(163,163,163,0.5)",
              borderRadius: "7px"
            }}
          >
            <Grid
              container
              xs={12}
              style={{
                margin: "10px 20px"
              }}
            >
              <Grid container xs={12}>
                <Typography variant="h6" className={classes.colorBlue}>
                  {selectedAsset.type}
                </Typography>
              </Grid>
              <Grid container xs={12}>
                <Typography variant="body2" className={classes.colorBlue}>
                  Name:&nbsp;{selectedAsset.name}
                </Typography>
              </Grid>
              <Grid container xs={12}>
                <Typography variant="body2" className={classes.colorBlue}>
                  Model:&nbsp;{selectedAsset.model}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              width: "100%"
            }}
            margin="20px"
          >
            <Grid container xs={12}>
              <Typography variant="h6" className={classes.colorBlue}>
                Fill In
              </Typography>
            </Grid>
            <Grid container xs={12}>
              {/** 1st grid */}
              <Grid
                container
                xs={12}
                style={{
                  marginTop: "15px"
                }}
              >
                <Grid item xs={12}>
                  <Typography variant="body2" className={classes.colorBlue}>
                    Condition&nbsp;*
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    marginTop: "5px"
                  }}
                >
                  <FormControl sx={{ m: 1, minWidth: 80 }} fullWidth>
                    <Select
                      id="select-condition"
                      value={values.condition}
                      onChange={handleChange}
                      fullWidth
                      name="condition"
                      displayEmpty
                      variant="outlined"
                      style={{
                        backgroundColor: "rgb(242, 242, 242)",
                        color: "rgb(31,41,156)",
                        fontWeight: "500"
                      }}
                      IconComponent={ExpandMoreIcon}
                    >
                      <MenuItem
                        key="select dummy condition"
                        value={""}
                        style={{
                          color: "rgb(31,41,156)",
                          fontWeight: "500"
                        }}
                      >
                        <em>Select Condition</em>
                      </MenuItem>
                      {conditions.map(condition => {
                        return (
                          <MenuItem
                            key={condition}
                            value={condition}
                            style={{
                              color: "rgb(31,41,156)",
                              fontWeight: "500"
                            }}
                          >
                            {condition}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              {/** 2nd grid */}
              <Grid
                container
                xs={12}
                style={{
                  marginTop: "15px"
                }}
              >
                <Grid item xs={12}>
                  <Typography variant="body2" className={classes.colorBlue}>
                    Handover&nbsp;*
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    marginTop: "5px"
                  }}
                >
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      fullWidth
                      disableFuture
                      inputVariant="outlined"
                      value={handoverDate}
                      onChange={newValue => {
                        setHandoverDate(newValue);
                      }}
                      keyboardIcon={
                        <CalendarTodayOutlinedIcon
                          style={{ color: "rgb(31,41,156)" }}
                        />
                      }
                      renderInput={params => (
                        <TextField
                          {...params}
                          style={{
                            color: "rgb(31,41,156)",
                            fontWeight: "500"
                          }}
                        />
                      )}
                      style={{
                        color: "rgb(31,41,156)",
                        fontWeight: "500"
                      }}
                      InputAdornmentProps={{
                        style: {
                          color: "rgb(31,41,156)",
                          fontWeight: "500"
                        }
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>

              {/** 3rd grid */}
              <Grid
                container
                xs={12}
                style={{
                  marginTop: "15px"
                }}
              >
                <Grid item xs={12}>
                  <Typography variant="body2" className={classes.colorBlue}>
                    Handover To
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    marginTop: "5px"
                  }}
                >
                  <FormControl sx={{ m: 1, minWidth: 80 }} fullWidth>
                    <Select
                      id="select-handover"
                      value={values.handoverTo}
                      onChange={handleChange}
                      fullWidth
                      name="handover"
                      displayEmpty
                      variant="outlined"
                      style={{
                        backgroundColor: "rgb(242, 242, 242)",
                        color: "rgb(31,41,156)",
                        fontWeight: "500"
                      }}
                      IconComponent={ExpandMoreIcon}
                    >
                      <MenuItem
                        key="select dummy condition"
                        value={""}
                        style={{
                          color: "rgb(31,41,156)",
                          fontWeight: "500"
                        }}
                      >
                        <em>Select User</em>
                      </MenuItem>
                      {rows.map(row => {
                        return (
                          <MenuItem
                            key={row.empName}
                            value={row.empId}
                            style={{
                              color: "rgb(31,41,156)",
                              fontWeight: "500"
                            }}
                          >
                            {row.empName}&nbsp;({row.empId})
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              {/** 4th grid */}
              <Grid
                container
                xs={12}
                style={{
                  marginTop: "15px"
                }}
              >
                <Grid item xs={12}>
                  <Typography variant="body2" className={classes.colorBlue}>
                    Branch To
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    marginTop: "5px"
                  }}
                >
                  <FormControl sx={{ m: 1, minWidth: 80 }} fullWidth>
                    <Select
                      id="select-branchTo"
                      value={values.branchTo}
                      onChange={handleChange}
                      fullWidth
                      name="branchTo"
                      displayEmpty
                      variant="outlined"
                      style={{
                        backgroundColor: "rgb(242, 242, 242)",
                        color: "rgb(31,41,156)",
                        fontWeight: "500"
                      }}
                      IconComponent={ExpandMoreIcon}
                    >
                      <MenuItem
                        key="select dummy condition"
                        value={""}
                        style={{
                          color: "rgb(31,41,156)",
                          fontWeight: "500"
                        }}
                      >
                        <em>Select Branch</em>
                      </MenuItem>
                      {branches.map(branch => {
                        return (
                          <MenuItem
                            key={branch}
                            value={branch}
                            style={{
                              color: "rgb(31,41,156)",
                              fontWeight: "500"
                            }}
                          >
                            {branch}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              {/** 5th grid */}
              <Grid
                container
                xs={12}
                style={{
                  marginTop: "15px"
                }}
              >
                <Grid item xs={12}>
                  <Typography variant="body2" className={classes.colorBlue}>
                    Remark
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    marginTop: "5px",
                    width: "100%"
                  }}
                >
                  <TextField
                    id="outlined-size-normal"
                    placeholder="Type a remark..."
                    inputProps={{ style: { color: "rgb(31,41,156)" } }}
                    style={{
                      padding: "10px",
                      height: "60%",
                      color: "rgb(31,41,156)",
                      width: "-webkit-fill-available",
                      border: "1px solid rgba(163,163,163,0.5)",
                      borderRadius: "4px",
                      backgroundColor: "rgb(242, 242, 242)"
                    }}
                  />
                </Grid>
              </Grid>

              {/** Footer */}
              <Grid
                container
                xs={12}
                direction="column"
                style={{
                  width: "100%",
                  bottom: "0",
                  position: "absolute",
                  minHeight: "90"
                }}
              >
                <hr
                  style={{
                    width: "100%"
                  }}
                ></hr>
                <Grid
                  container
                  xs={12}
                  style={{
                    margin: "10px 30px 0",
                    width: "90%",
                    display: "flex",
                    justifyContent: "flex-end"
                  }}
                >
                  <Button
                    className={classes.colorBlue}
                    variant="outlined"
                    onClick={handleClose}
                    style={{
                      marginRight: "15px",
                      borderColor: "rgb(31,41,156)"
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className={classes.colorBlue}
                    variant="contained"
                    onClick={handleSubmitClick}
                    style={{
                      color: "white",
                      backgroundColor: "rgb(31,41,156)"
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </ThemeProvider>
      </div>
    </React.Fragment>
  );
};
