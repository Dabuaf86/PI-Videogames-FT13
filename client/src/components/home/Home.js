import Games from '../games/Games';
import Filters from '../genreFilter/GenreFilter';
import './home.css';

const Home = () => {
	return (
		<div className='home'>
			<span className='filterBar'>
				<Filters />
			</span>
			<Games />
		</div>
	);
};

export default Home;
