import { useApolloClient, gql } from "@apollo/client";
import { useEffect, useState } from "react";

function Movies() {
  const [movies, setMovies] = useState([]);
  const client = useApolloClient();
  useEffect(() => {
    client
      .query({
        query: gql`
          {
            allMovies {
              title
            }
          }
        `,
      })
      .then((data) => setMovies(data.data.allMovies));
  }, [client]);
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </ul>
  );
}

export default Movies;
