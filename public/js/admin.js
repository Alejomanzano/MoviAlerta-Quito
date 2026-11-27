
/* ==========================================
   MOVIALERTA QUITO
   JavaScript del panel
========================================== */

// Backend local
const API = "http://localhost:3000";

// Estado de la aplicación
let token = "";

let rutas = [];
let paradas = [];
let incidencias = [];
let conexiones = [];

// Acceso rápido a elementos HTML
const $ = (id) => document.getElementById(id);

// Pantallas
const pantallaAccesos = $("login");
const pantallaAdministrador = $("loginAdministrador");
const pantallaUsuario = $("loginUsuario");
const panelAdministracion = $("administracion");

const mensaje = $("mensaje");

// ==========================================
// UTILIDADES
// ==========================================

function escapar(valor) {
    return String(valor ?? "").replace(/[&<>"']/g, caracter => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[caracter]);
}

function mostrarMensaje(texto, error = false) {
    mensaje.textContent = texto;
    mensaje.style.color = error ? "#e52535" : "#087443";
}

function mostrarErrorLogin(texto) {
    let elemento = $("mensajeLogin");

    if (!elemento) {
        elemento = document.createElement("p");
        elemento.id = "mensajeLogin";
        elemento.style.marginTop = "15px";
        elemento.style.fontWeight = "600";
        elemento.style.fontSize = "13px";

        $("formLogin").appendChild(elemento);
    }

    elemento.textContent = texto;
    elemento.style.color = "#e52535";
}

function limpiarErrorLogin() {
    const elemento = $("mensajeLogin");

    if (elemento) {
        elemento.textContent = "";
    }
}

// ==========================================
// PETICIONES AL BACKEND
// ==========================================

async function peticion(url, opciones = {}) {
    const respuesta = await fetch(`${API}${url}`, {
        ...opciones,
        headers: {
            ...(opciones.body ? {
                "Content-Type": "application/json"
            } : {}),
            ...(token ? {
                Authorization: `Bearer ${token}`
            } : {}),
            ...opciones.headers
        }
    });

    const datos = await respuesta.json().catch(() => ({}));

    if (!respuesta.ok) {
        const detalle = Array.isArray(datos.message)
            ? datos.message.join(", ")
            : datos.message;

        throw new Error(detalle || `Error HTTP ${respuesta.status}`);
    }

    return datos;
}

// ==========================================
// CAMBIAR ENTRE ACCESOS
// ==========================================

$("btnAdministrador").addEventListener("click", () => {
    pantallaAccesos.hidden = true;
    pantallaAdministrador.hidden = false;
});

$("btnUsuario").addEventListener("click", () => {
    pantallaAccesos.hidden = true;
    pantallaUsuario.hidden = false;
});

$("volverAccesos").addEventListener("click", () => {
    pantallaAdministrador.hidden = true;
    pantallaAccesos.hidden = false;
    limpiarErrorLogin();
});

$("volverAccesosUsuario").addEventListener("click", () => {
    pantallaUsuario.hidden = true;
    pantallaAccesos.hidden = false;
});

// ==========================================
// PORTAL DE USUARIO PROVISIONAL
// ==========================================

$("btnEntrarUsuario").addEventListener("click", () => {
    window.location.href = "usuario.html"
    let aviso = $("avisoUsuario");

    if (!aviso) {
        aviso = document.createElement("p");
        aviso.id = "avisoUsuario";
        aviso.style.marginTop = "20px";
        aviso.style.fontWeight = "600";

        $("btnEntrarUsuario").after(aviso);
    }

    aviso.textContent =
        "El portal de usuario se encuentra en desarrollo.";

    aviso.style.color = "#0756a8";
});

// ==========================================
// INICIAR SESIÓN ADMINISTRADOR
// ==========================================

$("formLogin").addEventListener("submit", async (evento) => {
    evento.preventDefault();

    limpiarErrorLogin();

    const email = $("email").value.trim();
    const password = $("password").value;

    try {
        const resultado = await peticion("/auth/login", {
            method: "POST",
            body: JSON.stringify({
                email,
                password
            })
        });

        token = resultado.access_token;

        if (!token) {
            throw new Error("El servidor no devolvió un token de acceso.");
        }

        // Cargar información protegida
        await cargarTodo();

        pantallaAdministrador.hidden = true;
        panelAdministracion.hidden = false;

        mostrarMensaje("Bienvenido al panel de administración.");

    } catch (error) {
        token = "";

        mostrarErrorLogin(
            error.message || "No fue posible iniciar sesión."
        );
    }
});

// ==========================================
// CARGAR INFORMACIÓN DEL SISTEMA
// ==========================================

async function cargarTodo() {
    const resultados = await Promise.all([
        peticion("/routes"),
        peticion("/stops"),
        peticion("/incidences")
    ]);

    rutas = Array.isArray(resultados[0]) ? resultados[0] : [];
    paradas = Array.isArray(resultados[1]) ? resultados[1] : [];
    incidencias = Array.isArray(resultados[2]) ? resultados[2] : [];

    actualizarIndicadores();
    actualizarSelectores();

    mostrarRutas();
    mostrarParadas();
    mostrarIncidencias();

    await cargarConexiones();
}

// ==========================================
// INDICADORES DEL PANEL
// ==========================================

function actualizarIndicadores() {
    $("totalRutas").textContent = rutas.length;
    $("totalParadas").textContent = paradas.length;
    $("totalIncidencias").textContent = incidencias.length;
}

// ==========================================
// SELECTORES
// ==========================================

function llenarSelect(selector, elementos, textoInicial, obtenerNombre) {
    selector.innerHTML = "";

    const inicial = document.createElement("option");
    inicial.value = "";
    inicial.textContent = textoInicial;

    selector.appendChild(inicial);

    elementos.forEach(elemento => {
        const opcion = document.createElement("option");

        opcion.value = elemento.id;
        opcion.textContent = obtenerNombre(elemento);

        selector.appendChild(opcion);
    });
}

function actualizarSelectores() {
    llenarSelect(
        $("rutaParada"),
        rutas,
        "Selecciona una ruta",
        ruta => `${ruta.code} - ${ruta.name}`
    );

    llenarSelect(
        $("rutaConexion"),
        rutas,
        "Selecciona una ruta",
        ruta => `${ruta.code} - ${ruta.name}`
    );

    llenarSelect(
        $("rutaIncidencia"),
        rutas,
        "Selecciona una ruta",
        ruta => `${ruta.code} - ${ruta.name}`
    );

    llenarSelect(
        $("paradaConexion"),
        [],
        "Primero selecciona una ruta",
        parada => parada.name
    );

    llenarSelect(
        $("paradaIncidencia"),
        [],
        "Primero selecciona una ruta",
        parada => parada.name
    );
}

// ==========================================
// RUTAS
// ==========================================

function mostrarRutas() {
    const contenedor = $("listaRutas");

    if (rutas.length === 0) {
        contenedor.innerHTML = "<p>No hay rutas registradas.</p>";
        return;
    }

    contenedor.innerHTML = rutas.map(ruta => `
        <div class="item">
            <strong>
                ${escapar(ruta.code)} - ${escapar(ruta.name)}
            </strong>

            <p>
                ${escapar(ruta.description || "Sin descripción")}
            </p>

            <small>
                ID: ${escapar(ruta.id)} |
                Estado: ${ruta.isActive ? "Activa" : "Inactiva"}
            </small>
        </div>
    `).join("");
}

$("formRuta").addEventListener("submit", async (evento) => {
    evento.preventDefault();

    try {
        await peticion("/routes", {
            method: "POST",
            body: JSON.stringify({
                code: $("codigoRuta").value.trim(),
                name: $("nombreRuta").value.trim()
            })
        });

        $("formRuta").reset();

        await cargarTodo();

        mostrarMensaje("Ruta registrada correctamente.");

    } catch (error) {
        mostrarMensaje(error.message, true);
    }
});

// ==========================================
// PARADAS
// ==========================================

function mostrarParadas() {
    const contenedor = $("listaParadas");

    if (paradas.length === 0) {
        contenedor.innerHTML = "<p>No hay paradas registradas.</p>";
        return;
    }

    contenedor.innerHTML = paradas.map(parada => {
        const nombresRutas = (parada.routeStops || [])
            .map(relacion => relacion.route?.code)
            .filter(Boolean)
            .join(", ");

        return `
            <div class="item">
                <strong>${escapar(parada.name)}</strong>

                <p>${escapar(parada.address)}</p>

                <small>
                    Rutas: ${escapar(nombresRutas || "Sin asociación")}
                </small>

                <br>

                <small>
                    ID: ${escapar(parada.id)} |
                    Estado: ${parada.isActive ? "Activa" : "Inactiva"}
                </small>
            </div>
        `;
    }).join("");
}

$("formParada").addEventListener("submit", async (evento) => {
    evento.preventDefault();

    try {
        await peticion("/stops", {
            method: "POST",
            body: JSON.stringify({
                name: $("nombreParada").value.trim(),
                address: $("direccionParada").value.trim(),
                description: $("descripcionParada").value.trim(),
                routeId: Number($("rutaParada").value),
                sequence: Number($("secuenciaParada").value)
            })
        });

        $("formParada").reset();

        await cargarTodo();

        mostrarMensaje("Parada registrada correctamente.");

    } catch (error) {
        mostrarMensaje(error.message, true);
    }
});

// ==========================================
// CONEXIONES ENTRE RUTAS Y PARADAS
// ==========================================

function obtenerRutaId(relacion) {
    return Number(
        relacion.route?.id ??
        relacion.routeId ??
        relacion.route_id
    );
}

function obtenerParadasDeRuta(rutaId) {
    return paradas.filter(parada =>
        (parada.routeStops || []).some(
            relacion => obtenerRutaId(relacion) === rutaId
        )
    );
}

$("rutaConexion").addEventListener("change", () => {
    const rutaId = Number($("rutaConexion").value);

    if (!rutaId) {
        llenarSelect(
            $("paradaConexion"),
            [],
            "Primero selecciona una ruta",
            parada => parada.name
        );
        return;
    }

    const asociadas = obtenerParadasDeRuta(rutaId);

    const disponibles = paradas.filter(parada =>
        !asociadas.some(asociada => asociada.id === parada.id)
    );

    llenarSelect(
        $("paradaConexion"),
        disponibles,
        disponibles.length
            ? "Selecciona una parada"
            : "No hay paradas disponibles",
        parada => parada.name
    );
});

$("formConexion").addEventListener("submit", async (evento) => {
    evento.preventDefault();

    try {
        await peticion("/route-stops", {
            method: "POST",
            body: JSON.stringify({
                routeId: Number($("rutaConexion").value),
                stopId: Number($("paradaConexion").value),
                sequence: Number($("secuenciaConexion").value)
            })
        });

        $("formConexion").reset();

        await cargarTodo();

        mostrarMensaje("Conexión registrada correctamente.");

    } catch (error) {
        mostrarMensaje(error.message, true);
    }
});

// Consultar las conexiones registradas por ruta
async function cargarConexiones() {
    conexiones = [];

    try {
        const resultados = await Promise.all(
            rutas.map(async ruta => {
                const datos = await peticion(
                    `/route-stops/route/${ruta.id}`
                );

                return (Array.isArray(datos) ? datos : []).map(conexion => ({
                    ...conexion,
                    ruta
                }));
            })
        );

        conexiones = resultados.flat();

        mostrarConexiones();

    } catch (error) {
        $("listaConexiones").innerHTML =
            `<p>No se pudieron consultar las conexiones: ${escapar(error.message)}</p>`;
    }
}

function mostrarConexiones() {
    const contenedor = $("listaConexiones");

    if (conexiones.length === 0) {
        contenedor.innerHTML = "<p>No hay conexiones registradas.</p>";
        return;
    }

    contenedor.innerHTML = conexiones.map(conexion => `
        <div class="item">
            <strong>
                ${escapar(conexion.ruta?.code)} -
                ${escapar(conexion.ruta?.name)}
            </strong>

            <p>
                Parada:
                ${escapar(conexion.stop?.name || "Parada no disponible")}
            </p>

            <small>
                Orden: ${escapar(conexion.sequence)}
            </small>
        </div>
    `).join("");
}

// ==========================================
// INCIDENCIAS
// ==========================================

$("rutaIncidencia").addEventListener("change", () => {
    const rutaId = Number($("rutaIncidencia").value);

    if (!rutaId) {
        llenarSelect(
            $("paradaIncidencia"),
            [],
            "Primero selecciona una ruta",
            parada => parada.name
        );
        return;
    }

    const asociadas = obtenerParadasDeRuta(rutaId);

    llenarSelect(
        $("paradaIncidencia"),
        asociadas,
        asociadas.length
            ? "Selecciona una parada"
            : "Esta ruta no tiene paradas",
        parada => parada.name
    );
});

function mostrarIncidencias() {
    const contenedor = $("listaIncidencias");

    if (incidencias.length === 0) {
        contenedor.innerHTML = "<p>No hay incidencias registradas.</p>";
        return;
    }

    contenedor.innerHTML = incidencias.map(incidencia => `
        <div class="item">
            <strong>${escapar(incidencia.type)}</strong>

            <p>${escapar(incidencia.description)}</p>

            <small>
                Ruta: ${escapar(incidencia.route?.code || "Sin ruta")} |
                Parada: ${escapar(incidencia.stop?.name || "Sin parada")}
            </small>

            <br>

            <small>
                Severidad: ${escapar(incidencia.severity)} |
                Estado: ${incidencia.isActive ? "Activa" : "Inactiva"}
            </small>
        </div>
    `).join("");
}

$("formIncidencia").addEventListener("submit", async (evento) => {
    evento.preventDefault();

    try {
        await peticion("/incidences", {
            method: "POST",
            body: JSON.stringify({
                type: $("tipoIncidencia").value.trim(),
                description: $("descripcionIncidencia").value.trim(),
                severity: $("severidadIncidencia").value,
                isActive: true,
                routeId: Number($("rutaIncidencia").value),
                stopId: Number($("paradaIncidencia").value)
            })
        });

        $("formIncidencia").reset();

        await cargarTodo();

        mostrarMensaje("Incidencia registrada correctamente.");

    } catch (error) {
        mostrarMensaje(error.message, true);
    }
});

// ==========================================
// CERRAR SESIÓN
// ==========================================

$("btnCerrarSesion").addEventListener("click", () => {
    token = "";

    rutas = [];
    paradas = [];
    incidencias = [];
    conexiones = [];

    panelAdministracion.hidden = true;
    pantallaAccesos.hidden = false;

    $("formLogin").reset();

    mostrarMensaje("Sesión cerrada correctamente.");
});
