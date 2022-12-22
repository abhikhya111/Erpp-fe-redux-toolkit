import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography
} from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { useAssetStyles } from "../Style";

export const ImageCardRows = props => {
  const classes = useAssetStyles();
  const { openDialog, selectedAsset } = props;

  return (
    <Grid container spacing={3} style={openDialog}>
      {selectedAsset.images.map((image, idx, { length }) => {
        return (
          <Grid item xs={6}>
            <Card variant="outlined">
              <CardMedia component="img" height="194" image={image.img} />
              <hr
                style={{
                  margin: "1px 0"
                }}
              ></hr>
              <CardContent
                style={{
                  display: "flex",
                  padding: "12px 14px"
                }}
              >
                <Typography
                  variant="body1"
                  style={{
                    fontWeight: "300",
                    width: "50%",
                    textAlign: "left"
                  }}
                >
                  {image.imgName}
                </Typography>

                <CardActions
                  style={{
                    padding: "0",
                    width: "50%",
                    justifyContent: "flex-end"
                  }}
                >
                  <IconButton
                    variant="primary"
                    style={{
                      padding: "0",
                      justifyContent: "flex-end"
                    }}
                    className={classes.colorBlack}
                  >
                    <DeleteOutlinedIcon />
                  </IconButton>
                </CardActions>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};
