function Block(x, y, num) {
    this.x = x;
    this.y = y;
    this.num = num;
    this.moveable = false;
    this.collision = true;
};

function Wall(x, y, num) {
    this.x = x;
    this.y = y;
    this.num = num;
    this.moveable = false;
    this.img = "wall";
    this.collision = true;
};
Wall.prototype = new Block();

function Box(x, y, num){
    this.x = x;
    this.y = y;
    this.num = num;
    this.moveable = true;
    this.img = "box";
    this.collision = true;
    this.collisionWithAll = true;
}
Box.prototype = new Block();

function Trigger(x, y, num){
    this.x = x;
    this.y = y;
    this.num = num;
    this.moveable = false;
    this.collision = false;
    this.img = "trigger";
};
Trigger.prototype = new Block();

function Door(x, y, num){
    this.x = x;
    this.y = y;
    this.num = num;
    this.moveable = false;
    this.collision = true;
    this.img = "door";
};
Door.prototype = new Block();

function Win(x, y, num) {
    this.x = x;
    this.y = y;
    this.num = num;
    this.moveable = false;
    this.winBlock = true;
    this.img = "goal";
    this.collision = true;
};
Win.prototype = new Block();

function Time(x, y, num) {
    this.x = x;
    this.y = y;
    this.num = num;
    this.moveable = false;
    this.winBlock = true;
    this.img = "teleporter";
    this.collision = true;
};
Time.prototype = new Block();

function ghostTime(x, y, num) {
    this.x = x;
    this.y = y;
    this.num = -1;
    this.alpha = .5;
    this.moveable = false;
    this.winBlock = true;
    this.img = "teleporter"
    this.collision = false;
};
ghostTime.prototype = new Block();

var playerImages = ["player","player2","player3"]
function Player(x, y, num, lastX, lastY, movement) {
    this.x = x;
    this.y = y;
    this.lastX = lastX;
    this.lastY = lastY;
    this.movement = movement;
    this.num = num;
    this.moveable = false;
    this.img = playerImages[selectedPlayerImg];
    
    var selfRef = this
    document.onkeydown = function(evt) {
        evt = evt || window.event;
        var charCode = evt.keyCode || evt.which;
        if (textClicked) {
            if (Number(charCode) === 32 && !inTutorial) {
                if (gameMenuShowing) {
                    fadeOut("gameMenu",-2)
                    gameMenuShowing = false
                    paused = false
                    update()
                }
                else {
                    updateGameMenu()
                    fadeIn("gameMenu",2)
                    gameMenuShowing = true
                    paused = true
                } 
            }
        }
        if (charCode === 192) {
            var password = prompt("You have found the secret feature! Type in a password to change your player image.")
            if (password === "silverstreamisthebest") {
                selectedPlayerImg = 1
            }
            else if (password === "fatmanindoor") {
                selectedPlayerImg = 2
            }
            else {
                selectedPlayerImg = 0
            }
        }
        if (Number(charCode) != 82 && !textClicked) {
            levelTextClicked()  
        }
        else if(!gameMenuShowing){
            
            if (Number(charCode) === 87) {
                selfRef.move("up")
            }
            if (Number(charCode) === 83) {
                selfRef.move("down")
            }
            if (Number(charCode) === 68) {
                selfRef.move("right")
            }
            if (Number(charCode) === 65) {
                selfRef.move("left")
            }
            if (Number(charCode) === 38) {
                selfRef.move("up")
            }
            if (Number(charCode) === 40) {
                selfRef.move("down")
            }
            if (Number(charCode) === 39) {
                selfRef.move("right")
            }
            if (Number(charCode) === 37) {
                selfRef.move("left")
            }
        }
        
        if (paused === true) {
            paused = false
            update()
        }
    };
};
Player.prototype = new Block();
Player.prototype.update = function(){
    if (game.timeBlock && this.x === game.timeBlock.x && this.y === game.timeBlock.y && this.movement === 0 && game.timeBlock.num === 3) {
        game.createLevel(true)
    }
}

function ghostPlayer(x, y, num, history) {
    this.x = x;
    this.y = y;
    this.lastX = x;
    this.lastY = y;
    this.movement = 0;
    this.num = num;
    this.history = history;
    this.alpha = .5;
    this.stopped = false;
    this.moveable = false;
    this.img = playerImages[selectedPlayerImg];
    this.collision = true;
    this.kill = false
};
ghostPlayer.prototype = new Block();

ghostPlayer.prototype.update = function(){
    //move in same way as original
    for (index=0; index<this.history.length; index++) {
        if (game.tick === this.history[index][1] && !this.stopped) {
            this.move(this.history[index][0])
            if (this.history[index]) {
                if (this.x != this.history[index][3] || this.y != this.history[index][4]) {
                    this.stopped = true
                    this.moveable = true
                    if (sound) {
                        failSound.play();
                    }
                }
            }
        }
    }
    
    //check to kill
    if (this.x === game.timeBlock.x && this.y === game.timeBlock.y && this.movement === 0 && game.timeBlock.num === -1) {
        game.ghostPlayer = undefined
        game.timeBlock = undefined
        for (i=0;i<game.blocks.length;i++) {
            if (game.blocks[i].num === 9 || game.blocks[i].num === -1) {
                game.blocks.splice(i,1)
            }
        }
    }
}

ghostPlayer.prototype.render = function(){
    ctx.globalAlpha = this.alpha
    if (this.movement != undefined && this.movement > 0) {
        var p = (blockSpeed - this.movement)/blockSpeed
        var x = this.lastX + (this.x - this.lastX) * p
        var y = this.lastY + (this.y - this.lastY) * p
        var image = images[this.img]
        ctx.drawImage(image,x * blockSize, y * blockSize, blockSize, blockSize)
    }
    else {
        var image = images[this.img]
        ctx.drawImage(image,this.x * blockSize, this.y * blockSize, blockSize, blockSize) 
    }
    if (!this.stopped) {
        var history = this.history
        var index = 0
        for (ia=1;ia<history.length;ia++) {
            if (game.tick > this.history[ia-1][1] && game.tick <= this.history[ia][1]) {
                index = ia
            }
        }
        if (history[index-1]) {
            var percent = (game.tick-history[index-1][1])/(history[index][1]-history[index-1][1]) * 100
        }
        else {
            var percent = game.tick/history[index][1] * 100
        }
        var x = this.x * blockSize + blockSize/2;
        var y = this.y * blockSize + blockSize/2;
        ctx.fillStyle = "white"
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.arc(x, y, blockSize/5, 0, 2 * Math.PI * percent /100);
        ctx.fill();
    }
};

Block.prototype.move = function(dir,type){
    this.movement = blockSpeed;
    this.lastX = this.x;
    this.lastY = this.y;
    var xPointer = this.x;
    var yPointer = this.y;
    var xMove = 0
    var yMove = 0
    if (dir === "up") {
        yMove = -1;
    }
    else if (dir === "right") {
        xMove = 1;
    }
    else if (dir === "down") {
        yMove = 1;
    }
    else {
        xMove = -1
    }
    var hit = false
    var firstMove = true
    while(!hit){
        if (firstMove) {
            if (sound) {
                moveSound.pause()
                moveSound.currentTime = 0
                moveSound.play()
            }
        }
        xPointer += xMove;
        yPointer += yMove;
        var blocks = game.blocks;
        for(i = 0 ; i < blocks.length ; i++){
            if (blocks[i].x === xPointer && blocks[i].y === yPointer) {
                if (blocks[i].num === 2 && this.num === 8) {
                    this.x = xPointer;
                    this.y = yPointer;
                    hit = true;
                    if (this.num === 8) {
                        game.playerHistory.push([dir,game.tick,"win",this.x,this.y])
                        if (sound) {
                            winSound.play();
                        }
                    }
                    game.levelHandler.levelCompleted()
                    break;
                }
                else if (blocks[i].num === 8 && this.num === 9) {
                    this.x = xPointer - xMove;
                    this.y = yPointer - yMove;
                    hit = true;
                    break;
                }
                else if (blocks[i].num === 3) {
                    if (this.num === 8) {
                        this.x = xPointer;
                        this.y = yPointer;
                        hit = true;
                        if (this.num === 8) {
                            game.playerHistory.push([dir,game.tick,"time",this.x,this.y])
                            if (sound) {
                                teleportSound.play();
                            }
                        }
                        break;
                    }
                    else if (this.num === 9) {
                        this.x = xPointer;
                        this.y = yPointer;
                        hit = true;
                        break;
                    }
                    else {
                        this.x = xPointer - xMove;
                        this.y = yPointer - yMove;
                        hit = true;
                    }
                }
                else if (blocks[i].collision && blocks[i].moveable && firstMove){
                    blocks[i].move(dir)
                    hit = true;
                    if (this.num === 8) {
                        game.playerHistory.push([dir,game.tick,"normal",this.x,this.y])
                    }
                }
                else if ((blocks[i].collision || this.collisionWithAll) && blocks[i].num != 5){
                    this.x = xPointer - xMove;
                    this.y = yPointer - yMove;
                    hit = true;
                    if (this.num === 8) {
                        game.playerHistory.push([dir,game.tick,"normal",this.x,this.y])
                    }
                }
                else if (blocks[i].num === -1) {
                    if (this.num === 9) {
                        failSound.play();
                        this.x = xPointer;
                        this.y = yPointer;
                        hit = true;
                        break;
                    }
                }
            }
        }
        firstMove = false
    }
};

Block.prototype.render = function(){
    if (this.alpha) {
        ctx.globalAlpha = this.alpha
    }
    else {
        ctx.globalAlpha = 1
    }
    if (this.movement != undefined && this.movement > 0) {
        var p = (blockSpeed - this.movement)/blockSpeed
        var x = this.lastX + (this.x - this.lastX) * p
        var y = this.lastY + (this.y - this.lastY) * p
        var image = images[this.img]
        ctx.drawImage(image,x * blockSize, y * blockSize, blockSize, blockSize)
    }
    else {
        var image = images[this.img]
        ctx.drawImage(image,this.x * blockSize, this.y * blockSize, blockSize, blockSize)   
    }
};