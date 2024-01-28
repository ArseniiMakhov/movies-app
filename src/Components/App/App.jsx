import { Component } from 'react'
import { Card, List, Button, Flex } from 'antd'
import { format } from 'date-fns'

import moviesService from '../../Services/moviesService'
import './App.css'

const { Meta } = Card
export default class App extends Component {
  moviesService = new moviesService()

  state = {
    movies: [],
  }

  constructor() {
    super()
    this.getMovies()
  }

  getMovies() {
    this.moviesService.getQueryMovies('return').then((body) => {
      this.setState({ movies: body })
    })
  }

  render() {
    function shorten(str, maxLen, separator = ' ') {
      if (str.length <= maxLen) return str
      return str.substr(0, str.lastIndexOf(separator, maxLen)) + '...'
    }

    return (
      <List
        className="movies-list"
        grid={{
          gutter: 36,
          column: 2,
        }}
        dataSource={this.state.movies}
        renderItem={(item) => (
          <List.Item className="movies-item" style={{ padding: 0, marginBlockEnd: 36 }}>
            <Card
              className="item-card"
              style={{ borderRadius: 0 }}
              cover={
                <img
                  style={{ width: 185, height: 280, backgroundColor: 'black', borderRadius: 0 }}
                  src={item.poster_path ? `https://image.tmdb.org/t/p/original${item.poster_path}` : null}
                />
              }
              bordered={false}
            >
              <Meta
                style={{ borderRadius: 0 }}
                title={<h2 className="card-title">{item.original_title}</h2>}
                description={
                  <>
                    {item.release_date ? (
                      <p className="card-date">{format(new Date(item.release_date), 'MMM dd, yyyy')}</p>
                    ) : (
                      <p className="card-date">---</p>
                    )}
                    <Flex className="card-genres" gap="small" wrap="wrap">
                      <Button className="genres-item">Action</Button>
                    </Flex>
                    {item.overview ? (
                      <p className="card-description">{shorten(item.overview, 395)}</p>
                    ) : (
                      <p className="card-description">There&apos;s no description.</p>
                    )}
                  </>
                }
              />
            </Card>
          </List.Item>
        )}
      />
    )
  }
}
