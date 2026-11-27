
// DATOS DE DEMOSTRACIÓN
// Posteriormente se reemplazarán por información del backend.

const rutas = [
  {
    id: 1,
    code: "R001",
    name: "Ruta Centro Histórico",
    description: "Recorrido por el centro de Quito y sectores cercanos.",
    paradas: [
      { id: 101, name: "El Ejido", address: "Av. Patria y 10 de Agosto" },
      { id: 102, name: "La Alameda", address: "Av. 10 de Agosto" },
      { id: 103, name: "Plaza Grande", address: "Centro Histórico" },
      { id: 104, name: "Santo Domingo", address: "Plaza de Santo Domingo" }
    ]
  },
  {
    id: 2,
    code: "R002",
    name: "Ruta Norte",
    description: "Conecta sectores del norte de la ciudad.",
    paradas: [
      { id: 201, name: "La Ofelia", address: "Terminal La Ofelia" },
      { id: 202, name: "Cotocollao", address: "Sector Cotocollao" },
      { id: 203, name: "La Florida", address: "Av. La Florida" },
      { id: 204, name: "Bicentenario", address: "Parque Bicentenario" }
    ]
  },
  {
    id: 3,
    code: "R003",
    name: "Ruta Sur",
    description: "Recorrido por diferentes sectores del sur de Quito.",
    paradas: [
      { id: 301, name: "Quitumbe", address: "Terminal Quitumbe" },
      { id: 302, name: "Solanda", address: "Sector Solanda" },
      { id: 303, name: "Villaflora", address: "Av. Rodrigo de Chávez" },
      { id: 304, name: "Chimbacalle", address: "Estación Chimbacalle" }
    ]
  }
];

let incidencias = [
  {
    id: 1,
    type: "Retraso",
    description: "Se reporta demora en el paso de unidades por el sector.",
    severity: "Media",
    routeId: 1,
    stopId: 102
  },
  {
    id: 2,
    type: "Accidente",
    description: "Se informa de un accidente de tránsito cerca de la parada.",
    severity: "Alta",
    routeId: 2,
    stopId: 203
  },
  {
    id: 3,
    type: "Problema en parada",
    description: "Se reportan inconvenientes en las instalaciones de la parada.",
    severity: "Baja",
    routeId: 3,
    stopId: 302
  }
];

const $ = (id) => document.getElementById(id);

function escapar(texto) {
  return String(texto ?? "").replace(/[&<>"']/g, caracter => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[caracter]);
}

function obtenerRuta(id) {
  return rutas.find(ruta => ruta.id === Number(id));
}

function obtenerParada(rutaId, paradaId) {
  const ruta = obtenerRuta(rutaId);
  return ruta?.paradas.find(parada => parada.id === Number(paradaId));
}

// CARGAR SELECTORES
function llenarSelectores() {
  const opciones = rutas.map(ruta => `
    <option value="${ruta.id}">
      ${escapar(ruta.code)} - ${escapar(ruta.name)}
    </option>
  `).join("");

  $("rutaPlanificar").innerHTML =
    '<option value="">Selecciona una ruta</option>' + opciones;

  $("rutaReporte").innerHTML =
    '<option value="">Selecciona una ruta</option>' + opciones;
}

// MOSTRAR RUTAS
function mostrarRutas() {
  $("listaRutas").innerHTML = rutas.map(ruta => `
    <article class="tarjeta">
      <div class="tarjeta-cabecera">
        <span class="codigo">${escapar(ruta.code)}</span>
        <span class="detalle">${ruta.paradas.length} paradas</span>
      </div>
      <h3>${escapar(ruta.name)}</h3>
      <p>${escapar(ruta.description)}</p>
      <p><strong>Primera parada:</strong> ${escapar(ruta.paradas[0].name)}</p>
      <p><strong>Última parada:</strong> ${escapar(ruta.paradas[ruta.paradas.length - 1].name)}</p>
    </article>
  `).join("");
}

// PLANIFICAR RECORRIDO


function generarMapa(ruta) {
  const cantidad = ruta.paradas.length;

  // Coordenadas visuales de cada parada en el mapa.
  const puntos = ruta.paradas.map((parada, indice) => ({
    x: cantidad === 1 ? 350 : 70 + (560 * indice / (cantidad - 1)),
    y: indice % 2 === 0 ? 220 : 105
  }));

  const recorrido = puntos
    .map(punto => `${punto.x},${punto.y}`)
    .join(" ");

  const marcadores = puntos.map((punto, indice) => {
    const esInicio = indice === 0;
    const esDestino = indice === cantidad - 1;

    const clase = esInicio
      ? "inicio"
      : esDestino
        ? "destino"
        : "";

    const posicionTexto = punto.y === 220 ? punto.y + 40 : punto.y - 25;

    return `
      <circle
        cx="${punto.x}"
        cy="${punto.y}"
        r="13"
        class="mapa-punto ${clase}"
      />

      <text
        x="${punto.x}"
        y="${punto.y + 4}"
        text-anchor="middle"
        fill="${esInicio || esDestino ? "#ffffff" : "#303a30"}"
        font-size="11"
        font-weight="bold"
      >${indice + 1}</text>

      <text
        x="${punto.x}"
        y="${posicionTexto}"
        text-anchor="middle"
        class="mapa-etiqueta"
      >${escapar(paradaNombre(ruta.paradas[indice].name))}</text>
    `;
  }).join("");

  return `
    <div class="mapa-recorrido">
      <svg viewBox="0 0 700 340"
           role="img"
           aria-label="Mapa ilustrativo de ${escapar(ruta.name)}">

        <polyline
          points="${recorrido}"
          class="mapa-linea-base"
        />

        <polyline
          points="${recorrido}"
          class="mapa-linea-ruta"
        />

        ${marcadores}
      </svg>
    </div>

    <div class="mapa-leyenda">
      <span><i></i> Inicio del recorrido</span>
      <span><i></i> Paradas intermedias</span>
      <span><i class="leyenda-destino"></i> Destino</span>
    </div>
  `;
}

function paradaNombre(nombre) {
  // Evita etiquetas demasiado largas en el mapa.
  return String(nombre).length > 20
    ? String(nombre).substring(0, 18) + "..."
    : nombre;
}

function mostrarRecorrido(routeId) {
  const resultado = $("resultadoPlanificacion");
  const ruta = obtenerRuta(routeId);

  if (!ruta) {
    resultado.textContent =
      "Selecciona una ruta para consultar sus paradas.";
    return;
  }

  resultado.innerHTML = `
    <div class="resumen-recorrido">
      <div>
        <span class="codigo">${escapar(ruta.code)}</span>
        <h3>${escapar(ruta.name)}</h3>
      </div>

      <span class="detalle">${ruta.paradas.length} paradas</span>
    </div>

    <p>${escapar(ruta.description)}</p>

    <h3 style="margin-top: 25px;">Mapa del recorrido</h3>

    ${generarMapa(ruta)}

    <h3 style="margin-top: 25px;">Paradas del recorrido</h3>

    <ol class="paradas-lista">
      ${ruta.paradas.map((parada, indice) => `
        <li>
          <span class="numero-parada">${indice + 1}</span>

          <div>
            <strong>${escapar(parada.name)}</strong>
            <small>${escapar(parada.address)}</small>
          </div>
        </li>
      `).join("")}
    </ol>
  `;
}


function mostrarRecorrido(routeId) {
  const resultado = $("resultadoPlanificacion");
  const ruta = obtenerRuta(routeId);

  if (!ruta) {
    resultado.textContent =
      "Selecciona una ruta para consultar sus paradas.";
    return;
  }

  resultado.innerHTML = `
    <div class="resumen-recorrido">
      <div>
        <span class="codigo">${escapar(ruta.code)}</span>
        <h3>${escapar(ruta.name)}</h3>
      </div>

      <span class="detalle">${ruta.paradas.length} paradas</span>
    </div>

    <p>${escapar(ruta.description)}</p>

    <h3 style="margin-top: 25px;">Mapa del recorrido</h3>

    ${generarMapa(ruta)}

    <h3 style="margin-top: 25px;">Paradas del recorrido</h3>

    <ol class="paradas-lista">
      ${ruta.paradas.map((parada, indice) => `
        <li>
          <span class="numero-parada">${indice + 1}</span>

          <div>
            <strong>${escapar(parada.name)}</strong>
            <small>${escapar(parada.address)}</small>
          </div>
        </li>
      `).join("")}
    </ol>
  `;
}


// MOSTRAR INCIDENCIAS
function mostrarIncidencias() {
  if (!incidencias.length) {
    $("listaIncidencias").innerHTML =
      '<p class="estado">No hay incidencias reportadas actualmente.</p>';
    return;
  }

  $("listaIncidencias").innerHTML = incidencias.map(incidencia => {
    const ruta = obtenerRuta(incidencia.routeId);
    const parada = obtenerParada(incidencia.routeId, incidencia.stopId);

    const gravedad = String(incidencia.severity).toLowerCase();
    const clase = `gravedad-${gravedad}`;

    return `
      <article class="tarjeta">
        <div class="tarjeta-cabecera">
          <span class="codigo">REPORTE #${incidencia.id}</span>
          <span class="detalle ${clase}">
            ${escapar(incidencia.severity)}
          </span>
        </div>
        <h3>${escapar(incidencia.type)}</h3>
        <p>${escapar(incidencia.description)}</p>
        <p><strong>Ruta:</strong> ${escapar(ruta?.name || "No especificada")}</p>
        <p><strong>Parada:</strong> ${escapar(parada?.name || "No especificada")}</p>
      </article>
    `;
  }).join("");
}

// ACTUALIZAR PARADAS DEL FORMULARIO
function actualizarParadasReporte() {
  const rutaId = $("rutaReporte").value;
  const selector = $("paradaReporte");
  const ruta = obtenerRuta(rutaId);

  selector.innerHTML = '<option value="">Selecciona una parada</option>';

  if (!ruta) {
    selector.disabled = true;
    return;
  }

  selector.disabled = false;

  selector.innerHTML += ruta.paradas.map(parada => `
    <option value="${parada.id}">
      ${escapar(parada.name)}
    </option>
  `).join("");
}

// EVENTOS
$("rutaPlanificar").addEventListener("change", evento => {
  mostrarRecorrido(evento.target.value);
});

$("rutaReporte").addEventListener("change", actualizarParadasReporte);

// ENVIAR REPORTE DE DEMOSTRACIÓN
$("formReporte").addEventListener("submit", evento => {
  evento.preventDefault();

  const rutaId = Number($("rutaReporte").value);
  const paradaId = Number($("paradaReporte").value);

  const nuevaIncidencia = {
    id: incidencias.length
      ? Math.max(...incidencias.map(item => item.id)) + 1
      : 1,
    type: $("tipoReporte").value,
    description: $("descripcionReporte").value.trim(),
    severity: $("gravedadReporte").value,
    routeId: rutaId,
    stopId: paradaId
  };

  if (!obtenerRuta(rutaId) || !obtenerParada(rutaId, paradaId)) {
    $("mensajeReporte").textContent =
      "Selecciona una ruta y una parada válidas.";
    return;
  }

  incidencias.unshift(nuevaIncidencia);

  mostrarIncidencias();

  $("mensajeReporte").textContent =
    "¡Reporte agregado correctamente a la demostración!";

  $("formReporte").reset();

  $("paradaReporte").disabled = true;
  $("paradaReporte").innerHTML =
    '<option value="">Primero selecciona una ruta</option>';

  document.getElementById("incidencias").scrollIntoView({
    behavior: "smooth"
  });
});

// INICIALIZAR PORTAL
function iniciarPortal() {
  llenarSelectores();
  mostrarRutas();
  mostrarIncidencias();
}

iniciarPortal();
