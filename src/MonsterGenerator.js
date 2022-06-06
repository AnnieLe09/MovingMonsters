var MonsterGenerator = cc.Class.extend({
    ctor:function(startPos, path){
        this._startPos = startPos;
        this._path = path;

    },
    createRandomMonster:function(){
        var idx = Utilities.randomizeInt(0, MW.monster.type.length - 1);
        var type = MW.monster.type[idx];
        this._monster = new Monster(type, this._startPos, MW.monster.animation[type].velocity, this._path);
        this._monster.initPath();
        this._monster.goToGoal(this._monster._path);
        return this._monster;
    }
});