const ShowPicture = ({ studentPic }) => {
  return (
    <div className="border-1 border-gray-100 bg-white w-[13.875rem] h-[18.5rem] rounded-md flex justify-center items-center">
      {studentPic ? (
        <img
          src={studentPic}
          alt="Student"
          className="h-full w-full bg-cover object-cover rounded-md p-1"
        />
      ) : (
        <div className="bg-gray-50 w-full h-full object-cover rounded-md p-1 text-gray-500 flex justify-center items-center">
          ยังไม่มีรูปนักเรียน
        </div>
      )}
    </div>
  );
};

export default ShowPicture;
