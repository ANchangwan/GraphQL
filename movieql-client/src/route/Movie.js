import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const GET_MOVIE = gql`
  query getMovie($movieId: String!) {
    movie(id: $movieId) {
      id
      title
    }
  }
`;

function Movie() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_MOVIE, {
    variables: {
      movieId: id,
    },
  });
  if (loading) {
    return <h1>Fetching Movie...</h1>;
  }
  if (error) {
    return <h1>Could not fetch :(</h1>;
  }
  return <div>{data.movie.title}</div>;
}

export default Movie;
