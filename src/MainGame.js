var MainGame = cc.Layer.extend({
  _obstacle_num: 0,
  _map: null,
  _randomObstacle: null,
  _mapSprite: null,
  _cellSize: 0,
  ctor: function () {
    this._super();
    this.init();
  },
  init: function () {
    this.initAttributes();
    this.initBackground();
    this.initButtons();
    this.initObstacleNumber();
    this.initMap();
    this._bfs = new BFS(this._map);
    this._path = this._bfs.tracePath();
    this.createMonsters();
  },
  initAttributes: function () {
    cc.spriteFrameCache.addSpriteFrames(res.cells_plist);
    cc.spriteFrameCache.addSpriteFrames(res.giant_plist);
    cc.spriteFrameCache.addSpriteFrames(res.swordsman_plist);
    cc.spriteFrameCache.addSpriteFrames(res.dragon_plist);
    cc.audioEngine.playEffect(res.gameMusic_mp3);
    this._winSize = cc.director.getWinSize();
    this._cellSize = MW.CELL_SIZE * MW.CELL_SCALE;
  },
  initBackground:function(){
    this._backgroundSprite = cc.Sprite.create(res.green_background_jpg);
    this._backgroundSprite.setAnchorPoint(cc.p(0.5, 0.5));
    // Scale background to be fixed with screen
    var ratio = Math.max(
      (1.0 * this._winSize.height) / this._backgroundSprite.height,
      (1.0 * this._winSize.width) / this._backgroundSprite.width
    );
    this._backgroundSprite.setPosition(
      cc.p(this._winSize.width / 2, this._winSize.height / 2)
    );
    this._backgroundSprite.setScale(ratio);
    this.addChild(this._backgroundSprite, 0);
  },
  initButtons:function(){
    this._againBtn = ccui.Button.create(res.again_button_png);
    this._againBtn.setTouchEnabled(true);
    this._againBtn.x = this._winSize.width - 50;
    this._againBtn.y = this._winSize.height - 50;
    this._againBtn.addTouchEventListener(this.playAgain, this);
    this.addChild(this._againBtn, 2);
  },
  playAgain:function(sender){
    cc.director.runScene(new cc.TransitionFade(0.5,MainGame.scene()));

  },
  initObstacleNumber: function () {
    this._obstacle_num = Utilities.randomizeInt(
      MW.obstacle.MIN_NUM,
      MW.obstacle.MAX_NUM
    );
  },
  initMap: function () {
    this._startPos = MW.map.startPos;
    this._endPos = MW.map.endPos;
    this._map = [];
    this._randomObstacle = new RandomObstacle();
    // Khởi tạo map
    for (var i = 0; i < MW.map.HEIGHT; ++i) {
      this._map[i] = new Array(MW.map.WIDTH).fill(0);
    }
    // Random cell để đặt vật cản, sau đó random vật cản
    for (var i = 0; i < this._obstacle_num; ++i) {
      var pos = this._randomObstacle.randomizeCellType();
      var obstacle = Utilities.randomizeInt(1, 2);
      this._map[pos.row][pos.col] = obstacle;
    }
    // Gán ô bắt đầu và kết thúc
    this._map[this._startPos.i][this._startPos.j] = MW.cellType.START;
    this._map[this._endPos.i][this._endPos.j] = MW.cellType.END;
    // Tạo 1 hình map
    this._mapSprite = new Map(this._map);
    this._mapSprite.setPosition(
      cc.p(
        this._cellSize / 2 + 10,
        (this._winSize.height - this._cellSize * MW.map.HEIGHT) / 2
      )
    );
    this.addChild(this._mapSprite, 1);
  },
  createMonsters: function () {
    // Dùng MonsterGenerator tạo ra quái 
    this._monsterGenerator = new MonsterGenerator(this._mapSprite.getPosOfCell(this._startPos.i, this._startPos.j),this._path);
    // Sau thời gian random [1, 2]  thì tạo ra 1 quái
    this._scheduleTime = Utilities.randomizeFloat(1, 2);
    this.schedule(function () {
      this.createMonster();
      this._scheduleTime = Utilities.randomizeFloat(1, 2);
    }, this._scheduleTime);
  },
  createMonster: function () {
    this._monster = this._monsterGenerator.createRandomMonster();
    this.addChild(this._monster, 100);
  },
});
MainGame.scene = function () {
  var scene = new cc.Scene();
  var layer = new MainGame();
  scene.addChild(layer);
  return scene;
};
