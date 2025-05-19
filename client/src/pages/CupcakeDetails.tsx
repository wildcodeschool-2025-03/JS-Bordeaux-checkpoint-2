import { useLocation } from "react-router-dom";
import Cupcake from "../components/Cupcake";
import "../components/SelectedCupcake.css";

function CupcakeDetails() {
  const location = useLocation();
  const cupcake = location.state.cupcake;
  return (
    <div className="selected-cupcake">
      <Cupcake key={cupcake.id} data={cupcake} />
    </div>
  );
}

export default CupcakeDetails;
