import { useEffect, useState } from "react";
import Cupcake from "../components/Cupcake";

/* ************************************************************************* 
const sampleCupcakes: CupcakeArray = [
  {
    id: 10,
    accessory_id: "4",
    accessory: "wcs",
    color1: "blue",
    color2: "white",
    color3: "red",
    name: "France",
  },
  {
    id: 11,
    accessory_id: "4",
    accessory: "wcs",
    color1: "yellow",
    color2: "red",
    color3: "black",
    name: "Germany",
  },
  {
    id: 27,
    accessory_id: "5",
    accessory: "christmas-candy",
    color1: "yellow",
    color2: "blue",
    color3: "blue",
    name: "Sweden",
  },
];

************************************************************************* */

function CupcakeList() {
  type Cupcake = {
    id: number;
    name: string;
    accessory_id: string;
    accessory: string;
    color1: string;
    color2: string;
    color3: string;
  };
  type Accessory = { id: number; name: string; slug: string };

  const [cupcakes, setCupcakes] = useState<Cupcake[]>([]);
  const [accessories, setAccessories] = useState<Accessory[]>([]);

  useEffect(() => {
    async function getCupcakes() {
      const res = await fetch("http://localhost:3310/api/cupcakes");
      const data = await res.json();
      setCupcakes(data);
    }
    getCupcakes();
  }, []);

  useEffect(() => {
    async function getAccessory() {
      const res = await fetch("http://localhost:3310/api/accessories");
      const data = await res.json();
      setAccessories(data);
    }
    getAccessory();
  }, []);
  // Step 5: create filter state

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          {/* Step 5: use a controlled component for select */}
          Filter by{" "}
          <select id="cupcake-select">
            <option value="">---</option>
            {accessories?.map((accessory) => (
              <option key={accessory.id} value={accessory.id}>
                {accessory.name}
              </option>
            ))}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {cupcakes?.map((cupcake) => (
          <li key={cupcake.id} className="cupcake-item">
            <Cupcake data={cupcake} />
          </li>
        ))}
        {/* Step 5: filter cupcakes before repeating */}

        {/* end of block */}
      </ul>
    </>
  );
}

export default CupcakeList;
