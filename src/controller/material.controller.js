const materialCtl = {}
const sql = require('../Database/dataBase.sql')
const orm = require('../Database/dataBase.orm')

materialCtl.mostrar = (req, res) => {
    res.render('material/agregar');
}

//mandar
materialCtl.mandar = async (req, res) => {
    const id =req.id_material  //ojo
    const {nombre_material,cantidad,costo_unitario } = req.body
    const nuevoEnvio = {
        nombre_material,
        cantidad,
        costo_unitario, 
    
    }
    await orm.material.create(nuevoEnvio)
    req.flash('success', 'Guardado exitosamente')
    res.redirect('/material/listar/')
}

materialCtl.listar = async (req, res) => {
    const lista = await sql.query('select * from materiales')
    res.render('material/listar', { lista })
}

//traer datos
materialCtl.traer = async (req, res) => {
    const ids = req.params.id
    const lista = await sql.query('select * from materiales where id_material =?', [ids])
    res.render('material/editar', { lista })
}

materialCtl.actualizar = async (req, res) => {
    const ids = req.params.id
    const { nombre_material,cantidad,costo_unitario} = req.body
    const nuevoEnvio = {
        nombre_material,
        cantidad,
        costo_unitario,  
    }
    await orm.material.findOne({ where: { id_material: ids } })
        .then(actualizar => {
            actualizar.update(nuevoEnvio)
        })
    req.flash('success', 'Actualizado exitosamente')
    res.redirect('/material/listar/');
}
materialCtl.eliminar = async (req, res) => {
    const ids = req.params.id
    await orm.material.destroy({ where: { id_material: ids } })
        .then(() => {
            req.flash('success', 'Eliminado exitosamente')
            res.redirect('/material/listar/');
        })
}


module.exports = materialCtl