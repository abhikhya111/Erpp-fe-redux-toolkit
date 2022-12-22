import React, { useRef, useEffect } from "react";
import styled from "styled-components/macro";
import clsx from "clsx";
// import useAuth from "hooks/useAuth";
import jspreadsheet from "jspreadsheet-ce";
import "../../../../node_modules/jspreadsheet-ce/dist/jspreadsheet.css";
import { Button, makeStyles, Grid, Paper } from "@material-ui/core";
import "./Employee.css";
const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: "center",
    borderRadius: "6px "
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    background: "#ffffff",
    color: "#1F299C"
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 0
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: 0
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: drawerWidth
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    border: "2px solid #FFFFFF"
  }
}));
const Employees = function (props) {
  // const auth = useAuth();
  const classes = useStyles();
  const jRef = useRef(null);
  const options = {
    data: [[]],
    minDimensions: [6, 10],

    rowResize: true,
    columnDrag: true,
    colHeaders: [
      "Employee Name",
      "Joined On",
      "Left On",
      "Current Project(s)",
      "Role",
      "Cancel Request"
    ],

    csvHeaders: true,
    tableOverflow: true,
    colWidths: [200, 200, 200, 200, 100, 200],

    columns: [
      { type: "text" },
      {
        type: "calendar",
        options: { format: "DD/MM/YYYY" }
      },
      {
        type: "calendar",
        options: { format: "DD/MM/YYYY" },
        width: "100"
      },
      { type: "text" },
      { type: "autocomplete", source: ["Employee", "HR", "Admin"] },
      { type: "text" }
    ],
    toolbar: [
      {
        type: "i",
        content: "undo",
        onclick: function () {
          jRef.current.jexcel.undo();
        }
      },
      {
        type: "i",
        content: "redo",
        onclick: function () {
          jRef.current.jexcel.redo();
        }
      },
      {
        type: "i",
        content: "save",
        onclick: function () {
          jRef.current.jexcel.download();
        }
      },
      {
        type: "select",
        k: "font-family",
        v: ["Arial", "Verdana"]
      },
      {
        type: "select",
        k: "font-size",
        v: [
          "9px",
          "10px",
          "11px",
          "12px",
          "13px",
          "14px",
          "15px",
          "16px",
          "17px",
          "18px",
          "19px",
          "20px"
        ]
      },
      {
        type: "i",
        content: "format_align_left",
        k: "text-align",
        v: "left"
      },
      {
        type: "i",
        content: "format_align_center",
        k: "text-align",
        v: "center"
      },
      {
        type: "i",
        content: "format_align_right",
        k: "text-align",
        v: "right"
      },
      {
        type: "i",
        content: "format_bold",
        k: "font-weight",
        v: "bold"
      },
      {
        type: "color",
        content: "format_color_text",
        k: "color"
      },
      {
        type: "color",
        content: "format_color_fill",
        k: "background-color"
      }
    ]
  };

  useEffect(() => {
    if (!jRef.current.jspreadsheet) {
      jspreadsheet(jRef.current, options);
    }
    // jRef.current.jexcel.hideIndex();
  }, [options]);

  // const addRow = () => {
  //   jRef.current.jexcel.insertRow();
  // };
  return (
    <Container>
      <div
        className={clsx(classes.content, {
          [classes.contentShift]: props.isDrawerOpen
        })}
      >
        <Grid item xs={12} md={12} lg={12}>
          <Paper className={classes.paper}>
            <div
              style={{
                padding: "0.5em"
              }}
            >
              <h2 style={{ color: "#1F299C", textAlign: "left" }}>
                My Employees
              </h2>
              <hr></hr>
              <div
                style={{
                  color: "#1F299C",
                  textAlign: "left",
                  padding: "12px",
                  display: "flex"
                }}
              ></div>
            </div>
            <Grid container>
              <Grid
                style={{
                  color: "#3D9E5A"
                }}
                item
                xs={2}
              >
                <span
                  style={{
                    color: "#3D9E5A",
                    fontSize: "68px",
                    fontWeight: "600"
                  }}
                >
                  45
                </span>
                <br></br>
                <span>Total working employes</span>
              </Grid>
              <Grid
                style={{
                  color: "#0373FF"
                }}
                item
                xs={2}
              >
                <span
                  style={{
                    color: "#0373FF",
                    fontSize: "68px",
                    fontWeight: "600"
                  }}
                >
                  5
                </span>
                <br></br>
                <span>Joined recently</span>
              </Grid>
              <Grid
                style={{
                  color: "#EE433C"
                }}
                item
                xs={2}
              >
                <span
                  style={{
                    color: "#EE433C",
                    fontSize: "68px",
                    fontWeight: "600"
                  }}
                >
                  2
                </span>
                <br></br>
                <span>Left recently</span>
              </Grid>
              <Grid style={{ margin: "48px 0px" }} item xs={6}>
                <Button
                  variant="contained"
                  style={{
                    color: "#1F299C",
                    border: "1px solid #1F299C",
                    backgroundColor: "white"
                  }}
                >
                  Cancel
                </Button>
                &nbsp; &nbsp; &nbsp; &nbsp;
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#1F299C", color: "white" }}
                >
                  Save changes
                </Button>
              </Grid>
            </Grid>
            <div ref={jRef} />
            <br></br>
            <br></br>
          </Paper>
        </Grid>
      </div>
    </Container>
  );
};
export default Employees;
