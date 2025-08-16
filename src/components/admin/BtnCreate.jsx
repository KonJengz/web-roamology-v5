import { Plus } from "lucide-react";

function BtnCreate({ children, text, nameModal }) {
  return (
    <div>
      <button
        onClick={() => document.getElementById(nameModal).showModal()}
        className="flex-center py-2 px-4 border text-roamology-green hover:text-roamology-green2 border-roamology-green hover:border-roamology-green2 rounded-full"
      >
        <Plus width={20} />
        {text}
      </button>

      {children}
    </div>
  );
}
export default BtnCreate;
