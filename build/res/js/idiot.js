
const { PythonShell } = require('python-shell');
const path = require('path');
const readline = require('readline');
const options = {
  mode: 'text',
  pythonOptions: ['-u'], // get print results in real-time
  scriptPath: '../card-game-idiot/src',
  args: ['--start', 'joeyy']
}

const shell = new PythonShell('main.py', options);

shell.on('message', (message) => {

  if (message === '?') {
    const line = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    line.question('', (answer) => {
      console.log(`entered ${answer}`)
      shell.send(answer);
      line.close()
    })
  } else {
    console.log(message)
  }
})

