import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  createTheme,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Tooltip,
  Typography
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { ThemeProvider } from "styled-components";
import { useAssetStyles } from "../Style";
import { withStyles } from "@material-ui/styles";
import { UserCard } from "../Cards/UserCard";
import SearchIcon from "@material-ui/icons/Search";

export const AssignToDialog = props => {
  const { setOpenDialog, user, selectedAsset, setSelectedAssset } = props;
  let theme = createTheme();
  const classes = useAssetStyles();
  const label = { inputProps: { "aria-label": "Checkbox" } };
  const handleClose = () => {
    setOpenDialog(false);
  };

  const styles = {
    tooltip: {
      borderRadius: "18px",
      backgroundColor: "white"
    }
  };

  const CustomTooltip = withStyles(styles)(Tooltip);
  const [values, setValues] = useState({ searchText: "", remark: "" });
  const [remarks, setRemarks] = useState(selectedAsset.remarks);

  const handleChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSearchClick = () => {
    console.log(values.searchText);
  };

  const handleSubmitClick = () => {
    // console.log(values.remark);
    // API call goes here

    setRemarks([...remarks, values.remark]);
    setSelectedAssset({
      ...selectedAsset,
      remarks: remarks
    });
    console.log(selectedAsset.remarks);
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
                <span>Assign To</span>
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
            margin="30px 30px 15px"
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
              <Grid container xs={12}>
                {/* Grid 1 */}
                <Grid item xs={1}>
                  <CustomTooltip
                    className={classes.tooltip}
                    placement="bottom-start"
                    TransitionProps={{ timeout: 600 }}
                    title={<UserCard {...user} />}
                  >
                    <div
                      className={classes.nameTagContainer}
                      style={{
                        justifyContent: "center",
                        paddingTop: "3px"
                      }}
                    >
                      <div className={classes.nameTag}>
                        {user.empName.split("")[0]}
                      </div>
                    </div>
                  </CustomTooltip>
                </Grid>
                <Grid item xs={11}>
                  <Typography
                    variant="h6"
                    className={classes.colorBlue}
                    style={{
                      padding: "0 6px"
                    }}
                  >
                    {user.empName}&nbsp;({user.empId})
                  </Typography>
                </Grid>
              </Grid>
              {/* Grid 2 */}
              <Grid container xs={12}>
                <Grid item xs={1} />
                <Grid item xs={11}>
                  <Typography
                    variant="body2"
                    className={classes.colorBlue}
                    style={{
                      padding: "0 6px",
                      textAlign: "left"
                    }}
                  >
                    Position:&nbsp;{user.empRole},&nbsp;{user.empTeam}
                  </Typography>
                </Grid>
              </Grid>
              {/* Grid 3 */}
              <Grid container xs={12}>
                <Grid item xs={1} />
                <Grid item xs={11}>
                  <Typography
                    variant="body2"
                    className={classes.colorBlue}
                    style={{
                      padding: "0 6px",
                      textAlign: "left"
                    }}
                  >
                    Schedule:&nbsp;{user.schedule}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Box>

          {/* Select Replacement Grid */}
          <Grid
            container
            item
            xs={12}
            style={{
              margin: "15px 30px"
            }}
          >
            <Typography
              variant="h5"
              className={classes.colorBlue}
              style={{
                padding: "0 10px",
                fontWeight: "500"
              }}
            >
              Select Replacement
            </Typography>
          </Grid>

          {/* Input text field */}
          <Box
            style={{
              margin: "15px 30px",
              backgroundColor: "rgb(242, 242, 242)"
            }}
          >
            <FormControl
              style={{
                width: "100%"
              }}
              variant="outlined"
            >
              <OutlinedInput
                fullwidth
                name="searchText"
                placeholder="Search..."
                id="outlined-adornment-password"
                value={values.searchText}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="search"
                      onClick={handleSearchClick}
                      edge="end"
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>

          {/** Employee List in a box with scroll*/}
          {/* <div className={classes.scrollBar}> */}
          <Box
            style={{
              margin: "20px 30px",
              height: "20.5vw",
              overflowY: "scroll"
            }}
          >
            {selectedAsset.replacements.map(replacement => {
              return (
                <Box
                  style={{
                    width: "98%",
                    margin: "10px 0",
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
                    <Grid container xs={11}>
                      <Grid container xs={12}>
                        {/* Grid 1 */}
                        <Grid item xs={1}>
                          <CustomTooltip
                            className={classes.tooltip}
                            placement="bottom-start"
                            TransitionProps={{ timeout: 600 }}
                            title={<UserCard {...replacement} />}
                          >
                            <div
                              className={classes.nameTagContainer}
                              style={{
                                justifyContent: "center",
                                paddingTop: "3px"
                              }}
                            >
                              <div className={classes.nameTag}>
                                {replacement.empName.split("")[0]}
                              </div>
                            </div>
                          </CustomTooltip>
                        </Grid>
                        <Grid item xs={11}>
                          <Typography
                            variant="h6"
                            className={classes.colorBlue}
                            style={{
                              padding: "0 6px"
                            }}
                          >
                            {replacement.empName}&nbsp;({replacement.empId})
                          </Typography>
                        </Grid>
                      </Grid>
                      {/* Grid 2 */}
                      <Grid container xs={12}>
                        <Grid item xs={1} />
                        <Grid item xs={11}>
                          <Typography
                            variant="body2"
                            className={classes.colorBlue}
                            style={{
                              padding: "0 6px",
                              textAlign: "left"
                            }}
                          >
                            Position:&nbsp;{replacement.empRole},&nbsp;
                            {replacement.empTeam}
                          </Typography>
                        </Grid>
                      </Grid>
                      {/* Grid 3 */}
                      <Grid container xs={12}>
                        <Grid item xs={1} />
                        <Grid item xs={11}>
                          <Typography
                            variant="body2"
                            className={classes.colorBlue}
                            style={{
                              padding: "0 6px",
                              textAlign: "left"
                            }}
                          >
                            Schedule:&nbsp;{replacement.schedule}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid container xs={1}>
                      <Checkbox {...label} size="small" color="default" />
                    </Grid>
                  </Grid>
                </Box>
              );
            })}
          </Box>
          {/* </div> */}

          {/** Add remark text box */}
          <Grid
            container
            xs={12}
            style={{
              margin: "5px 30px"
            }}
          >
            <Typography
              variant="body1"
              className={classes.colorBlue}
              style={{
                fontWeight: "500"
              }}
            >
              Asset Remark:
            </Typography>
          </Grid>

          <Box
            style={{
              margin: "0px 30px",
              backgroundColor: "rgb(242, 242, 242)",
              height: "10vw"
            }}
          >
            <FormControl
              style={{
                width: "100%",
                height: "100%"
              }}
              variant="outlined"
            >
              <OutlinedInput
                fullwidth
                name="remark"
                multiline
                maxRows={4}
                value={values.remark}
                id="remark-outlined"
                inputProps={{
                  style: {
                    height: "100%",
                    maxHeight: "100%",
                    overflow: "scroll",
                    resize: "none"
                  }
                }}
                onChange={handleChange}
                style={{
                  height: "100%",
                  maxHeight: "100%",
                  borderColor: "white",
                  alignItems: "flex-start"
                }}
              />
            </FormControl>
          </Box>

          {/* Footer */}
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
        </ThemeProvider>
      </div>
    </React.Fragment>
  );
};
