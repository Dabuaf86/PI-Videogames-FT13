import { Link } from "react-router-dom";
import "./Games.css";
// import "./LoadedGames.css";

const Games = ({ loadedVideogames, loading }) => {
  if (loading) {
    return <h2 className="homeH2">CHUPALA, YA VOY!</h2>;
  }
  return (
    <div className="gamesContainer">
      {loadedVideogames &&
        loadedVideogames.map((game) => (
          <div className="games" key={game.id}>
            <Link to={`/videogame/${game.id}`}>
              <h2>{game.name}</h2>
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
