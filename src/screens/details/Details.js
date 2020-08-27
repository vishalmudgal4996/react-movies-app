import React, { Component } from "react";
import Header from "../../common/header/Header";
import moviesData from "../../assets/movieData";
import Typography from "@material-ui/core/Typography";
import "./Details.css";

class Details extends Component {
  constructor() {
    super();
    this.state = { movie: {} };
  }

  componentWillMount() {
    let currentState = this.state;
    currentState.movie = moviesData.filter((mov) => {
      return mov.id === this.props.movieId;
    })[0];
    this.setState({ currentState });
  }

  render() {
    let movie = this.state.movie;
    return (
      <div className="detail">
        <Header />
        <div className="flex-containerDetails">
          <div className="leftDetails">
            <img src={movie.poster_url} alt={movie.title} />
          </div>
          <div className="middleDetails">
            <div>
              <Typography variant="headline" component="h2">
                {movie.title}
              </Typography>
            </div>
            <div>
              <Typography>
                <span className="bold">Genres: </span>
                {movie.genres.join(", ")}
              </Typography>
            </div>
          </div>
          <div className="rightDetails"></div>
        </div>
      </div>
    );
  }
}

export default Details;
