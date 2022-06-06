

var MW = MW || {};


MW.SCALE = 1.5;
MW.WIDTH = cc.director.getWinSize().height;
MW.HEIGHT = cc.director.getWinSize().width;
MW.menuHeight = 36;
MW.menuWidth = 123;

MW.constants = {
};
MW.font = {
    SCORE_COLOR: "#B01D1D",
    NEW_HIGH_SCORE_COLOR: "#FF8328"
};
MW.map = {
    WIDTH: 7, 
    HEIGHT: 7,
    startPos:{
        i:0,
        j:0
    },
    endPos:{
        i:6,
        j:6
    },
};
MW.cellType = {
    GROUND: 0,
    ROCK: 1,
    TREE: 2,
    START: 3,
    END: 4
};
MW.cellPath = {
    "0": "ground_cell.png",
    "1": "rock_cell.png",
    "2": "tree_cell.png",
    "3": "start_cell.png",
    "4": "end_cell.png"
};
MW.obstacle = {
    MIN_NUM: 5,
    MAX_NUM: 7
};
MW.monster = {
    type: ["swordsman", "dragon", "giant"],
    direction: {
        D: [1, 0],
        R: [0, 1],
        U: [-1, 0],
        L: [0, -1]
    },
    animation: {
        swordsman:{
            path: "monster_swordsman_run_00",
            velocity: 150,
            R:{
                START_INDEX: 24,
                END_INDEX: 35,
                FLIPPED: false
            },
            D:{
                START_INDEX: 0, 
                END_INDEX: 11,
                FLIPPED: false
            },
            U:{
                START_INDEX: 48, 
                END_INDEX: 59,
                FLIPPED: false
            },
            L:{
                START_INDEX: 24,
                END_INDEX: 35,
                FLIPPED: true
            }
        },
        dragon:{
            path: "monster_dragon_run_00",
            velocity: 100,
            R:{
                START_INDEX: 20,
                END_INDEX: 29,
                FLIPPED: false
            },
            D:{
                START_INDEX: 0, 
                END_INDEX: 9,
                FLIPPED: false
            },
            U:{
                START_INDEX: 40, 
                END_INDEX: 49,
                FLIPPED: false
            },
            L:{
                START_INDEX: 20,
                END_INDEX: 29,
                FLIPPED: true
            }
        },
        giant:{
            path: "monster_giant_run_00",
            velocity: 80,
            R:{
                START_INDEX: 32,
                END_INDEX: 47,
                FLIPPED: false
            },
            D:{
                START_INDEX: 0, 
                END_INDEX: 15,
                FLIPPED: false
            },
            U:{
                START_INDEX: 64, 
                END_INDEX: 79,
                FLIPPED: false
            },
            L:{
                START_INDEX: 32,
                END_INDEX: 47,
                FLIPPED: true
            } 
        }
    },
    velocity: {
        MIN: 50,
        MAX: 100
    }
};
MW.CELL_SIZE = 77;
MW.CELL_SCALE = (MW.WIDTH - 20) / (MW.map.WIDTH * MW.CELL_SIZE);