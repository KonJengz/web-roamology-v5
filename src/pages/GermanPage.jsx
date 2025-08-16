import { useState } from "react";
import CategoryGerman from "../components/german/CategoryGerman";

function GermanPage() {
  const data = [
    {
      id: 1,
      aa: [
        { id: 1, heading: "asdfg", info: "ert", img: "" },
        { id: 2, heading: "weg", info: "gwe", img: "" },
        { id: 3, heading: "weg", info: "weg", img: "" },
      ],
    },
    {
      id: 2,
      aa: [
        { id: 1, heading: "weg", info: "rtjrtj", img: "" },
        { id: 2, heading: "wegweg", info: "rtjtrj", img: "" },
        { id: 3, heading: "erhrtjtr", info: "rtjrtj", img: "" },
      ],
    },
    {
      id: 3,
      aa: [
        { id: 1, heading: "rtjrtj", info: "rth", img: "" },
        { id: 2, heading: "rrtjrtth", info: "trh", img: "" },
        { id: 3, heading: "rtgr", info: "rth", img: "rth" },
      ],
    },
  ];
  const [selected, setSelected] = useState(1);
  const filteredData = data.filter((item) => item.id === selected);

  console.log("filteredData", filteredData);

  // festival | culture | language used in everyday life

  const handleClick = (id) => {
    console.log("id", id);
    setSelected(id);
  };
  return (
    <div>
      <CategoryGerman handleClick={handleClick} selected={selected} />
      {filteredData.map((item) => (
        <div key={item.id}>
          {item.aa.map((item) => (
            <div key={item.id}>
              <h1>{item?.heading}</h1>
              <p>{item?.info}</p>
              {item?.img && <img src={item?.img} alt="r" />}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
export default GermanPage;
