import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './components/app';

class WhoAmI extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     years: 26
  //   }

  //   /* 1й метод */
  //   // this.nextYear = this.nextYear.bind(this)

  //   /* 2й метод */
  //   // this.nextYear = () => {
  //   //   this.setState(state => ({
  //   //     years: ++state.years
  //   //   }))
  //   // }
  // }

  /* 1й метод */
  // nextYear() {
  //   //this.state.years++ НЕПРАВИЛЬНО
  //   this.setState(state => ({
  //     years: ++state.years
  //   }))
  // }

  /* 3й метод */
  nextYear = () => {
    this.setState(state => ({
      years: ++state.years
    }))
  }

  // и даже можно закоментировать весь constructor и вынести state
  state = {
    years: 26
  }

  render() {
    const {name, surname, link} = this.props;
    const {years} = this.state;
    return (
      <>
        <button onClick={this.nextYear}>++</button>
        <h1>My name is {name}, surname - {surname}, years = {years}</h1>
        <a href={link}>{link}</a>
      </>
    )
  }
}

const All = () => {
  return (
    <>
      <WhoAmI name="John" surname="Smith" link="facebook.com" />
      <WhoAmI name="Den" surname="Kar" link="vk.com" />
      <WhoAmI name="Alex" surname="Ivanov" link="ok.ru" />
    </>
  )
}

ReactDOM.render(
    <All />,
  document.getElementById('root')
);