import React from "react";
import "@fontsource/roboto";
import {
  Button,
  Grid,
  Input,
  Backdrop,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Container,
  CircularProgress
} from "@material-ui/core";
// import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
// import DateFnsUtils from '@date-io/date-fns';
import useAuth from "hooks/useAuth";
import clsx from "clsx";
// import Api from "../../../hooks/AjaxAction";
import axios from "axios";
import { useDocumentsStyles } from "./style";

const mockedDocumentsData = [
  {
    userName: "Akash Vishwakarma",
    userId: "E123456789",
    designation: "Software Engineer",
    siteSampleName: "Site Sample Name",
    isApproved: false,
    pendingApproval: ["Education", "Address"]
  },
  {
    userName: "Akash Vishwakarma",
    userId: "E123456789",
    designation: "Software Engineer",
    siteSampleName: "Site Sample Name",
    isApproved: true,
    pendingApproval: []
  }
];

export const Documents = props => {
  const classes = useDocumentsStyles();
  const auth = useAuth();

  const [isLoading] = React.useState(false);
  const [documents, setDocuments] = React.useState([]);
  console.log(documents);
  const getDocuments = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/leaves/getAllLeaves`,
        {
          headers: {
            token: auth.token
          }
        }
      );

      if (response.status === 200) {
        const data = response.data.data;
        setDocuments(data);
        console.log(data);
      }
    } catch (e) {
      if (e.response) {
        console.log("Error >", e.response);
      }
    }
  };

  React.useEffect(() => {
    // API call goes here
    getDocuments(auth.user._id);
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container>
      <div className={classes.root}>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: props.isDrawerOpen
          })}
        >
          <Grid
            xs={12}
            md={6}
            lg={12}
            direction="row"
            style={{ textAlign: "left", padding: "0px 0px 20px 10px" }}
          >
            <Grid
              item
              xs={12}
              md={6}
              lg={12}
              style={{ display: "flex", flexDirection: "row" }}
            >
              <h3>
                Home {">"} Employee Management {">"} Documents
              </h3>
            </Grid>

            <Grid
              container
              xs={12}
              md={12}
              lg={12}
              style={{ marginTop: "50px" }}
            >
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  margin: "100px 10px 0px, 10px",
                  padding: "15px",
                  height: "100%",
                  width: "100%",
                  borderRadius: "5px",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <Grid
                  container
                  xs={12}
                  md={12}
                  lg={12}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <p
                      style={{
                        color: "#1F299C",
                        fontSize: "35px",
                        margin: "10px 0px 20px 0px"
                      }}
                    >
                      Documents (02)
                    </p>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <Grid item xs={12} md={12} lg={3} style={{}}>
                      <FormControl style={{ width: "250px" }}>
                        <InputLabel id="demo-simple-select-label">
                          Last Week
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Age"
                        >
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12} lg={7} style={{}}>
                      <FormControl style={{ width: "250px" }}>
                        <InputLabel id="demo-simple-select-label">
                          Selected Site
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Age"
                        >
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} lg={2} style={{}}>
                      <Input placeholder="Search" />
                    </Grid>
                  </Grid>

                  {mockedDocumentsData.map((doc, idx) => {
                    return (
                      <Grid
                        key={idx}
                        container
                        xs={12}
                        md={12}
                        lg={12}
                        style={{
                          margin: "30px 0px 0px 0px",
                          display: "flex",
                          flexDirection: "row"
                        }}
                      >
                        <div className={classes.listContainer}>
                          <Grid
                            container
                            xs={12}
                            md={12}
                            lg={12}
                            style={{ display: "flex", flexWrap: "nowrap" }}
                          >
                            <Grid
                              item
                              xs={12}
                              md={10}
                              lg={1}
                              style={{ flex: "0 0 4.16666%" }}
                            >
                              <div className={classes.ProfileCircle}>
                                <p style={{ margin: "0", color: "#1F299C" }}>
                                  NL
                                </p>
                              </div>
                            </Grid>

                            <Grid
                              container
                              xs={12}
                              md={10}
                              lg={6}
                              style={{ marginLeft: "15px" }}
                            >
                              <Grid
                                container
                                xs={12}
                                md={10}
                                lg={12}
                                style={{}}
                              >
                                <Grid item xs={12} md={10} lg={12}>
                                  <h2
                                    style={{
                                      marginTop: "0",
                                      marginBottom: "0",
                                      fontSize: "15px"
                                    }}
                                  >
                                    {doc.userName} ({doc.userId})
                                  </h2>
                                </Grid>
                              </Grid>
                              <Grid item xs={12} md={10} lg={11}>
                                <Grid item xs={12} md={10} lg={12}>
                                  <p
                                    style={{
                                      marginTop: "0",
                                      marginBottom: "0"
                                    }}
                                  >
                                    {doc.designation} | {doc.siteSampleName}
                                  </p>
                                </Grid>
                              </Grid>
                            </Grid>

                            <Grid
                              container
                              xs={12}
                              md={10}
                              lg={6}
                              style={{
                                marginLeft: "15px",
                                display: "flex",
                                flexDirection: "column",
                                placeContent: "flex-end",
                                alignItems: "flex-end"
                              }}
                            >
                              <Grid
                                item
                                xs={12}
                                md={10}
                                lg={8}
                                style={{
                                  alignItems: "center",
                                  justifyContent: "center",
                                  display: "flex",
                                  paddingRight: "20px"
                                }}
                              >
                                <p
                                  style={{
                                    marginTop: "0",
                                    marginBottom: "0",
                                    color: doc.isApproved ? "green" : "#1F299C"
                                  }}
                                >
                                  {doc.isApproved
                                    ? "Approved"
                                    : `Pending For Approval (${doc.pendingApproval.join()})`}
                                </p>
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                md={10}
                                lg={8}
                                style={{
                                  alignItems: "center",
                                  justifyContent: "center",
                                  display: "flex"
                                }}
                              >
                                <Button
                                  style={{
                                    color: "#FFFFFF",
                                    borderColor: "#1F299C",
                                    backgroundColor: "#1F299C"
                                  }}
                                  variant="outlined"
                                >
                                  View Details
                                </Button>
                              </Grid>
                            </Grid>
                          </Grid>
                        </div>
                      </Grid>
                    );
                  })}
                </Grid>
              </div>
            </Grid>
          </Grid>
        </main>
      </div>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};
