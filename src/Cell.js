var Cell = cc.Sprite.extend({
    _type:0,
    _posX:0,
    _posY:0,
    ctor:function(type, posX, posY){
        this._type = type;
        this._posX = posX;
        this._posY = posY;
        this._super("#" + MW.cellPath["" + type]);
        this.setAnchorPoint(cc.p(0.5, 0));
        this.setScale(MW.CELL_SCALE);
        this.setPosition(cc.p(posX, posY));
    }
});