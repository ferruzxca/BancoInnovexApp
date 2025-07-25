// src/App.tsx
import { Redirect, Route, Switch } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Balance from "./pages/Balance";
import Transfer from "./pages/Transfer";
import Accounts from "./pages/Accounts";
import Statements from "./pages/Statements";
import Transactions from "./pages/Transactions";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import FooterBar from "./components/FooterBar";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import "@ionic/react/css/core.css";
import "./theme/variables.css";

setupIonicReact();

const PrivateRoute = ({ children, ...rest }: any) => (
  <AuthContext.Consumer>
    {({ user }) => (
      <Route
        {...rest}
        render={({ location }) =>
          user ? children : <Redirect to="/login" />
        }
      />
    )}
  </AuthContext.Consumer>
);

const App: React.FC = () => {
  const location = window.location.pathname;
  const hideNav = location === "/login";

  return (
    <IonApp>
      <AuthProvider>
        <IonReactRouter>
          {!hideNav && <Navbar />}
          <div id="main">
            <IonRouterOutlet>
              <Switch>
                <Route exact path="/login">
                  <Login />
                </Route>
                <PrivateRoute exact path="/dashboard">
                  <Dashboard />
                </PrivateRoute>
                <PrivateRoute exact path="/transactions/:accountId">
                  <Transactions />
                </PrivateRoute>
                <PrivateRoute exact path="/transfer">
                  <Transfer />
                </PrivateRoute>
                <PrivateRoute exact path="/balance">
                  <Balance />
                </PrivateRoute>
                <PrivateRoute exact path="/profile">
                  <Profile />
                </PrivateRoute>
                <PrivateRoute exact path="/accounts">
                  <Accounts />
                </PrivateRoute>
                <PrivateRoute exact path="/statements">
                  <Statements />
                </PrivateRoute>
                <PrivateRoute exact path="/transactions">
                  <Transactions />
                </PrivateRoute>
                <Route exact path="/home">
                  <Home />
                </Route>
                <Route exact path="/">
                  <Redirect to="/login" />
                </Route>
              </Switch>
            </IonRouterOutlet>
          </div>
          {!hideNav && <FooterBar />}
        </IonReactRouter>
      </AuthProvider>
    </IonApp>
  );
};

export default App;