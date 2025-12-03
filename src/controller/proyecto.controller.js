const proyectoCtl = {}
const sql = require('../Database/dataBase.sql')
const orm = require('../Database/dataBase.orm')

proyectoCtl.mostrar = (req, res) => {
    res.render('proyecto/agregar');
}

//mandar
proyectoCtl.mandar = async (req, res) => {
    const id =req.id_proyecto  //ojo
    const {nombre_proyecto,tipo, fecha_inicio, fecha_fin, estado, descripcion_proyecto } = req.body
    const nuevoEnvio = {
        nombre_proyecto,
        tipo,
        fecha_inicio,
        fecha_fin,
        estado,
        descripcion_proyecto, 
    
    }
    await orm.proyecto.create(nuevoEnvio)
    req.flash('success', 'Guardado exitosamente')
    res.redirect('/proyecto/listar/')
}

proyectoCtl.listar = async (req, res) => {
    const lista = await sql.query('select * from proyectos')
    res.render('proyecto/listar', { lista })
}

//traer datos
proyectoCtl.traer = async (req, res) => {
    const ids = req.params.id
    const lista = await sql.query('select * from proyectos where id_proyecto =?', [ids])
    res.render('proyecto/editar', { lista })
}

proyectoCtl.actualizar = async (req, res) => {
    const ids = req.params.id
    const { nombre_proyecto,tipo, fecha_inicio, fecha_fin, estado, descripcion_proyecto } = req.body
    const nuevoEnvio = {
        nombre_proyecto,
        tipo,
        fecha_inicio,
        fecha_fin,
        estado,
        descripcion_proyecto, 
    }
    await orm.proyecto.findOne({ where: { id_proyecto: ids } })
        .then(actualizar => {
            actualizar.update(nuevoEnvio)
        })
    req.flash('success', 'Actualizado exitosamente')
    res.redirect('/proyecto/listar/');
}
proyectoCtl.eliminar = async (req, res) => {
    const ids = req.params.id
    await orm.proyecto.destroy({ where: { id_proyecto: ids } })
        .then(() => {
            req.flash('success', 'Eliminado exitosamente')
            res.redirect('/proyecto/listar/');
        })
}


module.exports = proyectoCtl