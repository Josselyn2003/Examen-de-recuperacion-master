const inicioCtl = {}
const sql = require('../Database/dataBase.sql')
const orm = require('../Database/dataBase.orm')


inicioCtl.Mostrar = (req, res) => {
    res.render('inicio');
}

inicioCtl.mandar = async(req, res)=>{
    const { mensaje, descripcion} = req.body
    const nuevoEvio ={
        mensaje,
        descripcion
    }
    await orm.inicio.create(nuevoEvio)
    req.flash('success', 'Guardado con exito')
    res.redirect('/inicio');
}
module.exports  = inicioCtl