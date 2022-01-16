const http = require('http');

const express = require('express');

const app = express();

const Contenedor = require('./Contenedor.js');


app.get('/productos', (req, res) =>{
    const contenedor1 = new Contenedor.Contenedor('productos.txt')

    async function LanzarMetodoGetAll () {
        try{
            res.send(await contenedor1.getAll());
        }
        catch{
            console.log("no se pueden mostrar los datos");
        }
    }

    LanzarMetodoGetAll()
})

app.get('/productoRamdom', (req, res) =>{
    const contenedor1 = new Contenedor.Contenedor('productos.txt')

    async function numeroRamdom (){
        try{
            const arrayNuevo = await contenedor1.getAll();

            let id = Math.floor((Math.random() * ((arrayNuevo.length+1)-1)+1));
            
            return id
        }
        catch{
            console.log("no se puedo cargar el archivo");
        }
    }


    async function LanzarMetodoGetById (id) {
        try{
            res.send(await contenedor1.getById(id));
        }
        catch{
            console.log("no se pueden mostrar los datos");
        }
    }

  numeroRamdom().then(id => LanzarMetodoGetById(id));
})

const server = app.listen(3000,() => {
    console.log(`puerto ${server.address().port}`);
})
