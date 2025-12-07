import React from "react";
import { Footer } from "./Footer.jsx";
import { Navbar } from "./Navbar.jsx";


//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<Navbar />
						
			<Footer />
		</div>
	);
};

export default Home;