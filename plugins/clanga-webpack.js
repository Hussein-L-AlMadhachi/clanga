import { spawn } from 'child_process';

export default function loader(source) {
    
    const child = spawn('node', [this.resourcePath], {
        stdio: 'inherit'
    });

}
