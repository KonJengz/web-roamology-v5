import { PencilLine } from "lucide-react";
import { X } from "lucide-react";

function BtnEditDelete({ handleClickDelete, handleClickEdit }) {
  return (
    <div className="absolute top-2 px-2 gap-1 right-2 z-30 flex rounded-full bg-roamology/80">
      {handleClickEdit && (
        <button
          onClick={handleClickEdit}
          type="button"
          className="h-6 w-6 flex-center hover:text-white/70"
        >
          <PencilLine width={16} />
        </button>
      )}
      {handleClickDelete && (
        <button
          onClick={handleClickDelete}
          type="button"
          className="h-6 w-6 flex-center  hover:text-white/70"
        >
          <X width={16} />
        </button>
      )}
    </div>
  );
}
export default BtnEditDelete;
