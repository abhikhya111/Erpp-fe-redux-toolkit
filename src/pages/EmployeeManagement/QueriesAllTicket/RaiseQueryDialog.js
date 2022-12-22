import React from "react";
import {
  Typography,
  Button,
  FormControl,
  Select,
  TextField,
  MenuItem,
  TextareaAutosize,
  IconButton,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";

// import MuiAlert from "@material-ui/lab/Alert";
// import axios from "axios";
import { withStyles } from "@material-ui/styles";
import "react-phone-input-labelled/dist/style.css";
import { makeStyles } from "@material-ui/core";
// import useQueriesAllTicketStyles from "style.js";
import { useQueriesAllTicketStyles } from "./style.js";
import useAuth from "hooks/useAuth";
import Api from "hooks/AjaxAction";

import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";
import { Autocomplete } from "@material-ui/lab";
import { QueriesAllTicketContext } from "./index";

//  form element styling --------------------------
const formStyles = makeStyles((theme) => ({
  sectionHeading: {
    color: "#1F299C",
    fontWeight: "700",
    margin: "10px",
    marginBottom: "20px",
  },

  fieldContainer: {
    maxWidth: "250px",
    display: "inline-block",
    marginRight: "20px",
    // flexDirection: 'column'
  },

  subtitle: {
    marginLeft: "10px",
    color: "black",
    fontWeight: "600",
  },
  colorBlue: {
    color: "rgb(31,41,156)",
  },
  colorDarkBlue: {
    color: "rgb(22,33,91)",
  },
  formControl1: {
    width: "370px",
    position: "relative",
    margin: "10px 20px",
  },
}));

// --------- CssTextFeild ----------------
const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "black",
    },
    "& .Mui-disabled": {
      color: "black",
    },

    "& .MuiInputBase": {
      background: "#F7F8FC",
      backgroundColor: "#F7F8FC",
      height: "20px",
    },
  },
})(TextField);

// ---------  Input for Snackbar -----------------

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }
// -----------------------------------------------

// function getStyles(name, selected, theme) {
//   return {
//     fontWeight:
//       selected.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium
//   };
// }

function RaiseQueryDialog(props) {
  const auth = useAuth();
  const myClasses = formStyles();
  const classes = useQueriesAllTicketStyles();
  // const [formError, setFormError] = useState(null);
  // const [formSuccess, setFormSuccess] = useState(null);
  const { getAllTickets, allEmployees } = React.useContext(
    QueriesAllTicketContext
  );

  const [fileName, setFileName] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [fileUploadedSuccessfull, setFileUploadedSuccessfull] = React.useState(
    false
  );
  const [raiserName, setRaiserName] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [subCategory, setSubCategory] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [priority, setPriority] = React.useState("");
  const [attachmentUrl, setAttachmentUrl] = React.useState("");

  const onSelectFile = (files) => {
    setIsLoading(true);

    const onSuccess = (data) => {
      setAttachmentUrl(data.file_url);
      setFileName(data.filename);
      setIsLoading(false);
      setFileUploadedSuccessfull(true);
    };

    const onError = (error) => {
      console.log("Error: ", error);
      setIsLoading(false);
    };

    // Upload to S3
    Api.fileUpload(files, "org-glen", auth.token, onSuccess, onError);
  };

  const handleSubmitQuery = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const onSuccess = (data) => {
      props.closeForm();
      setIsLoading(false);
      getAllTickets();
    };

    const onError = (error) => {
      setIsLoading(false);
    };

    const data = {
      user_id: auth.user._id,
      name: auth.user._id,
      category: category,
      sub_category: subCategory,
      priority: priority,
      query: description,
      attachment: attachmentUrl,
      cycle_time: "05 Days",
      acceptance_time: "03 Days",
      resolution_time: "02 Days",
      assigned_to: raiserName,
      approver_id: null,
    };

    Api.post("requests/create", data, auth.token, onSuccess, onError);
  };

  const handleCloseDialog = () => {
    props.closeForm();
  };

  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          margin: "0 20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px",
          }}
        >
          <Typography
            variant='h5'
            // className = {classes.colorDarkBlue}
            style={{
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
            }}
          >
            Raise A Query
          </Typography>

          <IconButton
            aria-label='close'
            onClick={handleCloseDialog}
            style={{
              margin: "0",
              padding: "10px",
              color: "black",
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>

        <hr></hr>

        <Typography
          variant='h6'
          className={myClasses.colorDarkBlue}
          style={{
            fontWeight: "600",
            margin: "10px 20px",
          }}
        >
          Name*
        </Typography>

        {allEmployees && (
          <Autocomplete
            // value={autocompleteValue}
            id='combo-box-demo'
            options={allEmployees}
            getOptionLabel={(option) =>
              `${option.first_name} (${option.emp_code})`
            }
            style={{
              backgroundColor: "rgb(247,248,252)",
              boxShadow: "lightgray 0px 0px 5px",
              margin: "0px 20px 10px 20px",
              width: "370px",
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Search Employee'
                variant='outlined'
              />
            )}
            onChange={(e) => {
              const regExp = /\(([^)]+)\)/;
              let matches = regExp.exec(e.target.innerText);

              if (matches) {
                const user = allEmployees.find((user) => {
                  return user.emp_code === matches[1];
                });

                setRaiserName(user._id);
              }
            }}
          />
        )}

        {/* <Typography
          variant="h6"
          className={myClasses.colorDarkBlue}
          style={{
            fontWeight: "600",
            margin: "10px 20px"
          }}
        >
          Assign Query To*
        </Typography> */}

        <Typography
          variant='h6'
          className={myClasses.colorDarkBlue}
          style={{
            fontWeight: "600",
            margin: "10px 20px",
          }}
        >
          Category*
        </Typography>

        <FormControl variant='outlined' className={myClasses.formControl1}>
          <Select
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            style={{ backgroundColor: "rgb(247,248,252)" }}
            onChange={(event) => setCategory(event.target.value)}
          >
            <MenuItem value='Admin'>Admin</MenuItem>
            <MenuItem value='HR'>HR</MenuItem>
            <MenuItem value='Payroll'>Payroll</MenuItem>
            <MenuItem value='Dispatch'>Dispatch</MenuItem>
            <MenuItem value='Accounts'>Accounts</MenuItem>
            <MenuItem value='QHSE'>QHSE</MenuItem>
            <MenuItem value='Inventory'>Inventory</MenuItem>
          </Select>
        </FormControl>

        {/* <Typography
          variant="h6"
          className={myClasses.colorDarkBlue}
          style={{
            fontWeight: "600",
            margin: "10px 20px"
          }}
        >
          Category*
        </Typography>

        <FormControl
          variant="outlined"
          style={{
            minWidth: "300px",
            margin: "0px 20px 10px 20px",
          }}
        >
          <Select
            // value={positionSelected}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            style={{ backgroundColor: "rgb(247,248,252)" }}
            // onChange={e => setPositionSelected(e.target.value)}
          >
            <MenuItem value="">
              <em>Select Position</em>
            </MenuItem>
            <MenuItem value="">
              <em>Select Position</em>
            </MenuItem>
            <MenuItem value="">
              <em>Select Position</em>
            </MenuItem>
            {/* {allPositions.map(position => (
              <MenuItem key={position.key} value={position._id}>
                {position.position_title}
              </MenuItem>
            ))} */}
        {/* </Select>
        </FormControl> */}

        <Typography
          variant='h6'
          className={myClasses.colorDarkBlue}
          style={{
            fontWeight: "600",
            margin: "0px 20px 10px 20px",
          }}
        >
          Sub Category*
        </Typography>

        <CssTextField
          variant='outlined'
          style={{
            backgroundColor: "rgb(247,248,252)",
            boxShadow: "lightgray 0px 0px 5px",
            margin: "0px 20px 10px 20px",
            width: "370px",
          }}
          onChange={(e) => {
            setSubCategory(e.target.value);
          }}
        />

        <Typography
          variant='h6'
          className={myClasses.colorDarkBlue}
          style={{
            fontWeight: "600",
            margin: "0px 20px 10px 20px",
          }}
        >
          Priority
        </Typography>

        <FormControl variant='outlined' className={myClasses.formControl1}>
          <Select
            // value={positionSelected}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            style={{ backgroundColor: "rgb(247,248,252)" }}
            onChange={(e) => setPriority(e.target.value)}
          >
            <MenuItem value='Highest'>Highest</MenuItem>
            <MenuItem value='Medium'>Medium</MenuItem>
            <MenuItem value='Low'>Low</MenuItem>
          </Select>
        </FormControl>

        <Typography
          variant='h6'
          className={myClasses.colorDarkBlue}
          style={{
            fontWeight: "600",
            margin: "10px 20px",
          }}
        >
          Description:*
        </Typography>

        <TextareaAutosize
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          style={{
            height: "110px",
            backgroundColor: "#f5f5f5",
            margin: "0px 20px",
            width: "90%",
            padding: "8px",
          }}
          // value={resign.leaving_comment}
          aria-label='minimum height'
          minRows={10}
          placeholder='Enter Your Query'
        />

        <Typography
          variant='h6'
          className={myClasses.colorDarkBlue}
          style={{
            fontWeight: "600",
            margin: "10px 20px",
          }}
        >
          Attachment*
        </Typography>

        <label
          style={{
            width: "90%",
            height: "110px",
            backgroundColor: "#f5f5f5",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "20px",
            margin: "0px 20px 20px 20px",
          }}
        >
          {fileName !== "" ? (
            fileName
          ) : (
            <p
              style={{
                fontSize: "20px",
              }}
            >
              Drag & Drop Here,{" "}
              <span style={{ color: "#1250ff", marginRight: "10px" }}>
                Or Browse File
              </span>
              <CloudUploadOutlinedIcon />
            </p>
          )}

          <input
            type='file'
            style={{ display: "none" }}
            onChange={(e) => onSelectFile(e.target.files)}
          />
        </label>
        {fileUploadedSuccessfull && (
          <p
            style={{
              color: "#00b500",
              fontSize: "16px",
              marginLeft: "20px",
            }}
          >
            Upload successful
          </p>
        )}
      </div>

      <div>
        <hr></hr>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "0px 10px 10px 0px",
          }}
        >
          <Button
            variant='outlined'
            color='primary'
            style={{
              marginRight: "10px",
            }}
            onClick={handleCloseDialog}
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={handleSubmitQuery}
          >
            Save
          </Button>
        </div>
      </div>

      {/* ---------------------------------------------- */}
      {/* <Snackbar
        open={!!formError}
        onClose={() => setFormError(false)}
        // TransitionComponent={<Slide direction="up" />}
        key={"Form Error"}
        autoHideDuration={3000}
      >
        <Alert severity="error">{formError}</Alert>
      </Snackbar>
      <Snackbar
        open={!!formSuccess}
        onClose={() => setFormSuccess(false)}
        // TransitionComponent={<Slide direction="up" />}
        key={"Form Success"}
        autoHideDuration={2000}
      >
        <Alert severity="success">{formSuccess}</Alert>
      </Snackbar> */}

      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </ThemeProvider>
  );
}

export default RaiseQueryDialog;
