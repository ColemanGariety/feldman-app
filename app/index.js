var React = require('react')
var ReactDOM = require('react-dom')
var render = ReactDOM.render
var fs = require('original-fs')
var path = require('path')
var recursive = require('recursive-readdir')
var MIDIPlayer = require('midiplayer')
var MIDIFile = require('midifile')
var outputs = []

render(React.createElement('div', {}, 'this is just a <div> tag rendered in React. you can open command line with ALT+COMMAND+I!'), document.body.firstElementChild)

// Requesting Midi Access
navigator.requestMIDIAccess().then(function onsuccesscallback(access) {
  var iter = access.outputs.values()
  while (output = iter.next()) {
    if (output.done) {
      break;
    }
    outputs.push(output.value)
  }
  
    // play demo.mid!
    fs.readFile(path.join(__dirname, 'demo.mid'), function (err, data) {
        playFile(data.buffer, output)
    })

},function onerrorcallback(err) {
  console.log('uh-oh! Something went wrong!  Error code: ' + err.code);
});

// Player
function playFile(buffer) {
	var outputKeys = [];

	// testing output
	if(outputs.length) {
		// Creating player
		var midiPlayer = new MIDIPlayer({ output: outputs[0] });

		// creating the MidiFile instance from a buffer (view MIDIFile README)
		var midiFile = new MIDIFile(buffer);
		midiPlayer.load(midiFile);

    console.log(midiFile)

		// Playing
		midiPlayer.play(function() {
			console.log('Play ended.');
		});

    midiPlayer.volume = 80

		console.log('Playing.');

	} else {
		console.log('No access to MIDI output.');
	}
}
