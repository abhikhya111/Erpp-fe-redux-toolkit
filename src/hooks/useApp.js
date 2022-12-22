import * as React from "react";
import AppContext from "contexts/AppContext";

export default function useAuth() {
  return React.useContext(AppContext);
}
