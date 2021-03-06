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
        {
          label: 'Going to learn React',
          important: true,
          like: false,
          id: nextId(),
        },
        {
          label: 'That is so good',
          important: false,
          like: false,
          id: nextId(),
        },
        {
          label: 'I need a break...',
          important: false,
          like: false,
          id: nextId(),
        },
      ],
      term: '',
      filter: 'all',
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onToggleImportant = this.onToggleImportant.bind(this);
    this.onToggleLiked = this.onToggleLiked.bind(this);
    this.onUpdateSearchNow = this.onUpdateSearchNow.bind(this);
    this.onFilterSelect = this.onFilterSelect.bind(this);
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
      return {
        data: newArr,
      };
    });
  }

  onChangeState(id, how) {
    this.setState(({ data }) => {
      const index = data.findIndex((elem) => elem.id === id);

      const old = data[index];
      const newItem =
        how === 'like'
          ? { ...old, like: !old.like }
          : { ...old, important: !old.important };

      const before = data.slice(0, index);
      const after = data.slice(index + 1);

      const newArr = [...before, newItem, ...after];

      return {
        data: newArr,
      };
    });
  }

  onToggleImportant(id) {
    this.onChangeState(id, 'important');
  }

  onToggleLiked(id) {
    this.onChangeState(id, 'like');
  }

  searchPost(items, term) {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => item.label.indexOf(term) > -1);
  }

  filterPost(items, filter) {
    if (filter === 'like') {
      return items.filter((item) => item.like);
    } else {
      return items;
    }
  }

  onUpdateSearchNow(term) {
    this.setState({ term });
  }

  onFilterSelect(filter) {
    this.setState({ filter });
  }

  render() {
    const { data, term, filter } = this.state;

    const liked = data.filter((item) => item.like).length;
    const allPosts = data.length;

    const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

    return (
      // <div className={style.app}>
      // <div className="app">
      <AppBlock>
        <AppHeader liked={liked} allPosts={allPosts} />
        <div className="search-panel d-flex">
          <SearchPanel onUpdateSearchNow={this.onUpdateSearchNow} />
          <PostStatusFilter
            filter={filter}
            onFilterSelect={this.onFilterSelect}
          />
        </div>
        <PostList
          posts={visiblePosts}
          onDelete={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleLiked={this.onToggleLiked}
        />
        <PostAddForm onAdd={this.addItem} />
      </AppBlock>
    );
  }
}
