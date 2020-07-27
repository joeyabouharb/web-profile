const fs = require('fs');
const crypto = require('crypto');
const { promisify } = require('util');
const parser = require('node-html-parser');

const readDir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);



(async ([,, src = 'dist', out = '.']) => {
  const files = await readDir(src);
  const htmlOut = await Promise.all(
    files.filter(file => file.search(/^.+\.html$/) >= 0)
      .map(async (file) => {
        const result = await readFile(`${src}/${file}`)
        return [parser.parse(result.toString(), { pre: true }), file];
      })
  );
  const finished = htmlOut.map(([html, filename]) => {
    const changes = [
      ...html.querySelectorAll('script'),
      ...html.querySelectorAll('link')
    ].map((el) => [el.getAttribute('src') || el.getAttribute('href'), el])
    .filter(([file]) => file !== undefined && fs.existsSync(`${src}${file}`))
    .map(async ([file, el]) => {
      const buffer = await readFile(`dist/${file}`)
        .catch((err) => { throw err });
      const algorithm = 'sha384';
      const hasher = crypto.createHash(algorithm);
      const hash = hasher.update(buffer);
      console.log(file);
      if (el.getAttribute('src') || el.getAttribute('type') === 'text/css') {
        const dig = hash.digest('base64');
        console.log(dig)
        el.setAttribute('integrity', `${algorithm}-${dig}`);
        el.setAttribute('crossorigin', 'anonymous');
      }

      writeFile(`${out}/${filename}`, html.toString()).catch(console.log);
      return filename;
      })
    return Promise.all(changes)
  });
  return Promise.all(finished);
})(process.argv)
  .then((res) => console.log(new Set(res.flat().filter((f) => f !== undefined))))
  .catch(console.log);




// const [,, src = 'dist', out = '.'] = process.argv;

// readDir(src)
//   .then((files) => {
//     return Promise.all(
//       files.filter(file => file.search(/^.+\.html$/) >= 0)
//         .map((file) => {
//           return readFile(`${src}/${file}`)
//             .then(result => result.toString())
//             .then(data => [parser.parse(data), file])
//         })
//     );
//   })
//   .then((results) => Promise.all(results.map(([result, filename]) => {
//     return Promise.all(result.querySelectorAll('script')
//       .concat(result.querySelectorAll('link'))
//       .map((el) => [el.getAttribute('src') || el.getAttribute('href'), el])
//       .filter(([file]) => file !== undefined)
//       .map(([file, el]) => {
//           return readFile(`dist/${file}`)
//             .then((buffer) => {
//               const hasher = crypto.createHash('sha384');
//               return hasher.update(buffer);
//             })
//             .then((hash) => {
//               if (el.getAttribute('src') || el.getAttribute('type') === 'text/css') {
//                 el.setAttribute('integrity', hash.digest('base64'));
//                 el.setAttribute('crossorigin', 'anonymous');
//               }
//               writeFile(`${out}/${filename}`, result.toString()).catch(console.log);
//               return filename;
//             }).catch((err) => console.log(err.path + " could not be read..."));
//       }));
//   })))
//   .then((res) => console.log(new Set(res.flat())))
//   .catch(console.log);