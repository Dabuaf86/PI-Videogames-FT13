import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createVideogame, getGenres, getPlatforms } from '../../actions';
// import DropdownMenu from '../../components/DropdownMenu/index';
// import Validate from "./validate";
import './createVideogame.css';

const CreateVideogame = () => {
	const dispatch = useDispatch();

	const [input, setInput] = useState({
		name: '',
		description: '',
		released: '',
		rating: '',
		image: '',
		genres: [],
		platforms: [],
	});
	// const [errors, setErrors] = useState(false);

	const selectGenres = useSelector(state => state.allGenres);
	const selectPlatforms = useSelector(state => state.allPlatforms);

	useEffect(() => {
		dispatch(getGenres());
		dispatch(getPlatforms());
	}, [dispatch]);

	const handleInputChange = event => {
		if (event.target.name === 'genres' || event.target.name === 'platforms') {
			const selectArr = input[event.target.name];
			setInput({
				...input,
				[event.target.name]: [...selectArr, event.target.value],
			});
			// console.log('Input actual:', input.platforms);
			// } else if (event.target.name === 'image') {
			// 	setInput({
			// 		...input,
			// 		[event.target.name]: event.target.files[0],
			// 	});
		} else {
			setInput({
				...input,
				[event.target.name]: event.target.value,
			});
		}
		// setErrors(
		//   Validate({
		//     ...input,
		//     [event.target.name]: event.target.value,
		//   })
		// );
	};

	const handleSubmit = event => {
		event.preventDefault();
		// if (
		//   errors.name ||
		//   errors.description ||
		//   errors.genres ||
		//   errors.platforms
		// ) {
		//   setErrors(true);
		//   return;
		// } else {
		// setErrors(false);
		if (!input.name) {
			alert('Please type a name');
			return;
		} else if (!input.description) {
			alert('Please type a description');
			return;
		} else if (!input.genres) {
			alert('Please select at least one valid genre');
			return;
		} else if (!input.platforms) {
			alert('Please select at least one valid platform');
			return;
		} else {
			dispatch(createVideogame(input));
			alert('New videogame created successfully!');
			setInput({
				name: '',
				description: '',
				released: '',
				rating: '',
				image: '',
				genres: [],
				platforms: [],
			});
		}
	};

	return (
		<div className='formContainer'>
			<h2 className='formH2'>CREATE YOUR OWN GAME</h2>
			<form
				className='postGame'
				noValidate
				onSubmit={event => handleSubmit(event)}
				// enctype='multipart/form-data'
			>
				<label className='formLbl'>*Name</label>
				<input
					id='formInput'
					// className={errors.name && "Error"}
					type='text'
					name='name'
					value={input.name}
					placeholder='Name...'
					onChange={event => handleInputChange(event)}
					autoFocus
				/>

				{/* {errors.name && <p className="Error">{errors.name}</p>} */}
				<label className='formLbl'>*Description</label>
				<textarea
					id='formInput'
					name='description'
					value={input.description}
					placeholder='Description...'
					maxLength={2000}
					rows={5}
					onChange={event => handleInputChange(event)}
					// className={errors.description && "Error"}
				/>

				{/* {errors.description && <p className="Error">{errors.description}</p>} */}
				<label className='formLbl'>Released</label>
				<input
					id='formInput'
					type='date'
					name='released'
					value={input.released}
					placeholder='Released date...'
					onChange={event => handleInputChange(event)}
				/>

				<label className='formLbl'>Rating (0-5)</label>
				<input
					id='formInput'
					type='number'
					name='rating'
					value={input.rating}
					placeholder='Rating...'
					onChange={event => handleInputChange(event)}
				/>

				{/* <label className='formLbl'>Algo</label>
				<DropdownMenu
				title='Select one or more genres' items={newItems}
				multiselect />
			 */}
				<span className='formSpan'>
					<span className='selectSpan'>
						<label className='formLbl'>*Genres (at least one)</label>
						<select
							id='formInput'
							// className={errors.genres && "Error"}
							name='genres'
							multiple={true}
							required
							onChange={event => handleInputChange(event)}
						>
							{selectGenres.map(genre => (
								<option
									defaultValue={null}
									defaultChecked
									value={genre.id}
									key={genre.id}
								>
									{genre.name}
								</option>
							))}
						</select>
						<ul>
							{input.genres &&
								input.genres.map((genre, i) => (
									<ul className='list-items' key={genre[i]}>
										{genre.name}
									</ul>
								))}
						</ul>
					</span>
					<span className='selectSpan'>
						<label className='formLbl'>*Platforms (at least one)</label>
						<select
							id='formInput'
							// className={errors.platforms && "Error"}
							name='platforms'
							required
							multiple={true}
							onChange={event => handleInputChange(event)}
						>
							{selectPlatforms.map(plat => (
								<option
									defaultValue={null}
									defaultChecked
									value={plat.id}
									key={plat.id}
								>
									{plat.name}
								</option>
							))}
						</select>
						<ul>
							{input.platforms &&
								input.platforms.map((plat, i) => (
									<ul className='list-items' key={plat[i]}>
										{plat.name}
									</ul>
								))}
						</ul>
					</span>
				</span>
				<label className='formLbl'>Select an image</label>
				{/* <input
					type='file'
					name='image'
					id='formInput'
					value={input.image}
					onChange={event => handleInputChange(event)}
				/> */}
				<input
					id='formInput'
					name='image'
					type='url'
					value={input.image}
					placeholder='http://.../*.jpg'
					onChange={event => handleInputChange(event)}
				/>
				<span>
					{input.image && (
						<img
							className='image-span'
							src={input.image}
							alt='game poster to be created'
						/>
					)}
				</span>

				<button className='formBtn' type='submit'>
					Save game
				</button>
			</form>
			<footer className='formFooter'>
				Fields marked with *, are mandatory to create a game.
			</footer>
		</div>
	);
};

export default CreateVideogame;
