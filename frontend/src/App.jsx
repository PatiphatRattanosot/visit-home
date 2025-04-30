import "./App.css";
import { Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./stores/auth.store";
import Landing from "./pages/Landing";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
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
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="student">
          <Route path="status" element={<Status />} />
          <Route path="self-info">
            <Route path="" element={<SelfInfo />} />
            <Route path="add" element={<AddSelfInfoForm />} />
            <Route path="update" element={<UpdateSelfInfoForm />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
