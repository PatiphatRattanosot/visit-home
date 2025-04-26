import { RxHamburgerMenu } from "react-icons/rx";
import { getNavLinks } from "../utils/navbarRole";

const Navbar = ({ user, userInfo, googleSignIn, logout }) => {
  console.log(userInfo);

  return (
    <div className="navbar bg-base-100 shadow-sm justify-between">
      {/* Left zone */}
      <div className="flex space-x-1.5 items-center">
        {/* Hamburger btn */}
        {/* Drawer Toggle */}
        {user && userInfo && (
          <label htmlFor="my-drawer" className="btn-hamburger drawer-button">
            <RxHamburgerMenu className="size-4.5" />
          </label>
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
          {getNavLinks(userInfo?.role[0])}
        </div>
      )}
      {/* Right zone */}
      {user ? (
        <div className="flex gap-2 items-center">
          <span className="text-sm text-[#03045e]">
            สวัสดี{" "}
            {userInfo?.prefix +
              " " +
              userInfo?.first_name +
              " " +
              userInfo?.last_name}
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
      {/* Drawer Structure (outside navbar for layout control) */}
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side z-50">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {getNavLinks(userInfo?.role[0])}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
