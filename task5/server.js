const http = require('http');
const fs = require('fs');
const path = require('path');
const cars_data = require('./products/data');
const carGen = require('./scrpits/scripts');//car Generator
const url = require('url');


function writeFiles(request, response, ...file_paths) {
    let fileTypes = new Map;
    fileTypes.set('.html', 'text/html');
    fileTypes.set('.css', 'text/css');
    fileTypes.set('.png', 'image/png');
    fileTypes.set('.ico', 'image/x-icon');
    let extname = path.extname(request.url);
    file_paths = file_paths.flat(Infinity);
    if (file_paths.length != 0) {
        for (let i = 0; i < file_paths.length; i++) {
            if (file_paths[i].includes(request.url) && fileTypes.has(extname) == true) {
                response.writeHead(200, { 'Content-type': fileTypes.get(extname) });
                fs.readFile(file_paths[i], (err, data) => {
                    if (err) throw err
                    response.end(data);
                })
                break;
            }
        }
    }
}

function writePage_html(path, response, content) {
    response.writeHead(200, { 'Content-type': 'text/html' })
    if (typeof content == 'undefined') {
        fs.readFile(path, (err, data) => {
            if (err) {
                console.log('error');
                throw err;
            }
            response.end(data);
        })
    }
    else {
        response.end(content);
    }
} 

let carsHTML = '';
let img_paths = new Array;
cars_data.cars.forEach((val, i)=>{
    img_paths.push(cars_data.cars[i].pic_path)
    carsHTML += carGen.car_html(cars_data.cars[i]);
})


const server = http.createServer((request, response) => {
    
    let req_url = url.parse(request.url, true);
    let searchParams = new URLSearchParams(req_url.search);
    console.log(searchParams.get('a'));
    writeFiles(request, response,img_paths, './style.css');
    if(req_url.pathname == '/' || req_url.pathname == '/index.html'){
        writePage_html('./pages/main.html', response, (fs.readFileSync('./pages/main.html')+'').replace('{{content}}', carsHTML));
    }
});

server.listen(2007);