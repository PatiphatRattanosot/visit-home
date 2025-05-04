import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Userservices from "../../services/user.service";

ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {
  const [rankChartData, setRankChartData] = useState(null);
  const [statusChartData, setStatusChartData] = useState(null);

  useEffect(() => {
    const getChartData = async () => {
      try {
        const response = await Userservices.getAllUsers();

        //สถานะบุคลากร
        const statusCount = {};
        response.forEach((user) => {
          const status = user.status;
          statusCount[status] = (statusCount[status] || 0) + 1;
        });
        const statusLabels = Object.keys(statusCount);
        const statusData = Object.values(statusCount);
        setStatusChartData({
          labels: statusLabels,
          datasets: [
            {
              label: "สถานะบุคลากร",
              data: statusData,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });

        //ตำแหน่งบุคลากร 
        const rankCount = {};
        response.forEach((user) => {
          const rank = user.rank;
          rankCount[rank] = (rankCount[rank] || 0) + 1;
        });
        const rankLabels = Object.keys(rankCount);
        const rankData = Object.values(rankCount);
        setRankChartData({
  labels: rankLabels,
  datasets: [
    {
      label: "ตำแหน่งบุคลากร",
      data: rankData,
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
});

      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getChartData();
  }, []);



  return (
    <div className="w-full max-w-6xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">สัดส่วนบุคลากร</h2>
      
      <div className="flex flex-col md:flex-row justify-center items-start gap-8">
        {/* ชาร์ตสัดส่วนตำแหน่ง */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-center mb-2">ตามตำแหน่ง</h3>
          <div className="relative h-[340px]">
            {rankChartData ? (
              <Doughnut data={rankChartData} options={{ maintainAspectRatio: false }} />
            ) : (
              <p className="text-center text-gray-500">กำลังโหลดข้อมูล...</p>
            )}
          </div>
          
        </div>
  
        {/* ชาร์ตสัดส่วนสถานะ */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-center mb-2">ตามสถานะ</h3>
          <div className="relative h-[340px]">
            {statusChartData ? (
              <Doughnut data={statusChartData} options={{ maintainAspectRatio: false }} />
            ) : (
              <p className="text-center text-gray-500">กำลังโหลดข้อมูล...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default Home;
