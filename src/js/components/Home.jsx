import React from "react";
import { Footer } from "./Footer.jsx";
import { Navbar } from "./Navbar.jsx";
import { ToDoListFetch } from "./ToDoListFetch.jsx";


//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<Navbar />
			<ToDoListFetch />			
			<Footer />
		</div>
	);
};

export default Home;