import { Redirect, Route, Switch } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Balance from './pages/Balance';
import Transfer from './pages/Transfer';
import Statements from './pages/Statements';
import Profile from './pages/Profile';
import SideMenu from './components/SideMenu';
import { AuthProvider, AuthContext } from './context/AuthContext';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';
import './theme/variables.css';

setupIonicReact();

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  return (
    <AuthContext.Consumer>
      {({ isAuthenticated }) => (
        <Route
          {...rest}
          render={props =>
            isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
          }
        />
      )}
    </AuthContext.Consumer>
  );
};

const App: React.FC = () => (
  <IonApp>
    <AuthProvider>
      <IonReactRouter>
        <SideMenu />
        <div id="main">
          <IonRouterOutlet>
            <Switch>
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/balance" component={Balance} />
              <PrivateRoute exact path="/transfer" component={Transfer} />
              <PrivateRoute exact path="/statements" component={Statements} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
            </Switch>
          </IonRouterOutlet>
        </div>
      </IonReactRouter>
    </AuthProvider>
  </IonApp>
);

export default App;