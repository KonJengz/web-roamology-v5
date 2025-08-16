import { X } from "lucide-react";

function ShowImg({ files, removeFile }) {
  console.log("files", files);
  return (
    <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
      {files.map((file) => (
        <div key={file.id} className="relative aspect-square">
          <img
            src={file.imgUrl || URL.createObjectURL(file)}
            alt={file.name}
            className="w-full h-full object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={() => removeFile(file.id)}
            className="absolute top-1 right-1 bg-roamology text-white rounded-full p-1 hover:bg-roamology/80 transition-colors cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
export default ShowImg;
