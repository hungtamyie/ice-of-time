window.onload = function(){
    //set up canvas
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    window.addEventListener("resize",updateCanvas)
    updateCanvas()
    setUpStorage()
    loadSounds()
    //normally would do intro and all that jazz
    setUpMenu()
    loadImages()
};

var winSound
var teleportSound
var moveSound
var failSound
function loadSounds() {
    winSound = new Audio('sounds/win.mp3');
    moveSound = new Audio('sounds/move.mp3');
    failSound = new Audio('sounds/fail.mp3');
    teleportSound = new Audio('sounds/teleport.mp3');
    clickSound = new Audio('sounds/click.mp3');
    
    document.getElementById("player").volume = ".5"
}

var imagesToLoad = ["box","goal","player","player2","player3","teleporter","wall","trigger","door","doorclosed"]
var imagesLoaded = 0
var images = {}
function loadImages() {
    for (i=0;i<imagesToLoad.length;i++) {
        images[imagesToLoad[i]] = new Image
        images[imagesToLoad[i]].onload = function(){
            imagesLoaded++
            if (imagesLoaded === imagesToLoad.length) {
                startGame()
            }
        }
        images[imagesToLoad[i]].src = "images/" + imagesToLoad[i] + ".png"
    }
}

function updateCanvas(){
    var winWidth = window.innerWidth;
    var winHeight = window.innerHeight;
    if (winWidth > winHeight) {
        canvas.width = winHeight;
        canvas.height = winHeight;
    }
    else {
        canvas.width = winWidth;
        canvas.height = winWidth;
    }
    document.getElementById("levelText").style.width = canvas.width + "px";
    document.getElementById("levelText").style.fontSize = canvas.width/25 + "px";
    
    document.getElementById("menu").style.width = canvas.width + "px";
    document.getElementById("menu").style.height = canvas.width + "px";
    document.getElementById("menu").style.fontSize = canvas.width/25 + "px";
    
    document.getElementById("menuTitle").style.fontSize = canvas.width/16 + "px";
    
    document.getElementById("title").style.fontSize = canvas.width/12 + "px";
    
    document.getElementById("gameMenu").style.width = canvas.width + "px";
    document.getElementById("gameMenu").style.height = canvas.width/4 + "px";
    
    document.body.style.margin = "0px";
    
    if (game) {
        game.resize()
    }
};

function setUpStorage(){
    if (localStorage) {
        if (localStorage.getItem("iotprogress")) {
            levelsBeat = Number(JSON.parse(localStorage.getItem("iotprogress")))
        }
        else {
            localStorage.setItem("iotprogress",0)
        }
    }
    else {
        levelsBeat = 0
    }
}

function updateStorage() {
    localStorage.setItem("iotprogress",levelsBeat)
}

function startGame(){
    game = new Game()
    game.start()
}