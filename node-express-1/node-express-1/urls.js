const fs = require('fs');
const http = require('http');
const https = require('https')
const urlModule = require('url');

if (process.argv.length !=3) {
    console.error('Operation is: node urls.js FILENAME')
    process.exit(1)
}


function getURLdata(inputFile){
    try{
        const urls = fs.readFileSync(inputFile, 'utf8').trim().split('\n')
        const promises = [];

        for (const urlString of urls){
            const url = new URL(urlString);
            const hostname = url.hostname;

            promises.push(new Promise((resolve, reject)=>{
               if(url.protocol === 'http:') {
                const request = http.get(url, response =>{
                    if (response.statusCode !== 200 ){
                        console.error(`couldnt download ${urlString}`)
                        resolve()
                        return;
                    }

                    let data = '';
                    response.on('data', chunk => {
                        data += chunk;
                    });
                    response.on('end', ()=>{
                        const fileout = `${hostname}.txt`
                        fs.writeFile(fileout, data, 'utf8', err => {
                            if(err){
                                console.error(`error writing to ${fileout}`)
                            } 
                            else{
                                console.log(`file writen to ${hostname}`)
                            }
                            resolve();
                        });
                    });
                });
                request.on('error', err => {
                    console.error(`Error downloading ${urlString}: ${err.message}`);
                    resolve();
                });
               }
               else if (url.protocol === 'https:'){
                const request = https.get(url, response =>{
                    if (response.statusCode !== 200 ){
                        console.error(`couldnt download ${urlString}`)
                        resolve()
                        return;
                    }

                    let data = '';
                    response.on('data', chunk => {
                        data += chunk;
                    });
                    response.on('end', ()=>{
                        const fileout = `${hostname}.txt`
                        fs.writeFile(fileout, data, 'utf8', err => {
                            if(err){
                                console.error(`error writing to ${fileout}`)
                            } 
                            else{
                                console.log(`file writen to ${hostname}`)
                            }
                            resolve();
                        });
                    });
                });
                request.on('error', err => {
                    console.error(`Error downloading ${urlString}: ${err.message}`);
                    resolve();
                });

               } else{
                console.error(`Unsupported protocol: ${url.protocol}`)
               }
            }));
        }
        Promise.all(promises).then(()=>{
            console.log('All downloads completed')
        })
    } catch(err){
        console.error(`Error reading ${inputFile}: ${err.message}`)
    }
}


const file = process.argv[2]
getURLdata(file);

module.exports = getURLdata;