const orden_trabajoCtl = {}
const sql = require('../Database/dataBase.sql')
const orm = require('../Database/dataBase.orm')

orden_trabajoCtl.mostrar = (req, res) => {
    res.render('orden_trabajo/agregar');
}

//mandar
orden_trabajoCtl.mandar = async (req, res) => {
    const id =req.id_orden_trabajo  //ojo
    const {descripcion, fecha, horas_trabajo, costo_total } = req.body
    const nuevoEnvio = {
       descripcion,
       fecha,
       horas_trabajo,
       costo_total,    
    }
    await orm.orden_trabajo.create(nuevoEnvio)
    req.flash('success', 'Guardado exitosamente')
    res.redirect('/orden_trabajo/listar/')
}

orden_trabajoCtl.listar = async (req, res) => {
    const lista = await sql.query('select * from orden_trabajos')
    res.render('orden_trabajo/listar', { lista })
}

//traer datos
orden_trabajoCtl.traer = async (req, res) => {
    const ids = req.params.id
    const lista = await sql.query('select * from orden_trabajos where id_orden_trabajo =?', [ids])
    res.render('orden_trabajo/editar', { lista })
}

orden_trabajoCtl.actualizar = async (req, res) => {
    const ids = req.params.id
    const { descripcion, fecha, horas_trabajo, costo_total } = req.body
    const nuevoEnvio = {
        descripcion,
        fecha,
        horas_trabajo,
        costo_total,  
    }
    await orm.orden_trabajo.findOne({ where: { id_orden_trabajo: ids } })
        .then(actualizar => {
            actualizar.update(nuevoEnvio)
        })
    req.flash('success', 'Actualizado exitosamente')
    res.redirect('/orden_trabajo/listar/');
}
orden_trabajoCtl.eliminar = async (req, res) => {
    const ids = req.params.id
    await orm.orden_trabajo.destroy({ where: { id_orden_trabajo: ids } })
        .then(() => {
            req.flash('success', 'Eliminado exitosamente')
            res.redirect('/orden_trabajo/listar/');
        })
}


module.exports = orden_trabajoCtl