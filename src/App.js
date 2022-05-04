import "bootstrap/dist/css/bootstrap.min.css";
import "./components/homepage.css";
import './components/auth/login.css'
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { MovieCard } from "./components/card/card";
import { MovieReview } from "./components/movieDetails/moviedetails";
import { Container } from "react-bootstrap";
import { HomePage } from "./components/homepage";
import { FetchAndSearchMovies } from './components/FetchAndSearchMovies'
import { SearchedMovieInfo } from './components/movieDetails/movieInfo'
import { DataProvider } from "./components/data/DataProvider";
import { FavoriteMoviesCards } from './components/favorites/favorites';
import { FavoritedMovieInfo } from './components/favorites/favoritedMovieInfo'
import { MovieReviewForm } from './components/reviews/reviewForm'

export const App = (props) => {
  return (
    <>
      <BrowserRouter>
        <DataProvider>
          <Container className='card-Class'>
            <Switch>
              <Route
                exact
                path='/home'
                render={(matchProps) => {
                  return (
                    <>
                      <HomePage />
                      <MovieCard
                        {...matchProps} />
                    </>);
                }} />
            </Switch>
          </Container>
          <Route
            exact
            path='/movie'
            component={MovieReview}
            render={(matchProps) => {
              return <MovieReview {...matchProps} />;
            }}
          />
          <Container className='card-Class'>
            <Route
              exact
              path='/reviews'
              component={MovieCard}
              render={(matchProps) => {
                return <MovieCard {...matchProps} />;
              }}
            />
          </Container>
          <Container className='card-Class'>
            <Route
              exact
              path='/movieCards'
              component={MovieCard}
              render={(matchProps) => {
                return <MovieCard {...matchProps} />;
              }}
            />
          </Container>
          <Route
            exact
            path='/MovieCards/:id(\d+)/movie'
            render={(matchProps) => {
              return <MovieReview {...matchProps} />;
            }}
          />
          <Route
            exact
            path='/MovieCards/:id(\d+)/:movieId(\d+)/:path/editreview'
            render={(matchProps) => {
              return <MovieReviewForm {...matchProps} />;
            }}
          />
          <Route
            exact
            path='/searchedmovies'
            render={(matchProps) => {
              return <FetchAndSearchMovies {...matchProps} />;
            }} />
          <Route
            exact
            path='/searchedmovies/:movieId(\d+)/movieInfo'
            render={(matchProps) => {
              return <SearchedMovieInfo {...matchProps} />;
            }}
          />
          <Container className='card-Class'>
            <Route
              exact
              path='/favoritemovies'
              component={FavoriteMoviesCards}
              render={(matchProps) => {
                return <FavoriteMoviesCards {...matchProps} />;
              }} />
          </Container>
          <Route
            exact
            path='/favoritemovies/:movieId(\d+)'
            render={(matchProps) => {
              return <FavoritedMovieInfo {...matchProps} />;
            }}
          />
          <Route
            path='/favoritemovies/:path/:movieId(\d+)/moviereview'
            render={(matchProps) => {
              return <MovieReviewForm {...matchProps} />;
            }}
          />
        </DataProvider>
      </BrowserRouter>
    </>
  );
}
