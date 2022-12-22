import React, { useState, forwardRef, useEffect } from "react";
import {
  Button,
  Dialog,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Slide,
  Tooltip,
  Typography
} from "@material-ui/core";

import { useAssetStyles } from "./Style";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { UserCard } from "./Cards/UserCard";
import { withStyles } from "@material-ui/styles";
import PrintOutlinedIcon from "@material-ui/icons/PrintOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachmentOutlinedIcon from "@material-ui/icons/AttachmentOutlined";
import TextsmsOutlinedIcon from "@material-ui/icons/TextsmsOutlined";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import HistoryOutlinedIcon from "@material-ui/icons/HistoryOutlined";
import { AttachmentDialog } from "./Dialogs/AttachmentDialog";
import { CommentDialog } from "./Dialogs/CommentDialog";
import { ActivityDialog } from "./Dialogs/ActivityDialog";
import { AssignToDialog } from "./Dialogs/AssignToDialog";
import { HandoverDialog } from "./Dialogs/HandoverDialog";

const options = ["Share", "Export"];
const options2 = ["Edit", "Delete"];
const options3 = ["Assign To", "Handover"];

// const tableHeaders = [
//   "Item Name",
//   "Type",
//   "Brand",
//   "Model",
//   "Serial No.",
//   "Status",
// ];

// const defaultAsset = {
//   type: "",
//   conditon: "",
//   name: "",
//   brand: "",
//   model: "",
//   serialNo: "",
//   status: "",
//   images: [],
// };

const transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export const UserAssets = ({ user, rows, setShowUserAssets }) => {
  const classes = useAssetStyles();
  const handleGoBack = event => {
    event.preventDefault();
    setShowUserAssets(true);
  };

  const openUserSelect = event => {
    event.preventDefault();
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [anchorEl3, setAnchorEl3] = useState(null);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const open3 = Boolean(anchorEl3);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick2 = event => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClick3 = (event, asset) => {
    setSelectedAssset(asset);
    setAnchorEl3(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
    console.log(anchorEl2);
  };
  const handleClose3 = () => {
    setAnchorEl3(null);
    console.log(anchorEl3);
  };

  const styles = {
    tooltip: {
      borderRadius: "18px",
      backgroundColor: "white"
    }
  };

  const CustomTooltip = withStyles(styles)(Tooltip);
  const [dialog, setDialog] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAsset, setSelectedAssset] = useState({});

  const handleDialogClick = (dialogType, asset) => {
    setDialog(dialogType);
    setSelectedAssset(asset);
    setOpenDialog(true);
  };

  useEffect(() => {
    if (!openDialog) {
      setDialog("");
    }
  }, [openDialog]);

  const showDialog = () => {
    switch (dialog) {
      case "attachment":
        return <AttachmentDialog {...{ setOpenDialog, selectedAsset }} />;
      case "comment":
        return <CommentDialog {...{ setOpenDialog, selectedAsset }} />;
      case "activity":
        return <ActivityDialog {...{ setOpenDialog, selectedAsset }} />;
      case "Assign To":
        return (
          <AssignToDialog
            {...{ setOpenDialog, user, selectedAsset, setSelectedAssset }}
          />
        );
      case "Handover":
        return <HandoverDialog {...{ setOpenDialog, selectedAsset, rows }} />;
      default:
        return <AttachmentDialog {...{ setOpenDialog, selectedAsset }} />;
    }
  };

  useEffect(() => {
    if (!openDialog) {
      setSelectedAssset({});
    }
  }, [openDialog]);

  const handleAddButtonClick = option => {
    handleClose3();
    handleDialogClick(option, selectedAsset);
  };

  return (
    <div>
      <Typography
        style={{
          textAlign: "left",
          marignBottom: "20px",
          minWidth: "230px"
        }}
      >
        Home {">"} Asset Management {">"} {user.empName} ({user.empId})
      </Typography>

      <Paper
        style={{
          padding: "20px 20px 50px 20px",
          minWidth: "230px",
          marginTop: "20px",
          minHeight: "800px"
        }}
      >
        <Grid container spacing={1} justify="center" alignItems="center">
          <Grid container xs={4}>
            <div>
              <IconButton onClick={handleGoBack}>
                <ArrowBackIcon className={classes.colorBlack} />
              </IconButton>
            </div>

            <div
              style={{
                paddingLeft: "18px"
              }}
            >
              <CustomTooltip
                className={classes.tooltip}
                placement="bottom-start"
                TransitionProps={{ timeout: 600 }}
                title={<UserCard {...user} />}
              >
                <div className={classes.nameTagContainer}>
                  <div className={classes.nameTag}>
                    {user.empName.split("")[0]}
                  </div>
                </div>
              </CustomTooltip>
            </div>

            <div
              style={{
                alignItems: "center",
                display: "flex",
                paddingLeft: "5px"
              }}
            >
              <Typography
                className={classes.colorBlue}
                variant="h5"
                style={{
                  fontWeight: "600",
                  textAlign: "left"
                }}
              >
                {user.empName} ({user.empId})
              </Typography>
              <IconButton onClick={openUserSelect}>
                <ArrowDropDownIcon className={classes.colorBlack} />
              </IconButton>
            </div>
          </Grid>
          <Grid container xs={4}>
            <Grid container item xs={12}>
              <Typography
                className={classes.colorBlue}
                style={{
                  textAlign: "left"
                }}
              >
                {user.empRole}&nbsp;|&nbsp;{user.schedule}
              </Typography>
            </Grid>
          </Grid>
          <Grid container xs={4} spacing={2} justify="flex-end">
            <Grid container item xs={6} justify="flex-end">
              <Button
                variant="contained"
                style={{
                  color: "white",
                  backgroundColor: "rgb(31, 41, 156)",
                  height: "56px"
                }}
              >
                <span style={{ fontSize: "1.5em" }}>+</span> &nbsp; Add Asset
              </Button>
            </Grid>
            <Grid
              container
              item
              xs={2}
              style={{
                paddingLeft: "5px"
              }}
            >
              <Button
                variant="outlined"
                className={classes.colorBlue}
                color="primary"
              >
                <PrintOutlinedIcon className={classes.colorBlue} />
              </Button>
            </Grid>
            <Grid container item xs={2}>
              <IconButton
                style={{
                  marginLeft: "5px",
                  marginTop: "4px"
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
            </Grid>
          </Grid>
        </Grid>
        <hr
          style={{
            margin: "20px -20px 30px"
          }}
        ></hr>

        <Grid container spacing={1} justify="center" alignItems="center">
          {/* Table heading*/}
          <Grid container justify="center" className={classes.tableHeadRow}>
            <Grid container xs={8}>
              <Grid container item xs={2} className={classes.alignCenter}>
                <Typography
                  className={`${classes.colorBlue} ${classes.fontWeight500} ${classes.tableHeadCell}`}
                  variant="body2"
                >
                  Item Type
                </Typography>
              </Grid>
              <Grid container item xs={3} className={classes.alignCenter}>
                <Typography
                  className={`${classes.colorBlue} ${classes.fontWeight500} ${classes.tableHeadCell}`}
                  variant="body2"
                >
                  Name
                </Typography>
              </Grid>
              <Grid container item xs={1} className={classes.alignCenter}>
                <Typography
                  className={`${classes.colorBlue} ${classes.fontWeight500} ${classes.tableHeadCell}`}
                  variant="body2"
                >
                  Brand
                </Typography>
              </Grid>
              <Grid container item xs={2} className={classes.alignCenter}>
                <Typography
                  className={`${classes.colorBlue} ${classes.fontWeight500} ${classes.tableHeadCell}`}
                  variant="body2"
                >
                  Model
                </Typography>
              </Grid>
              <Grid container item xs={2} className={classes.alignCenter}>
                <Typography
                  className={`${classes.colorBlue} ${classes.fontWeight500} ${classes.tableHeadCell}`}
                  variant="body2"
                >
                  Serial No.
                </Typography>
              </Grid>
              <Grid container item xs={2} className={classes.alignCenter}>
                <Typography
                  className={`${classes.colorBlue} ${classes.fontWeight500} ${classes.tableHeadCell}`}
                  variant="body2"
                >
                  Status
                </Typography>
              </Grid>
            </Grid>
            <Grid container xs={4}></Grid>
          </Grid>

          {/* Table Rows*/}
          {user.assets.map(asset => {
            return (
              <Grid container justify="center" className={classes.tableRow}>
                <Grid container xs={8}>
                  <Grid container item xs={2} className={classes.alignCenter}>
                    <Typography
                      className={`${classes.colorBlue} ${classes.tableRowCell} ${classes.alignLeft}`}
                      variant="body2"
                    >
                      {asset.type}
                    </Typography>
                  </Grid>
                  <Grid container item xs={3} className={classes.alignCenter}>
                    <Typography
                      className={`${classes.colorBlue} ${classes.tableRowCell} ${classes.alignLeft}`}
                      variant="body2"
                    >
                      {asset.name}
                    </Typography>
                  </Grid>
                  <Grid container item xs={1} className={classes.alignCenter}>
                    <Typography
                      className={`${classes.colorBlue} ${classes.tableRowCell} ${classes.alignLeft}`}
                      variant="body2"
                    >
                      {asset.brand}
                    </Typography>
                  </Grid>
                  <Grid container item xs={2} className={classes.alignCenter}>
                    <Typography
                      className={`${classes.colorBlue} ${classes.tableRowCell} ${classes.alignLeft}`}
                      variant="body2"
                    >
                      {asset.model}
                    </Typography>
                  </Grid>
                  <Grid container item xs={2} className={classes.alignCenter}>
                    <Typography
                      className={`${classes.colorBlue} ${classes.tableRowCell} ${classes.alignLeft}`}
                      variant="body2"
                    >
                      {asset.serialNo}
                    </Typography>
                  </Grid>
                  <Grid container item xs={2} className={classes.alignCenter}>
                    <Typography
                      className={`${classes.colorBlue} ${classes.tableRowCell} ${classes.alignLeft}`}
                      variant="body2"
                    >
                      {asset.status}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  xs={4}
                  style={{
                    alignItems: "center",
                    paddingRight: "15px"
                  }}
                >
                  <Grid
                    container
                    xs={12}
                    style={{
                      justifyContent: "flex-end"
                    }}
                    spacing={2}
                  >
                    <Button
                      className={classes.assetRowIcon}
                      variant="outlined"
                      color="primary"
                      onClick={() => handleDialogClick("attachment", asset)}
                    >
                      <AttachmentOutlinedIcon fontSize="small" />
                    </Button>

                    <Button
                      className={classes.assetRowIcon}
                      variant="outlined"
                      color="primary"
                      onClick={() => handleDialogClick("comment", asset)}
                    >
                      <TextsmsOutlinedIcon fontSize="small" />
                    </Button>
                    <Button
                      className={classes.assetRowIcon}
                      variant="outlined"
                      color="primary"
                      onClick={() => handleDialogClick("activity", asset)}
                    >
                      <HistoryOutlinedIcon fontSize="small" />
                    </Button>
                    <Button
                      className={classes.assetRowIcon}
                      variant="outlined"
                      color="primary"
                      aria-label="add"
                      id="add-button"
                      aria-controls="basic-menu"
                      aria-expanded={open3 ? "true" : undefined}
                      aria-haspopup="true"
                      onClick={e => handleClick3(e, asset)}
                    >
                      <AddOutlinedIcon fontSize="small" />
                    </Button>
                    <Menu
                      id="add-menu"
                      MenuListProps={{
                        "aria-labelledby": "basic-button"
                      }}
                      anchorEl={anchorEl3}
                      open={open3}
                      onClose={handleClose3}
                      PaperProps={{
                        style: {
                          // maxHeight: ITEM_HEIGHT * 4.5,
                          width: "130px",
                          top: "215px",
                          left: "1500px"
                        }
                      }}
                    >
                      {options3.map(option => (
                        <MenuItem
                          key={option}
                          selected={option === "Pyxis"}
                          onClick={() => {
                            handleAddButtonClick(option);
                          }}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </Menu>

                    <Button
                      className={classes.assetRowIcon}
                      variant="outlined"
                      color="primary"
                    >
                      <VisibilityOutlinedIcon fontSize="small" />
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      className={classes.assetRowIcon}
                      aria-label="more"
                      id="options-button"
                      aria-controls="basic-menu"
                      aria-expanded={open2 ? "true" : undefined}
                      aria-haspopup="true"
                      onClick={handleClick2}
                    >
                      <MoreVertIcon />
                    </Button>
                    <Menu
                      id="long2-menu"
                      MenuListProps={{
                        "aria-labelledby": "basic-button"
                      }}
                      anchorEl={anchorEl2}
                      open={open2}
                      onClose={handleClose2}
                      PaperProps={{
                        style: {
                          // maxHeight: ITEM_HEIGHT * 4.5,
                          width: "130px",
                          top: "215px",
                          left: "1500px"
                        }
                      }}
                    >
                      {options2.map(option => (
                        <MenuItem
                          key={option}
                          selected={option === "Pyxis"}
                          onClick={handleClose2}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>

        <Dialog
          open={openDialog}
          maxWidth="sm"
          fullWidth
          keepMounted
          TransitionComponent={transition}
          onClose={() => {
            setDialog("");
            setSelectedAssset({});
            setOpenDialog(false);
          }}
          scroll="paper"
          aria-describedby="alert-dialog-slide-description"
          PaperProps={{
            style: {
              position: "absolute",
              margin: "0px",
              right: "0px",
              minHeight: "100vh",
              borderRadius: "0px"
            }
          }}
        >
          {showDialog()}
        </Dialog>
      </Paper>
    </div>
  );
};
