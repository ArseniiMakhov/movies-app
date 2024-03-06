import { Component } from 'react'
import { Card, Button, Flex } from 'antd'
import { format } from 'date-fns'

import { GenresConsumer } from '../../Services/moviesContext'
import Rating from '../Rating/Rating'

const { Meta } = Card

export default class FilmCard extends Component {
  render() {
    const { item, setRate } = this.props

    function shorten(str, maxLen, separator = ' ') {
      if (str.length <= maxLen) return str
      return str.substr(0, str.lastIndexOf(separator, maxLen)) + '...'
    }

    function genresFilter(allGenres, filmGenres) {
      const filteredGenres = allGenres
        .filter((el) => filmGenres.includes(el.id))
        .map((el) => {
          return (
            <Button className="genres-item" key={el.name}>
              {el.name}
            </Button>
          )
        })
      return <ul>{filteredGenres}</ul>
    }

    function borderStyle(rate) {
      if (rate < 3) {
        return '2px solid #E90000'
      }
      if (rate >= 3 && rate < 5) {
        return '2px solid #E97E00'
      }
      if (rate >= 5 && rate < 7) {
        return '2px solid #E9D100'
      }
      if (rate >= 7) {
        return '2px solid #66E900'
      }
    }

    return (
      <GenresConsumer>
        {({ allGenres }) => {
          return (
            <Card
              className="item-card"
              bordered={false}
              cover={
                <img
                  className="card-img"
                  src={
                    item.poster
                      ? `https://image.tmdb.org/t/p/original${item.poster}`
                      : 'https://i.mycdn.me/image?id=814327925848&t=0&plc=WEB&tkn=*GsdCWAmDvjL9x0vo-r1OjNdHSKY'
                  }
                />
              }
            >
              <Meta
                title={
                  <div className="card-header">
                    <div className="card-title-box">
                      <h2 className="card-title">{item.title}</h2>
                      <span className="card-rating" style={{ border: borderStyle(item.average) }}>
                        {item.average ? item.average.toFixed(1) : 0}
                      </span>
                    </div>
                    <div className="card-title-info">
                      {item.release ? (
                        <p className="card-date">{format(new Date(item.release), 'MMM dd, yyyy')}</p>
                      ) : (
                        <p className="card-date">---</p>
                      )}
                      <Flex className="card-genres" gap="small" wrap="wrap">
                        {genresFilter(allGenres, item.genres)}
                      </Flex>
                    </div>
                  </div>
                }
                description={
                  <>
                    {item.overview ? (
                      <p className="card-description">{shorten(item.overview, 120)}</p>
                    ) : (
                      <p className="card-description">There&apos;s no description.</p>
                    )}
                    <Rating item={item} setRate={setRate} />
                  </>
                }
              />
            </Card>
          )
        }}
      </GenresConsumer>
    )
  }
}
