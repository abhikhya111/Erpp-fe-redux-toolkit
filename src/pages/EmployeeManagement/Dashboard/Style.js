import { makeStyles } from "@material-ui/core";

const drawerWidth = 240;

export const useDasboardStyles = makeStyles((theme) => ({
    root: {
        // display: "flex",
        backgroundColor: "#f7f8fc",
        height: "100vh"
    },
    dotPink: {
      height: "15px",
      width: "15px",
      backgroundColor: "#fe4589",
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
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    margin: {
        margin: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        width: '90%',
    },
      selectEmpty: {
        marginTop: theme.spacing(2),
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
        color: "#fff",
      }
}));
