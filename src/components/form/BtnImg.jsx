import { X } from "lucide-react";
import { Repeat2 } from "lucide-react";

function BtnImg({ handleClickPic, removePic }) {
  return (
    <div className="flex-center gap-4 text-gray-600">
      <Repeat2
        onClick={handleClickPic}
        width={20}
        className="cursor-pointer hover:text-gray-400"
      />

      <X
        onClick={removePic}
        className="cursor-pointer hover:text-gray-400"
        width={20}
      />
    </div>
  );
}
export default BtnImg;
