export default class moviesService {
  _APIKey = '81e8e445d64588a7d995b8ce95ec23dd'
  _APIToken =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MWU4ZTQ0NWQ2NDU4OGE3ZDk5NWI4Y2U5NWVjMjNkZCIsInN1YiI6IjY1YWJmNTE2NTk0Yzk0MDExMzhhZDE1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pj49ffaIjIoxmj16w3s1rYDXi1hNSZX6RRPC9pIwrA0'

  options = {
    get: {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${this._APIToken}`,
      },
    },
    guestGet: {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    },
    post(rate) {
      return {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ value: rate }),
      }
    },
  }

  async getResource(url, options) {
    const res = await fetch(url, options)

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` + `, received ${res.status}`)
    }
    return await res.json()
  }

  getQueryMovies = async (page = 1, query = '') => {
    const res = await this.getResource(
      `https://api.themoviedb.org/3/search/movie?api_key=${this._APIKey}&query=${query}&include_adult=false&language=en-US&page=${page}`,
      this.options.guestGet
    )
    const items = res.results.map(this.transformData)
    const total = res.total_pages * 20
    return { items, total }
  }

  getRated = async (page = 1, sessionID) => {
    const res = await this.getResource(
      `https://api.themoviedb.org/3/guest_session/${sessionID}/rated/movies?api_key=${this._APIKey}&language=en-US&page=${page}&sort_by=created_at.asc`,
      this.options.guestGet
    )
    const items = res.results.map(this.transformData)
    const total = res.total_pages * 20
    return { items, total }
  }

  async getGenres() {
    const res = await this.getResource(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${this._APIKey}&language=en`,
      this.options.guestGet
    )
    return res.genres
  }

  async createGuestSession() {
    const res = await this.getResource(
      `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${this._APIKey}`,
      this.options.guestGet
    )
    return res.guest_session_id
  }

  postRate = async (rate, filmID, sessionID) => {
    const res = await this.getResource(
      `https://api.themoviedb.org/3/movie/${filmID}/rating?guest_session_id=${sessionID}&api_key=${this._APIKey}`,
      this.options.post(rate)
    )
    return res
  }

  transformData(item) {
    return {
      id: item.id,
      title: item.original_title,
      release: item.release_date,
      overview: item.overview,
      poster: item.poster_path,
      average: item.vote_average,
      genres: item.genre_ids,
      rating: item.rating || null,
    }
  }
}
