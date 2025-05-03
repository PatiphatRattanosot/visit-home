import "./App.css";
import { Routes, Route, Navigate } from "react-router";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./stores/auth.store";
import Landing from "./pages/Landing";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminPage from "./pages/Admin/Home";
import Personnel from "./pages/Admin/Personnel";
import YearManagement from "./pages/admin/Year";
import Status from "./pages/students/Status";
import SelfInfo from "./pages/students/self-info/SelfInfo";
import AddSelfInfoForm from "./pages/students/self-info/AddSelfInfoForm";
import UpdateSelfInfoForm from "./pages/students/self-info/UpdateSelfInfoForm";

function App() {
  const { user, userInfo, isLoading, signInSystem, signOutSystem } =
    useAuthStore();

  if (isLoading)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        Loading...
      </div>
    );

  return (
    <>
      <Navbar
        user={user}
        userInfo={userInfo}
        googleSignIn={signInSystem}
        logout={signOutSystem}
      />
      <div className="min-h-screen">
        <Routes>
          <Route
            path="/"
            element={
              userInfo?.role[0] === "Admin" ? (
                <Navigate to={"/admin"} />
              ) : userInfo?.role[0] === "Teacher" ? (
                <Navigate to={"/teacher"} />
              ) : userInfo?.role[0] === "Student" ? (
                <Navigate to={"/student"} />
              ) : (
                <Landing />
              )
            }
          />
          {/* Admin */}
          <Route
            path="admin"
            element={!userInfo?.role.includes("Admin") && <Navigate to={"/"} />}
          >
            <Route index element={<AdminPage />} />
            <Route path="personnel" element={<Personnel />} />
            <Route path="year" element={<YearManagement />} />
          </Route>
          {/* Student */}
          <Route path="student">
            <Route path="status" element={<Status />} />
            <Route path="self-info">
              <Route path="" element={<SelfInfo />} />
              <Route path="add" element={<AddSelfInfoForm />} />
              <Route path="update" element={<UpdateSelfInfoForm />} />
            </Route>
          </Route>
        </Routes>
      </div>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
