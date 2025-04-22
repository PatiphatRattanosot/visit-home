import "./App.css";
import { Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";
import Landing from "./pages/Landing";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
