import React from 'react';
import { Route } from 'react-router';
import './App.css';
import LandingPage from './views/landingPage/index';
import Home from './views/home/index';
import GameDetails from './views/gameDetails/index';
import Navbar from './components/Navbar/index';
import CreateVideogame from './views/createVideogame/index';
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
			<Route path='/videogames' component={Home} />
			<Route path='/newgame' component={Navbar} />
			<Route path='/newgame/' component={CreateVideogame} />
			<Route path='/videogame/:id' component={Navbar} />
			<Route path='/videogame/:id' component={GameDetails} />
		</div>
	);
}

export default App;
