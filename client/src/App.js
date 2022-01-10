import React from 'react';
import { Route } from 'react-router';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/home/home';
import GameDetails from './components/gameDetails/gameDetails';
import Navbar from './components/navBar/navBar';
import PostGame from './components/postGame/postGame';
// import cloud9 from './Itro & Tobu - Cloud 9.mp3';
// import candyland from './Tobu - Candyland.mp3'; fixed
import sunburst from './Tobu & Itro - Sunburst.mp3';

function App() {
	return (
		<div className='App'>
			<Route exact path='/' component={LandingPage} />
			<Route path='/videogames' component={Navbar} />
			<Route path='/videogames' component={Home} />
			<Route path='/newgame' component={Navbar} />
			<Route path='/newgame/' component={PostGame} />
			<Route path='/videogame/:id' component={Navbar} />
			<Route path='/videogame/:id' component={GameDetails} />
			<audio
				controls={true}
				autoPlay={true}
				loop={true}
				// src={cloud9}
				// src={candyland}
				src={sunburst}
			></audio>
		</div>
	);
}

export default App;
