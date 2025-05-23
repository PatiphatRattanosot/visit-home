import TextInputInModal from "./TexInputInModal";
import SelectInputInModal from "./SelectInputInModal";
import { toast } from "react-hot-toast";
const AddClassroom = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("เพิ่มชั้นเรียนสำเร็จ");
    document.getElementById("add_classroom").close();
  };

  return (
    <div>
      <dialog id="add_classroom" className="modal">
        <div className="modal-box flex flex-col items-center justify-center w-11/12">
          <h3 className="font-bold text-lg text-center">เพิ่มชั้นเรียน</h3>

          <form action="">
            <div className="flex flex-col items-center justify-center space-y-2">
              <TextInputInModal className="w-64 md:w-72" label="ชั้นเรียน" />
              <SelectInputInModal
                className="w-64 md:w-72"
                label="ครูที่ปรึกษา"
              />
               <div className="flex gap-6 justify-center mt-4">
                <button onClick={handleSubmit} className="btn-green">
                  เพิ่มข้อมูล
                </button>
                <button
                  type="button"
                  className="btn-red"
                  onClick={() =>
                    document.getElementById("add_classroom").close()
                  }
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AddClassroom;
