
const API = "https://movialerta-quito.onrender.com";

let token = "";

const login = document.getElementById("login");
const administracion = document.getElementById("administracion");
const mensaje = document.getElementById("mensaje");
const selectorRuta = document.getElementById("ruta");
const selectorParada = document.getElementById("parada");

async function peticion(url, opciones = {}) {
    const respuesta = await fetch(API + url, {
        ...opciones,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...opciones.headers
        }
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
        throw new Error(datos.message || "Error en la solicitud");
    }

    return datos;
}

function mostrarMensaje(texto, error = false) {
    mensaje.textContent = texto;
    mensaje.style.color = error ? "red" : "green";
}

// INICIAR SESIÓN
document.getElementById("btnLogin").addEventListener("click", async () => {
    try {
        const resultado = await peticion("/auth/login", {
            method: "POST",
            body: JSON.stringify({
                email: document.getElementById("email").value,
                password: document.getElementById("password").value
            })
        });

        token = resultado.access_token;

        await cargarRutas();

        login.hidden = true;
        administracion.hidden = false;

        mostrarMensaje("Sesión iniciada correctamente.");

    } catch (error) {
        mostrarMensaje(error.message, true);
    }
});

// CARGAR RUTAS
async function cargarRutas() {
    const rutas = await peticion("/routes");

    selectorRuta.innerHTML =
        '<option value="">Selecciona una ruta</option>';

    rutas.forEach(ruta => {
        const opcion = document.createElement("option");

        opcion.value = ruta.id;
        opcion.textContent = `${ruta.code} - ${ruta.name}`;

        selectorRuta.appendChild(opcion);
    });
}

// CARGAR PARADAS DEPENDIENDO DE LA RUTA
selectorRuta.addEventListener("change", async () => {
    const rutaId = selectorRuta.value;

    selectorParada.innerHTML =
        '<option value="">Selecciona una parada</option>';

    selectorParada.disabled = true;

    if (!rutaId) return;

    try {
        const paradas = await peticion("/stops");

        const filtradas = paradas.filter(parada =>
            Number(parada.route?.id) === Number(rutaId)
        );

        filtradas.forEach(parada => {
            const opcion = document.createElement("option");

            opcion.value = parada.id;
            opcion.textContent = parada.name;

            selectorParada.appendChild(opcion);
        });

        if (filtradas.length > 0) {
            selectorParada.disabled = false;
        } else {
            selectorParada.innerHTML =
                '<option value="">Esta ruta no tiene paradas</option>';
        }

    } catch (error) {
        mostrarMensaje(error.message, true);
    }
});

// REGISTRAR INCIDENCIA
document.getElementById("formIncidencia")
    .addEventListener("submit", async (evento) => {

        evento.preventDefault();

        const rutaId = selectorRuta.value;
        const paradaId = selectorParada.value;
        const descripcion = document.getElementById("descripcion").value.trim();

        if (!rutaId || !paradaId || !descripcion) {
            mostrarMensaje("Completa todos los campos.", true);
            return;
        }

        try {
            const resultado = await peticion("/incidences", {
                method: "POST",
                body: JSON.stringify({
                    type: document.getElementById("tipo").value,
                    description: descripcion,
                    severity: document.getElementById("severidad").value,
                    isActive: true,
                    routeId: Number(rutaId),
                    stopId: Number(paradaId)
                })
            });

            mostrarMensaje(
                `Incidencia registrada correctamente. ID: ${resultado.id}`
            );

            document.getElementById("formIncidencia").reset();

            selectorParada.disabled = true;
            selectorParada.innerHTML =
                '<option value="">Primero selecciona una ruta</option>';

        } catch (error) {
            mostrarMensaje(error.message, true);
        }
    });

// CERRAR SESIÓN
document.getElementById("btnCerrarSesion")
    .addEventListener("click", () => {

        token = "";

        login.hidden = false;
        administracion.hidden = true;

        document.getElementById("password").value = "";

        mostrarMensaje("Sesión cerrada.");
    });
