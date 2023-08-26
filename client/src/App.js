import React from 'react';
import { Route } from 'react-router';
import './App.css';
import LandingPage from './views/landingPage/index';
import HomePage from './views/homePage/index';
import GameDetails from './views/gameDetailsPage/index';
import Navbar from './components/Navbar/index';
import CreateVideogame from './views/createVideogamePage/index';
import sunburst from './multimedia/Tobu & Itro - Sunburst.mp3';

function App() {
	return (
		<div className='App'>
			<audio
				controls={true}
				autoPlay={true}
				loop={false}
				src={sunburst}
			></audio>
			<Route exact path='/' component={LandingPage} />
			<Route path='/videogames' component={Navbar} />
			<Route path='/videogames' component={HomePage} />
			<Route path='/newgame' component={Navbar} />
			<Route path='/newgame/' component={CreateVideogame} />
			<Route path='/videogame/:id' component={Navbar} />
			<Route path='/videogame/:id' component={GameDetails} />
			<audio
				controls={true}
				autoPlay={true}
				// loop={true}
				// src={cloud9}
				// src={candyland}
				src={sunburst}
			></audio>
		</div>
	);
}

export default App;
