const Landing = () => {
  return (
    <>
      <div
        className="relative h-[68.5vh] bg-cover bg-center"
        style={{ backgroundImage: "url('hero.webp')" }} // Corrected inline style syntax
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative flex items-center justify-center h-full">
          <h1 className="text-white text-4xl md:text-6xl font-bold text-center">
            ระบบบันทึกการเยี่ยมบ้านโรงเรียนบางแพปฐมพิทยา
          </h1>
        </div>
      </div>
    </>
  );
};

export default Landing;
