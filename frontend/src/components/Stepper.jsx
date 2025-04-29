import React from "react";
import { useLocation, Link } from "react-router";

const steps = [
  { label: "ข้อมูลส่วนตัว", path: "/student/self-info" },
  { label: "ข้อมูลความสัมพันธ์ในครอบครัว", path: "/student/family-relation" },
  { label: "ข้อมูลสถานะครัวเรือน", path: "/student/family-status" },
  { label: "ข้อมูลพฤติกรรมและความเสี่ยง", path: "/student/behavior" },
];

const Stepper = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Find index of current step
  const currentIndex = steps.findIndex((step) => step.path === currentPath);

  return (
    <div className="flex items-center justify-center space-x-0 py-6">
      {steps.map((step, index) => {
        const isActive = currentIndex === index;
        const isCompleted = currentIndex > index;

        return (
          <React.Fragment key={step.path}>
            <Link
              to={step.path}
              className="flex flex-col items-center group px-3"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold
                  transition-colors
                  ${
                    isActive
                      ? "bg-orange-600"
                      : isCompleted
                      ? "bg-orange-400"
                      : "bg-orange-300 group-hover:bg-orange-400"
                  }`}
              >
                {index + 1}
              </div>
              <span
                className={`mt-2 text-sm font-medium 
                  ${isActive ? "text-orange-700" : "text-orange-600"}`}
              >
                {step.label}
              </span>
            </Link>

            {/* Step connector line */}
            {index < steps.length - 1 && (
              <div
                className={`h-1 w-12 self-center transition-colors
                  ${currentIndex > index ? "bg-orange-500" : "bg-gray-300"}`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Stepper;
