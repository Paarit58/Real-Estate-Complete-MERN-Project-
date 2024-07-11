import { useState } from "react";
import Header from "./component/Header.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import SignInPage from "./pages/SignInPage.jsx";

import SignUpPage from "./pages/SignUpPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import PrivateRoute from "./component/PrivateRoute.jsx";
import UpdatePasswordPage from "./pages/UpdatePasswordPage.jsx";
import CreateListingPage from "./pages/CreateListingpage.jsx";
import ListingPage from "./pages/ListingPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import EditListingPage from "./pages/EditListingPage.jsx";

function App() {
  console.log(typeof SignInPage);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
        </Route>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/listing/:listingId" element={<ListingPage />} />
        <Route path="/search" element={<SearchPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/update-password" element={<UpdatePasswordPage />} />
          <Route path="/create-listing" element={<CreateListingPage />} />
          <Route
            path="/edit-listing/:listingId"
            element={<EditListingPage />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
