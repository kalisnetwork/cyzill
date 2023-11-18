import './App.css';
import { Route, Routes } from 'react-router-dom';

import Hero from './components/common/Hero/Hero'
import Header from './components/common/header/Header'
import Footer from './components/common/footer/Footer'
import LogIn from './components/auth/LogIn/LogIn';
import SignUp from './components/auth/SignUp/SignUp';
import ResetPassword from './components/auth/LogIn/ResetPassword/ResetPassword';
import PropertyCard from './components/property/PropertyCard/PropertyCard';
import PropertyListing from './components/property/PropertyListing/PropertyListing';




function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/homes" element={<PropertyCard />} />
        <Route path="/property-listing" element={<PropertyListing />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
