import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterGames, getGenres } from '../../actions/actions';
import './searchFilter.css';

const Filters = () => {
	const dispatch = useDispatch();
	const loadedVideogames = useSelector(state => state.loadedVideogames);
	const selectGenres = useSelector(state => state.allGenres);
	const [genre, setGenre] = useState('Select');
	const [source, setSource] = useState('Select');
	const [order, setOrder] = useState('Select');

	useEffect(() => {
		dispatch(getGenres());
	}, [dispatch]);

	let gamesToFilter = [...loadedVideogames];

	const handleChange = event => {
		if (event.target.name === 'genre') setGenre(event.target.value);
		else if (event.target.name === 'source') setSource(event.target.value);
		else if (event.target.name === 'order') setOrder(event.target.value);
	};

	const sortCB = (arr, order) => {
		if (order === 'alphAsc') {
			arr.sort((a, b) => {
				if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
				if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
				return 0;
			});
		}
		if (order === 'alphDesc') {
			arr.sort((a, b) => {
				if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
				if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
				return 0;
			});
		}
		if (order === 'ratingAsc') {
			arr.sort((a, b) => a.rating - b.rating);
		}
		if (order === 'ratingDesc') {
			arr.sort((a, b) => b.rating - a.rating);
		}
	};

	const handleSubmit = event => {
		event.preventDefault();
		let filtered = [];
		if (genre === 'Select' && source === 'Select' && order === 'Select') {
			console.log('NO PASA NADA', gamesToFilter);
			dispatch(filterGames(gamesToFilter));
		} else if (genre === 'Select') {
			if (source === 'Select') {
				sortCB(gamesToFilter, order);
				console.log('SIN GÉNERO NI ORIGEN. SÓLO ORDENAR', gamesToFilter);
				dispatch(filterGames(gamesToFilter));
			} else {
				for (let i = 0; i < gamesToFilter.length; i++) {
					if (gamesToFilter[i].created === source) {
						filtered.push(gamesToFilter[i]);
					}
				}
				// gamesToFilter = gamesToFilter.filter(game => game.created === source);
				if (order === 'Select') {
					console.log('ORIGEN: ', source);
					console.log('SIN GÉNERO Y SIN ORDEN PERO CON ORIGEN', filtered);
					dispatch(filterGames(filtered));
				} else {
					sortCB(gamesToFilter, order);
					console.log('ORIGEN: ', source);
					console.log('SIN GÉNERO, PERO CON ORIGEN Y ORDENADO', gamesToFilter);
					dispatch(filterGames(gamesToFilter));
				}
			}
		} else if (genre !== 'Select') {
			for (let i = 0; i < gamesToFilter.length; i++) {
				for (let j = 0; j < gamesToFilter[i].genres?.length; j++) {
					if (gamesToFilter[i].genres[j].name === genre) {
						filtered.push(gamesToFilter[i]);
					}
				}
			}
			if (source === 'Select' && order === 'Select') {
				console.log('FILTRO DE GÉNERO', filtered);
				dispatch(filterGames(filtered));
			} else if (source === 'Select') {
				sortCB(filtered, order);
				console.log('FILTRO DE GÉNERO + ORDEN', filtered);
				dispatch(filterGames(filtered));
			} else {
				filtered = filtered.filter(game => game.created === source);
				if (order === 'Select') {
					console.log('ORIGEN: ', source);
					console.log('FILTRO DE GÉNERO + ORIGEN SIN ORDEN', filtered);
					dispatch(filterGames(filtered));
				} else {
					sortCB(filtered, order);
					console.log('ORIGEN: ', source);
					console.log('FILTRO DE GÉNERO + ORIGEN ORDENADO', filtered);
					dispatch(filterGames(filtered));
				}
			}
		}
	};

	return (
		<div>
			<form className='filterForm' onSubmit={event => handleSubmit(event)}>
				<div className='filterDiv'>
					<label className='filterLbl'>Filter by Source</label>
					<select
						className='filterSelect'
						name='source'
						value={source}
						onChange={event => handleChange(event)}
					>
						<option value='Select' default>
							Select
						</option>
						<option value={true}>Your Games</option>
						<option value={false}>Our Games</option>
					</select>
				</div>
				<div className='filterDiv'>
					<label className='filterLbl'>Filter by Genre</label>
					<select
						className='filterSelect'
						name='genre'
						value={genre}
						onChange={event => handleChange(event)}
					>
						<option value='Select' default>
							Select
						</option>
						{selectGenres.map(genre => (
							<option value={genre.name}>{genre.name}</option>
						))}
					</select>
				</div>
				<div className='filterDiv'>
					<label className='filterLbl'>Sort</label>
					<select
						className='filterSelect'
						name='order'
						value={order}
						onChange={event => handleChange(event)}
					>
						<option value='Select' default>
							Select
						</option>
						<option value='alphAsc'>A - Z</option>
						<option value='alphDesc'>Z - A</option>
						<option value='ratingAsc'>Rating ⬆️</option>
						<option value='ratingDesc'>Rating ⬇️</option>
					</select>
				</div>
				<button id='btnSort' type='submit'>
					Apply
				</button>
			</form>
		</div>
	);
};

export default Filters;
// fixed
