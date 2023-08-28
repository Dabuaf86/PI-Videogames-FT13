import React, { useEffect } from 'react';
import { Route } from 'react-router';
import './App.css';
import LandingPage from './Components/landingPage/LandingPage';
import Home from './Components/home/Home';
import GameDetails from './Components/gameDetails/GameDetails';
import Navbar from './Components/navBar/NavBar';
import PostVideogame from './Components/postGame/PostGame';
import { getAllVideogames } from './actions';
import { useDispatch, useSelector } from 'react-redux';
// import cloud9 from './Itro & Tobu - Cloud 9.mp3';
// import candyland from './Tobu - Candyland.mp3';
import sunburst from './Tobu & Itro - Sunburst.mp3';

function App() {
	const dispatch = useDispatch();
	const isLoaded = useSelector(state => state.isLoaded);
	useEffect(() => {
		if (isLoaded === false) {
			dispatch(getAllVideogames());
		}
	}, [dispatch, isLoaded]);

	return (
		<div className='App'>
			<Route exact path='/' component={LandingPage} />
			<Route path='/videogames' component={Navbar} />
			<Route path='/videogames' component={Home} />
			<Route path='/newgame' component={Navbar} />
			<Route path='/newgame/' component={PostVideogame} />
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
