import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cupcake from "../components/Cupcake";

type AccessoryArray = { id: number; name: string; slug: string }[];

function CupcakeList() {
  const [cupcakes, setCupcakes] = useState<CupcakeArray | []>([]);
  const [accessories, setAccessories] = useState<AccessoryArray | []>([]);
  const [selectedAccessory, setSelectedAccessory] = useState<string>("");

  useEffect(() => {
    const fetchCupcakes = async () => {
      const res = await fetch("http://localhost:3310/api/cupcakes");
      const data = await res.json();

      setCupcakes(data);
    };
    fetchCupcakes();
  }, []);

  useEffect(() => {
    const fetchAccessories = async () => {
      const res = await fetch("http://localhost:3310/api/accessories");
      const data = await res.json();

      setAccessories(data);
    };

    fetchAccessories();
  });

  const filtredCupcakes = selectedAccessory
    ? cupcakes.filter((c) => c.accessory_id === selectedAccessory)
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
            onChange={(e) => setSelectedAccessory(e.target.value)}
          >
            <option value="">---</option>
            {accessories.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.name}
              </option>
            ))}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {filtredCupcakes.map((c) => (
          <li className="cupcake-item" key={c.id}>
            <Link to={`/cupcakes/${c.id}`}>
              <Cupcake data={c} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default CupcakeList;
