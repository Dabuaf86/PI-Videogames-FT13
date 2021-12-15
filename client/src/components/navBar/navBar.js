import React from 'react';
import { NavLink } from 'react-router-dom';
import { getGamesByName, getAllVideogames } from '../../Actions/actions';
import Search from '../Search/search';
import './Navbar.css';
import arcade from './arcade-btn(sml).jpg';
import { useDispatch } from 'react-redux';

const Navbar = () => {
	const dispatch = useDispatch;
	const handleClick = () => {
		dispatch(getAllVideogames());
	};

	return (
		<header className='navbar'>
			<span>
				<h1 id='navH1'>Level APP</h1>
			</span>
			<nav>
				<li id='navlinks'>
					<NavLink className='n-link' to='/videogames'>
						<img src={arcade} alt='arcade-btn' />
					</NavLink>
					<Search className='n-link' getGamesByName={getGamesByName} />
					<NavLink className='n-link' to='/newgame'>
						Post a new game
					</NavLink>
				</li>
			</nav>
		</header>
	);
};

export default Navbar;
// fixed