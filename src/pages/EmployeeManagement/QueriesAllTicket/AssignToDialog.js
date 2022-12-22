import { useState, useContext } from "react";
import axios from "axios";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
//import { withStyles } from "@material-ui/styles";
import {
  makeStyles,
  Typography,
  IconButton,
  TextareaAutosize,
  Button,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { QueriesAllTicketContext } from "./index";
import useAuth from "hooks/useAuth";
import moment from "moment";

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
}));

const AssignToDialog = (props) => {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  const myClasses = formStyles();

  const [name, setName] = useState("");
  const [comments, setComments] = useState("");
  const { allEmployees, setFetchAllTickets } = useContext(
    QueriesAllTicketContext
  );
  const auth = useAuth();

  const handleCloseDialog = () => {
    props.closeForm();
  };

  const handleSave = async () => {
    var data = {
      ...props.ticketData,
      assigned_to: name,
      approver_id: auth.user._id,
      comments: [
        { comment: comments, date: moment().format(), user_id: auth.user._id },
      ],
          user_id: props.ticketData.user_id._id,
    };

    for (const property in data) {
      if (data[property] === null) data[property] = "";
    }

    try {
      const test = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/requests/update`,
        data,
        {
          headers: {
            token: auth.token,
          },
        }
      );
      console.log(test);
      console.log("-------------------");

      console.log(data);
      handleCloseDialog();
      setFetchAllTickets(true);
    } catch (err) {
      console.log("Error -> ", err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ position: "relative", height: "100%" }}>
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
            Assign To
          </Typography>

          <IconButton
            aria-label='close'
            onClick={handleCloseDialog}
            style={{
              margin: "0",
              padding: "0",
              color: "black",
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>

        <hr></hr>

        <Typography
          variant='h4'
          className={myClasses.colorDarkBlue}
          style={{
            fontWeight: "600",
            margin: "30px 20px",
          }}
        >
          Requester No: {props.requester}
        </Typography>

        <Typography
          variant='h6'
          className={myClasses.colorDarkBlue}
          style={{
            fontWeight: "600",
            margin: "20px 20px 10px 20px",
          }}
        >
          Name*
        </Typography>

        <FormControl
          variant='outlined'
          style={{
            minWidth: "300px",
            margin: "0px 20px",
          }}
        >
          <Select
            // value={positionSelected}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            style={{ backgroundColor: "rgb(247,248,252)" }}
            onChange={(e) => setName(e.target.value)}
          >
            {allEmployees.map((emp, index) => (
              <MenuItem key={index} value={emp._id}>
                {emp.first_name + " " + emp.last_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography
          variant='h6'
          className={myClasses.colorDarkBlue}
          style={{
            fontWeight: "600",
            margin: "20px 20px",
          }}
        >
          Comments*
        </Typography>

        <TextareaAutosize
          onChange={(e) => {
            setComments(e.target.value);
          }}
          style={{
            width: "90%",
            height: "110px",
            backgroundColor: "rgb(247,248,252)",
            margin: "0px 20px",
            padding: "10px",
          }}
          // value={resign.leaving_comment}
          aria-label='minimum height'
          minRows={10}
          placeholder='Enter Comments'
        />

        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "100%",
          }}
        >
          <hr></hr>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "10px 10px 10px 0px",
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
              onClick={() => handleSave()}
              disabled={!name || !comments }
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AssignToDialog;
