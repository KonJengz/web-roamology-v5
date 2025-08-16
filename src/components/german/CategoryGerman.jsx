import { Languages } from "lucide-react";
import { CircleUserRound } from "lucide-react";
import { Fan } from "lucide-react";

function CategoryGerman({ handleClick, selected }) {
  const categories = [
    { id: 1, icon: <Fan width={20} />, text: "Festival" },
    { id: 2, icon: <CircleUserRound width={20} />, text: "culture" },
    { id: 3, icon: <Languages width={20} />, text: "language" },
  ];

  return (
    <div className="flex-center gap-4 my-8">
      {categories.map((item) => (
        <div
          role="button"
          onClick={() => handleClick(item.id)}
          key={item.id}
          className={`flex items-center gap-1 px-4 py-2 cursor-pointer text-grey-600 border border-roamology
            rounded-full  duration-200 ${
              selected === item.id
                ? "bg-roamology text-white shadow-md"
                : "hover:shadow-md hover:border-roamology-green"
            }`}
        >
          {item.icon}
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  );
}
export default CategoryGerman;
