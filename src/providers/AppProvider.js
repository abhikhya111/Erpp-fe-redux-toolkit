import * as React from "react";
import AppContext from "../contexts/AppContext";

function useProvideApp() {
  const [appLoading, setAppLoading] = React.useState(false);

  const showLoader = () => setAppLoading(true);
  const hideLoader = () => setAppLoading(false);

  return {
    appLoading,
    showLoader,
    hideLoader,
  };
}

export default function AppProvider(props) {
  const app = useProvideApp();
  return (
    <AppContext.Provider value={app}>{props.children}</AppContext.Provider>
  );
}
