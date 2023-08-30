import React from 'react';
import { NavLink } from 'react-router-dom';
import { getGamesByName } from '../../actions';
import Search from '../search/Search';
import './navBar.css';
import arcade from '../../assets/arcade-btn(sml).jpg';

const Navbar = () => {
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
