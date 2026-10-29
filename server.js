const http = require('http');
const fs = require('fs');
const db = require('mysql2');
const path = require('path');
const mime = require('mime');


/** Database */
const conexion = db.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'club'
})

conexion.connect(error =>{
    if(error){
        console.log(error);
    } else {
        console.log("Conexion a la DB exitosa");
    }
})

/** Directorios y manejo de path */
//console.log(__dirname);


/** Puerto y server */
const PORT = 8000;
const server = http.createServer((req,res)=>{   
    let route = 'public' + req.url;
    if (route == 'public/')
        route = 'public/index.html'
    router(req,res,route);
})

/** Peticiones req, res */
function router(req,res,route){
    switch (route) {
        
        case 1:
            
            break;
    
        default: {

            fs.stat(route, error => {
                if (!error) {
                    fs.readFile(route, (error, contenido) => {
                        if (error) {
                            res.writeHead(500, { 'Content-Type': 'text/plain' })
                            res.write('Error interno')
                            res.end()
                        } else {
                            const arch = route.split('/')
                            const mimeArchivo = mime.getType(arch);
                            res.writeHead(200, { 'Content-Type': mimeArchivo })
                            res.write(contenido)
                            res.end()
                        }
                    })
                } else {
                    res.writeHead(404, { 'Content-Type': 'text/html' })
                    res.write('<!doctypehtml><html><head></head><body>Recurso inexistente</body></html>')
                    res.end()
                }
            })
        }
        break;
    }
   
}

/** funciones query */

/** Listener del server */

server.listen(PORT, ()=>{
    console.log(`Servidor en puerto: ${PORT}`);
    
})