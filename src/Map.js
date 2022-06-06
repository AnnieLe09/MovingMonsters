var Map = cc.Layer.extend({
    _map:null,
    _cellSize:0,
    _cellMat:[],
    ctor:function(map){
        this._super();
        this._map = map;
        this._winSize = cc.director.getWinSize();
        this._cellSize = MW.CELL_SIZE * MW.CELL_SCALE;
        this.initCells();
        this.setAnchorPoint(cc.p(0.5,0.5));
    },
    initCells:function(){
        for(var i = 0; i < MW.map.HEIGHT; ++i){
            this._cellMat[i] = new Array(MW.map.WIDTH);
            for(var j = 0; j < MW.map.WIDTH; ++j){
                this._cell = new Cell(this._map[i][j], j * this._cellSize, (MW.map.HEIGHT - i - 1) * this._cellSize);
                this.addChild(this._cell, i + 1);
                this._cellMat[i][j] = this._cell;
            }
        }
    },
    getPosOfCell:function(i, j){
        this._cell = this._cellMat[i][j];
        return {x: this._cell.x + this.x, y:this._cell.y + this.y};
    }
});