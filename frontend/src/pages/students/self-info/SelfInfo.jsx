import { useAuthStore } from "../../../stores/auth.store";

const SelfInfo = () => {
  const { userInfo } = useAuthStore();

  return (
    <div className="h-screen py-9 bg-gray-100 flex justify-center">
      <div className="bg-white px-4 py-6 w-9/12 rounded-lg">
        {/* หัวข้อ */}
        <h3 className="text-center text-xl">
          ข้อมูลการเยี่ยมบ้านของ{" "}
          {userInfo?.prefix +
            " " +
            userInfo?.first_name +
            " " +
            userInfo?.last_name}
        </h3>
      </div>
    </div>
  );
};

export default SelfInfo;
