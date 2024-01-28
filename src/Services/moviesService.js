export default class moviesService {
  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MWU4ZTQ0NWQ2NDU4OGE3ZDk5NWI4Y2U5NWVjMjNkZCIsInN1YiI6IjY1YWJmNTE2NTk0Yzk0MDExMzhhZDE1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pj49ffaIjIoxmj16w3s1rYDXi1hNSZX6RRPC9pIwrA0',
    },
  }

  async getResource(url, options) {
    const res = await fetch(url, options)

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` + `, received ${res.status}`)
    }
    return await res.json()
  }
  async getQueryMovies(query) {
    const res = await this.getResource(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US`,
      this.options
    )
    return res.results
  }
}
