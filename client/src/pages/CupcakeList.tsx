import Cupcake from "../components/Cupcake";
import { useEffect, useState } from "react";

interface cupcake {
	id: number;
	accessory_id: string;
	accessory: string;
	color1: string;
	color2: string;
	color3: string;
	name: string;
}

interface AccessoryArray {
	id: number;
	name: string;
	slug: string;
}

function CupcakeList() {
	const [cupcakes, setcupcakes] = useState<cupcake[]>([]);

	useEffect(() => {
		async function getcupcakes() {
			const response = await fetch("http://localhost:3310/api/cupcakes");
			const data = await response.json();
			setcupcakes(data);
		}
		getcupcakes();
	}, []);

	const [accessories, setaccessories] = useState<AccessoryArray[]>([]);

	useEffect(() => {
		async function getAccessories() {
			const response = await fetch("http://localhost:3310/api/accessories");
			const Accessory = await response.json();
			setaccessories(Accessory);
		}
		getAccessories();
	}, []);

	const [filteraccessory, setfilteraccessory] = useState([]);

	function filteredaccessory() {
		const filteraccessory = accessories.filter();
	}

	return (
		<>
			<h1>My cupcakes</h1>
			<form className="center">
				<label htmlFor="cupcake-select">
					{/* Step 5: use a controlled component for select */}
					Filter by{" "}
					<select id="cupcake-select">
						{accessories.map((accessorie) => (
							<option key={accessorie.id} value={accessorie.name}>
								{accessorie.slug}
							</option>
						))}
					</select>
				</label>
			</form>
			<ul className="cupcake-list" id="cupcake-list">
				{cupcakes.map((cupcake) => (
					<li key={cupcake.id} className="cupcake-item">
						<Cupcake data={cupcake} />
					</li>
				))}
			</ul>
		</>
	);
}

export default CupcakeList;
