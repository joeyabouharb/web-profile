const { Readable } = require('stream');
const alive = 1;
const dead = 0;

const conwaysGameOfLife = (game) => {
  const newGame = []
  for (let y = 0; y < game.length; y += 1) {
    const newRow = []
    for (let x = 0; x < game[y].length; x += 1) {
      const cell = game[y][x];
      const prevX = x > 0 ? x - 1 : x;
      const nextX = x < game[y].length - 1 ? x + 2 : x + 1;
      const counter =
        (game[y - 1] ? game[y - 1].slice(prevX, nextX).reduce((acc, v) => acc + v) : 0) +
        (game[y][x - 1] || 0) + (game[y][x + 1] || 0) +
        (game[y + 1] ? game[y + 1].slice(prevX, nextX).reduce((acc, v) => acc + v) : 0)
      cell === alive
        ? counter > 1 && counter <= 3
          ? newRow.push(alive)
          : newRow.push(dead)
      : counter === 3
        ? newRow.push(alive)
        : newRow.push(dead)
    }
    newGame.push(newRow)
  }
  return newGame
}

const generateGame = (height, width) => {
  return Array.from({ length: height }, (v, k) => (
    Array.from({ length: width}, (v, k) => (Math.random() * 100 | 0) < 50 ? dead : alive)
  ))
}

// const output = ((canvas, w = 3,  h = 3) => {
//   const element = document.getElementById(canvas);
//   const ctx = element.getContext('2d');
//   return (game) => {
//     for (let y = 0; y < game.length; y += 1) {
//       for (let x = 0; x < game[y].length; x += 1) {
//         ctx.fillStyle = game[y][x] ? "black" : "blue";
//         ctx.fillRect(y * w, x * h, w, h)
//       }
//     }
//   }
// })

const output = (game) => {
    let generator = function* (game) {
        for (const line of game) {
            yield (line.join('') + '\n');
        }
    }
  let screen = generator(game);
  let data = Readable.from(screen);
  data.on('error', (err) => console.error(err));
  data.pipe(process.stdout).write();
}

const setup = ((game) => {

  return () => {
    setInterval(() => {
    output(game)
    game = conwaysGameOfLife(game)
    }, 1000)
  }
})

const game = generateGame(50, 250)

const run = setup(game);
// for random game

run()