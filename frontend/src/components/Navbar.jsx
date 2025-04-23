import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { getNavLinks } from "../utils/navbarRole";

const Navbar = ({ user, googleSignIn, logout }) => {
  const [toggleHamburger, setToggleHamburger] = useState(false);

  return (
    <div className="w-screen flex justify-between py-2 px-3 shadow-lg">
      {/* Left zone */}
      <div className="flex space-x-1.5 items-center">
        {/* Hamburger btn */}
        {user && (
          <div className="relative inline-block text-left md:hidden">
            <button
              onClick={() => setToggleHamburger(!toggleHamburger)}
              className="btn-hamburger"
            >
              <RxHamburgerMenu className="size-4.5" />
            </button>

            <div
              className={`absolute left-0 z-10 ${
                toggleHamburger ? "" : "hidden"
              } mt-2 w-64 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg`}
            >
              <div className="py-1 px-2 list-none">
                {getNavLinks("Student")}
              </div>
            </div>
          </div>
        )}
        {/* Home btn */}
        <a href="/" className="flex items-center gap-2" id="btn-home">
          <img src="/logo.png" alt="logo" className="size-11" />
          <span className="font-semibold hidden md:flex">
            ระบบบันทึกการเยี่ยมบ้านโรงเรียนบางแพปฐมพิทยา
          </span>
        </a>
      </div>
      {/* Center zone */}
      {user && (
        <div className="md:flex items-center list-none gap-6 hidden">
          {getNavLinks("Student")}
        </div>
      )}
      {/* Right zone */}
      {user ? (
        <div className="flex gap-2 items-center">
          <span className="text-sm text-[#03045e]">
            สวัสดี {user?.displayName}
          </span>
          <button onClick={logout} className="btn-red">
            ออกจากระบบ
          </button>
        </div>
      ) : (
        <>
          <button onClick={googleSignIn} className="btn-blue">
            ลงชื่อเข้าใช้งาน
          </button>
        </>
      )}
    </div>
  );
};

export default Navbar;
