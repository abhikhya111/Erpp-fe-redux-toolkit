import React from "react";
import { Paper, Typography } from "@material-ui/core";

export const KeyMetric = (props) => {
  return (
    <Paper
      style={{
        backgroundColor: props.data.color,
        padding: "1px 0px 0px 10px",
        minWidth: "170px",
      }}
    >
      <div
        style={{
          height: "190px",
          position: "relative",
        }}
      >
        <h2 style={{ color: "white", textAlign: "left", marginBottom: "0px" }}>
          {props.data.title}
        </h2>
        <div
          style={{
            color: "white",
            textAlign: "left",
            marginTop: "0px",
          }}
        >
          {props.data.subTitle}
        </div>
        <div
          style={{
            position: "absolute",
            right: "10px",
            bottom: "10px",
            color: "white",
            fontWeight: "100",
            fontSize: ".8em",
          }}
        >
          <Typography
            variant='h2'
            component={"span"}
            style={{
              fontWeight: "700",
            }}
          >
            {props.data.value}
          </Typography>
          <br></br>
          <span>{props.data.description}</span>
        </div>
      </div>
    </Paper>

    //     <div style={{ backgroundColor: props.data.color,
    //             marginTop: "0px 10px 0px, 10px",
    //             padding: "15px",
    //             height: "100%",
    //             width: "100%",
    //             minWidth:'170px',
    //             cursor: "pointer",
    //             borderRadius: "10px",
    //             display: "flex", flexDirection: "column" }}>
    //     <h2 style={{ margin: "0px", color: "white", textAlign: "left", fontSize: "25px" }}>
    //         {props.data.title}
    //     </h2>
    //     <p style={{ margin: "0px", color: "white", textAlign: "left", fontSize: "15px" }}>{props.data.subTitle}</p>
    //     <h1 style={{
    //         margin: "30px 0px 0px 0px",
    //         color: "white",
    //         float: "right",
    //         fontSize: "65px",
    //         flex: "auto",
    //         placeSelf: "flex-end",
    //         height: "60px"
    //         }}>
    //         {props.data.value}
    //     </h1>
    //     <div>
    //         <p style={{
    //             marginTop: "0px",
    //             color: "white",
    //             float: "right"
    //             }}>{props.data.description}</p>
    //     </div>
    // </div>
  );
};
