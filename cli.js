import fg from 'fast-glob';
import { spawn } from 'child_process';

const entries = await fg(['./**/*.style.js']);

console.log( "Clanga generating styles for:" )

let counter = 1

for ( let file of entries ) {
    console.log( ` ${counter++} -  ${file}`);

    const child = spawn('node', [file], {
        stdio: 'inherit'
    });
}

console.log();