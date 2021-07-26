import React, { Component } from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';
import nextId from 'react-id-generator';
import './app.css';
// import style from './App.module.css'
import styled from 'styled-components';

const AppBlock = styled.div`
  margin: 0 auto;
  max-width: 800px;
`;

// const StyledAppBlock = styled(AppBlock)`
//   background-color: gray;
// `

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { label: 'Going to learn React', important: true, id: 1 },
        { label: 'That is so good', important: false, id: 2 },
        { label: 'I need a break...', important: false, id: 3 },
      ],
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  deleteItem(id) {
    this.setState(({ data }) => {
      const index = data.findIndex((elem) => elem.id === id);
      /* так не правильно, нельзя менять стейт */
      // data.splice(index,1);
      // return {
      //   data: data,
      // }
      const before = data.slice(0, index);
      const after = data.slice(index + 1);

      const newArr = [...before, ...after];
      return {
        data: newArr,
      };
    });
  }

  addItem(body) {
    const newItem = {
      label: body,
      important: false,
      id: nextId(),
    };

    this.setState(({ data }) => {
      const newArr = [...data, newItem];
      console.log(newArr);
      return {
        data: newArr,
      };
    });
  }

  render() {
    const { data } = this.state;

    return (
      // <div className={style.app}>
      // <div className="app">
      <AppBlock>
        <AppHeader />
        <div className="search-panel d-flex">
          <SearchPanel />
          <PostStatusFilter />
        </div>
        <PostList posts={data} onDelete={this.deleteItem} />
        <PostAddForm onAdd={this.addItem} />
      </AppBlock>
    );
  }
}
