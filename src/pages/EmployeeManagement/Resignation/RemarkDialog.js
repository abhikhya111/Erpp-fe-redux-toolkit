import React from "react";
import {
  Typography,
  IconButton
} from "@material-ui/core";
import "react-phone-input-labelled/dist/style.css";

import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider
} from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";



function RemarkDialog(props) {

  console.log(props.resign_data)

  const handleCloseDialog = () => {
    props.closeForm();
  };

  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  // const parseDateTime = (date_time) =>{
  //   let date_time_parsed = new Date(date_time); 
  //   console.log(date_time_parsed)

  //   return date_time_parsed
  // }

  if (props.resign_data){
    return (
      <ThemeProvider theme={theme}>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "10px"
            }}
          >
            <Typography
              variant="h5"
              // className = {classes.colorDarkBlue}
              style={{
                fontWeight: "600",
                display: "flex",
                alignItems: "center"
              }}
            >
              Comment
            </Typography>
  
            <IconButton
              aria-label="close"
              onClick={handleCloseDialog}
              style={{
                margin: "0",
                padding: "0",
                color: "black"
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
  
          <hr></hr>
  
          <div 
            style={{ 
              // margin: "100px 10px 0px, 10px",
              margin:"20px",
              padding: "15px",
              borderRadius: "5px",
              border: "2px solid lightgrey",
              display: "flex", 
              flexDirection: "column"
  
              }}
          >
  
            <Typography 
              variant = "h6"
              style={{
                color: "#1F299C", 
                fontWeight:"800",
                padding:"10px 0px"
              }}
            >
              
              {props.resign_data.user_id && props.resign_data.user_id.first_name} {" "}
              {props.resign_data.user_id && props.resign_data.user_id.last_name} {" "}
              ({props.resign_data.user_id && props.resign_data.user_id.emp_code}) 
              
              {/* Akash Vishwakarma (E123456789) */}
            </Typography>
  
  
            <Typography
              variant = "body1"
            >
              {props.resign_data.leaving_comment}
            </Typography>
  
            <Typography
              variant = "subtitle2"
              style={{
                marginTop:"5px",
                color:"grey",
                paddingTop:'20px'
              }}
            >
              {/* 18-09-2021 10:00AM */}
              { (props.resign_data.created_at).substring(8,10)}-{(props.resign_data.created_at).substring(5,7)}-{(props.resign_data.created_at).substring(0,4)}
            </Typography>
          </div>
  
        </div>
      </ThemeProvider>
    );
  } else {
    return(<></>);
  }

}

export default RemarkDialog;
