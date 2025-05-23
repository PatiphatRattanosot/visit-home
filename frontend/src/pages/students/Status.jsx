import StudentProgress from "../../components/students/StudentProgress";

const Status = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl mx-auto justify-center">
        <StudentProgress
          title="สถานะข้อมูลการเยี่ยมบ้าน"
          text="รอนักเรียนกรอกข้อมูล"
        />
        <StudentProgress
          title="สถานะการประเมินแบบฟอร์ม SDQ"
          text="รอนักเรียนประเมิน"
        />
      </div>
    </div>
  );
};

export default Status;
