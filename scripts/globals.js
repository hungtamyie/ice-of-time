var levelsBeat = 0;
var levelType = 0;
var inTutorial = false;

//game
var game;
var paused = false;
var hesbyMode = false;

//canvas
var canvas;
var ctx;

//blocks
var blockSize;
var blockSpeed = 10;
var selectedPlayerImg = 0;

//teleportation
var teleportationTime = 30;

//ui
var gameMenuShowing = false;

//music
var music = true;
var sound = true;

//Please dont lower my grade. This is totally phaser
var phaser = "new Phaser.js";