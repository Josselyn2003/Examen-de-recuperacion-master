const personalCtl = {}
const sql = require('../Database/dataBase.sql')
const orm = require('../Database/dataBase.orm')

personalCtl.mostrar = (req, res) => {
    res.render('personal/agregar');
}

//mandar
personalCtl.mandar = async (req, res) => {
    const id =req.id_personal  //ojo
    const {nombre_personal,especialidad,telefono_personal,costo_hora } = req.body
    const nuevoEnvio = {
        nombre_personal,
        especialidad,
        telefono_personal,
        costo_hora,    
    }
    await orm.personal.create(nuevoEnvio)
    req.flash('success', 'Guardado exitosamente')
    res.redirect('/personal/listar/')
}

personalCtl.listar = async (req, res) => {
    const lista = await sql.query('select * from personales')
    res.render('personal/listar', { lista })
}

//traer datos
personalCtl.traer = async (req, res) => {
    const ids = req.params.id
    const lista = await sql.query('select * from personales where id_personal =?', [ids])
    res.render('personal/editar', { lista })
}

personalCtl.actualizar = async (req, res) => {
    const ids = req.params.id
    const { nombre_personal,especialidad,telefono_personal,costo_hora } = req.body
    const nuevoEnvio = {
        nombre_personal,
        especialidad,
        telefono_personal,
        costo_hora,
    }
    await orm.personal.findOne({ where: { id_personal: ids } })
        .then(actualizar => {
            actualizar.update(nuevoEnvio)
        })
    req.flash('success', 'Actualizado exitosamente')
    res.redirect('/personal/listar/');
}
personalCtl.eliminar = async (req, res) => {
    const ids = req.params.id
    await orm.personal.destroy({ where: { id_personal: ids } })
        .then(() => {
            req.flash('success', 'Eliminado exitosamente')
            res.redirect('/personal/listar/');
        })
}


module.exports = personalCtl