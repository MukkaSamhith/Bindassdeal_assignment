import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {x: 'red', y: '', z: '', p: 1}

  componentDidMount() {
    setInterval(this.change, 3000)
  }

  change = () => {
    const {p} = this.state
    console.log(p)
    let color1 = ''
    let color2 = ''
    let color3 = ''
    switch (p % 3) {
      case 0:
        color1 = 'green'
        break
      case 1:
        color2 = 'red'
        break
      case 2:
        color3 = 'yellow'
        break
      default:
        break
    }
    this.setState({z: color1, x: color2, y: color3, p: p + 1})
  }

  render() {
    const {x, y, z} = this.state
    return (
      <div className="bg-color">
        <div className={`${x} circle`}> </div>
        <div className={`${y} circle`}> </div>
        <div className={`${z} circle`}> </div>
      </div>
    )
  }
}

export default DigitalTimer
