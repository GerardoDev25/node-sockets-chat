class Usuarios {
  constructor() {
    this.personas = [];
  }
  // ?
  agragarPersona(id, nombre) {
    let persona = { id, nombre };
    this.personas.push(persona);

    return this.personas;
  }

  // ?
  getPersona(id) {
    return this.personas.filter((pers) => pers.id === id)[0];
  }

  // ?
  getPersonas() {
    return this.personas;
  }

  // ?
  getPersonasPorSalas() {
    // todo
  }

  // ?
  borrarPersonas(id) {
    let personaBorrada = this.getPersona(id);
    this.personas = this.personas.filter((persona) => persona.id != id);

    return personaBorrada;
  }
}

module.exports = {
  Usuarios,
};
