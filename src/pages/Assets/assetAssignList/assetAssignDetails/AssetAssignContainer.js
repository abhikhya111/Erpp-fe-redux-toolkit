import * as React from "react";
import {
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import "@fontsource/roboto";
// import useAuth from "hooks/useAuth";
import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { useAssetStyles } from "../../Style";
import { UserAssets } from "../../UserAssets";
import rows1 from "../../Dialogs/rows.json";
import AllAssetContainer from './index'


export const AssetAssignDetailsContainer = props => {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  const classes = useAssetStyles();

  // const [selectedSchedule, setSelectedSchedule] = React.useState("");
  // const auth = useAuth();
  // const [isLoading, setIsLoading] = React.useState(false);
  const [showUserAssets, setShowUserAssets] = React.useState(true);
  const user = {}

  React.useEffect(() => {
    // API call goes here
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const [rows] = React.useState(rows1);

  return (
    <React.Fragment>
      <div className="root">
        <ThemeProvider theme={theme}>
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: props.isDrawerOpen
            })}
          >
            {showUserAssets && (
              <div>
                <Typography
                  style={{
                    textAlign: "left",
                    marignBottom: "20px",
                    minWidth: "230px"
                  }}
                >
                  Home {">"} Asset Management
                </Typography>

                <AllAssetContainer/>
                
              </div>
            )}
            {!showUserAssets && (
              <UserAssets {...{ user, rows, setShowUserAssets }} />
            )}
          </main>
        </ThemeProvider>
      </div>
    </React.Fragment>
  );
};
