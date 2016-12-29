//legend:
//0 - nothing
//1 - wall
//2 - win
//3 - timewarp
//8 - player
//4 - box

var levelData = [
    "4",
    "6",
    "8",
]
var levelDescriptions = [
    "(Pupil)",
    "(Warrior)",
    "(Master)",
]

var stageBeat = [
    "You have taken your step into learning the art of Ice Zen. You are now my pupil, I will train you in my ways.",
    "Congratulations. You are no longer a pupil. You are an Ice Zen Warrior.",
    "You beat the Shaolin wall. Only 5 others have managed to accomplish such a feat. You are a Zen Master. You have found inner peace. However, the journey never ends. Keep going to reach enlightenment.",
    "Today, you have reached enlightenment. Your mind is crystal clear. You may officially go around and force people to address you as Ice Zen Master ________. Congratulations!",
]

var text = [
    "Hello. I am Master Hesby, your guide to enlightenment. I created Ice Zen, a form of thought that is cold yet clear. By completing these puzzles that I have created for you, you will find inner peace.<br>=-=-=-=<br>First, use the arrow keys or WASD to move around.",
    "Good! Very good! Let's try something harder.<br>=-=-=-=<br> Grey blocks can be moved. Press R to restart if you messed up.",
    "Nice work, disciple. Now is when your brain will be confused.<br>=-=-=-=<br>When you hit a purple block you will travel back in time. Use your past self to your advantage. Remember to relax and maintain your inner zen.",
    "This is the final test before I send you on the road to enlightenment. Are you ready?<br>=-=-=-=<br> Remember to use time travel to your advantage young one. Orange blocks will disappear when you step on the green plates.",
    "Level 1: Simple",
    "Level 2: Sliders",
    "Level 3: Too Easy?",
    "Level 4: Stepping Stone",
    "Level 5: Go!",
    "Level 6: Unopenable Box",
    "Level 7: Timing",
    "Level 8: Stack",
    "Level 9: Timing Again",
    "Level 10: Bigger",
    "Level 11: Harder",
    "Level 12: Brainfreeze",
    "Level 13: Cornered",
    "Level 14: Harder Than It Looks",
    "Level 15: Murder",
    "Level 16: Impossible",
    "Level 17: Have a break :)",
    "Level 18: Shaolin Wall",
    "Level 19: Welcome to 8x8 land",
    "Level 20: Diag 1v1",
    "Level 21: Thinking Ahead",
    "Level 22: Complex",
    "Level 23: Parallel",
    "Level 24: Don't overthink it.",
    "Level 25: Arrangements",
    "Level 26: Second to Last",
    "Level 27: The Final Problem"
    ]
var maps = [
    [
        [0,0,0],
        [0,1,0],
        [8,1,2]
    ],
    [
        [0,2,1],
        [4,4,0],
        [8,1,1]
    ],
    [
        [3,6,2],
        [0,0,1],
        [8,0,5]
    ],
    [
        [2,0,6],
        [1,4,3],
        [5,8,1]
    ],
    [
        [1,3,0,0],
        [5,0,0,0],
        [0,0,1,1],
        [8,0,6,2],
    ],
    [
        [5,0,1,2],
        [4,0,1,6],
        [0,0,1,0],
        [8,0,0,0],
    ],
    [
        [2,0,0,3],
        [1,4,0,1],
        [1,8,1,1],
        [1,1,1,1],
    ],
    [
        [8,0,0,0],
        [4,4,2,0],
        [0,0,0,0],
        [3,0,0,0],
    ],
    [
        [3,1,1,2],
        [0,0,4,0],
        [0,4,6,0],
        [5,8,1,1],
    ],
    [
        [8,4,0,0],
        [0,4,4,4],
        [0,4,2,4],
        [3,4,4,0],
    ],
    [
        [3,1,0,1],
        [0,0,4,2],
        [1,0,4,1],
        [8,4,0,0],
    ],
    [
        [8,4,0,0],
        [6,2,4,4],
        [1,1,0,0],
        [5,4,0,0],
    ],
    [
        [5,0,0,1],
        [0,4,4,4],
        [0,3,4,6],
        [8,4,0,2],
    ],
    [
        [1,1,3,1,2,1],
        [1,0,0,1,6,0],
        [0,0,0,0,0,0],
        [0,0,0,0,1,1],
        [1,0,0,0,4,0],
        [8,0,0,0,0,5],
    ],
    [
        [3,1,0,0,1,4],
        [0,1,4,0,6,2],
        [5,0,4,4,1,4],
        [1,0,4,4,1,4],
        [1,0,4,4,1,4],
        [1,1,8,0,1,4],
    ],
    [
        [2,6,0,5,0,0],
        [1,0,1,4,1,0],
        [1,1,1,0,1,0],
        [4,0,0,0,1,0],
        [0,4,0,0,0,0],
        [8,0,1,1,3,0],
    ],
    [
        [0,1,1,2,1,1],
        [0,4,4,4,4,0],
        [0,0,1,1,0,0],
        [0,0,0,4,0,0],
        [0,0,0,1,0,4],
        [3,0,4,1,0,8],
    ],
    [
        [0,4,0,0,0,0],
        [0,4,4,4,6,2],
        [0,0,0,4,1,1],
        [5,0,1,0,0,0],
        [1,0,0,0,0,0],
        [8,0,0,0,1,0],
    ],
    [
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,8,1,0,0],
        [0,0,1,2,0,0],
        [0,0,0,1,0,0],
        [3,0,0,0,0,0],
    ],
    [
        [0,0,0,4,4,0],
        [0,8,1,4,4,0],
        [0,1,2,6,4,0],
        [0,1,4,4,4,0],
        [0,0,0,0,4,0],
        [5,0,0,4,0,0],
    ],
    [
        [8,0,4,4,0,0],
        [0,0,4,0,0,0],
        [0,1,1,1,1,0],
        [0,1,2,4,1,0],
        [0,1,0,0,4,0],
        [1,3,0,0,4,1],
    ],
    [
        [0,4,4,4,0,0],
        [0,4,4,4,0,0],
        [0,4,4,4,0,0],
        [2,4,3,4,8,1],
        [0,4,4,4,0,0],
        [0,4,4,4,0,0],
    ],
    [
        [0,1,0,0,0,0,4,0],
        [0,0,0,0,0,0,0,8],
        [1,1,1,4,1,1,1,1],
        [0,0,0,0,1,0,0,0],
        [0,1,2,0,1,0,0,0],
        [0,0,0,0,0,4,3,0],
        [1,0,0,0,0,0,1,0],
        [0,0,0,0,0,0,0,0],
    ],
    [
        [1,2,6,0,0,0,0,4],
        [0,1,3,0,4,0,4,0],
        [0,0,1,0,4,0,0,0],
        [8,4,0,1,0,0,0,0],
        [0,4,4,0,4,0,0,0],
        [0,0,0,0,0,1,0,0],
        [0,0,0,0,0,0,1,5],
        [0,0,0,0,0,0,0,1],
    ],
    [
        [8,0,1,0,4,4,5,0],
        [0,0,4,0,0,1,2,0],
        [1,1,1,0,1,1,1,6],
        [0,0,0,0,1,0,1,0],
        [0,3,0,0,1,4,0,0],
        [0,0,0,4,0,4,0,4],
        [0,0,0,0,1,1,1,1],
        [1,0,0,0,1,1,1,1],
    ],
    [
        [1,1,0,0,4,0,5,0],
        [2,1,0,0,1,4,1,0],
        [0,1,0,0,1,0,1,1],
        [6,0,0,0,4,0,0,0],
        [0,1,0,0,0,0,0,0],
        [1,1,0,0,0,1,1,1],
        [0,0,0,0,4,4,4,8],
        [3,0,0,0,0,1,1,1],
    ],
    [
        [0,0,0,1,0,1,0,1],
        [1,0,4,1,4,0,0,1],
        [0,0,4,0,4,0,4,0],
        [0,0,4,1,4,1,4,2],
        [0,0,4,1,4,1,4,1],
        [0,0,4,1,4,1,4,1],
        [0,0,4,0,4,1,4,1],
        [3,0,0,1,0,0,8,1],
    ],
    [
        [0,0,0,0,0,0,0,0],
        [0,0,1,0,0,1,0,0],
        [0,1,1,4,4,1,1,0],
        [0,0,0,0,0,4,0,0],
        [0,0,0,8,5,4,0,0],
        [0,1,1,4,4,1,1,1],
        [0,0,1,0,0,1,0,0],
        [0,0,0,0,0,6,0,2],
    ],
    [
        [1,5,1,0,0,0,0,0],
        [1,4,1,0,0,0,0,0],
        [0,0,1,0,0,0,0,0],
        [0,0,1,0,0,4,0,0],
        [0,1,1,0,0,4,1,1],
        [4,0,0,0,0,4,6,0],
        [4,0,1,0,0,8,1,2],
        [0,0,0,4,0,1,1,1],
    ],
    [
        [1,1,0,1,1,0,1,1],
        [2,1,0,4,4,0,0,0],
        [6,1,0,3,1,0,0,5],
        [0,0,0,0,1,0,0,0],
        [1,0,0,0,1,0,0,4],
        [1,0,0,0,4,0,0,0],
        [1,0,0,0,1,0,8,0],
        [1,0,0,0,1,0,4,0],
    ],
    [
        [0,4,4,4,4,4,0,0],
        [0,4,4,4,4,4,0,0],
        [0,4,4,4,4,4,1,0],
        [1,4,4,0,4,4,0,0],
        [2,6,4,3,4,4,0,8],
        [1,4,4,4,4,4,0,1],
        [0,4,4,4,4,4,0,0],
        [0,4,4,4,4,4,0,5],
    ],
]

//add borders to maps
for (a=0;a<maps.length;a++) {
    //add to the sides
    for (b=0;b<maps[a].length;b++) {
        maps[a][b].push(1)
        maps[a][b].unshift(1)
    }
    //add to the top
    var wallString = []
    for (i=0;i<maps[a][0].length;i++) {
        wallString.push(1)
    }
    maps[a].push(wallString)
    maps[a].unshift(wallString)
}