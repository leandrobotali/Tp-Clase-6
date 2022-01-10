const http = require('http');

const express = require('express');

const app = express();

const Contenedor = require('./Contenedor.js');


app.get('/productos', (req, res) =>{
    const contenedor1 = new Contenedor.Contenedor('productos.txt')

    async function LanzarMetodoGetAll () {
        res.send(await contenedor1.getAll());
    }

    LanzarMetodoGetAll()
})

app.get('/productoRamdom', (req, res) =>{
    const contenedor1 = new Contenedor.Contenedor('productos.txt')

    let id = Math.floor((Math.random() * (4-1)+1));

    async function LanzarMetodoGetById (id) {
        res.send(await contenedor1.getById(id));
    }

    LanzarMetodoGetById(id)
})

const server = app.listen(3000,() => {
    console.log(`puerto ${server.address().port}`);
})
