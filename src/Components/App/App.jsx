import { Component } from 'react'
import { Offline, Online } from 'react-detect-offline'
import { Alert } from 'antd'

import moviesService from '../../Services/moviesService'
import '../../App.css'
import FilmList from '../FilmList/FilmList'

export default class App extends Component {
  moviesService = new moviesService()

  state = {
    movies: [],
    loading: true,
    errorIndicator: false,
  }

  constructor() {
    super()
    this.getMovies()
  }

  onError() {
    this.setState({ errorIndicator: true })
  }

  getMovies() {
    this.moviesService
      .getQueryMovies('return')
      .then((body) => {
        this.setState({ movies: body, loading: false })
      })
      .catch(this.onError)
  }

  render() {
    return (
      <>
        <Online>
          <FilmList
            movies={this.state.movies}
            loading={this.state.loading}
            errorIndicator={this.state.errorIndicator}
          />
        </Online>
        <Offline>
          <Alert
            message="You are offline"
            description="Check your internet connection"
            type="warning"
            style={{ textAlign: 'center' }}
          />
        </Offline>
      </>
    )
  }
}
