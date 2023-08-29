import Games from '../games/Games';
import Filters from '../searchFilter/SearchFilter';
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
