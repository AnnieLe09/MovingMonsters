var BFS = cc.Class.extend({
  _map: null,
  ctor: function (map) {
    this._map = map;
    this._startPos = MW.map.startPos;
    this._endPos = MW.map.endPos;
    this.bfs();
  },
  bfs: function () {
    var directions = ["R", "D", "L", "U"];
    var moves = MW.monster.direction;
    this._path = [];
    this._visited = [];
    for (var i = 0; i < MW.map.HEIGHT; ++i) {
      this._visited[i] = new Array(MW.map.WIDTH).fill(false);
    }
    this._trace = [];
    for (var i = 0; i < MW.map.HEIGHT; ++i) {
      this._trace[i] = new Array(MW.map.WIDTH).fill(-1);
    }
    var q = [];
    q.push([this._startPos.i, this._startPos.j]);
    this._visited[this._startPos.i][this._startPos.j] = true;
    while (q.length != 0) {
      var cell = q[0];
      var x = cell[0];
      var y = cell[1];
      q.shift();

      // Go to the adjacent cells
      for (var i = 0; i < directions.length; ++i) {
        var direction = directions[i];
        var adjx = x + moves[direction][0];
        var adjy = y + moves[direction][1];

        if (this.isValid(adjx, adjy)) {
          this._trace[adjx][adjy] = direction;
          q.push([adjx, adjy]);
          this._visited[adjx][adjy] = true;
          if (adjx == this._endPos.i && adjy == this._endPos.j) {
            return;
          }
        }
      }
    }
  },
  isValid: function (row, col) {
    if (row < 0 || col < 0 || row >= MW.map.HEIGHT || col >= MW.map.WIDTH)
      return false;

    // If cell is already visited
    if (
      this._visited[row][col] ||
      this._map[row][col] == MW.cellType.ROCK ||
      this._map[row][col] == MW.cellType.TREE
    )
      return false;

    // Otherwise
    return true;
  },
  tracePath: function () {
    var i = this._endPos.i;
    var j = this._endPos.j;
    var u = this._trace[i][j];
    while (u != -1) {
      this._path.push(u);
      i = i - MW.monster.direction[u][0];
      j = j - MW.monster.direction[u][1];
      u = this._trace[i][j];
    }
    this._path.reverse();
    return this._path;
  },
});
