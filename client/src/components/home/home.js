import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideogames } from '../../actions/actions';
import Games from '../Games/Games';
import Filters from '../searchFilter/searchFilter';
import './Home.css';

const Home2 = () => {
	const dispatch = useDispatch();
	const isLoaded = useSelector(state => state.isLoaded);

	useEffect(() => {
		if (!isLoaded) dispatch(getAllVideogames());
	}, [dispatch, isLoaded]);

	return (
		<div className='home'>
			<span className='filterBar'>
				<Filters />
			</span>
			<Games />
		</div>
	);
};

export default Home2;
// fixed
