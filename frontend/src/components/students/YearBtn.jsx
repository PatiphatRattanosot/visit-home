const YearBtn = ({ year }) => {
  return (
    <a
      href={`/student/visit-info/${year}/self-info`}
      className="size-36 md:size-40 flex justify-center items-center border border-gray-200 bg-white rounded-lg text-gray-600 font-bold text-xl hover:bg-gray-50"
    >
      {year}
    </a>
  );
};

export default YearBtn;
