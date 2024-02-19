import { Component } from 'react'
import { Input } from 'antd'
import { debounce } from 'lodash'

export default class FilmInput extends Component {
  state = {
    label: '',
  }

  onChange = (e) => {
    this.setState({ label: e.target.value })
  }

  componentDidUpdate = debounce((prevProps, prevState) => {
    if (this.state.label !== prevState.label) {
      this.props.getMovies(1, this.state.label)
    }
  }, 1000)

  render() {
    return (
      <div className="film-input">
        <Input
          type="text"
          autoFocus
          onChange={this.onChange}
          value={this.state.label}
          placeholder="Type to search..."
        />
      </div>
    )
  }
}
