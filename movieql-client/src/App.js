import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movie from "./route/Movie";
import Movies from "./route/Movies";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/" element={<Movies />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
