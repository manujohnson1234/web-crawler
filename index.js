const http = require('http');
const fs = require('fs');
const path = require('path');


function loadServer(){
    const server = http.createServer((req, res)=>{
        const file_path = path.join(__dirname, 'output.txt');
    
        fs.readFile(file_path, (err, data)=>{
            if(err){
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Internel server error');
                return;
            }
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(data);
    
        });
    
    });
    
    server.listen(3000, ()=>console.log('server is running in port 3000'));

    return server;
}


function delete_file(){

    const filePath = path.join(__dirname, 'output.txt'); 

    fs.stat(filePath, (err, stats) => {
            if (err) {
            if (err.code === 'ENOENT') {
            console.log('File does not exist.');
            return;
            }
            console.error('Error occurred while checking file:', err);
            return;
        }

        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
                return;
            }
            console.log('File deleted successfully');
        });
        
    });




    

    
}


module.exports = {
    loadServer,
    delete_file
}
