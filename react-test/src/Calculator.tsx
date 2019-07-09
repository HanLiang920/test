import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const PLUS = '+'
const MINUS = '-'
const ASTE = '*'
const SLASH = '/'
const PAREN_LEFT = '('
const PAREN_RIGHT = ')'

interface IOptsListItem { 
  name:string
  priority:number
} 

interface IOptsList { 
  [index:string]:IOptsListItem 
} 

const OptsList:IOptsList = {
  '+':{name:'PLUS',priority:1} ,
  '-':{name:'MINUS',priority:1} ,
  '*':{name:'ASTE',priority:2} ,
  '/':{name:'SLASH',priority:2} 
}

const OptPriority = {
  PLUS: 1,
  MINUS: 1,
  ASTE: 2,
  SLASH: 2
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
    let val = ''
    const inputList = input.split('')
    inputList.forEach(it => {
      const op = OptsList(it)
      if (op) {
        if (val) {
          vals.push(val)
          val = ''
        }
        if(opts.length<1){
          opts.push(it)
        }else{
          if(OptPriority[it]>=OptPriority[opts[opts.length-1]])
          
        }
       
      } else {
        val = val + it
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
