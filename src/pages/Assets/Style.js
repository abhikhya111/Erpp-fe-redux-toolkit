import { makeStyles } from "@material-ui/core";

const drawerWidth = 240;

export const useAssetStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "#f7f8fc",
    height: "100vh",
  },
  margin: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    width: "90%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  nameTagContainer: {
    width: "40px",
    display: "flex",
    justifyContent: "flex-start",
    paddingTop: "8px",
    // paddingLeft: "15px",
  },
  nameTag: {
    width: "30px",
    height: "30px",
    fontSize: "1em",
    borderRadius: "50%",
    backgroundColor: "purple",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
  dot: {
    display: "inline-block",
    width: "10px",
    height: "10px",
    borderRadius: "50%",
  },
  colorBlue: {
    color: "rgb(31,41,156)",
  },
  backdrop: {
    zIndex: 9999,
    color: "#fff",
  },
  colorMustard: {
    color: "rgb(225, 173, 1)",
  },
  colorOrange: {
    color: "rgb(240, 74, 0)",
  },
  tooltip: {
    borderRadius: "18px",
    backgroundColor: "white",
  },
  colorBlack: {
    color: "black",
  },
  tableHeadRow: {
    backgroundColor: "rgb(242, 242, 242)",
    border: "1px solid rgba(163,163,163,0.5)",
    borderRadius: "6px 6px 0px 0px",
    alignContent: "center",
  },
  tableHeadCell: {
    padding: "16px",
    lineHeight: "1.5rem",
  },
  tableRow: {
    border: "1px solid rgba(163,163,163,0.5)",
    marginTop: "10px",
    height: "2cm",
    alignContent: "center",
  },
  fontWeight500: {
    fontWeight: "500",
  },
  tableRowCell: {
    padding: "16px",
  },
  alignLeft: {
    textAlign: "left",
  },
  assetRowIcon: {
    marginRight: "10px",
    height: "35px",
    minWidth: "35px",
    padding: "0 !important",
  },
  alignCenter: {
    alignItems: "center",
  },
  positionAbsolute: {
    position: "absolute",
  },
  scrollBar: {
    display: "block",
    width: "10em",
    overflowY: "auto",
    height: "2em",
    background: "#000",
  },
}));
