import { Component, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import debounce from 'lodash.debounce'
import { saveClapsToDatabase } from './utils'

class ClapButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      claps: 0,
      queueClaps: 0,
    }
    this.saveClaps = debounce(this.saveClaps, 1000)
  }

  saveClaps = () => {
    saveClapsToDatabase(this.state.queueClaps).then((latestClaps) => {
      this.setState({
        claps: latestClaps,
        queueClaps: 0,
      })
    })
  }

  clap = () => {
    this.setState((state) => {
      return { queueClaps: state.queueClaps + 1 }
    })
    this.saveClaps()
  }

  render() {
    return (
      <div className="text-center spacing">
        <button onClick={this.clap} className="button">
          Clap
        </button>
        <hr />
        <div className="horizontal-spacing">
          <span>Queue Claps: {this.state.queueClaps}</span>
          <span>Claps: {this.state.claps}</span>
        </div>
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<ClapButton />)

// One of our instructors wrote a blog article on this exact topic of "debouncing claps":
// https://reacttraining.com/blog/blog-claps-and-lessons-on-hooks/
