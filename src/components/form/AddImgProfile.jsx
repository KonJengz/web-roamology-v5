import { UploadfileIcon } from "../../lotties/Icon";
import BtnImg from "../form/BtnImg";

function AddImgProfile({
  file,
  handleClickPic,
  fileInputRef,
  hdlFileChange,
  removePic,
}) {
  return (
    <div className="flex-center flex-col gap-2 p-4">
      <div
        onClick={handleClickPic}
        className={`w-2/3 aspect-square  ${
          file ? "" : "p-4 "
        }  rounded-full flex-center overflow-hidden cursor-pointer border border-dashed border-roamology `}
      >
        {file ? (
          <img
            className="w-full h-full object-cover"
            src={URL.createObjectURL(file)}
            alt=""
          />
        ) : (
          <UploadfileIcon />
        )}
      </div>

      <input
        type="file"
        className="hidden"
        ref={fileInputRef} // 2. ผูก ref เข้ากับ input element
        onChange={hdlFileChange}
        accept="image/*" // เพิ่มเพื่อจำกัดให้เลือกเฉพาะไฟล์รูปภาพ
      />

      {file && <BtnImg handleClickPic={handleClickPic} removePic={removePic} />}
    </div>
  );
}
export default AddImgProfile;
