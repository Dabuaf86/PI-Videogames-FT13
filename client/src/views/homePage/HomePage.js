import Games from '../../components/games/Games';
import Filters from '../../components/searchFilter/SearchFilter';
import './homePage.css';

const HomePage = () => {
	return (
		<div className='home'>
			<span className='filterBar'>
				<Filters />
			</span>
			<Games />
		</div>
	);
};

export default HomePage;
