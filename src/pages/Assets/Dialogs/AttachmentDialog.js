import {
  Box,
  Button,
  Grid,
  IconButton,
  Input,
  Typography,
} from "@material-ui/core";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { useAssetStyles } from "../Style";
import { ImageCardRows } from "../Cards/ImageCardRows";

export const AttachmentDialog = (props) => {
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
                <span>Filter</span>
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

          <Grid container direction="column">
            <Box sx={{ width: "100%", height: "90%" }} margin="20px 30px">
              <Grid
                container
                columnSpacing={3}
                direction="column"
                rowSpacing={1}
              >
                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    className={`${classes.fontWeight500} ${classes.colorBlue}`}
                  >
                    <span>Attachment *</span>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    style={{
                      backgroundColor: "rgb(242, 242, 242)",
                      margin: "8px 0",
                      padding: "40px 90px",
                      borderRadius: "4px",
                      height: "30px",
                    }}
                  >
                    <Grid container xs={12}>
                      <Grid item xs={6}>
                        <Typography
                          variant={"body1"}
                          style={{
                            padding: "5px 0",
                            textAlign: "end",
                            fontWeight: "100",
                            color: "rgb(77, 77, 77)",
                          }}
                        >
                          Drag & Drop Here,&nbsp;
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <label htmlFor="contained-button-file">
                          <Input
                            accept="image/*"
                            id="contained-button-file"
                            multiple
                            type="file"
                            style={{
                              display: "none",
                            }}
                          ></Input>
                          <Button
                            variant="text"
                            component="span"
                            className={classes.colorBlue}
                            style={{
                              padding: "5px 0",
                              fontWeight: "400",
                              outline: "0 !important",
                            }}
                          >
                            Or Browse File
                          </Button>
                        </label>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>

                {/* Show cards here */}
                <Grid
                  container
                  xs={12}
                  style={{
                    margin: "15px 0 ",
                  }}
                >
                  <ImageCardRows {...{ selectedAsset }} />
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid
            container
            xs={12}
            direction="column"
            style={{
              width: "100%",
              bottom: "0",
              position: "absolute",
              minHeight: "90",
            }}
          >
            <hr
              style={{
                width: "100%",
              }}
            ></hr>
            <Grid
              container
              xs={12}
              style={{
                margin: "10px 30px 0",
                width: "90%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                className={classes.colorBlue}
                variant="outlined"
                onClick={handleClose}
                style={{
                  marginRight: "15px",
                  borderColor: "rgb(31,41,156)",
                }}
              >
                Cancel
              </Button>
              <Button
                className={classes.colorBlue}
                variant="contained"
                style={{
                  color: "white",
                  backgroundColor: "rgb(31,41,156)",
                }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </ThemeProvider>
      </div>
    </React.Fragment>
  );
};
