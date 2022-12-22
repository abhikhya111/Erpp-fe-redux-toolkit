import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { TextField } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import axios from "axios";
import useAuth from "hooks/useAuth";
import { QueriesAllTicketContext } from "./index";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} style={{ padding: "24px 0px" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    marginTop: "40px",
    backgroundColor: theme.palette.background.paper,
  },
  label: {
    color: "royalblue",
  },
}));

function ScrollableTabsButtonAuto(props) {
  const classes = useStyles();
  const auth = useAuth();
  const [value, setValue] = React.useState(0);
  const [newComment, setNewComment] = React.useState("");
  const [ticketData] = React.useState(props.ticket_data || {});
  const [comments, setComments] = React.useState([]);
  const { getAllTickets } = React.useContext(QueriesAllTicketContext);

  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const updateComments = async () => {
    let commentsArr = [...comments];
    let status = "Un Assigned";
    if (ticketData.status) {
      status = ticketData.status;
    }
    commentsArr.push({
      comment: newComment,
      date: moment().format(),
      user_id: auth.user,
    });

    const commentsArryCopy = JSON.parse(JSON.stringify(commentsArr)); //deep copy commentsArr into commentsArryCopy
    function removeUserData(comments) {
      comments.forEach((comment, idx, arr) => {
        arr[idx].user_id = comment.user_id._id;
        if (comment._id) delete arr[idx]._id;
      });
      return comments;
    }
    const data = {
      ...ticketData,
      status,
      user_id: ticketData.user_id._id,
      comments: removeUserData(commentsArr),
      assigned_to: ticketData.assigned_to?._id,
      approver_id: ticketData.approver_id?._id,
    };

    if (data.updated_at) delete data.updated_at;
    if (data.created_at) delete data.created_at;
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/requests/update`,
        data,
        {
          headers: {
            token: auth.token,
          },
        }
      );

      if (res.status === 200) {
        setComments(commentsArryCopy);
        setNewComment("");
        getAllTickets();
      }
    } catch (err) {
      console.log("Err: ", err);
    }
  };

  React.useEffect(() => {
    if (props.ticket_data.comments) setComments(props.ticket_data.comments);
  }, [props.ticket_data.comments]);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppBar
          position='static'
          style={{
            // borderRadius: " 5px",
            boxShadow: "lightgrey 0px 0px 2px 1px",
            backgroundColor: "#fff",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor='primary'
            textColor='primary'
            variant='fullWidth'
            aria-label='full width tabs example'
            scrollButtons='auto'
          >
            <Tab className={classes.label} label='Comments' {...a11yProps(0)} />
            <Tab className={classes.label} label='Activity' {...a11yProps(1)} />
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0}>
          {comments ? (
            comments.map((comment, idx) => {
              return (
                <div
                  style={{
                    borderRadius: "5px",
                    border: "1px solid lightgrey",
                    margin: "10px",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  key={idx}
                >
                  <Typography
                    variant='subtitle1'
                    style={{
                      fontWeight: "600",
                      color: "rgb(31,41,156)",
                    }}
                  >
                    {comment.user_id.first_name +
                      " " +
                      comment.user_id.last_name}
                  </Typography>

                  <Typography variant='body1'>{comment.comment}</Typography>
                  <Typography
                    variant='caption'
                    style={{
                      color: "grey",
                    }}
                  >
                    {moment(comment.date).format("DD-MM-YYYY h:mm A")}
                  </Typography>
                </div>
              );
            })
          ) : (
            <></>
          )}

          <TextField
            id='standard-size-small'
            size='small'
            placeholder='Type a remark...'
            variant='standard'
            style={{
              width: "calc(90% - 20px)",
              margin: "20px",
              marginRight: "0px",
            }}
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
          />

          <IconButton onClick={updateComments}>
            <SendIcon color='primary' />
          </IconButton>
        </TabPanel>
        <TabPanel value={value} index={1}></TabPanel>
      </div>
    </ThemeProvider>
  );
}

export default ScrollableTabsButtonAuto;
