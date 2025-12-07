import React from "react";
import { Footer } from "./Footer.jsx";
import { Navbar } from "./Navbar.jsx";
import { ToDoList } from "./ToDoList.jsx";


//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<Navbar />
			<ToDoList />			
			<Footer />
		</div>
	);
};

export default Home;