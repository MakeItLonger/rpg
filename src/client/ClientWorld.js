import PositionedObject from '../common/PositionedObject';
import ClientCell from './ClientCell';

class ClientWorld extends PositionedObject {
  constructor(game, engine, levelCfg) {
    super();

    const worldHeight = levelCfg.map.length;
    const worldWidth = levelCfg.map[0].length;
    const cellSize = engine.canvas.height / levelCfg.camera.height;

    Object.assign(this, {
      game,
      engine,
      levelCfg,
      height: worldHeight * cellSize,
      width: worldWidth * cellSize,
      worldHeight,
      worldWidth,
      cellWidth: cellSize,
      cellHeight: cellSize,
      map: [],
    });
  }

  init() {
    // this.engine.renderSpriteFrame({
    //     sprite: ['terrain', 'grass'],
    //     frame: 0,
    //     x: 0,
    //     y: 0,
    //     w: 48,
    //     h: 48,
    // })
    // this.levelCfg.map.forEach((first, y) => {
    //   first.forEach((second, x) => {
    //     this.engine.renderSpriteFrame({
    //       sprite: ['terrain', second[0][0]],
    //       frame: 0,
    //       x: x * 48,
    //       y: y * 48,
    //       w: 48,
    //       h: 48,
    //     });
    //   });
    // });
    const {
      levelCfg, map, worldWidth, worldHeight,
    } = this;

    for (let row = 0; row < worldHeight; row++) {
      for (let col = 0; col < worldWidth; col++) {
        if (!map[row]) {
          map[row] = [];
        }

        map[row][col] = new ClientCell({
          world: this,
          cellCol: col,
          cellRow: row,
          cellCfg: levelCfg.map[row][col],
        });
      }
    }
  }

  render(time) {
    const { map, worldWidth, worldHeight } = this;

    for (let row = 0; row < worldHeight; row++) {
      for (let col = 0; col < worldWidth; col++) {
        map[row][col].render(time);
      }
    }
  }

  cellAt(col, row) {
    return this.map[row] && this.map[row][col];
  }
}

export default ClientWorld;
