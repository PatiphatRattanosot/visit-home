const Navbar = () => {
  const user = "";
  return (
    <div className="w-screen flex justify-between py-2 px-3 shadow-lg">
      {/* Left zone */}
      <div className="flex">
        <a href="/" className="flex items-center gap-2" id="btn-home">
          <img src="/logo.png" alt="logo" className="size-11" />
          <span className="font-semibold hidden md:flex">
            ระบบบันทึกการเยี่ยมบ้านโรงเรียนบางแพปฐมพิทยา
          </span>
        </a>
      </div>
      {/* Center zone */}
      <div></div>
      {/* Right zone */}
      {user ? (
        <div className="flex gap-2 items-center">
          <span className="text-sm text-[#03045e]">สวัสดี {user}</span>
          <button className="btn-red">ออกจากระบบ</button>
        </div>
      ) : (
        <>
          <button className="btn-blue">ลงชื่อเข้าใช้งาน</button>
        </>
      )}
    </div>
  );
};

export default Navbar;
