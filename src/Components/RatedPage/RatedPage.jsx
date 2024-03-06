import { Component } from 'react'
import { List, Alert, Spin } from 'antd'

import FilmCard from '../FilmCard/FilmCard'

export default class RatedPage extends Component {
  render() {
    const { movies, errorIndicator, onPagination, totalRated, pageNum, loading, setRate } = this.props

    if (movies.length === 0) {
      return <Alert className="list-warning" message="There's no rated movies" type="warning" />
    }

    if (errorIndicator) {
      return <Alert className="list-warning" message="Error" description="Data could not be retrieved" type="error" />
    }

    return (
      <List
        className="movies-list"
        grid={{
          gutter: 36,
          xs: 1,
          sm: 2,
          column: 2,
        }}
        dataSource={movies}
        loading={loading}
        loadingindicator={<Spin />}
        pagination={{
          position: 'bottom',
          align: 'center',
          pageSize: 20,
          total: totalRated,
          showSizeChanger: false,
          showTitle: false,
          current: pageNum,
          onChange: (page) => onPagination(page),
        }}
        renderItem={(item) => (
          <List.Item className="movies-item" style={{ padding: 0, marginBlockEnd: 36 }}>
            <FilmCard item={item} setRate={setRate} />
          </List.Item>
        )}
      />
    )
  }
}
