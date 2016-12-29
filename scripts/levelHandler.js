var LevelHandler = function(){
}

LevelHandler.prototype.levelCompleted = function(){
    if (inTutorial) {
        levelsBeat++
        updateStorage()
        if (levelsBeat > 3) {
            document.getElementById("levelText").innerHTML = stageBeat[(game.currentLevel-3)/9] + "<br><img class='hesby' src='images/hesby.png'>";
            fadeIn("levelText",5)
            textClicked = true
            setTimeout(function(){textClicked = false},2000)
            openMenu()
            inTutorial = false
        }
        else {
            setTimeout(function(){game.levelHandler.next()},600)
        }
    }
    else {
        if ((game.currentLevel - 3) % 9 != 0 || (game.currentLevel - 4) === 0) {
            document.getElementById("gameMenu").style.zIndex = 2
            document.getElementById("gameMenu").style.opacity = 0
            if (game.currentLevel === levelsBeat) {
                levelsBeat++
                updateStorage()
                updateGameMenu()
            }
            document.getElementById("levelText").innerHTML = text[game.currentLevel] + "<br><img class='hesby' src='images/hesby.png'>";
            updateGameMenu()
            setTimeout(function(){fadeIn("gameMenu",1);gameMenuShowing = true},500)
        }
        else {
            if (game.currentLevel === levelsBeat) {
                levelsBeat++
                updateStorage()
                updateGameMenu()
            }
            document.getElementById("levelText").innerHTML = stageBeat[(game.currentLevel-3)/9] + "<br><img class='hesby' src='images/hesby.png'>";
            fadeIn("levelText",5)
            textClicked = true
            setTimeout(function(){textClicked = false},2000)
            openMenu()
        }
    }
}

LevelHandler.prototype.started = function(){
    gameMenuShowing = false
    updateGameMenu()
    if (text[game.currentLevel]) {
        fadeIn("levelText",1)
        textClicked = false
        document.getElementById("levelText").innerHTML = text[game.currentLevel] + "<br><img class='hesby' src='images/hesby.png'>";
    }
    paused = false
    update()
}

function fadeIn(element,z) {
    var op = 0.25;  // initial opacity
    element = document.getElementById(element)
    element.style.zIndex = z
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
            paused = true
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.25;
    }, 10);
}
function fadeOut(element,z) {
    var op = 1;  // initial opacity
    element = document.getElementById(element)
    var timer = setInterval(function () {
        if (op <= 0.25){
            clearInterval(timer);
            element.style.display = 'none';
            element.style.zIndex = z
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.25;
    }, 10);
}

var textClicked = false
function levelTextClicked(){
    textClicked = true
    fadeOut("levelText",-1)
}

LevelHandler.prototype.next = function(){
    game.currentLevel++
    this.started();
    textClicked = false
    game.createLevel(false)
}

LevelHandler.prototype.back = function(){
    game.currentLevel--
    this.started();
    game.createLevel(false)
}

LevelHandler.prototype.reset = function(){
    document.getElementById("gameMenu").style.zIndex = -1
    textClicked = true
    if (inTutorial) {
        document.getElementById("levelText").innerHTML = text[game.currentLevel] + "<br><img class='hesby' src='images/hesby.png'>"
        fadeIn("levelText",1)
        textClicked = false
    }
    game.createLevel(false)
    if (paused === true) {
        paused = false
        update()
    }
    this.flash()
}

LevelHandler.prototype.flash = function(){
}

var levelButtons = []
function setUpMenu(){
    document.getElementById("navButtonBack").addEventListener("mouseup",backLevels)
    document.getElementById("navButtonForward").addEventListener("mouseup",forwardLevels)
    for(i=1; i<10; i++){
        levelButtons.push(document.getElementById("table" + i))
        document.getElementById("table" + i).setAttribute("number", i)
        document.getElementById("table" + i).addEventListener("mouseup",levelButtonClicked)
    }
    updateMenu()
    
    document.getElementById("menuButton").addEventListener("mouseup",openMenu)
    document.getElementById("nextButton").addEventListener("mouseup",nextLevel)
    document.getElementById("questionButton").addEventListener("mouseup",reset)
    
    document.getElementById("musicB").addEventListener("mouseup",toggleMusic)
    document.getElementById("soundB").addEventListener("mouseup",toggleSound)
    document.getElementById("creditsB").addEventListener("mouseup",showCredits)
    document.getElementById("rulesB").addEventListener("mouseup",showRules)
}

function toggleMusic(){
    if (sound) {
        clickSound.pause()
        clickSound.currentTime = "0"
        clickSound.play()
    }
    if (music) {
        document.getElementById("player").pause()
        document.getElementById("musicB").innerHTML = "<strike>Music</strike>"
        music = false
    }
    else {
        document.getElementById("player").play()
        document.getElementById("musicB").innerHTML = "Music"
        music = true
    }
}

function toggleSound(){
    if (sound) {
        sound = false
        document.getElementById("soundB").innerHTML = "<strike>Sound</strike>"
    }
    else {
        clickSound.pause()
        clickSound.currentTime = "0"
        clickSound.play()
        document.getElementById("soundB").innerHTML = "Sound"
        sound = true
    }
}

function showCredits(){
    document.getElementById("levelText").innerHTML = "<h2>Credits</h2>=-=-=-=-=<br> Programmer/Artist: Hung-Tam Yie <br><br> Music: Underwater Theme by Doppelganger <br><br>=-=-=-=-=<br><br>Thanks to all beta testers! <br>Kenson Nguyen<br>Crysjreid<br>Nhat Minh<br>Michael Yie<br>Minh-Tam Yie<br>..."
    fadeIn("levelText",5)
    textClicked = true
}

function showRules(){
    var newwindow=window.open('instructions.html','name','height=500,width=500');
    if (window.focus) {newwindow.focus()}
    return false;
}

function openMenu(){
    levelType = Math.floor((levelsBeat-4)/9)
    if (sound) {
        clickSound.pause()
        clickSound.currentTime = "0"
        clickSound.play()
    }
    gameMenuShowing = true
    
    updateMenu()
    fadeIn("menu",4)
}

function nextLevel(){
    if (game.currentLevel <= levelsBeat - 1) {
        if (sound) {
            clickSound.pause()
            clickSound.currentTime = "0"
            clickSound.play()
        }
        game.levelHandler.next()
        fadeOut("gameMenu",3)
        gameMenuShowing = false
    }
}

function reset(){
    gameMenuShowing = false
    game.levelHandler.reset()
    if (sound) {
        clickSound.pause()
        clickSound.currentTime = "0"
        clickSound.play()
    }
}

function updateMenu(){
    if (levelType > 2) {
        levelType = 2
    }
    document.getElementById("menuTitleText").innerHTML = levelData[levelType] + "x" + levelData[levelType] + levelDescriptions[levelType]
    for(i=1; i<10; i++){
        document.getElementById("table" + i).innerHTML = Number(9*levelType + i)
        var realLevelNum = 9*levelType + i + 3
        if (levelsBeat < realLevelNum) {
            document.getElementById("table" + i).style.background = "grey"
        }
        else {
            document.getElementById("table" + i).style.background = "#efc77c"
        }
    }
}

function updateGameMenu(){
    if (game.currentLevel > levelsBeat - 1) {
        document.getElementById("nextButton").style.backgroundColor = "grey"
    }
    else {
        document.getElementById("nextButton").style.backgroundColor = "orange"
    }
}

function forwardLevels(){
    levelType++
    if (levelType > levelData.length - 1) {
        levelType--
    }
    if (sound) {
        clickSound.pause()
        clickSound.currentTime = "0"
        clickSound.play()
    }
    updateMenu()
}
function backLevels(){
    levelType--
    if (levelType < 0) {
        levelType++
    }
    if (sound) {
        clickSound.pause()
        clickSound.currentTime = "0"
        clickSound.play()
    }
    updateMenu()
}

function levelButtonClicked(){
    var num = Number(this.getAttribute("number"))
    num = num + 9*levelType
    if (levelsBeat >= num + 3) {
        if (sound) {
            clickSound.pause()
            clickSound.currentTime = "0"
            clickSound.play()
        }
        textClicked = false
        gameMenuShowing = false;
        game.currentLevel = num + 3
        game.createLevel(false);
        fadeOut("menu",-1)
        document.getElementById("levelText").innerHTML = text[game.currentLevel]  + "<br><img class='hesby' src='images/hesby.png'>"
        fadeIn("levelText",2)
        document.getElementById("gameMenu").style.zIndex = -1
        game.render()
    }
}

function hesbyModeOn(){
    hesbyMode = true
    console.log("Hi Mr. Hesby, hope you enjoy the game! I know you don't have time to play it through so click N to skip levels.")
}

document.onkeypress = function(evt) {
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    var charStr = String.fromCharCode(charCode);
    
    if (charStr === "r") {
        game.levelHandler.reset();
    };
    if (charStr === "]") {
        game.levelHandler.next();
    };
    if (charStr === "[") {
        game.levelHandler.back();
    };
};