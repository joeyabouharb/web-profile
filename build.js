
const pug = require('pug');
const fs = require('fs');
const fse = require('fs-extra');

const about = pug.compileFile('./public/pages/about.pug', { pretty: true } );
const index = pug.compileFile('./public/pages/index.pug', { pretty: true }  );
const projects = pug.compileFile('./public/pages/projects.pug', { pretty: true } );
const blog = pug.compileFile('./public/pages/blog.pug', { pretty: true } );

fs.mkdirSync('./build/pages', {recursive: true}, (err) => {
    if (err) {
        throw err;
    }
    console.info('Preparing Build...')
});
fs.mkdirSync('./build/res', {recursive: true}, (err) => {
    if (err) {
        throw err;
    }
})

fse.copy('./public/res', './build/res', (err) => {
    if (err) {
        throw err;
    }
    console.log('...')
});

fs.writeFile('./build/pages/index.html', index(
    {
        title: 'Joey :: Home',
        description: 'Joey&#39; Home Page - Welcome!',
        ext: '.html'
    }
), (err) => {
    if (err) {
        throw err;
    }
    console.info('SuccessFully built Home!')
});

fs.writeFile('./build/pages/blog.html', blog(
    {
        title: 'Joey :: Blog',
        description: 'Joey&#39; Read and comment on my tech blog!',
        ext: '.html'
    }
), (err) => {
    if (err) {
        throw err;
    }
    console.info('Successfully built blog!')
});

fs.writeFile('./build/pages/about.html', about(
    {
        title: 'Joey :: About',
        description: 'Joey&#39; About Page - Includes coding proficiencies and work history',
        ext: '.html'
    }
), (err) => {
    if (err) {
        throw err;
    }
    console.info('Successfully built about!')
});

fs.writeFile('./build/pages/projects.html', projects(
    {
        title: 'Joey :: Projects',
        description: 'Joey&#39; Project Gallery',
        ext: '.html'
    }
), (err) => {
    if (err) {
        throw err;
    }
    console.info('Successfully written Projects!');
});