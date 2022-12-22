import { makeStyles } from "@material-ui/core";
const drawerWidth = 240;

export const useDocumentsStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        backgroundColor: "#f7f8fc",
        height: "100vh"
    },
    ProfileCircle: {
      height: "60px",
      width: "60px",
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
      cursor: "pointer",
      width: "100%",
      height: "100%",
      borderRadius: "10px",
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: "#dfdfdf", 
      display: "flex",
      flexDirection: "column"
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
