const React = require('react')
const ReactDOM = require('react-dom')
const render = ReactDOM.render


window.onload = function () {
	MIDI.loadPlugin({
		soundfontUrl: "./soundfont/",
		instrument: "acoustic_grand_piano",
		onprogress: function(state, progress) {
			console.log(state, progress)
		},
		onsuccess: function() {
			var delay = 0
			var note = 50
			var velocity = 127
			MIDI.setVolume(0, 127)
			MIDI.noteOn(0, note, velocity, delay)
			MIDI.noteOff(0, note, delay + 0.75)
		}
	})
}

render(React.createElement('div', {}, 'this is just a <div> tag rendered in React. you can open command line with ALT+COMMAND+I!'), document.body.firstElementChild)
