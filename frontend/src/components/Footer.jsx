const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
      <aside>
        <img src="/logo.png" alt="logo" className="size-20" />
      </aside>
      <nav>
        <p>โรงเรียนบางแพปฐมพิทยา</p>
        <p>159 หมู่ที่ 3 ตำบลบางแพ</p>
        <p>อำเภอบางแพ จังหวัดราชบุรี</p>
        <p>70160</p>
      </nav>
      <nav>
        <p>โทรศัพท์ : 0-32381186</p>
        <p>โทรศัพท์ : 032381023</p>
        <br />
        <p>Facebook : Bangpae_smile</p>
      </nav>
    </footer>
  );
};

export default Footer;
