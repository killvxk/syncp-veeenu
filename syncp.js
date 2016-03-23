#!/usr/bin/env node

const fs    = require('fs'),
      path  = require('path'),
      confd = (function() {
        var dir   = process.cwd(),
            files;

        while(dir !== '/') {
          files = fs.readdirSync(dir);

          if(!files.indexOf('package.json'))
            dir = path.dirname(dir);
          else
            return dir;
        }

        return null;
      }()),
      conf = require(path.join(confd, '/package.json')).syncp || {};

const C0 = '\033[0m',
      C1 = '\033[1;34m',
      C2 = '\033[1;32m',
      C3 = '\033[1;31m';

process.env.PATH = './node_modules/.bin;' + process.env.PATH;

Object.keys(conf).forEach(file => {

  var inpath   = path.join(confd, file),
      outpath  = path.join(confd, conf[file]),
      debounce = false;

  console.log('Watching file ' + C1 + file + C0 + '.');
  fs.watch(inpath, (evt, filename) => {
  
    if(evt !== 'change' || debounce) return;

    console.log(C1 + file + C0 + ' => ' + C2 + conf[file] + C0);

    fs.createReadStream(inpath).pipe(fs.createWriteStream(outpath));
    debounce = true;
    setTimeout(() => { debounce = false; }, 50);

  });

});

process.on('SIGINT', () => {
  children.forEach((i) => {
    i.kill();
  });
  console.log(`${C3}Interrupted. Bye!${C0}`);
});
