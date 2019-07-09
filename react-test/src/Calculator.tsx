import React from 'react'
import * as math from 'mathjs'
import * as _ from 'lodash'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const PAREN_LEFT = '('
const PAREN_RIGHT = ')'

interface IOptsListItem {
  name: string
  priority: number
}

interface IOptsList {
  [propName: string]: IOptsListItem
}

const OptsList: IOptsList = {
  '+': { name: 'PLUS', priority: 1 },
  '-': { name: 'MINUS', priority: 1 },
  '*': { name: 'ASTE', priority: 2 },
  '/': { name: 'SLASH', priority: 2 }
}

interface Props {}

interface State {
  input: string
  input1: string
  answer: number | null
}

class Calculator extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      input: '',
      input1: '',
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
    const vals: string[] = []
    const opts: string[] = []
    let val = ''
    const inputList = input.split('')
    inputList.forEach(it => {
      const op = OptsList[it]
      if (op) {
        if (val) {
          vals.push(val)
          val = ''
        }
        const lastOpString = opts[opts.length - 1]
        if (lastOpString) {
          const lastOP = OptsList[lastOpString]
          if (op.priority > lastOP.priority) {
            opts.push(it)
          } else {
            opts.pop()
            vals.push(lastOpString)
            opts.push(it)
          }
        } else {
          opts.push(it)
        }
      } else {
        val = (val + it).trim()
      }
    })

    vals.push(val, ...opts.reverse())
    this.setState({ input1: vals.join(' ') })

    for (let i = 0; i < vals.length; i++) {
      const it = vals[i]
      if (!OptsList[it]) continue
      const v1 = math.bignumber(vals[i - 2])
      const v2 = math.bignumber(vals[i - 1])
      let result = ''
      switch (it) {
        case '+':
          result = math.add(v1, v2).toString()
          break
        case '-':
          result = math.subtract(v1, v2).toString()
          break
        case '*':
          result = math.multiply(v1, v2).toString()
          break
        case '/':
          result = math.divide(v1, v2).toString()
          break
      }
      vals.splice(i - 2, 3)
      vals.splice(i - 2, 0, result)
      i = i - 2
    }
    this.setState({ answer: Number(vals[0]) })
  }

  render() {
    const { input, input1, answer } = this.state

    return (
      <div className="hello">
        <TextField value={input} onChange={this.handleChange} />
        <br />
        <TextField value={input1} />
        <br />
        <TextField value={answer || ''} />
        <br />
        <Button variant="contained" color="primary" onClick={this.getAnswer}>
          你好，世界
        </Button>
      </div>
    )
  }
}

export default Calculator
