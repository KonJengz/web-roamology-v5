import { X } from "lucide-react";

function ModelMain({ children, modalName, reset }) {
  const handleClose = () => {
    document.getElementById(modalName).close();
    if (reset) {
      reset();
    }
  };

  return (
    <dialog id={modalName} className="modal">
      <div className="modal-box rounded-2xl p-8">
        {children}
        <button
          type="button"
          onClick={handleClose}
          className="btn-circle absolute top-3 right-4 text-roamology-2 hover:text-roamology-2/50 duration-100"
        >
          <X width={20} />
        </button>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button onClick={handleClose}>close</button>
      </form>
    </dialog>
  );
}
export default ModelMain;
