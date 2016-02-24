# feldman-app
notation for real musicians

# quickstart

1. Download & launch SimpleSynth for Mac
2. Select "SimpleSynth virtual input"
3. Launch feldman and turn up your speakers!

# troubleshooting

Feldman currently grabs the first MIDI port available. If you turned on some other driver (for instance, Yosemite's synth-less IAC Driver) first, you'll have to either turn it off or change line 59 of `app/index.js`.

# developing

1. run `$ npm install` to install the electron prebuilt and react
2. use `$ npm start` to launch the electron development app

# todo

here's an inventory of "stuff we need to find first":

- [x] find out "music note fonts" Finale uses and get ahold of a .ttf or .otf file of one of them (I like the Jazz font)~~
- [x] an open source alternative to garritan instruments for playback. MIDIjs seems to have a bunch of options (http://galacticmilk.com/midi-js/) - abc.js looks interesting (https://github.com/paulrosen/abcjs) - blog post on midi/browser problems (http://abcnotation.com/blog/2013/04/10/the-problem-with-midi/) NOTE: we can use Apple's built-in synth via SimpleSynth for now!
- [ ] Run SimpleSynth or alternative as a background process when the app launches and end it when feldman quits
- [ ] setup Gulp to compile JSX files with gulp-nodemon and gulp-react

All SimpleSynth does is pair soundfonts with the MIDI data that it receives from Feldman's MIDIPlayer instance.

My suggestion is that we compile it with emscripten so that it runs at the node level of the app (that is, not within Electron, but still in Feldman). It'll be fast and self-contained; no extra processes, etc.