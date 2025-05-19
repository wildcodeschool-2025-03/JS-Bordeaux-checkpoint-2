import { useEffect, useState } from "react";
import Cupcake from "../components/Cupcake";
interface Accessory {
  id: number;
  name: string;
  slug: string;
}

function CupcakeList() {
  const [cupcakes, setCupcakes] = useState<Cupcake[]>([]);
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [selectedAccessory, setSelectedAccessory] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:3310/api/cupcakes")
      .then((response) => response.json())
      .then((data) => {
        console.info("Cupcakes fetched:", data);
        setCupcakes(data);
      })
      .catch((error) => console.error("Error fetching cupcakes:", error));
    
    fetch("http://localhost:3310/api/accessories")
      .then((response) => response.json())
      .then((data) => {
        console.info("Accessories fetched:", data);
        setAccessories(data);
      })
      .catch((error) => console.error("Error fetching accessories:", error));
  }, []);

  console.log("Cupcakes state:", cupcakes);
  console.log("Accessories state:", accessories);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAccessory(e.target.value);
  };

  const filteredCupcakes = selectedAccessory
    ? cupcakes.filter((cupcake) => cupcake.accessory === selectedAccessory)
    : cupcakes;

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          Filter by{" "}
          <select
            id="cupcake-select"
            value={selectedAccessory}
            onChange={handleFilterChange}
          >
            <option value="">---</option>
            {accessories.map((accessory) => (
              <option key={accessory.id} value={accessory.slug}>
                {accessory.name}
              </option>
            ))}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
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
