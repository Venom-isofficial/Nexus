import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home, bookmark, wallet, trendingUp, person } from 'ionicons/icons';
import Home from './pages/Home';
import Bookmarks from './pages/Bookmarks';
import Finance from './pages/Finance';
import Invest from './pages/Invest';
import Profile from './pages/Profile';
import AssetDetail from './pages/AssetDetail';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import SplashScreen from './components/SplashScreen';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider, useAuth } from './context/AuthContext';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/custom.css';

setupIonicReact();

const PrivateRoute: React.FC<{ component: React.FC<any>; path: string; exact?: boolean }> = ({ component: Component, ...rest }) => {
  const { user, profile, loading } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (loading) return null;
        if (!user) return <Redirect to="/login" />;
        // If not onboarding route, and user profile exists but onboarding is false, redirect to onboarding
        if (rest.path !== '/onboarding' && profile && profile.onboardingComplete === false) {
          return <Redirect to="/onboarding" />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

const MainTabs: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <PrivateRoute exact path="/app/home" component={Home} />
        <PrivateRoute exact path="/app/bookmarks" component={Bookmarks} />
        <PrivateRoute exact path="/app/finance" component={Finance} />
        <PrivateRoute exact path="/app/invest" component={Invest} />
        <PrivateRoute exact path="/app/finance/:ticker" component={AssetDetail} />
        <PrivateRoute exact path="/app/profile" component={Profile} />
        <Route exact path="/app">
          <Redirect to="/app/home" />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom" className="pill-tab-bar">
        <IonTabButton tab="home" href="/app/home">
          <IonIcon aria-hidden="true" icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="bookmarks" href="/app/bookmarks">
          <IonIcon aria-hidden="true" icon={bookmark} />
          <IonLabel>Bookmarks</IonLabel>
        </IonTabButton>
        <IonTabButton tab="finance" href="/app/finance">
          <IonIcon aria-hidden="true" icon={wallet} />
          <IonLabel>Finance</IonLabel>
        </IonTabButton>
        <IonTabButton tab="invest" href="/app/invest">
          <IonIcon aria-hidden="true" icon={trendingUp} />
          <IonLabel>Invest</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profile" href="/app/profile">
          <IonIcon aria-hidden="true" icon={person} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};



const AppContent: React.FC = () => {
  const { loading } = useAuth();

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/onboarding" component={Onboarding} />
        <Route path="/app" component={MainTabs} />
        <Route exact path="/">
          <Redirect to="/app/home" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

const App: React.FC = () => (
  <IonApp>
    <ErrorBoundary>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ErrorBoundary>
  </IonApp>
);

export default App;
