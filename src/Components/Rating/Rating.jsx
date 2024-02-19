import { Rate } from 'antd'
import { Component } from 'react'

export default class Rating extends Component {
  state = {
    rating: 0,
  }

  componentDidUpdate(prevProps) {
    if (prevProps.item.id !== this.props.item.id) {
      this.setState({ rating: 0 })
    }
  }

  render() {
    const { item, setRate } = this.props

    if (item.rating) {
      return (
        <Rate
          className="card-stars"
          allowHalf
          defaultValue={item.rating}
          count={10}
          onChange={(value) => {
            setRate(value, item.id)
          }}
        />
      )
    } else {
      return (
        <Rate
          className="card-stars"
          allowHalf
          count={10}
          value={this.state.rating}
          onChange={(value) => {
            setRate(value, item.id)
            this.setState({ rating: value })
          }}
        />
      )
    }
  }
}
