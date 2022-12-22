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
  const handleCloseDialog = () => {
    props.closeForm();
  };

  let theme = createTheme();
  theme = responsiveFontSizes(theme);

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
            style={{color: "#1F299C", fontWeight:"800"}}
          >
            Akash Vishwakarma (E123456789)
          </Typography>


          <Typography
            variant = "body1"
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </Typography>

          <Typography
            variant = "subtitle2"
            style={{
              marginTop:"5px",
              color:"grey"
            }}
          >
            18-09-2021 10:00AM
          </Typography>
        </div>

      </div>
    </ThemeProvider>
  );
}

export default RemarkDialog;
