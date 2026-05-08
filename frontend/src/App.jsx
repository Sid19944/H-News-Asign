import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
const Home = lazy(() => import("./pages/home"));
const Register = lazy(() => import("./components/auth/Register"));
const Login = lazy(() => import("./components/auth/Login"));
const Bookmarks = lazy(() => import("./pages/Bookmarks"));
const Navbar = lazy(() => import("./components/Navbar"));
const Profile = lazy(() => import("./pages/Profile"));
import { useEffect } from "react";

function App() {
  const { getCurrUser } = useAuth();
  useEffect(() => {
    getCurrUser();
  }, []);
  return (
    <div className="h-screen flex flex-col">
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <div className="flex-1 min-h-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/bookmarks"
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <Bookmarks />
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <Register />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/profile"
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <Profile />
              </Suspense>
            }
          />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
