import "bootstrap/dist/css/bootstrap.min.css";
import "./components/homepage.css";
import './components/login.css'
import { Route, BrowserRouter } from "react-router-dom";
import { MovieCard } from "./components/card";
import { MovieReview } from "./components/moviedetails";
import { NavBar } from "./components/Nav";
import { Container } from "react-bootstrap";
import { HomePage } from "./components/homepage";
import { FetchAndSearchMovies } from './components/FetchAndSearchMovies'
import { SearchedMovieInfo } from './components/movieInfo'
import { DataProvider } from "./components/DataProvider";
import { FavoriteMoviesCards } from './components/favorites';
import { FavoritedMovieInfo } from './components/favoritedMovieInfo'
import { MovieReviewForm } from './components/reviewForm'
import { Login } from './components/login'
import { Register } from "./components/register";

function App() {
  return (
    <>
      <BrowserRouter>
        <DataProvider>
          <Route
            exact path='/login'
            component={Login}
            render={(props) => (
              <Login {...props} />
            )}
          />
          <Route
            exact path='/register'
            component={Register}
            render={(props) => (
              <Register {...props} />
            )}
          />
          <Route
            path="/logout"
            render={(props) => {
              localStorage.removeItem('local_user')
              props.history.push('/login')
            }}
          ></Route>
          <NavBar />
          <Container className='card-Class'>
            <Route
              exact
              path='/'
              render={(matchProps) => {
                return (
                  <>
                    <HomePage />
                    <MovieCard
                      {...matchProps} />
                  </>);
              }} />
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
export default App;
