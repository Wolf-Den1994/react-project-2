import React from 'react';
import styled from 'styled-components';
import './app-header.css'

const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  h1 {
    font-size: 26px;
    color: ${props => props.colored ? 'green' : 'black'};
    :hover {
      color: blue;
    }
  }
  h2 {
    font-size: 1.2rem;
    color: grey;
  }
`

const AppHeader = ({liked, allPosts}) => {
  return (
    // <div className="app-header d-flex">
    <Header colored as="header">
      <h1>Denis Karazan</h1>
      <h2>{allPosts} записей, из них понравилось {liked}</h2>
    </Header>
    // </div>
  )
}

export default AppHeader;