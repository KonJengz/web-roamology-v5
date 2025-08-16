import Lottie from "lottie-react";
import uploadfileAnimationData from "../lotties/Image.json"; // (ตัวเลือก) เปลี่ยนชื่อเพื่อให้อ่านง่ายขึ้น

// // ย้าย options ออกมานอก component เพื่อประสิทธิภาพที่ดีขึ้น
// // จะได้ไม่ต้องสร้าง object นี้ใหม่ทุกครั้งที่ re-render
// const defaultOptions = {
//   loop: true,
//   autoplay: true,
//   animationData: uploadfileAnimationData,
//   rendererSettings: {
//     preserveAspectRatio: "xMidYMid slice",
//   },
// };

export const UploadfileIcon = (props) => {
  // <--- แก้ไขจุดนี้
  return (
    <Lottie
      animationData={uploadfileAnimationData} // 2. ส่งค่า animationData เข้าไปตรงๆ
      loop={true} // 3. props อื่นๆ ก็ส่งเข้าไปตรงๆ เช่นกัน
      autoplay={true}
      {...props} // สามารถส่ง props อื่นๆ เช่น style, className เข้าไปได้เหมือนเดิม
    />
  );
};
