import CupcakeDetail from "../components/Cupcake";
import { useEffect, useState } from "react";
import type { AccessoryArray, CupcakeArray } from "../types/index.d.ts";
/* ************************************************************************* */

/* you can use sampleCupcakes if you're stucked on step 1 */
/* if you're fine with step 1, just ignore this ;) */
/* ************************************************************************* */

function CupcakeList() {
  const [cupcakes, setCupcakes] = useState<CupcakeArray | null>(null);
  const [accessories, setAccessories] = useState<AccessoryArray | null>(null);
  const [selectedAccessory, setSelectedAccessory] = useState<string>("");

  useEffect(() => {
    // Step 1: get all cupcakes
    fetch("http://localhost:3310/api/cupcakes")
      .then((response) => response.json())
      .then((data) => {
        console.info("Cupcake fetched:", data.result);
        setCupcakes(data.result);
      });

    // Step 3: get all accessories
    fetch("http://localhost:3310/api/accessories")
      .then((res) => res.json())
      .then((data) => {
        console.info("Accessories fetched:", data.result);
        setAccessories(data.result);
      });
  }, []);

  // Step 5: create filter state
  const filteredCupcakes = cupcakes
    ? cupcakes.filter((cupcake) =>
        selectedAccessory === ""
          ? true
          : cupcake.accessory_id === selectedAccessory,
      )
    : [];

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          {/* Step 5: use a controlled component for select */}
          Filter by{" "}
          <select
            id="cupcake-select"
            value={selectedAccessory}
            onChange={(e) => setSelectedAccessory(e.target.value)}
          >
            <option value="">---</option>
            {/* Step 4: add an option for each accessory */}
            {accessories?.map((accessory) => (
              <option key={accessory.id} value={accessory.id}>
                {accessory.name}
              </option>
            ))}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {/* Step 2: repeat this block for each cupcake */}
        {/* Step 5: filter cupcakes before repeating */}
        {filteredCupcakes.map((cupcake) => (
          <li className="cupcake-item" key={cupcake.id}>
            <CupcakeDetail data={cupcake} />
          </li>
        ))}

        {/* end of block */}
      </ul>
    </>
  );
}

export default CupcakeList;
