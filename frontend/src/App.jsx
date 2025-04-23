import "./App.css";
import { Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./stores/auth.store";
import Landing from "./pages/Landing";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const { user, isLoading, signInSystem, signOutSystem } = useAuthStore();
  if (isLoading)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        Loading...
      </div>
    );
  return (
    <>
      <Navbar user={user} googleSignIn={signInSystem} logout={signOutSystem} />
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
