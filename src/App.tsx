import React from "react";
import "./App.css";
import Navbar from "./components/organisms/Navbar/Navbar";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Footer from "./components/organisms/Footer/Footer";
import { useSelector } from "react-redux";
import TestPage from "./pages/TestPage/TestPage";
import { RootState } from "./store/Index";
import Unauthenticated from "./pages/Unauthenticated/Unauthenticated";

function App() {
  const PrivateRoutes = () => {
    const isAuthenticated: boolean = useSelector(
      (state: RootState) => state.auth.isAuthenticated
    );

    if (!isAuthenticated) {
      return <Navigate to={"/unauthenticated"} replace />;
    }
    return <Outlet />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<TestPage />} />
          </Route>
        </Route>
        <Route path="*" element={<h1>404 : Page Not Found</h1>}></Route>
        <Route path="/unauthenticated" element={<Unauthenticated />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
