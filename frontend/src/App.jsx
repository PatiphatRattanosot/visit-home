import "./App.css";
import { Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./stores/auth.store";
import Landing from "./pages/Landing";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminPage from "./pages/Admin/Home"
import Personnel from "./pages/Admin/Personnel";

function App() {
  const {
    user,
    userInfo,
    isLoading,
    signInSystem,
    signOutSystem,
  } = useAuthStore();
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
        <Route path="admin">
          <Route index element={<AdminPage />} />
          <Route path="personnel" element={<Personnel />} />
        </Route>
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
