const pagoCtl = {}
const sql = require('../Database/dataBase.sql')
const orm = require('../Database/dataBase.orm')

pagoCtl.mostrar = (req, res) => {
    res.render('pago/agregar');
}

//mandar
pagoCtl.mandar = async (req, res) => {
    const id =req.id_pago  //ojo
    const {fecha_pago, monto, metodo_pago } = req.body
    const nuevoEnvio = {
        fecha_pago,
        monto,
        metodo_pago,    
    }
    await orm.pago.create(nuevoEnvio)
    req.flash('success', 'Guardado exitosamente')
    res.redirect('/pago/listar/')
}

pagoCtl.listar = async (req, res) => {
    const lista = await sql.query('select * from pagos')
    res.render('pago/listar', { lista })
}

//traer datos
pagoCtl.traer = async (req, res) => {
    const ids = req.params.id
    const lista = await sql.query('select * from pagos where id_pago =?', [ids])
    res.render('pago/editar', { lista })
}

pagoCtl.actualizar = async (req, res) => {
    const ids = req.params.id
    const { fecha_pago, monto, metodo_pago } = req.body
    const nuevoEnvio = {
        fecha_pago, 
        monto, 
        metodo_pago,
    }
    await orm.pago.findOne({ where: { id_pago: ids } })
        .then(actualizar => {
            actualizar.update(nuevoEnvio)
        })
    req.flash('success', 'Actualizado exitosamente')
    res.redirect('/pago/listar/');
}
pagoCtl.eliminar = async (req, res) => {
    const ids = req.params.id
    await orm.pago.destroy({ where: { id_pago: ids } })
        .then(() => {
            req.flash('success', 'Eliminado exitosamente')
            res.redirect('/pago/listar/');
        })
}


module.exports = pagoCtl