import { Component } from 'react'
import { Offline, Online } from 'react-detect-offline'
import { Alert } from 'antd'

import moviesService from '../../Services/moviesService'
import '../../App.css'
import FilmList from '../FilmList/FilmList'
import FilmInput from '../FilmInput/FilmInput'

export default class App extends Component {
  moviesService = new moviesService()

  state = {
    movies: null,
    loading: null,
    errorIndicator: false,
    query: '',
    total: null,
    pageNum: null,
  }

  onError = () => {
    this.setState({ errorIndicator: true })
  }

  getMovies = (query, page) => {
    this.setState({ loading: true })
    this.moviesService
      .getQueryMovies(query, page)
      .then((data) => {
        this.setState({ movies: data.items, loading: false, query, total: data.total, pageNum: page })
      })
      .catch(this.onError)
  }

  render() {
    return (
      <>
        <Online>
          <FilmInput getMovies={this.getMovies} />
          <FilmList
            movies={this.state.movies}
            loading={this.state.loading}
            errorIndicator={this.state.errorIndicator}
            onPagination={this.getMovies}
            query={this.state.query}
            total={this.state.total}
            pageNum={this.state.pageNum}
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
