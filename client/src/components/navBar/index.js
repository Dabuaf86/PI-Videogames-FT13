import React from 'react';
import { NavLink } from 'react-router-dom';
import { getGamesByName } from '../../actions';
import Search from '../Search/index';
import arcade from '../../multimedia/navbar-home-btn(sml).jpg';
import config from '../../multimedia/config.svg';
import './navbar.css';

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
						<img src={config} alt='config icon' id='configImg' />
						CREATE GAME
					</NavLink>
				</li>
			</nav>
		</header>
	);
};

export default Navbar;
