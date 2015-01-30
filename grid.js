function Grid(gridLeft, gridTop, rowCount, colCount) {
  this.left = gridLeft;
  this.top = gridTop;
  
  this.rowCount = rowCount;
  this.colCount = colCount;
  
  this.generated = false;
  
  this.tileOutline = '#000';
  this.tileHiddenBody = '#033';
  this.tileRevealedBody = '#0ff';
  this.tileMarkedBody = '#ff0';
  this.tileMineBody = '#f00';
  this.tileRevealedWinBody = '#0f0';
  
  this.mineCount = 0;
  this.marked = 0;
  this.minesRemaining = 0;
  this.tilesRevealed = 0;
  
  this.tiles = new Array(this.rowCount);
  for(var i = 0; i < this.rowCount; i++) {
    this.tiles[i] = Array(this.colCount);
    for(var j = 0; j < this.colCount; j++) {
      this.tiles[i][j] = new Tile(j, i);
    }
  }
  
  this.draw = function() {
    for(var i = 0; i < this.rowCount; i++) {
      for(var j = 0; j < this.colCount; j++) {
        this.tiles[i][j].draw(this);
      }
    }
  }
  
  this.generateMines = function(mineCount, x, y) {
    this.generated = true;
    
    this.mineCount = mineCount;
    
    var mineChance = mineCount / (this.rowCount * this.colCount);
    console.log('Mine chance: ' + mineChance);
    while(this.minesRemaining < this.mineCount) {
      for(var i = 0; i < this.rowCount && this.minesRemaining < mineCount; i++) {
        for(var j = 0; j < this.colCount && this.minesRemaining < mineCount; j++) {
          if(Math.random() < mineChance && this.tiles[i][j].state == HIDDEN) {
            this.minesRemaining++;
            this.tiles[i][j].content = MINE;
            console.log('Mine generated!');
          }
        }
      }
    }
    
    for(var i = 0; i < this.rowCount; i++) {
      for(var j = 0; j < this.colCount; j++) {
        if(this.tiles[i][j].content == EMPTY) {
          this.generateTileMineCount(j, i);
        }
      }
    }
  }
  
  this.generateTileMineCount = function(gridX, gridY) {
    for(var i = gridY - 1; i <= gridY + 1; i++) {
      if(i >= 0 && i < this.rowCount) {
        for(var j = gridX - 1; j <= gridX + 1; j++) {
          if(j >= 0 && j < this.colCount) {
            if(this.tiles[i][j].content == MINE) {
              this.tiles[gridY][gridX].content++;
            }
          }
        }
      }
    }
  }
  
  this.revealAll = function() {
    for(var i = 0; i < this.rowCount; i++) {
      for(var j = 0; j < this.colCount; j++) {
        this.tiles[i][j].state = REVEALED;
      }
    }
  }
  
  this.revealAllWin = function() {
  }
}
