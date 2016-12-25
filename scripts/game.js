function Game(){
    this.maps = maps;
    this.currentLevel = 0;
    this.blocks = [];
    this.timeLevelStarted;
    this.playerHistory = [];
    this.player;
    this.ghostPlayer;
    this.timeBlock;
    this.trigger;
    this.door;
    this.teleportation = 0;
    this.willTeleport = -1;
    this.tick = 0;
    this.levelHandler = new LevelHandler()
};

Game.prototype.start = function(){
    //if tutorial
    if (levelsBeat < 4) {
        levelsBeat = 0
        inTutorial = true
        this.currentLevel = levelsBeat
        document.getElementById("menu").style.zIndex = -1
    }
    this.createLevel(false);
    this.startGameLoop();
    this.levelHandler.started();
};

Game.prototype.createLevel = function(past){
    if (!past) {
        this.playerHistory = [];
        this.tick = 0;
        this.player = undefined;
        this.ghostPlayer = undefined;
        this.timeBlock = undefined;
    }
    else {
        this.teleportation = teleportationTime
        this.timeBlock = undefined;
    }
    
    this.blocks = []
    var map = this.maps[this.currentLevel]
    this.tick = 0;
    for(x = 0 ; x < map.length ; x++){
        for(y = 0 ; y < map.length ; y++){
            switch (map[x][y]) {
                case 1:
                    this.blocks.push(new Wall(y,x,map[x][y]));
                    break;
                case 2:
                    this.blocks.push(new Win(y,x,map[x][y]));
                    break;
                case 3:
                    if (past) {
                        this.player = new Player(y,x,8,this.player.lastX,this.player.lastY,this.player.movement)
                        this.blocks.push(this.player);
                        this.timeBlock = (new ghostTime(y,x,-3))
                        this.blocks.push(this.timeBlock);
                        break;
                    }
                    else {
                        this.timeBlock = new Time(y,x,map[x][y])
                        this.blocks.push(this.timeBlock)
                        this.playerHistory = [];
                        break;
                    }
                case 4:
                    this.blocks.push(new Box(y,x,map[x][y]));
                    break;
                case 5:
                    this.trigger = new Trigger(y,x,map[x][y])
                    this.blocks.push(this.trigger)
                    break;
                case 6:
                    this.door = new Door(y,x,map[x][y])
                    this.blocks.push(this.door)
                    break;
                case 8:
                    if (past) {
                        this.ghostPlayer = new ghostPlayer(y,x,9,this.playerHistory)
                        this.blocks.push(this.ghostPlayer);
                        break;
                    }
                    else {
                        this.player = new Player(y,x,map[x][y])
                        this.blocks.push(this.player);
                        break;
                    }
            }
        };
    };
    
    blockSize = Math.round(canvas.width/map.length);
    this.timeLevelStarted = new Date().getTime();
};

Game.prototype.startGameLoop = function(){
    window.requestAnimationFrame(update)
};

var update = function(){
    game.tick++
    game.teleportation--
    if (game.door) {
        game.door.img = "door"
        game.door.collision = true
    }
    for(i = 0 ; i < game.blocks.length ; i++){
         if (game.blocks[i].movement && game.blocks[i].movement > 0) {
             game.blocks[i].movement--
         }
         if (game.trigger) {
            if (game.blocks[i].x === game.trigger.x && game.blocks[i].y === game.trigger.y && game.blocks[i].num != 5) {
                if (game.blocks[i].movement !== undefined && (game.blocks[i].movement === 0 || (game.blocks[i].x === game.blocks[i].lastX && game.blocks[i].y === game.blocks[i].lastY))) {
                    game.door.collision = false
                    game.door.img = "doorclosed"
                }
                else if (game.blocks[i].movement === undefined){
                    game.door.collision = false
                    game.door.img = "doorclosed"
                }
            }
         }
    }
    if (game.player) {
        game.player.update()
    }
    if (game.ghostPlayer) {
        game.ghostPlayer.update()
    }
    game.render()
    if (!paused) {
        window.requestAnimationFrame(update)
    }
}

Game.prototype.render = function(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    for(i = 0 ; i < this.blocks.length ; i++){
        this.blocks[i].render();
    }
    this.player.render()
    if (this.ghostPlayer) {
        this.ghostPlayer.render()
    }
     
    //show teleportation
    if (this.teleportation > 0) {
        var amount = (this.teleportation/teleportationTime)
        ctx.fillStyle = "rgba(155,0,155," + amount + ")"
        ctx.fillRect(0,0,canvas.width,canvas.height)
    }
};

Game.prototype.resize = function(){
    var map = this.maps[this.currentLevel];
    blockSize = Math.round(canvas.width/map.length);
    game.render();
};