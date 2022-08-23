import Finance from "./Finance";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  return (
    <>
      {isLoading ? (
        <>
          <div>Loading...</div>
        </>
      ) : isAuthenticated ? (
        <Router>
          <Switch>
            <Route exact path="/" component={Finance} />
          </Switch>
        </Router>
      ) : (
        loginWithRedirect()
      )}
    </>
  );
}
