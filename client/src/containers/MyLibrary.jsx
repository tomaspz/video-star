import React, { Component } from "react";
import NavBar2 from "../components/Shared/NavBar/NavBar2";
import Hero from "../components/Shared/Hero/Hero";
import GreyBlockTop from "../components/Shared/GreyBlockTop/GreyBlockTop";
import GreyBlock from "../components/Shared/GreyBlock/GreyBlock";
import API from "../utils/API";
// import { Redirect } from "react-router-dom";
import WatchingMovieImage from "../img/watching-movie.jpg";
import VideosTable from "../components/Shared/Table/VideosTable";


class MyLibrary extends Component {
  constructor() {
    super();
    this.state = {
      token: "",
      results: [],
      genreFilters: [],
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.blah = this.blah.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

  }
  async componentDidMount() {
    let token = localStorage.getItem("jwt");
    let results = await API.getVideos(token);
    this.setState({ results: results.data, token: token });
  }

  blah(genre_id) {
    if (this.state.genreFilters.includes(genre_id)) {
      this.setState({
        genreFilters: this.state.genreFilters.filter(g => g !== genre_id)
      });
    } else {
      this.setState({
        genreFilters: [...this.state.genreFilters, genre_id]
      });
    }
  }

  async handleDelete(index) {
    try {
        let idToDelete = this.state.results[index].id;
        let result = await API.deleteVideo(idToDelete, this.state.token);
        if (result.data.success) {
          this.setState({ results: this.state.results.filter(r => r.id !== idToDelete) });
        }
      } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <>
        <NavBar2 />
        <Hero imageUrl={WatchingMovieImage} />
        <GreyBlockTop page="My Library" />

        {/* TABLE OF LIBRARY OF VIDEOS GOES HERE */}
        <VideosTable videosToDisplay={this.state.results} handleDelete={this.handleDelete} genreFilters={this.state.genreFilters} handleGenreClick={this.blah}/>

        {/* LIBRARY OF VIDEOS GOES HERE */}

        <GreyBlock />
      </>
    );
  }
}

export default MyLibrary;
