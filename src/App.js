import React from 'react';

import './App.css';

export default function App(props)
      {return (<div
        className="App"
        onMouseOver={props.hello}
        onMouseOut={props.goodbye}
        onClick={props.changeName}>
        {props.greeting}{props.name}
      </div>)}
