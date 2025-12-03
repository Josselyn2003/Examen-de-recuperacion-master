const cotizacionCtl = {}
const sql = require('../Database/dataBase.sql')
const orm = require('../Database/dataBase.orm')

cotizacionCtl.mostrar = (req, res) => {
    res.render('cotizacion/agregar');
}

//mandar
cotizacionCtl.mandar = async (req, res) => {
    const id =req.id_cotizacion  //ojo
    const {fecha_cotizacion, total, estado_cotizacion } = req.body
    const nuevoEnvio = {
        fecha_cotizacion,
        total,
        estado_cotizacion,    
    }
    await orm.cotizacion.create(nuevoEnvio)
    req.flash('success', 'Guardado exitosamente')
    res.redirect('/cotizacion/listar/')
}

cotizacionCtl.listar = async (req, res) => {
    const lista = await sql.query('select * from cotizaciones')
    res.render('cotizacion/listar', { lista })
}

//traer datos
cotizacionCtl.traer = async (req, res) => {
    const ids = req.params.id
    const lista = await sql.query('select * from cotizaciones where id_cotizacion =?', [ids])
    res.render('cotizacion/editar', { lista })
}

cotizacionCtl.actualizar = async (req, res) => {
    const ids = req.params.id
    const { fecha_cotizacion, total, estado_cotizacion } = req.body
    const nuevoEnvio = {
        fecha_cotizacion,
        total,
        estado_cotizacion,
    }
    await orm.cotizacion.findOne({ where: { id_cotizacion: ids } })
        .then(actualizar => {
            actualizar.update(nuevoEnvio)
        })
    req.flash('success', 'Actualizado exitosamente')
    res.redirect('/cotizacion/listar/');
}
cotizacionCtl.eliminar = async (req, res) => {
    const ids = req.params.id
    await orm.cotizacion.destroy({ where: { id_cotizacion: ids } })
        .then(() => {
            req.flash('success', 'Eliminado exitosamente')
            res.redirect('/cotizacion/listar/');
        })
}


module.exports = cotizacionCtl