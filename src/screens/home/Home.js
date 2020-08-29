import React, { Component } from "react";
import "./Home.css";
import moviesData from "../../assets/movieData";
import Header from "../../common/header/Header";
import genres from "./../../common/genres";
import artists from "./../../common/artists";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = (theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  upcomingMoviesHeading: {
    textAlign: "center",
    background: "#ff9999",
    padding: "8px",
    fontSize: "1rem",
  },
  gridListUpcomingMovies: {
    flexWrap: "nowrap",
    transform: "translateX(50)",
    width: "100%",
    height: "230px",
  },
  gridListMain: {
    transform: "translateZ(0)",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 240,
    maxWidth: 240,
  },
  title: {
    color: theme.palette.primary.light,
  },
  cardContent: {
    textAlign: "center",
  },
});

class Home extends Component {
  constructor() {
    super();
    this.state = { movieName: "", genres: [], artists: [], upcomingMovies: [] };
  }

  movieNameChangeHandler = (event) => {
    this.setState({ movieName: event.target.value });
  };

  genreSelectHandler = (event) => {
    this.setState({ genres: event.target.value });
  };

  artistSelectHandler = (event) => {
    this.setState({ artists: event.target.value });
  };

  movieClickHandler = (movieId) => {
    this.props.history.push("/movie/" + movieId);
  };

  UNSAFE_componentWillMount() {
    let data = null;
    let xhr = new XMLHttpRequest();
    let that = this;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        that.setState({ upcomingMovies: JSON.parse(this.responseText).movies });
      }
    });

    xhr.open("GET", this.props.baseUrl + "movies?status=PUBLISHED");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.send(data);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header></Header>
        <div className={classes.upcomingMoviesHeading}>
          <span>Upcoming Movies</span>
        </div>

        <GridList cols={5} className={classes.gridListUpcomingMovies}>
          {this.state.upcomingMovies.map((movie) => (
            <GridListTile
              className="gridListTileUpcomingMovies"
              key={"upcoming" + movie.id}
            >
              <img
                src={movie.poster_url}
                className="movie-poster"
                alt={movie.title}
              ></img>
              <GridListTileBar title={movie.title}></GridListTileBar>
            </GridListTile>
          ))}
        </GridList>

        <div className="flex-container">
          <div className="left">
            <GridList
              cellHeight={350}
              cols={4}
              className={classes.gridListMain}
            >
              {moviesData.map((movie) => (
                <GridListTile
                  key={"grid" + movie.id}
                  className="released-movie-grid-item"
                  onClick={() => this.movieClickHandler(movie.id)}
                >
                  <img
                    src={movie.poster_url}
                    className="movie-poster"
                    alt={movie.title}
                  ></img>
                  <GridListTileBar
                    title={movie.title}
                    subtitle={
                      <span>
                        Release Date:{" "}
                        {new Date(movie.release_date).toDateString()}
                      </span>
                    }
                  ></GridListTileBar>
                </GridListTile>
              ))}
            </GridList>
          </div>

          <div className="right">
            <Card>
              <CardContent className={classes.cardContent}>
                <FormControl className={classes.formControl}>
                  <Typography className={classes.title} color="textSecondary">
                    FIND MOVIES BY:
                  </Typography>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="movieName">Movie Name</InputLabel>
                  <Input
                    id="movieName"
                    onChange={this.movieNameChangeHandler}
                  ></Input>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="select-multiple-checkbox-genre">
                    Genres
                  </InputLabel>
                  <Select
                    multiple
                    input={<Input id="select-multiple-checkbox-genre"></Input>}
                    renderValue={(selected) => selected.join(", ")}
                    value={this.state.genres}
                    onChange={this.genreSelectHandler}
                  >
                    {genres.map((genre) => (
                      <MenuItem key={genre.id} value={genre.name}>
                        <Checkbox
                          checked={this.state.genres.indexOf(genre.name) > -1}
                        ></Checkbox>
                        <ListItemText primary={genre.name}></ListItemText>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="select-multiple-checkbox-artist">
                    Artists
                  </InputLabel>
                  <Select
                    multiple
                    input={<Input id="select-multiple-checkbox-artist"></Input>}
                    renderValue={(selected) => selected.join(", ")}
                    value={this.state.artists}
                    onChange={this.artistSelectHandler}
                  >
                    {artists.map((artist) => (
                      <MenuItem
                        key={artist.id}
                        value={artist.first_name + " " + artist.last_name}
                      >
                        <Checkbox
                          checked={
                            this.state.artists.indexOf(
                              artist.first_name + " " + artist.last_name
                            ) > -1
                          }
                        ></Checkbox>
                        <ListItemText
                          primary={artist.first_name + " " + artist.last_name}
                        ></ListItemText>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <TextField
                    id="releaseStartDate"
                    label="Release Start Date"
                    type="date"
                    defaultValue=""
                    InputLabelProps={{ shrink: true }}
                  ></TextField>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <TextField
                    id="releaseEndDate"
                    label="Release End Date"
                    type="date"
                    defaultValue=""
                    InputLabelProps={{ shrink: true }}
                  ></TextField>
                </FormControl>
                <br />
                <br />
                <FormControl className={classes.formControl}>
                  <Button variant="contained" color="primary">
                    APPLY
                  </Button>
                </FormControl>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
