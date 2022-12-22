import { makeStyles } from "@material-ui/core";

const drawerWidth = 240;

export const useLeavesAttendanceHRStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    backgroundColor: "#f7f8fc",
    height: "100vh"
  },
  ProfileCircle: {
    height: "50px",
    width: "50px",
    backgroundColor: "#e0eaf8",
    borderRadius: "50%",
    display: "flex",
    flexWrap: "wrap",
    margin: "0",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "30px"
  },
  listContainer: {
    backgroundColor: "#FFFFFF",
    padding: "15px",
    // cursor: "pointer",
    // width: "100%",
    // height: "100%",
    borderRadius: "10px",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "#dfdfdf",
    // display: "flex",
    // flexDirection: "column",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: "20px 0px 0px 0px",
    textAlign: "left"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  margin: {
    margin: theme.spacing(1)
  },
  formControl: {
    margin: theme.spacing(1),
    width: "90%"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
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
  backdrop: {
    zIndex: 9999,
    color: "#fff"
  },
  dotPink: {
    height: "15px",
    width: "15px",
    backgroundColor: "#e9594a",
    borderRadius: "50%",
    display: "inline-block"
  },
  dotBlue: {
    height: "15px",
    width: "15px",
    backgroundColor: "#0067b8",
    borderRadius: "50%",
    display: "inline-block"
  },
  dotGreen: {
    height: "15px",
    width: "15px",
    backgroundColor: "green",
    borderRadius: "50%",
    display: "inline-block"
  },
  colorBlue: {
    color: "rgb(31,41,156)"
  },
  colorDarkBlue: {
    color: "rgb(22,33,91)"
  }
}));
