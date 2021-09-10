const { io } = require("../server");
const { Usuarios } = require("../clases/usuarios");
const { crearMensajes } = require("./utilidades/utilidades");

const usuarios = new Usuarios();

io.on("connection", (client) => {
  client.on("entrarChat", (data, callback) => {
    if (!data.nombre) {
      return callback({
        error: true,
        mensaje: "El nombre es necesario",
      });
    }

    let personas = usuarios.agragarPersona(client.id, data.nombre);

    client.broadcast.emit("listaPersonas", usuarios.getPersonas());

    callback(personas);
  });

  client.on("crearMensaje", (data) => {
    let persona = usuarios.getPersona(client.id);

    let mensaje = crearMensajes(persona.nombre, data.mensaje);
    client.broadcast.emit("crearMensaje", mensaje);
  });

  client.on("disconnect", () => {
    let personaBorrada = usuarios.borrarPersonas(client.id);

    client.broadcast.emit(
      "crearMensaje",
      crearMensajes("Administrador", `${personaBorrada.nombre} salio`)
    );
    client.broadcast.emit("listaPersonas", usuarios.getPersonas());
  });

  client.on("mensajePrivado", (data) => {
    let persona = usuarios.getPersona(client.id);

    client.broadcast
      .to(data.para)
      .emit("mensajePrivado", crearMensajes(persona.nombre, data.mensaje));
  });
});
