import { useEffect, useState } from "react";
import Cupcake from "../components/Cupcake";

/* if you're fine with step 1, just ignore this ;) */
/* ************************************************************************* */

function CupcakeList() {
  const [cupcakes, setCupcakes] = useState<Cupcake[]>([]);
  // Step 3: get all accessories
  const [accessories, setAccessories] = useState<string[]>([]);
  // Step 5: create filter state
  const [selectedAccessory, setSelectedAccessory] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:3310/api/cupcakes")
      .then((response) => response.json())
      .then((data) => {
        console.info("Cupcakes fetched:", data);
        setCupcakes(data);

        // Extract unique accessories
        const uniqueAccessories = [
          ...new Set(data.map((cupcake: Cupcake) => cupcake.accessory)),
        ] as string[];
        setAccessories(uniqueAccessories);
      })
      .catch((error) => console.error("Error fetching cupcakes:", error));
  }, []);

  console.log("Cupcakes state:", cupcakes);

  // Handle filter change
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAccessory(e.target.value);
  };

  // Filter cupcakes based on selected accessory
  const filteredCupcakes = selectedAccessory
    ? cupcakes.filter((cupcake) => cupcake.accessory === selectedAccessory)
    : cupcakes;

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
            onChange={handleFilterChange}
          >
            <option value="">---</option>
            {/* Step 4: add an option for each accessory */}
            {accessories.map((accessory) => (
              <option key={accessory} value={accessory}>
                {accessory}
              </option>
            ))}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {/* Step 2: repeat this block for each cupcake */}
        {/* Step 5: filter cupcakes before repeating */}
        {filteredCupcakes.map((cupcake) => (
          <li key={cupcake.id} className="cupcake-item">
            <Cupcake data={cupcake} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default CupcakeList;
