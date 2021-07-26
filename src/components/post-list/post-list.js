import React from 'react';
import { ListGroup } from 'reactstrap';
import './post-list.css';

import PostListItem from '../post-list-item';

const PostList = ({ posts, onDelete, onToggleImportant, onToggleLiked }) => {
  const isEmpty = (obj) => {
    for (let key in obj) {
      return true;
    }
    return false;
  };

  const elements = posts.map((item) => {
    if (typeof item === 'object' && isEmpty(item)) {
      // const {id, ...itemProps} = item;
      const { id } = item;
      return (
        <li key={id} className="list-group-item">
          <PostListItem
            // {...itemProps}
            label={item.label}
            important={item.important}
            like={item.like}
            onDelete={() => onDelete(id)}
            onToggleImportant={() => onToggleImportant(id)}
            onToggleLiked={() => onToggleLiked(id)}
          />
        </li>
      );
    }
    return null;
  });

  return <ListGroup className="app-list">{elements}</ListGroup>;
};

export default PostList;
