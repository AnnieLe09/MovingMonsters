var RandomObstacle = cc.Class.extend({
    _cellNum: 0,
    _obstacleFlag:null,
    _leftCells:0,
    ctor:function(map){
        this._cellNum = MW.map.HEIGHT * MW.map.WIDTH;
        this._obstacleFlag = new Array(this._cellNum).fill(false);
        this._leftCells = this._cellNum - 2; 
        this.initObstacleFlag();
    },
    initObstacleFlag:function(){
        this._obstacleFlag[0] = true;
        this._obstacleFlag[1] = true;

    },
    randomizeCellType:function(){
        var idx = Utilities.randomizeInt(0, this._leftCells - 1); 
        var tmp = 0; // Là biến đếm các số chưa được đánh dấu
        var curIdx = 1; // Vị trí thực của phần tử đó
        while(true){
            if(!this._obstacleFlag[curIdx]){
                tmp++;
            }else{
                curIdx++;
                continue;
            }
            if(tmp == idx) break;
            curIdx++;
        }
        this.setBannedCells(curIdx);
        return this.getPosFromIndex(curIdx);
    },
    setBannedCells:function(idx){
        var condD = (idx + MW.map.WIDTH < this._cellNum);
        var condU = (idx - MW.map.WIDTH >= 0);
        var condR = ((idx + 1) % MW.map.WIDTH != 0 );
        var condL = (idx % MW.map.WIDTH != 0);
        this.setBannedCell(true, idx);
        this.setBannedCell(condD && !this._obstacleFlag[idx + MW.map.WIDTH], idx + MW.map.WIDTH);
        this.setBannedCell(condU && !this._obstacleFlag[idx - MW.map.WIDTH], idx - MW.map.WIDTH);
        this.setBannedCell(condR && !this._obstacleFlag[idx + 1], idx + 1);
        this.setBannedCell(condL && !this._obstacleFlag[idx - 1], idx - 1);
        this.setBannedCell(condD && condR && !this._obstacleFlag[idx + MW.map.WIDTH + 1], idx + MW.map.WIDTH + 1);
        this.setBannedCell(condD && condL && !this._obstacleFlag[idx + MW.map.WIDTH - 1], idx + MW.map.WIDTH - 1);
        this.setBannedCell(condU && condR && !this._obstacleFlag[idx - MW.map.WIDTH + 1], idx - MW.map.WIDTH + 1);
        this.setBannedCell(condU && condL && !this._obstacleFlag[idx - MW.map.WIDTH - 1], idx - MW.map.WIDTH - 1);
    },
    setBannedCell:function(condition, idx){
        if(condition){
            this._obstacleFlag[idx] = true;
            this._leftCells--;
        }
    },
    getPosFromIndex:function(idx){
        return {
            row: Math.floor(idx / MW.map.WIDTH),
            col: idx % MW.map.WIDTH 
        };
    }
});