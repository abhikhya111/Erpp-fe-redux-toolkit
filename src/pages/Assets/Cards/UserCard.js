import * as React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import LocalPhoneOutlinedIcon from "@material-ui/icons/LocalPhoneOutlined";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import { useAssetStyles } from "../Style";

export const UserCard = (props) => {
  const classes = useAssetStyles();
  return (
    <div>
      <Card style={{ width: "430px" }}>
        <Grid
          style={{
            margin: "20px",
          }}
        >
          <Grid
            container
            style={{
              alignItems: "center",
            }}
          >
            <Grid container item xs={9}>
              <Typography
                className={classes.colorBlue}
                style={{
                  fontWeight: "600",
                  // padding: "0",
                  fontSize: "x-large",
                }}
              >
                {props.empName}
              </Typography>
            </Grid>
            <Grid
              xs={3}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <CardActions>
                <Button>
                  <FileCopyOutlinedIcon
                    className={classes.colorBlue}
                    fontSize="small"
                  />
                </Button>
              </CardActions>
            </Grid>
          </Grid>

          <CardContent
            style={{
              padding: "0",
            }}
          >
            <Grid container>
              <Grid container item xs={9}>
                <Typography
                  className={classes.colorBlue}
                  style={{
                    textAlign: "left",
                  }}
                >
                  {props.empRole},&nbsp;{props.empTeam}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>

          <CardContent
            style={{
              padding: "8px 0px 6px",
            }}
          >
            <Grid container>
              <Grid
                container
                item
                xs={1}
                style={{
                  display: "flex",
                }}
              >
                <MailOutlineIcon className={classes.colorMustard} />
              </Grid>
              <Grid
                container
                item
                xs={11}
                style={{
                  display: "flex",
                }}
              >
                <Typography className={classes.colorBlue}>
                  {props.email}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>

          {props.contactInfo.map((contact) => {
            return (
              <CardContent
                style={{
                  padding: "6px 0px",
                }}
              >
                <Grid container>
                  <Grid container item xs={1}>
                    <LocalPhoneOutlinedIcon className={classes.colorMustard} />
                  </Grid>
                  <Grid container item xs={11}>
                    <Typography className={classes.colorBlue}>
                      {contact}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            );
          })}

          <CardContent
            style={{
              padding: "6px 0px",
            }}
          >
            <Grid container>
              <Grid container item xs={1}>
                <RoomOutlinedIcon className={classes.colorMustard} />
              </Grid>
              <Grid container item xs={9}>
                <Typography
                  className={classes.colorBlue}
                  style={{
                    textAlign: "left",
                  }}
                >
                  {props.address}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
      </Card>
    </div>
  );
};
