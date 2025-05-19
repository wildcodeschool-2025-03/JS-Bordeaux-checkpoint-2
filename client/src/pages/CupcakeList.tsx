import { useEffect, useState  } from "react";
import Cupcake from "../components/Cupcake";
import type { Accessorytype, Cupcaketype } from "../types/index";


function CupcakeList() {
  const [cupcakes, setCupcakes] = useState<Cupcaketype[]>([]);
  const [accessories, setAccessories] = useState<Accessorytype[]>([]);
  const [selectAccessoryId, setSelectAccessoryId] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:3310/api/cupcakes")
        .then((res) => res.json())
        .then((data) => {
        console.info("blabla", data);
        setCupcakes(data)
      })
    .catch((err) => console.error(err))
  }, []);

  useEffect(() => {
    fetch("http://localhost:3310/api/accessories")
      .then((res) => res.json())
      .then((data: Accessorytype[]) => {
        console.info("Tes crêpes sont supers bonnes Micka <3")
        setAccessories(data)
      })
  })


  const filteredCupCake = cupcakes.filter((cupcake) => {
   if (selectAccessoryId === "") return true;
   return cupcake.accessory_id.toString() === selectAccessoryId;
  });

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          <select value={selectAccessoryId}
          onChange={(e) => setSelectAccessoryId(e.target.value)} >
          
          Filter by{" "}
          
            <option value="">Choose an accessory</option>
            {accessories.map((accessory) => (
              <option key={accessory.id} value={accessory.id} >
                {accessory.name}
              </option>
            ))}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {filteredCupCake.map((cupcake) => (
          <li key={cupcake.id} >
           <Cupcake data={cupcake} />
           </li>
        ))}
      </ul>
    </>
  );
}

export default CupcakeList;
