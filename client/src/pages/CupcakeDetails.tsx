import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CupcakeDetails() {
  const [cupcake, setCupcake] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchCupcake = async () => {
      const res = await fetch(`http://localhost:3310/api/cupcakes/${id}`);
      const data = await res.json();

      setCupcake(data);
    };
    fetchCupcake();
  }, [id]);

  return (
    <>
      <h1>Cupcake:{cupcake} </h1>
    </>
  );
}

export default CupcakeDetails;
