import './App.css';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/common/header/Header'
import Footer from './components/common/footer/Footer'
import LogIn from './components/auth/LogIn/LogIn';
import SignUp from './components/auth/SignUp/SignUp';
import ResetPassword from './components/auth/LogIn/ResetPassword/ResetPassword';
import PropertyListing from './components/property/PropertyListing/PropertyListing';
import Profile from './components/user/Profile/Profile';
import Verification from './components/user/verification/Verification';
import Hero from './components/common/Hero/Hero';
import Map from './components/marketplace/map/Map';
import Homes from './components/marketplace/homes/Homes';
import { LoadScript } from "@react-google-maps/api";
import PrivateRoute from './components/routes/PrivateRoute';
import ListedProperties from './components/user/ListedProperties/ListedProperties';
import NotFoundPage from './components/common/NotFoundPage/NotFound';

const libraries = ['places'];
function App() {
  const location = useLocation();
  const currentUser = useSelector(state => state.user.currentUser);
  const username = currentUser?.others?.username || currentUser?.username
  const showFooter = location.pathname !== '/homes';
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={libraries}>
      <Header />
      <Routes>
        <Route path="/" exact={true} element={<Hero />} />
        <Route path="/login" exact={true} element={<LogIn />} />
        <Route path="/signup" exact={true} element={<SignUp />} />
        <Route path="/reset-password" exact={true} element={<ResetPassword />} />
        <Route path="/homes" exact={true} element={<Homes />} />
        <Route path="/maps" exact={true} element={<Map />} />
        <Route path="/verification" exact={true} element={<Verification />} />
        <Route element={<PrivateRoute />}>
          <Route path="/property-listing" exact={true} element={<PropertyListing />} />
          <Route path="/listed-properties" element={currentUser ? <ListedProperties username={username} /> : <Navigate to="/login" replace />} />
          <Route exact path='/profile' element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {showFooter && <Footer />}
    </LoadScript>
  );
}

export default App;
