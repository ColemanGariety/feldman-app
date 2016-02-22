const React = require('react')
const ReactDOM = require('react-dom')
const render = ReactDOM.render




render(React.createElement('div', {}, 'this is just a <div> tag rendered in React. you can open command line with ALT+COMMAND+I!'), document.body.firstElementChild)

var sound = new Howl({
  urls: ['./demo.mp3']
}).play();

