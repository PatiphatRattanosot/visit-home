const Stepper = ({ step, path }) => {
  return (
    <ul className="steps">
      <a className={`step ${step >= 1 && "step-warning"}`} href={path?.stepOne}>
        ข้อมูลส่วนตัว
      </a>
      <a className={`step ${step >= 2 && "step-warning"}`} href={path?.stepTwo}>
        ความสัมพันธ์ในครอบครัว
      </a>
      <a
        className={`step ${step >= 3 && "step-warning"}`}
        href={path?.stepThree}
      >
        สถานะของครอบครัว
      </a>
      <a
        className={`step ${step >= 4 && "step-warning"}`}
        href={path?.stepFour}
      >
        พฤติกรรมและความเสี่ยง
      </a>
    </ul>
  );
};

export default Stepper;
