import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const PLUS = '+'
const MINUS = '-'
const ASTE = '*'
const SLASH = '/'
const PAREN_LEFT = '('
const PAREN_RIGHT = ')'

enum Direction {
  PLUS = 1,
  MINUS = 1,
  ASTE = 2,
  SLASH = 2
}

let isOpt = (op: string) => {
  return op === PLUS || op === MINUS || op === ASTE || op === SLASH
}

interface Props {}

interface State {
  input: string
  answer: number | null
}

class Calculator extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      input: '',
      answer: null
    }
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      input: event.target.value
    })
  }

  getAnswer = () => {
    const { input } = this.state
    const vals = []
    const opts = []
    const val = ''
    input.split('').forEach(it => {
      if (isOpt(it)) {
      }
    })

    alert(input)
  }

  render() {
    const { input } = this.state

    return (
      <div className="hello">
        <TextField value={input} onChange={this.handleChange} />
        <Button variant="contained" color="primary" onClick={this.getAnswer}>
          你好，世界
        </Button>
      </div>
    )
  }
}

export default Calculator
