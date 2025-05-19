import { useEffect, useState } from "react";
import Cupcake from "../components/Cupcake";

type AccessoryArray = { id: number; name: string; slug: string }[];

function CupcakeList() {
  const [cupcakes, setCupcakes] = useState<Cupcake[]>([]);
  const [accessories, setAccessories] = useState<AccessoryArray>([]);
  const [accessoriesFiltered, setAccessoriesFiltered] = useState("");

  useEffect(() => {
    fetch("http://localhost:3310/api/cupcakes")
      .then((res) => res.json())
      .then((data) => {
        setCupcakes(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3310/api/accessories")
      .then((res) => res.json())
      .then((data) => {
        setAccessories(data);
      });
  }, []);

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          Filter by{" "}
          <select
            id="cupcake-select"
            onChange={() => setAccessoriesFiltered(accessoriesFiltered)}
          >
            <option value="">---</option>
            {accessories.map((data) => (
              <option key={data.id} value={data.id}>
                {data.name}
              </option>
            ))}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {accessoriesFiltered === ""
          ? cupcakes.map((data) => (
              <li key={data.id} className="cupcake-item">
                <Cupcake key={data.id} data={data} />
              </li>
            ))
          : cupcakes
              .filter((data) => {
                data.name
                  .toLowerCase()
                  .includes(accessoriesFiltered.toLowerCase());
              })
              .map((data) => (
                <li key={data.id} className="cupcake-item">
                  <Cupcake key={data.id} data={data} />
                </li>
              ))}
      </ul>
    </>
  );
}

export default CupcakeList;
