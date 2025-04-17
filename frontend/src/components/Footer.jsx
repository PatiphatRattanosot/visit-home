const Footer = () => {
  return (
    <div className="flex h-[25vh] py-10">
      <div className="w-1/5 flex justify-center">
        <img src="logo.png" alt="logo" className="size-20" />
      </div>
      <nav className="w-2/5 text-lg">
        <p>โรงเรียนบางแพปฐมพิทยา</p>
        <p>159 หมู่ที่ 3 ตำบลบางแพ</p>
        <p>อำเภอบางแพ จังหวัดราชบุรี</p>
        <p>70160</p>
      </nav>
      <nav className="w-2/5 text-sm">
        <p>โทรศัพท์ : 0-32381186</p>
        <p>โทรศัพท์ : 032381023</p>
        <br />
        <p>Facebook : Bangpae_smile</p>
      </nav>
    </div>
  );
};

export default Footer;
