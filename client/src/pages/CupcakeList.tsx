import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cupcake from "../components/Cupcake";

/* ************************************************************************* */
/* you can use sampleCupcakes if you're stucked on step 1 */
/* if you're fine with step 1, just ignore this ;) */
/* ************************************************************************* */

type CupCakes = {
  id: number;
  accessory_id: string;
  accessory: string;
  color1: string;
  color2: string;
  color3: string;
  name: string;
};

type Accessories = {
  id: number;
  name: string;
  slug: string;
};

function CupcakeList() {
  const [cupcakes, setCupcakes] = useState<CupCakes[]>([]);
  const [accessories, setAccessories] = useState<Accessories[]>([]);
  const [selectedAccessories, setSelectedAccessories] = useState("");

  // Step 1: get all cupcakes
  useEffect(() => {
    fetch("http://localhost:3310/api/cupcakes")
      .then((response) => response.json())
      .then((data) => {
        setCupcakes(data);
      });
  }, []);

  // Step 3: get all accessories

  useEffect(() => {
    fetch("http://localhost:3310/api/accessories")
      .then((response) => response.json())
      .then((data) => {
        setAccessories(data);
      });
  }, []);

  // Step 5: create filter state

  const filteredCupCakes = selectedAccessories
    ? cupcakes.filter((cupcake) => cupcake.accessory_id === selectedAccessories)
    : cupcakes;

  const handleAccessoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedAccessories(event.target.value);
  };
  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          {/* Step 5: use a controlled component for select */}
          Filter by {/* Step 4: add an option for each accessory */}
          <select
            id="cupcake-select"
            onChange={handleAccessoryChange}
            value={selectedAccessories}
          >
            <option value="">---</option>
            {accessories.map((accessorie) => (
              <option key={accessorie.id} value={accessorie.id}>
                {accessorie.name}
              </option>
            ))}
          </select>
        </label>
      </form>

      <ul className="cupcake-list" id="cupcake-list">
        {/* Step 2: repeat this block for each cupcake */}
        {/* Step 5: filter cupcakes before repeating */}
        {filteredCupCakes.map((cupcake) => (
          <li className="cupcake-item" key={cupcake.id}>
            <Link to={`/cupcakes/:${cupcake.id}`} state={{ cupcake }}>
              <Cupcake key={cupcake.id} data={cupcake} />
            </Link>
          </li>
        ))}
        {/* end of block */}
      </ul>
    </>
  );
}

export default CupcakeList;
