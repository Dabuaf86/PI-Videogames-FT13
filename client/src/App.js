import { useEffect } from 'react';
import { Route } from 'react-router';
import './App.css';
import LandingPage from './components/landingPage/LandingPage';
import Home from './components/home/Home';
import GameDetails from './components/gameDetails/GameDetails';
import Navbar from './components/navbar/Navbar';
import PostVideogame from './components/postGame/PostGame';
import { getAllVideogames } from './actions';
import { useDispatch, useSelector } from 'react-redux';
import sunburst from './assets/Tobu & Itro - Sunburst.mp3';

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
				src={sunburst}
				controls={true}
				autoPlay={true}
				// loop={true}
			></audio>
		</div>
	);
}

export default App;
