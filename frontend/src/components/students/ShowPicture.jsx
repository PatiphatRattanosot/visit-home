const ShowPicture = ({ studentPic }) => {
  return (
    <div className="border-1 border-gray-200 bg-white w-[13.875rem] h-[18.5rem] rounded-md flex justify-center items-center">
      <img
        src={studentPic}
        alt="Student"
        className="h-full w-full bg-cover object-cover rounded-md p-1"
      />
    </div>
  );
};

export default ShowPicture;
