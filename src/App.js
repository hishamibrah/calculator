import React, { Component } from 'react';
import { Card, InputAdornment, OutlinedInput, CardContent, Button } from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import './App.css';

let equals=false;
let num1='';
let num2='';
let results=0;
let alert = true;
let alert1 = true;
let ope;
let alert2=true;
class App extends Component {
  constructor(){
    super();
    this.state={
      operator:'',
      value:''
    }
    this.handleOperator=this.handleOperator.bind(this);
  }
  
  async handlePress(event){  
    if(this.state.value.length!==10){
      alert = true;
      alert1 = true;
      const countChar = (str, s) => str.split("").filter(c => c === s).length;
      if (countChar((this.state.value + ""), '.') === 0) {
        this.setState({
          value: this.state.value + event.currentTarget.value
        })
      }else if (event.currentTarget.value !== '.') {
        this.setState({
          value: this.state.value + event.currentTarget.value
        })
      }
      if (isNaN(this.state.value)) {
        alert1 = false
        await this.setState({
          value: ""
        })
      }
    }else{
      alert2=false;
      await this.setState({
        value:this.state.value
      })
    }
  }
  
  handleBackspace(){
    alert2=true;
    this.setState({
      value:(this.state.value+"").slice(0,-1)
    })
  }
  
  async handleOperator(event){
    alert2=true
    alert = true;
    alert1 = true;
    await this.setState({
      operator:event.currentTarget.value
    })
    if(this.state.operator==='AC'){
      if(results!==0){
        this.setState({
          values:''
        })
      }
      this.setState({
        value:'',
        operator:''
      })
      ope='';
      num1='';
      num2='';
      results='';
    }
    if(equals){
      num1=this.state.value;
      num2=0
      equals=false;
      this.setState({
        value:0
      })
    }
    if(num1===''){     
      num1=this.state.value?this.state.value: "";
    }else{
      num2 = this.state.value ? this.state.value : "";
    }
    if(this.state.operator!=="="){
      ope=this.state.operator?this.state.operator.slice(): "";  
      if (this.state.operator === "+") {
        results = parseFloat(num1) + parseFloat(num2);
      }
      if (this.state.operator === "-") {
        results = parseFloat(num1) - parseFloat(num2);
      }
      if (this.state.operator === "X") {
        results = parseFloat(num1) * parseFloat(num2);
      }
      if (this.state.operator === "/") {
        results = parseFloat(num1) / parseFloat(num2);
      }
      if(!isNaN(results)){
        num1=results
      }
    }else{
      if(ope==="+"&&this.state.operator==="="){
        results = parseFloat(num1)+parseFloat(num2);
        ope='';
        num2=0;
      }
      if (ope === "-" && this.state.operator === "="){
        results = parseFloat(num1) - parseFloat(num2);
        ope = '';
        num2 = 0;
      }
      if (ope === "X" && this.state.operator === "="){
        results = parseFloat(num1) * parseFloat(num2);
        ope = '';
        num2 = 0;
      }
      if (ope === "/" && this.state.operator === "="){
        results = parseFloat(num1) / parseFloat(num2);
        ope = '';
        num2 = 0;
      }
    }
    if(this.state.operator==="="){
      equals=true
    }
    this.setState({
      value:"",
    })
    if(isNaN(results)&&this.state.operator==="="){
      results=parseFloat(num1);
      num2=0
    }
    if (results ===Infinity){
      results=0
      this.setState({
        value:0
      })
      alert=false
    }
    if(this.state.operator==="="){
      await this.setState({
        value:parseFloat(results).toFixed(2)
      })
    }
    if(isNaN(this.state.value)){
      alert1=false
      this.setState({
        value: ""
      })
    }
  }
  render(){
    return (
      <div>
        <header className="App-header">
          <h1 className="header-text">CALCULATOR</h1>
        </header>
        <div className="App">
          <Card className="card">
            <CardContent className="card-color">
              <div className="container">
                <span className="input">
                  <OutlinedInput
                    max={10}
                    value={this.state.value}
                    placeholder="0"
                    endAdornment={<InputAdornment position="end">{this.state.operator}</InputAdornment>}
                    className="box"
                    labelWidth={0}
                  />
                </span>
                <span className="container">
                  <Button id='' onClick={this.handleBackspace.bind(this)} value={this.state.value} variant="contained" className="image">{""}
                  </Button>
                  <Button id='/' onClick={this.handleOperator} value="/" variant="contained">/</Button>
                </span>
                </div>
                <div className="container">
                  <Button id='1' onClick={this.handlePress.bind(this)} value="1" variant="contained">1</Button>
                  <Button id='2' onClick={this.handlePress.bind(this)} value="2" variant="contained">2</Button>
                  <Button id='3' onClick={this.handlePress.bind(this)} value="3" variant="contained">3</Button>
                  <Button id='*' onClick={this.handleOperator} value="X" variant="contained">X</Button>
                </div>
                <div className="container">
                  <Button id='4' onClick={this.handlePress.bind(this)} value="4" variant="contained">4</Button>
                  <Button id='5' onClick={this.handlePress.bind(this)} value="5" variant="contained">5</Button>
                  <Button id='6' onClick={this.handlePress.bind(this)} value="6" variant="contained">6</Button>
                <Button id='-' onClick={this.handleOperator} value="-" variant="contained">-</Button>
                </div>
                <div className="container">
                  <Button id='7' onClick={this.handlePress.bind(this)} value="7" variant="contained">7</Button>
                  <Button id='8' onClick={this.handlePress.bind(this)} value="8" variant="contained">8</Button>
                  <Button id='9' onClick={this.handlePress.bind(this)} value="9" variant="contained">9</Button>
                <Button id='add' onClick={this.handleOperator} value="+" variant="contained">+</Button>
                </div>
                <div className="container">
                  <Button id='C' onClick={this.handleOperator} value="AC" variant="contained">AC</Button>
                  <Button id='0' onClick={this.handlePress.bind(this)} value="0" variant="contained">0</Button>
                <Button id='.' onClick={this.handlePress.bind(this)} value="." variant="contained">.</Button>
                <Button id='=' onClick={this.handleOperator} value="=" variant="contained">=</Button>
                </div>
            </CardContent>
          </Card>
          <div className="alert" hidden={alert}>
            <Alert severity="error"  >Can't divide by zero</Alert>
          </div>
          <div className="alert" hidden={alert1}>
            <Alert severity="error"  >invalid format</Alert>
          </div>
          <div className="alert" hidden={alert2}>
            <Alert severity="error"  >Max 10 Digits</Alert>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
