const StudentProgress = ({ title, text }) => {
  return (
    <div className="bg-white rounded-xl px-6 py-5 w-full max-w-sm shadow-sm">
      <div className="text-center">
        <h5 className="text-lg font-bold truncate whitespace-nowrap overflow-hidden">
          {title}
        </h5>
        <p className="mt-3 bg-gray-100 py-2.5 px-3 rounded-lg">{text}</p>
      </div>
    </div>
  );
};

export default StudentProgress;
