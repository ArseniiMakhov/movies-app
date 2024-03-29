import { Component } from 'react'
import { Offline, Online } from 'react-detect-offline'
import { Alert, Tabs } from 'antd'

import moviesService from '../../Services/moviesService'
import '../../App.css'
import SearchPage from '../SearchPage/SearchPage'
import { GenresProvider } from '../../Services/moviesContext'
import RatedPage from '../RatedPage/RatedPage'

export default class App extends Component {
  moviesService = new moviesService()

  componentDidMount() {
    this.moviesService
      .getGenres()
      .then((data) => {
        this.setState({ allGenres: data })
      })
      .catch(this.onError)
    this.moviesService
      .createGuestSession()
      .then((sessionID) => {
        localStorage.setItem('sessionID', sessionID)
      })
      .catch(this.onError)
  }

  state = {
    movies: [],
    ratedMovies: [],
    total: null,
    totalRated: null,
    pageNum: null,
    pageNumRated: null,
    loading: true,
    loadingRated: true,
    errorIndicator: false,
    query: '',
    allGenres: null,
  }

  onError = () => {
    this.setState({ errorIndicator: true })
  }

  getMovies = (page, query) => {
    this.setState({ loading: true })
    this.moviesService
      .getQueryMovies(page, query)
      .then((data) => {
        this.setState({
          movies: data.items,
          loading: false,
          query,
          total: data.total,
          pageNum: page,
        })
      })
      .catch(this.onError)
  }

  getRatedMovies = (page) => {
    this.setState({ loadingRated: true })
    this.moviesService
      .getRated(page, localStorage.getItem('sessionID'))
      .then((data) => {
        this.setState({
          ratedMovies: data.items,
          loadingRated: false,
          totalRated: data.total,
          pageNumRated: page,
        })
      })
      .catch(this.onError)
  }

  setRate = (rate, filmID) => {
    this.moviesService.postRate(rate, filmID, localStorage.getItem('sessionID')).catch(this.onError)
  }

  render() {
    const props = this.state
    return (
      <>
        <Online>
          <GenresProvider value={props}>
            <Tabs
              defaultActiveKey="1"
              indicator={{ size: 70 }}
              centered={true}
              onTabClick={(key) => {
                if (key === '2') {
                  this.getRatedMovies()
                }
              }}
              items={[
                {
                  label: 'Search',
                  key: '1',
                  children: <SearchPage getMovies={this.getMovies} state={this.state} setRate={this.setRate} />,
                },
                {
                  label: 'Rated',
                  key: '2',
                  children: (
                    <RatedPage
                      movies={this.state.ratedMovies}
                      errorIndicator={this.state.errorIndicator}
                      onPagination={this.getRatedMovies}
                      totalRated={this.state.totalRated}
                      pageNum={this.state.pageNumRated}
                      loading={this.state.loadingRated}
                      setRate={this.setRate}
                    />
                  ),
                },
              ]}
            />
          </GenresProvider>
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
