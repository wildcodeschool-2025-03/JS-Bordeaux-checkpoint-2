import { useEffect, useState } from "react";
import Cupcake from "../components/Cupcake";

function CupcakeList() {
  const [cupcakes, setCupcakes] = useState<CupcakeArray>([]);
  const [loading, setLoading] = useState(true);
  const [accessories, setAccessories] = useState<string[]>([]);
  const [selectedAccessory, setSelectedAccessory] = useState("");

  useEffect(() => {
    async function fetchCupcakes() {
      try {
        const response = await fetch("http://localhost:3310/api/cupcakes");
        const data: CupcakeArray = await response.json();
        setCupcakes(data);
        const uniqueAccessories = Array.from(
          new Set(data.map((cupcake) => cupcake.accessory)),
        );
        setAccessories(uniqueAccessories);
      } catch (error) {
        console.error("Failed to fetch cupcakes", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCupcakes();
  }, []);

  const filteredCupcakes = selectedAccessory
    ? cupcakes.filter((cupcake) => cupcake.accessory === selectedAccessory)
    : cupcakes;

  return (
    <>
      <h1>My Cheesy Cupcakes</h1>

      <form className="center">
        <label htmlFor="cupcake-select">
          Filter by{" "}
          <select
            id="cupcake-select"
            value={selectedAccessory}
            onChange={(e) => setSelectedAccessory(e.target.value)}
          >
            <option value="">Choose your accessory</option>
            {accessories.map((acc) => (
              <option key={acc} value={acc}>
                {acc}
              </option>
            ))}
          </select>
        </label>
      </form>

      <ul className="cupcake-list" id="cupcake-list">
        {loading ? (
          <li>Loading...</li>
        ) : filteredCupcakes.length === 0 ? (
          <li>No cupcakes match the filter.</li>
        ) : (
          filteredCupcakes.map((cupcake) => (
            <li key={cupcake.id} className="cupcake-item">
              <Cupcake data={cupcake} />
            </li>
          ))
        )}
      </ul>
    </>
  );
}

export default CupcakeList;
