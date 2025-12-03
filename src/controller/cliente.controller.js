const clienteCtl = {}
const sql = require('../Database/dataBase.sql')
const orm = require('../Database/dataBase.orm')

// Mostrar formulario de agregar cliente
clienteCtl.mostrar = (req, res) => {
    res.render('cliente/agregar'); // SIN slash inicial
}

// Guardar cliente (POST)
clienteCtl.mandar = async (req, res) => {
    const { cedula, nombre, telefono, correoelectronico, direccion } = req.body

    const nuevoEnvio = {
        cedula,
        nombre, 
        telefono, 
        correoelectronico,
        direccion, 
    }

    try {
        await orm.cliente.create(nuevoEnvio)
        req.flash('success', 'Guardado exitosamente')
        res.redirect('/cliente/listar')
    } catch (error) {
        console.error(error)
        req.flash('error', 'Error al guardar el cliente')
        res.redirect('/cliente/agregar')
    }
}

// Listar clientes
clienteCtl.listar = async (req, res) => {
    try {
        const lista = await sql.query('SELECT * FROM clientes')
        res.render('cliente/listar', { lista }) // SIN slash inicial
    } catch (error) {
        console.error(error)
        req.flash('error', 'Error al listar los clientes')
        res.redirect('/')
    }
}

// Traer datos de un cliente para editar
clienteCtl.traer = async (req, res) => {
    const ids = req.params.id
    try {
        const lista = await sql.query('SELECT * FROM clientes WHERE id_cliente = ?', [ids])
        res.render('cliente/editar', { lista }) // SIN slash inicial
    } catch (error) {
        console.error(error)
        req.flash('error', 'Error al traer los datos del cliente')
        res.redirect('/cliente/listar')
    }
}

// Actualizar cliente
clienteCtl.actualizar = async (req, res) => {
    const ids = req.params.id
    const { cedula, nombre, telefono, correoelectronico, direccion } = req.body

    const nuevoEnvio = { cedula, nombre, telefono, correoelectronico, direccion }

    try {
        const actualizar = await orm.cliente.findOne({ where: { id_cliente: ids } })
        if (actualizar) {
            await actualizar.update(nuevoEnvio)
            req.flash('success', 'Actualizado exitosamente')
        } else {
            req.flash('error', 'Cliente no encontrado')
        }
        res.redirect('/cliente/listar')
    } catch (error) {
        console.error(error)
        req.flash('error', 'Error al actualizar el cliente')
        res.redirect('/cliente/listar')
    }
}

// Eliminar cliente
clienteCtl.eliminar = async (req, res) => {
    const ids = req.params.id
    try {
        await orm.cliente.destroy({ where: { id_cliente: ids } })
        req.flash('success', 'Eliminado exitosamente')
        res.redirect('/cliente/listar')
    } catch (error) {
        console.error(error)
        req.flash('error', 'Error al eliminar el cliente')
        res.redirect('/cliente/listar')
    }
}

module.exports = clienteCtl
