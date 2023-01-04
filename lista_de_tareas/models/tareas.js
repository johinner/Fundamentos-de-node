const Tarea = require("../models/tarea");
require("colors");

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      listado.push(this._listado[key]);
    });

    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    // completo: verde || pendiente rojo
    // 1. tarea :: Completado || Pendiente
    console.log();
    this.listadoArr.forEach((tarea, index) => {
      const idx = `${index + 1}`.green;
      console.log(
        `${idx}${".".green} ${tarea.desc} :: ${
          tarea.completadoEn !== null ? "completado".green : "pendiente".red
        }`
      );
    });
  }

  filtroCompletadasPendientes(completada = true) {
    console.log();
    // Mostrar lista completadas
    let idx = 1;
    if (completada) {
      this.listadoArr.forEach((tarea) => {
        if (tarea.completadoEn !== null) {
          console.log(
            `${(idx + ".").green} ${tarea.desc} :: ${tarea.completadoEn.green}`
          );
          idx++;
        }
      });
    }
    // Mostrar lista pendiente
    if (!completada) {
      this.listadoArr.forEach((tarea) => {
        if (tarea.completadoEn === null) {
          console.log(
            `${(idx + ".").green} ${tarea.desc} :: ${"Pendiente".red}`
          );
          idx++;
        }
      });
    }
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });
    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

module.exports = Tareas;
