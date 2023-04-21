import React from 'react';

function CreateCard({ data }) {
  const card = React.createElement(
    'div',
    { className: 'card w-full glass' },
    React.createElement(
      'div',
      { className: 'card-body' },
      React.createElement('h2', { className: 'card-title' }, data.title),
      React.createElement('p', null, data.body),
      React.createElement(
        'div',
        { className: 'justify-end' },
        data.status
      )
    )
  );

  return card;
}

export default CreateCard;
