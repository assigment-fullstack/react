import { useState } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectRoute from "./hooks/protectRoute";
import Layout from "./components/Layout";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./pages/NotFound";
import { GoogleOAuthProvider } from "@react-oauth/google";
import SignUp from "./pages/signup";

function App() {
  return (
    <div>
      <GoogleOAuthProvider clientId="154586784948-llp5irti4qcc37h2a0b6j7lr5fddr2k1.apps.googleusercontent.com">
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectRoute />}>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
