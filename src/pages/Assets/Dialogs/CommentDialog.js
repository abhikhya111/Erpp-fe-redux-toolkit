import {
  Box,
  createTheme,
  Grid,
  IconButton,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import { useAssetStyles } from "../Style";
import SendIcon from "@material-ui/icons/Send";

export const CommentDialog = (props) => {
  const { setOpenDialog, selectedAsset } = props;
  let theme = createTheme();
  const classes = useAssetStyles();
  const handleClose = () => {
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
                  padding: "10px 20px",
                }}
              >
                <span>Comment</span>
              </Typography>
            </Grid>
            <Grid container item xs={2} justify="flex-end">
              <IconButton
                className={classes.colorBlack}
                onClick={handleClose}
                style={{
                  padding: "10px 20px",
                }}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
          <hr
            style={{
              margin: "0",
            }}
          ></hr>
          {selectedAsset.comments.map((comment, { length }) => {
            return (
              <Box
                sx={{
                  width: "100%",
                  height: "90%",
                }}
                margin="30px"
                style={{
                  border: "1px solid rgba(163,163,163,0.5)",
                  borderRadius: "7px",
                }}
              >
                <Box margin="20px">
                  <Grid container direction="column">
                    <Grid item xs={12}>
                      <Typography
                        className={classes.colorBlue}
                        variant="body1"
                        style={{
                          fontWeight: "500",
                        }}
                      >
                        {comment.name}&nbsp;(
                        {comment.empId})
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{
                        margin: "5px 0",
                      }}
                    >
                      <Typography
                        variant="body1"
                        style={{
                          textAlign: "left",
                        }}
                      >
                        {comment.comment}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant="body1"
                        style={{
                          textAlign: "left",
                          color: "rgb(0 0 0 / 38%)",
                        }}
                      >
                        {comment.timeStamp}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            );
          })}

          <Grid
            container
            xs={12}
            direction="column"
            // className={

            // }
            style={{
              width: "100%",
              bottom: "0",
              position: selectedAsset.comments.length <= 2 ? "absolute" : "",
              minHeight: "90",
            }}
          >
            <Grid
              container
              xs={12}
              style={{
                margin: "20px 30px",
                width: "90%",
              }}
            >
              <Grid item xs={10}>
                <TextField
                  id="outlined-size-normal"
                  placeholder="Type a remark..."
                  style={{
                    padding: "10px",
                    height: "60%",
                    width: "95%",
                    border: "1px solid rgba(163,163,163,0.5)",
                    borderRadius: "4px",
                    backgroundColor: "rgb(242, 242, 242)",
                  }}
                />
              </Grid>
              <Grid
                item
                xs={2}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <IconButton
                  className={classes.colorBlue}
                  style={{
                    backgroundColor: "blue",
                    margin: "3px",
                    height: "fit-content",
                  }}
                >
                  <SendIcon
                    fontSize="medium"
                    style={{
                      color: "white",
                    }}
                  />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </ThemeProvider>
      </div>
    </React.Fragment>
  );
};
