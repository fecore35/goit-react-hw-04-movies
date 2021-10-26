import { Route, Switch } from "react-router-dom";
import Header from "components/Header";
import Nav from "components/Nav";
import HomePage from "views/HomePage";
import MoviesPage from "views/MoviesPage";
import MovieDetailsPage from "views/MovieDetailsPage";

function App() {
  return (
    <div className="App">
      <Header>
        <Nav />
      </Header>

      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>

        <Route exact path="/movies">
          <MoviesPage />
        </Route>

        <Route path="/movies/:movieId">
          <MovieDetailsPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
