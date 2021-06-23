import { Link } from "react-router-dom";
import "./Games.css";
import Loading from "../Loading/Loading";
// import "./LoadedGames.css";

const Games = ({ loadedVideogames, loading }) => {
  if (loading) return Loading;
  // return <h2 className="homeH2">Loading...please wait</h2>;
  else return (
    <div className="gamesGrid">
      {loadedVideogames &&
        loadedVideogames.map((game) => (
          <div className="games" key={game.id}>
            <Link to={`/videogame/${game.id}`}>
              <h3 className="gamesH3">{game.name}</h3>
              <img className="homeIMG" src={game.image} alt="game poster" />
            </Link>
            <>
              {game.genre &&
                game.genre.map((el) => {
                  return <li className="homeLi">{el.name}</li>;
                })}
            </>
          </div>
        ))}
    </div>
  );
};

export default Games;
