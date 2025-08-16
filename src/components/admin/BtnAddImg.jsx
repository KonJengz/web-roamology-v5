import { ImagePlus } from "lucide-react";

function BtnAddImg({ isSubmitting, handleClickPic }) {
  return (
    <button
      disabled={isSubmitting}
      onClick={handleClickPic}
      type="button"
      className={`flex items-center justify-center gap-1 w-full text-center px-4 py-2 text-lg bg-gray-300 hover:bg-gray-400/50 duration-200 rounded-full ${
        isSubmitting ? "pointer-events-none" : "hover:shadow-md cursor-pointer"
      }`}
    >
      <ImagePlus width={20} />
      Add Image Your Post
    </button>
  );
}
export default BtnAddImg;
