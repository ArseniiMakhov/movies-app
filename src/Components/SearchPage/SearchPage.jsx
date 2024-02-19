import { Component } from 'react'

import FilmList from '../FilmList/FilmList'
import FilmInput from '../FilmInput/FilmInput'

export default class SearchPage extends Component {
  render() {
    const { getMovies, state, setRate } = this.props

    return (
      <>
        <FilmInput getMovies={getMovies} />
        <FilmList
          movies={state.movies}
          ratedMovies={state.ratedMovies}
          loading={state.loading}
          errorIndicator={state.errorIndicator}
          onPagination={getMovies}
          query={state.query}
          total={state.total}
          pageNum={state.pageNum}
          setRate={setRate}
        />
      </>
    )
  }
}
