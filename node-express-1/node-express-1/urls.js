const fs = require('fs');
const https = require('https')
const urlModule = require('url')

if (process.argv.length !==3){
    console.error('Proper Form: node urls.js File')
    process.exit(1)
}

const inputFilename = process.argv[2]

try{
    const urls = fs.readFileSync(inputFilename, 'utf8').trim().split('\n');
    const promises = [];

    for (const urlString of urls) {
        const url = new URL(urlString);
        const hostname = url.hostname;

        promises.push(new Promise((resolve, reject) => {
            const request = https.get(url, response => {
                if (response.statusCode !== 200){
                    console.error('Couldnt download ${urlString}');
                    resolve();
                    return;
                }
                let data = '';
                response.on('data', chunk => {
                    data += chunk;
                });

                response.on('end', () => {
                    const outputFilename = '${hostname}.txt';
                    fs.writeFile(outputFilename, data, 'utf8', err=> {
                        if(err){
                            console.error('Error writing to ${outputFilename}: ${err.message}');
                        } else {
                            console.log('wrote to ${hostname}')
                        }
                        resolve();
                    })
                })
            })
            
            request.on('error', err =>{
                console.error('error downloading ${urlString}: ${err.message}')
                resolve();
            });
        }));
    }

    Promise.all(promises),then(()=>{
        console.log('all downloads completed');
    });
} 
    catch (err){
        console.error('Error reading ${inputFilename}: ${err.message}');
    }