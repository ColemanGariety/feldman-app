const React = require('react')
const ReactDOM = require('react-dom')
const render = ReactDOM.render




render(React.createElement('div', {}, 'this is just a <div> tag rendered in React. you can open command line with ALT+COMMAND+I!'), document.body.firstElementChild)

var midiAccess;
var midiPlayer;
var outputs;
// Requesting Midi Access
navigator.requestMIDIAccess().then(function onsuccesscallback(access) {
  outputs = access.outputs;
  var iter = outputs.values();
  var output;
  while(output = iter.next()) {
    if(output.done) {
      break;
    }
    var opt = document.createElement('option');
    opt.value = output.value.id;
    opt.text = output.value.name;
    document.getElementById('inputportselector').add(opt);
  }
},function onerrorcallback(err) {
  console.log('uh-oh! Something went wrong!  Error code: ' + err.code);
});

// File handlers
function readFile(input) {
	var reader = new FileReader();
	reader.readAsArrayBuffer(input.files[0]);
	reader.onloadend = function(event) {
		playFile(event.target.result);
	}
}
function downloadFile(input) {
	if(!input.value)
		return;
	var oReq = new XMLHttpRequest();
	oReq.open('GET', 'http://github.com/nfroidure/MIDIFile/master/sounds/' + input.value, true);
	oReq.responseType = 'arraybuffer';
	oReq.onload = function(oEvent) {
		playFile(oReq.response);
	};
	oReq.send(null);
}

// Player
function playFile(buffer) {
	var outputKeys = [];
	// testing output
	if(outputs) {
		// Stopping previous play if exists
		if(midiPlayer) {
			midiPlayer.stop();
		}

		// Creating player
		midiPlayer = new MIDIPlayer({output: outputs.get(
		  document.getElementById('inputportselector').value
		)});

		// creating the MidiFile instance from a buffer (view MIDIFile README)
		midiFile = new MIDIFile(buffer);
		midiPlayer.load(midiFile);

		// Playing
		midiPlayer.play(function() {
			console.log('Play ended.');
		});
		console.log('Playing.');

	} else {
		console.log('No access to MIDI output.');
	}
}

playFile('./demo.mid');