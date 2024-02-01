import { Component } from 'react'
import { Card, List, Button, Flex, Spin, Alert } from 'antd'
import { format } from 'date-fns'

const { Meta } = Card

export default class FilmList extends Component {
  render() {
    const { movies, loading, errorIndicator } = this.props

    function shorten(str, maxLen = 250, separator = ' ') {
      if (str.length <= maxLen) return str
      return str.substr(0, str.lastIndexOf(separator, maxLen)) + '...'
    }

    return (
      <>
        {errorIndicator ? (
          <Alert
            message="Error"
            description="Data could not be retrieved"
            type="error"
            style={{ textAlign: 'center' }}
          />
        ) : (
          <List
            className="movies-list"
            grid={{
              gutter: 36,
              column: 2,
            }}
            dataSource={movies}
            loading={loading}
            loadingIndicator={<Spin />}
            renderItem={(item) => (
              <List.Item className="movies-item" style={{ padding: 0, marginBlockEnd: 36 }}>
                <Card
                  className="item-card"
                  cover={
                    <img
                      style={{ width: 185, height: 280, backgroundColor: 'black' }}
                      src={item.poster ? `https://image.tmdb.org/t/p/original${item.poster}` : null}
                    />
                  }
                  bordered={false}
                >
                  <Meta
                    title={<h2 className="card-title">{item.title}</h2>}
                    description={
                      <>
                        {item.release ? (
                          <p className="card-date">{format(new Date(item.release), 'MMM dd, yyyy')}</p>
                        ) : (
                          <p className="card-date">---</p>
                        )}
                        <Flex className="card-genres" gap="small" wrap="wrap">
                          <Button className="genres-item">Action</Button>
                        </Flex>
                        {item.overview ? (
                          <p className="card-description">{shorten(item.overview)}</p>
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
        )}
      </>
    )
  }
}
