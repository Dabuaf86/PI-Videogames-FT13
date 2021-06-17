import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllVideogames } from "../../Actions/Actions";

const testHome = () => {
  const [isloading, setIsLoading] = useState(true);
  const [loadedVideogames, setLoadedVideogames] = useState;
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(false);
    setLoadedVideogames(loadedVideogames);
    // dispatch(getAllVideogames());
  }, []);

  return {
    isloading,
    loadedVideogames
  };
};

export default testHome;
