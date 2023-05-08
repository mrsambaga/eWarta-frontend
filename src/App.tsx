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
import { RootState } from "./store/IndexStore";
import Unauthenticated from "./pages/Unauthenticated/Unauthenticated";
import NotFound from "./pages/NotFound/NotFound";
import Detail from "./pages/Detail/Detail";
import AdminLogin from "./pages/Admin/AdminLogin/AdminLogin";
import AdminHome from "./pages/Admin/AdminHome/AdminHome";
import AdminPost from "./pages/Admin/AdminPost/AdminPost";
import AdminCreatePost from "./pages/Admin/AdminCreatePost/AdminCreatePost";
import AdminEditPost from "./pages/Admin/AdminEditPost/AdminEditPost";
import Profile from "./pages/Profile/Profile";
import HomeSubcsription from "./pages/Subscription/HomeSubscription/HomeSubcsription";
import PurchaseSubscription from "./pages/Subscription/PurchaseSubscription/PurchaseSubscription";
import MySubscription from "./pages/Subscription/MySubscription/MySubscription";

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

  const AdminRoutes = () => {
    const isAdminAuthenticated: boolean = useSelector(
      (state: RootState) => state.authAdmin.isAdminAuthenticated
    );

    if (!isAdminAuthenticated) {
      return <Navigate to={"/unauthenticated"} replace />;
    }
    return <Outlet />;
  };

  const PublicRoutes = () => {
    const isAuthenticated: boolean = useSelector(
      (state: RootState) => state.auth.isAuthenticated
    );
    const isAdminAuthenticated: boolean = useSelector(
      (state: RootState) => state.authAdmin.isAdminAuthenticated
    );

    if (isAuthenticated) {
      <Navigate to="/" replace />;
    } else if (isAdminAuthenticated) {
      <Navigate to="/admin/home" replace />;
    }

    return <Outlet />;
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route element={<Navbar />}>
            <Route element={<PublicRoutes />}>
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Home />} />
              <Route path="/news/:id" element={<Detail />} />
              <Route path="/test" element={<TestPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/subscription" element={<HomeSubcsription />} />
              <Route
                path="/subscription/purchase"
                element={<PurchaseSubscription />}
              />
              <Route
                path="/subscription/my-subscription"
                element={<MySubscription />}
              />
            </Route>
            <Route element={<AdminRoutes />}>
              <Route path="/admin/home" element={<AdminHome />} />
              <Route path="/admin/posts" element={<AdminPost />} />
              <Route path="/admin/posts/create" element={<AdminCreatePost />} />
              <Route path="/admin/posts/edit/:id" element={<AdminEditPost />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />}></Route>
          <Route path="/unauthenticated" element={<Unauthenticated />}></Route>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
