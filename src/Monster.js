var Monster = cc.Sprite.extend({
    _type:"",
    _velocity:0,
    _directions:null,
    _startPos:null,
    ctor:function(type, startPos, velocity, directions){
        this._super();
        this.initAttributes(type, startPos, velocity, directions);
        this.initPosition();
        //this.initPath();
        //this.goToGoal();
    },
    initAttributes:function(type, startPos, velocity, directions){
        this._type = type;
        this._velocity = velocity;
        this._directions = directions;
        this._startPos = startPos;
        this._cellSize = MW.CELL_SIZE * MW.CELL_SCALE;
    },
    initPosition:function(){
        this.setAnchorPoint(cc.p(0.5, 0));
        this.setPosition(cc.p(this._startPos.x, this._startPos.y));
    },
    createAnimation:function(s, startIdx, endIdx){
        var animFrames = [];
        var str = "";
        var frame;
        for(var i = startIdx; i <= endIdx; ++i){
            str = MW.monster.animation[this._type].path + (i < 10 ? ("0" + i) : i) + ".png";
            frame = cc.spriteFrameCache.getSpriteFrame(str);
            
            animFrames.push(frame);
        }
        return cc.animate(new cc.Animation(animFrames, (s / this._velocity) / (endIdx - startIdx)));
    },
    initPath:function(){
        var compressPath = Utilities.compressString(this._directions);
        var directions = compressPath.chars;
        var num = compressPath.num;
        var actionFrames = [];
        var animInfo = MW.monster.animation[this._type];

        // Duyệt trong mảng directions để tạo ra actions
        for(var i = 0; i < directions.length; ++i){
            var s = num[i] * this._cellSize;
            var move = cc.MoveBy.create(s / this._velocity, cc.p(s * MW.monster.direction[directions[i]][1], -s * MW.monster.direction[directions[i]][0]));
            var anim = this.createAnimation(s, animInfo[directions[i]].START_INDEX, animInfo[directions[i]].END_INDEX);
            var action = cc.spawn(move, anim);
            this._flipped = animInfo[directions[i]].FLIPPED;
            actionFrames.push(cc.callFunc(
                function(){
                    this.setFlippedX(this._flipped);
                }, 
            this));
            actionFrames.push(action);
        }
        actionFrames.push(cc.callFunc(function(){
            this.setVisible(false);
            this.removeFromParent();}, this));
        this._path = cc.sequence(actionFrames);
    },
    returnDirection:function(action, flipped){
        this.setFlippedX(flipped);
        return action;
    },
    goToGoal:function(path){
        this.runAction(path);
    }
});