function BtnForm({ children, isLoading }) {
  return (
    <button
      disabled={isLoading}
      className={`flex-center gap-2 py-2 px-4 ${
        isLoading
          ? "pointer-events-none bg-roamology/40"
          : "bg-roamology hover:bg-roamology-2 hover:text-white"
      }  rounded-full w-full hover:shadow-md duration-300`}
    >
      {children}
    </button>
  );
}
export default BtnForm;
