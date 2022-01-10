import React from 'react';
import { Route } from 'react-router';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/home/home';
import GameDetails from './components/gameDetails/gameDetails';
import Navbar from './components/navBar/navBar';
import PostGame from './components/postGame/postGame';
import sunburst from './Tobu & Itro - Sunburst.mp3';

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
			<Route path='/newgame/' component={PostGame} />
			<Route path='/videogame/:id' component={Navbar} />
			<Route path='/videogame/:id' component={GameDetails} />
		</div>
	);
}

export default App;
