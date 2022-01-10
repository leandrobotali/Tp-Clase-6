const fs = require('fs');

class Contenedor{
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo;
    }

    save(obj) {
        let pormesa = new Promise((resolve, reject) => {
            fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8')
                .then(contenido => {
                    let arrayProductos = JSON.parse(contenido, 'utf-8');

                    let idMasAlto = 0;
                    if(arrayProductos.length>0){
                       idMasAlto =  arrayProductos.reduce((acum,proximo)=> acum>proximo.id? acum:proximo.id,0);
                    }
                    obj.id = parseInt(idMasAlto) + 1

                    arrayProductos.push(obj);
                    let objeto = JSON.stringify(arrayProductos);

                    fs.promises.writeFile(`./${this.nombreArchivo}`, objeto)
                    resolve(obj.id);
                })
                .catch(err => {
                    reject(console.log(err));

                })
        })
        return pormesa;
    }
    getById(id){
        let pormesa = new Promise((resolve, reject) => {
            fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8')
                .then(contenido => {
                    let arrayProductos = JSON.parse(contenido, 'utf-8');
                    const find = arrayProductos.find(producto => producto.id == id) || null;
                    resolve(find);
                })
                .catch(err => {
                    reject('error de lectura');

                })
        })
        return pormesa;
    }

    getAll(){
        let pormesa = new Promise((resolve, reject) => {
            fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8')
                .then(contenido => {
                    let arrayProductos = JSON.parse(contenido, 'utf-8');
                    resolve(arrayProductos);
                })
                .catch(err => {
                    reject('error de lectura');

                })
        })
        return pormesa;
    }

    deleteById(id){
        let pormesa = new Promise((resolve, reject) => {
            fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8')
                .then(contenido => {
                    let arrayProductos = JSON.parse(contenido, 'utf-8');

                    let nuevoArray = arrayProductos.filter(producto => producto.id != id)

                    let objeto = JSON.stringify(nuevoArray);
                    
                    fs.promises.writeFile(`./${this.nombreArchivo}`, objeto)
                    resolve(nuevoArray)
                    
                })
                .catch(err => {
                    reject('error de lectura');

                })
        })
        return pormesa;
    }

    deleteAll(){
        let pormesa = new Promise((resolve, reject) => {
            fs.promises.writeFile(`./${this.nombreArchivo}`, "[]")
                .then(
                    resolve('archivo vacio')
                )
                .catch(err => {
                    reject('error de lectura');

                })
        })
        return pormesa;
    }
}

module.exports ={Contenedor};