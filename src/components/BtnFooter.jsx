function BtnFooter({ children, handleClick }) {
  return (
    <button
      onClick={handleClick}
      className="cursor-pointer hover:text-roamology/50"
    >
      {children}
    </button>
  );
}
export default BtnFooter;
