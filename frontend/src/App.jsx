import "./App.css";
import { Routes, Route, Navigate } from "react-router";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./stores/auth.store";
import Landing from "./pages/Landing";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminPage from "./pages/Admin/Home";
import Personnel from "./pages/Admin/Personnel";
import Status from "./pages/students/Status";
import SelfInfo from "./pages/students/self-info/SelfInfo";
import AddSelfInfoForm from "./pages/students/self-info/AddSelfInfoForm";
import UpdateSelfInfoForm from "./pages/students/self-info/UpdateSelfInfoForm";
import VisitInfo from "./pages/students/VisitInfo";
import Relation from "./pages/students/relation/Relation";
import AddRelationForm from "./pages/students/relation/AddRelationForm";
import UpdateRelationForm from "./pages/students/relation/UpdateRelationForm";
import FamilyStatus from "./pages/students/family-status/FamilyStatus";
import AddFamilyStatusForm from "./pages/students/family-status/AddFamilyStatusForm";
import UpdateFamilyStatusForm from "./pages/students/family-status/UpdateFamilyStatusForm";

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
        </Route>
        {/* Student */}
        <Route
          path="student"
          element={!userInfo?.role.includes("Student") && <Navigate to={"/"} />}
        >
          <Route path="" element={<Status />} />
          <Route path="visit-info">
            <Route path="" element={<VisitInfo />} />
            <Route path=":year">
              <Route path="self-info">
                <Route path="" element={<SelfInfo />} />
                <Route path="add" element={<AddSelfInfoForm />} />
                <Route path="update" element={<UpdateSelfInfoForm />} />
              </Route>
              <Route path="relation">
                <Route path="" element={<Relation />} />
                <Route path="add" element={<AddRelationForm />} />
                <Route path="update" element={<UpdateRelationForm />} />
              </Route>
              <Route path="family-status">
                <Route path="" element={<FamilyStatus />} />
                <Route path="add" element={<AddFamilyStatusForm />} />
                <Route path="update" element={<UpdateFamilyStatusForm />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
