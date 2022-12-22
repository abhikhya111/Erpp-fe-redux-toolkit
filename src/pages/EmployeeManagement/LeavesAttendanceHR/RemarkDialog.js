import React from "react";
import { Typography, IconButton, Box } from "@material-ui/core";
import "react-phone-input-labelled/dist/style.css";
import moment from "moment";
import axios from "axios";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import { TextField } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import useAuth from "hooks/useAuth";

function RemarkDialog(props) {
  const [newComment, setNewComment] = React.useState("");
  const [comments, setComments] = React.useState([]);
  const [remarkData, setRemarkData] = React.useState(props.leave_data);
  const auth = useAuth();

  const handleCloseDialog = () => {
    props.closeForm();
  };

  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  const updateComments = async () => {
    let user_id = auth.user._id.toString();

    let filteredComments = comments.map((comment) => {
      let c = comment;
      if (c._id) delete c._id;
      return {
        ...c,
        user_id: user_id._id,
      };
    });
    let commentsData = [
      ...filteredComments,
      {
        comment: newComment,
        user_id: user_id,
        date: moment().format("DD-MM-YYYY h:mm A"),
      },
    ];

    let commentsArr = [
      ...comments,
      {
        comment: newComment,
        user_id: auth.user,
        date: moment().format("DD-MM-YYYY h:mm A").toString(),
      },
    ];

    const data = {
      ...remarkData[0],
      user_id: remarkData[0].user_id._id.toString(),
      comments: commentsData,
    };
    if (data.updated_at) delete data.updated_at;
    if (data.created_at) delete data.created_at;

    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/leaves/update`,
        data,
        {
          headers: {
            token: auth.token,
          },
        }
      );

      setComments([...commentsArr]);
      setNewComment("");
      // props.after_opn();

      if (res.data.status === 200) {
        // setComments([...commentsData]);
        // setNewComment("");
        // props.after_opn();
      }
    } catch (err) {
      console.log("Err: ", err);
    }
  };

  const getNameInfo = (user_id) => {
    try {
      return (
        user_id?.first_name +
        " " +
        user_id?.last_name +
        " " +
        "(" +
        user_id?.emp_code +
        ")"
      );
    } catch (e) {
      console.log(user_id);
      console.log(e);
    }
  };

  React.useEffect(() => {
    setRemarkData([props.leave_data]);
    let comments = props.leave_data.comments || [];
    setComments([...comments]);
  }, [props.leave_data]);

  if (remarkData.length) {
    return (
      <ThemeProvider theme={theme}>
        <div>
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
              Comments
            </Typography>

            <IconButton
              aria-label='close'
              onClick={handleCloseDialog}
              style={{
                margin: "0",
                padding: "0",
                color: "black",
                fontSize: "18px",
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>

          <hr></hr>

          <div
            style={{
              // margin: "100px 10px 0px, 10px",
              margin: "20px",
              padding: "15px",
              borderRadius: "5px",
              border: "2px solid lightgrey",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {props.leave_data?.description?.length ? (
              <>
                <Typography
                  variant='h6'
                  style={{
                    color: "#1F299C",
                    fontWeight: "800",
                    padding: "10px 0px 10px 0px",
                  }}
                >
                  {getNameInfo(props.leave_data.user_id)}
                </Typography>
                <Typography variant='body1'>
                  {props.leave_data.description}
                </Typography>
                <Typography
                  variant='subtitle2'
                  style={{
                    color: "grey",
                  }}
                >
                  {moment(props.leave_data.created_at).utc().format(
                    "DD-MM-YYYY h:mm A"
                  )}
                </Typography>
                <hr></hr>
              </>
            ) : (
              <></>
            )}

            {comments.length
              ? comments.map((comment, idx) => {
                  if (comment.comment === "" || !comment.comment) return;
                  return (
                    <div
                      key={idx}
                      style={{
                        margin: "20px 0 0 0",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "scroll",
                      }}
                    >
                      <Typography
                        variant='h6'
                        style={{
                          color: "#1F299C",
                          fontWeight: "800",
                          padding: "10px 0px 15px 0px",
                        }}
                      >
                        {getNameInfo(comment.user_id)}
                      </Typography>
                      <Typography variant='body1'>{comment.comment}</Typography>
                      <Typography
                        variant='subtitle2'
                        style={{
                          color: "grey",
                        }}
                      >
                        {comment.date}
                      </Typography>
                    </div>
                  );
                })
              : ""}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <TextField
                id='standard-size-small'
                size='small'
                placeholder='Type a comment...'
                variant='standard'
                style={{
                  width: "90%",
                  margin: "50px 0 20px 0",
                }}
                value={newComment}
                onChange={(e) => {
                  setNewComment(e.target.value);
                }}
              />
              <IconButton onClick={updateComments}>
                <SendIcon color='primary' />
              </IconButton>
            </Box>
          </div>
        </div>
      </ThemeProvider>
    );
  } else {
    return <></>;
  }
}

export default RemarkDialog;
