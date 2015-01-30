function Tile(gridX, gridY) {
  this.gridX = gridX;
  this.gridY = gridY;
  
  this.content = EMPTY;
  this.state = HIDDEN;
  
  this.draw = function(grid) {
    ctx.beginPath();
    ctx.rect(this.gridX * TILE_LENGTH + grid.left + 0.5, this.gridY * TILE_LENGTH + grid.top + 0.5,
             TILE_LENGTH, TILE_LENGTH);
    ctx.closePath();
    
    switch(this.state) {
    case HIDDEN:
      ctx.fillStyle = grid.tileHiddenBody;
      ctx.fill();
      break;
      
    case REVEALED:
      ctx.fillStyle = grid.tileRevealedBody;
      ctx.fill();
      switch(this.content) {
        case EMPTY:
          break;
        
        case MINE:
          ctx.fillStyle = '#f00';
          ctx.fill();
          break;
        
        default:
          ctx.font = '20px Georgia';
          ctx.fillStyle = '#000';
          ctx.fillText(this.content, this.gridX * TILE_LENGTH + grid.left + TILE_LENGTH / 2 + 0.5,
                       this.gridY * TILE_LENGTH + grid.top + TILE_LENGTH / 2 + 0.5);
          
      }
      break;
    
    case MARKED:
      ctx.fillStyle = grid.tileMarkedBody;
      ctx.fill();
      break;
    
    case WIN_REVEALED:
      ctx.fillStyle = '#0f0';
      ctx.fill();
      break;
      
    default:
      ctx.fillStyle = '#fff';
      ctx.fill();
    }
    
    ctx.strokeStyle = grid.tileOutline;
    ctx.stroke();
  }
  
  this.reveal = function(grid) {
    if(this.state == HIDDEN) {
      this.state = REVEALED;
      
      grid.tilesRevealed++;
      
      if(!grid.generated) {
        grid.generateMines(MINE_COUNT, this.gridX, this.gridY);
      }
      
      if(this.content == EMPTY) {
        for(var i = this.gridY - 1; i <= this.gridY + 1; i++) {
          if(i >= 0 && i < grid.rowCount) {
            for(var j = this.gridX - 1; j <= this.gridX + 1; j++) {
              if(j >= 0 && j < grid.colCount) {
                if(grid.tiles[i][j].content != MINE && grid.tiles[i][j].state == HIDDEN) {
                  grid.tiles[i][j].reveal(grid);
                }
              }
            }
          }
        }
      } else if(this.content == MINE) {
        grid.revealAll();
      }
    }
  }
  
  this.mark = function(grid) {
    if(this.state == HIDDEN) {
      this.state = MARKED;
      grid.marked++;
      if(this.content == MINE) {
        grid.minesRemaining--;
      }
    } else if(this.state == MARKED) {
      this.state = HIDDEN;
      grid.marked--;
      if(this.content == MINE) {
        grid.minesRemaining++;
      }
    }
  }
}
