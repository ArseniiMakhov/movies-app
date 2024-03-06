import { Component } from 'react'
import { List, Spin, Alert } from 'antd'

import FilmCard from '../FilmCard/FilmCard'

export default class FilmList extends Component {
  render() {
    const { movies, loading, errorIndicator, onPagination, query, total, pageNum, setRate } = this.props

    if (query === '') {
      return
    }

    if (movies.length === 0 && query !== '') {
      return <Alert className="list-warning" message="No results" description="Try again" type="warning" />
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
        }}
        dataSource={movies}
        loading={loading}
        loadingindicator={<Spin />}
        pagination={{
          position: 'bottom',
          align: 'center',
          pageSize: 20,
          total: total,
          showSizeChanger: false,
          showTitle: false,
          current: pageNum,
          onChange: (page) => onPagination(page, query),
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
