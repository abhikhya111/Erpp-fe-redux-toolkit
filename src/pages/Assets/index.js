import * as React from "react";
import {
  Grid,
  Paper,
  IconButton,
  Typography,
  InputBase,
  InputLabel,
  Select,
  Button,
  MenuItem,
  FormControl,
  Menu,
  Tooltip
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import clsx from "clsx";
import "@fontsource/roboto";
// import useAuth from "hooks/useAuth";
import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { ThemeProvider, withStyles } from "@material-ui/styles";
import { useAssetStyles } from "./Style";
import SearchIcon from "@material-ui/icons/Search";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { UserCard } from "./Cards/UserCard";
import { UserAssets } from "./UserAssets";
import rows1 from "./Dialogs/rows.json";

const options = ["Share", "Export"];
// const ITEM_HEIGHT = 1050;

export const Asset = props => {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  const classes = useAssetStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    console.log(anchorEl);
  };
  // const [selectedSchedule, setSelectedSchedule] = React.useState("");
  // const auth = useAuth();
  // const [isLoading, setIsLoading] = React.useState(false);
  const [showUserAssets, setShowUserAssets] = React.useState(true);
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    // API call goes here
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const [rows] = React.useState(rows1);

  const styles = {
    tooltip: {
      borderRadius: "18px",
      backgroundColor: "white"
    }
  };

  const CustomTooltip = withStyles(styles)(Tooltip);

  const handleShowUserAsset = row => {
    setUser(row);
    setShowUserAssets(false);
  };

  return (
    <React.Fragment>
      <div className="root">
        <ThemeProvider theme={theme}>
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: props.isDrawerOpen
            })}
          >
            {showUserAssets && (
              <div>
                <Typography
                  style={{
                    textAlign: "left",
                    marignBottom: "20px",
                    minWidth: "230px"
                  }}
                >
                  Home {">"} Asset Management
                </Typography>

                <Paper
                  style={{
                    padding: "20px 20px 50px 20px",
                    minWidth: "230px",
                    marginTop: "20px",
                    minHeight: "800px"
                  }}
                >
                  <Grid container spacing={1} justify="center">
                    <Grid container xs={6}>
                      <Grid item>
                        <Paper
                          style={{
                            width: "275px",
                            minWidth: "225px",
                            height: "56px",
                            backgroundColor: "rgb(248,248,248)",
                            marginRight: "20px",
                            marginBottom: "20px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
                          <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            style={{
                              paddingLeft: "5px"
                            }}
                            placeholder="  Search..."
                          />
                          <IconButton
                            style={{ paddingleft: "-5px", paddingRight: "0px" }}
                            aria-label="search"
                          >
                            <SearchIcon
                              style={{
                                paddingleft: "-5px",
                                paddingRight: "0px"
                              }}
                            />
                          </IconButton>
                        </Paper>
                      </Grid>
                      <Grid item>
                        <FormControl
                          variant="outlined"
                          style={{
                            width: "275px",
                            minWidth: "225px",
                            marginRight: "20px",
                            marginBottom: "10px"
                          }}
                        >
                          <InputLabel id="demo-simple-select-label-2">
                            All Asset
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label-2"
                            label="All Sites"
                            id="demo-simple-select"
                          >
                            <MenuItem value="">
                              <em>All</em>
                            </MenuItem>
                            <MenuItem value={10}>Desktop</MenuItem>
                            <MenuItem value={20}>Laptop</MenuItem>
                            <MenuItem value={30}>Mobile</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      xs={4}
                      style={{
                        justifyContent: "flex-end",
                        paddingTop: "15px"
                      }}
                    >
                      <Grid>
                        <div
                          style={{
                            display: "flex",
                            marginRight: "30px"
                          }}
                        >
                          <FiberManualRecordIcon
                            className={classes.colorBlue}
                          />
                          &nbsp;
                          <Typography>Active</Typography>
                        </div>
                      </Grid>
                      <Grid>
                        <div
                          style={{
                            display: "flex",
                            marginRight: "30px"
                          }}
                        >
                          <FiberManualRecordIcon
                            className={classes.colorMustard}
                          />
                          &nbsp;
                          <Typography>Replacement</Typography>
                        </div>
                      </Grid>
                      <Grid>
                        <div
                          style={{
                            display: "flex",
                            marginRight: "30px"
                          }}
                        >
                          <FiberManualRecordIcon
                            className={classes.colorOrange}
                          />
                          &nbsp;
                          <Typography>Not Working</Typography>
                        </div>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      xs={2}
                      style={{
                        justifyContent: "flex-end"
                      }}
                    >
                      <Button
                        variant="contained"
                        style={{
                          color: "white",
                          backgroundColor: "rgb(31, 41, 156)",
                          height: "56px"
                        }}
                      >
                        <span style={{ fontSize: "1.5em" }}>+</span> &nbsp;
                        Assign Asset
                      </Button>

                      <div>
                        <IconButton
                          style={{
                            marginLeft: "5px",
                            marginTop: "5px"
                          }}
                          aria-label="more"
                          id="long-button"
                          aria-controls="basic-menu"
                          aria-expanded={open ? "true" : undefined}
                          aria-haspopup="true"
                          onClick={handleClick}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          id="long-menu"
                          MenuListProps={{
                            "aria-labelledby": "basic-button"
                          }}
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          PaperProps={{
                            style: {
                              // maxHeight: ITEM_HEIGHT * 4.5,
                              width: "130px",
                              top: "215px",
                              left: "1500px"
                            }
                          }}
                        >
                          {options.map(option => (
                            <MenuItem
                              key={option}
                              selected={option === "Pyxis"}
                              onClick={handleClose}
                            >
                              {option}
                            </MenuItem>
                          ))}
                        </Menu>
                      </div>
                    </Grid>
                  </Grid>
                  <hr
                    style={{
                      margin: "20px -20px"
                    }}
                  ></hr>

                  {rows.map(row => {
                    return (
                      <div>
                        <Grid container spacing={1} justify="center">
                          <Grid container xs={4}>
                            <Grid container xs={2}>
                              <div className={classes.nameTagContainer}>
                                <div className={classes.nameTag}>
                                  {row.empName.split("")[0]}
                                </div>
                              </div>
                            </Grid>

                            <Grid container xs={10}>
                              <Grid item xs={12}>
                                <CustomTooltip
                                  placement="bottom-start"
                                  TransitionProps={{ timeout: 600 }}
                                  title={<UserCard {...row} />}
                                >
                                  <Typography
                                    className={classes.colorBlue}
                                    variant="h6"
                                    style={{
                                      fontWeight: "600",
                                      textAlign: "left"
                                    }}
                                  >
                                    {row.empName} ({row.empId})
                                  </Typography>
                                </CustomTooltip>
                              </Grid>
                              <Grid item xs={10}>
                                <div style={{ display: "flex" }}>
                                  <Typography
                                    variant="body1"
                                    className={classes.colorBlue}
                                    style={{
                                      textAlign: "left"
                                    }}
                                  >
                                    <span>
                                      {row.empRole}&nbsp;&nbsp;|&nbsp;&nbsp;
                                      {row.empTeam}
                                    </span>
                                  </Typography>
                                </div>
                              </Grid>
                            </Grid>
                          </Grid>
                          {/* 2nd grid*/}
                          <Grid container xs={3}>
                            <Grid container xs={12}>
                              <Typography
                                className={classes.colorBlue}
                                style={{ marginTop: "5px" }}
                              >
                                <span
                                  style={{
                                    textAlign: "left"
                                  }}
                                >
                                  Assets:
                                </span>
                              </Typography>
                            </Grid>
                            <Grid container xs={12}>
                              {row.assets.map((asset, idx, { length }) => {
                                return (
                                  <Typography
                                    className={classes.colorBlue}
                                    style={{
                                      marginTop: "5px",
                                      fontWeight: "600"
                                    }}
                                  >
                                    {idx === length - 1 ? (
                                      <span>{asset.type}.</span>
                                    ) : (
                                      <span>{asset.type},&nbsp;</span>
                                    )}
                                  </Typography>
                                );
                              })}
                            </Grid>
                          </Grid>
                          {/* 3rd grid*/}
                          <Grid container xs={2}>
                            <Grid container xs={12}>
                              <Typography
                                className={classes.colorBlue}
                                style={{ marginTop: "5px" }}
                              >
                                <span
                                  style={{
                                    textAlign: "left"
                                  }}
                                >
                                  Assets Condition:
                                </span>
                              </Typography>
                            </Grid>
                            <Grid container xs={12}>
                              {row.assets.map((asset, idx, { length }) => {
                                return (
                                  <Typography
                                    className={classes.colorBlue}
                                    style={{
                                      marginTop: "5px",
                                      fontWeight: "600"
                                    }}
                                  >
                                    {idx === length - 1 ? (
                                      <span>{asset.conditon}</span>
                                    ) : (
                                      <span>
                                        {asset.conditon}
                                        &nbsp;&nbsp;|&nbsp;&nbsp;
                                      </span>
                                    )}
                                  </Typography>
                                );
                              })}
                            </Grid>
                          </Grid>
                          {/*4th grid*/}
                          <Grid container xs={2}>
                            <Grid container xs={12}>
                              <Typography
                                className={classes.colorBlue}
                                style={{ marginTop: "5px" }}
                              >
                                <span
                                  style={{
                                    textAlign: "left"
                                  }}
                                >
                                  Status:
                                </span>
                              </Typography>
                            </Grid>
                            <Grid container xs={12}>
                              <Typography
                                className={classes.colorBlue}
                                style={{ marginTop: "5px" }}
                              >
                                <span
                                  style={{
                                    marginTop: "5px",
                                    fontWeight: "600"
                                  }}
                                >
                                  {row.status}
                                </span>
                              </Typography>
                            </Grid>
                          </Grid>
                          {/*5th grid*/}
                          <Grid
                            container
                            xs={1}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center"
                            }}
                          >
                            <IconButton
                              style={{ padding: "0px" }}
                              aria-label="search"
                              onClick={() => handleShowUserAsset(row)}
                            >
                              <ChevronRightIcon
                                style={{ padding: "0px" }}
                                className={classes.colorBlue}
                              />
                            </IconButton>
                          </Grid>
                        </Grid>

                        <hr
                          style={{
                            margin: "20px -20px"
                          }}
                        ></hr>
                      </div>
                    );
                  })}
                </Paper>
              </div>
            )}
            {!showUserAssets && (
              <UserAssets {...{ user, rows, setShowUserAssets }} />
            )}
          </main>
        </ThemeProvider>
      </div>
    </React.Fragment>
  );
};
