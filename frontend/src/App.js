import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Customer from "./pages/Customer";
import Dashboard from "./pages/Dashboard";
import Detail from './pages/DetailPage';
import BikeSearch from './pages/BikeSearch';
import AddNewPage from './pages/AddNewCustomer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import ProtectedRoutes from "./ProtectedRoutes";
import { Provider } from 'react-redux'
import store from './store'

function App() {

  return (
      <Provider store={store}>
    <CookiesProvider>
      <Router>
            <Switch>
              <Route exact path="/">
                <Landing />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/search">
                <BikeSearch/>
              </Route>
              <Route path="/customer/:qr_code">
                <Customer />
              </Route>
              <ProtectedRoutes path="/dashboard">
                <Dashboard />
              </ProtectedRoutes>
              <ProtectedRoutes path="/details/:id">
                <Detail/>
              </ProtectedRoutes>
              <ProtectedRoutes path="/add-new-bike">
                <AddNewPage/>
              </ProtectedRoutes>
            </Switch>
          </Router>
    </CookiesProvider>
      </Provider>
  );
}

export default App;
