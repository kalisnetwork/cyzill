import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';

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
import Location from './components/property/PropertyListing/steps/Location';
import Details from './components/property/PropertyListing/steps/Details';
import Amenities from './components/property/PropertyListing/steps/Amenities';
import Description from './components/property/PropertyListing/steps/Description';
import ListedProperties from './components/user/ListedProperties/ListedProperties';

function App() {
  const location = useLocation();
  const showFooter = location.pathname !== '/homes';
  const libraries = ['places'];
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
        <Route path="/property-listing" exact={true} element={<PropertyListing />} />
        <Route path="/listed-properties" exact={true} element={<ListedProperties />} />
        <Route path="/location" exact={true} element={<Location />} />
        <Route path="/details" exact={true} element={<Details />} />
        <Route path="/amenities" exact={true} element={<Amenities />} />
        <Route path="/desc" exact={true} element={<Description />} />
        <Route element={<PrivateRoute />}>
          <Route exact path='/profile' element={<Profile />} />
        </Route>
      </Routes>
      {showFooter && <Footer />}
    </LoadScript>
  );
}

export default App;
