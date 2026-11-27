import type { ReactNode } from "react";

type IconProps = {
  size?: number;
  strokeWidth?: number;
  className?: string;
};

function makeIcon(children: ReactNode) {
  return function Icon({ size = 24, strokeWidth = 2, className }: IconProps) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        {children}
      </svg>
    );
  };
}

const Bus = makeIcon(
  <>
    <path d="M8 6v6" />
    <path d="M15 6v6" />
    <path d="M2 12h19.6" />
    <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3" />
    <circle cx="7" cy="18" r="2" />
    <path d="M9 18h5" />
    <circle cx="16" cy="18" r="2" />
  </>
);
const MapIcon = makeIcon(
  <>
    <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
    <path d="M15 5.764v15" />
    <path d="M9 3.236v15" />
  </>
);
const Clock = makeIcon(
  <>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </>
);
const Bell = makeIcon(
  <>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </>
);
const ArrowRight = makeIcon(
  <>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </>
);
const CircleCheck = makeIcon(
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </>
);
const TriangleAlert = makeIcon(
  <>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </>
);
const Info = makeIcon(
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </>
);
import "./App.css";

type Line = {
  number: string;
  name: string;
  from: string;
  to: string;
  status: "on-time" | "delayed";
  accent: "blue" | "yellow";
};

type NewsItem = {
  tag: "NEWS" | "DELAY";
  date: string;
  title: string;
  text: string;
};


const features = [
  {
    icon: MapIcon,
    tone: "blue",
    title: "Planifica tu viaje",
    text: "Encuentra opciones para desplazarte por Quito indicando tu origen y destino.",
    link: "Planificar mi viaje",
  },
  {
    icon: Bell,
    tone: "red",
    title: "Consulta incidencias",
    text: "Revisa las incidencias reportadas sobre el servicio de transporte público.",
    link: "Ver incidencias",
  },
  {
    icon: TriangleAlert,
    tone: "yellow",
    title: "Reporta una incidencia",
    text: "Comunica problemas relacionados con las rutas, paradas o el servicio de transporte.",
    link: "Reportar incidencia",
  },
];


const lines: Line[] = [
  {
    number: "1",
    name: "Fakulteti Teknik - Kalabria",
    from: "Fakulteti Teknik",
    to: "Kalabria",
    status: "on-time",
    accent: "blue",
  },
  {
    number: "3",
    name: "Kodra e Trimave - Spitali",
    from: "Kodra e Trimave",
    to: "QKUK",
    status: "delayed",
    accent: "yellow",
  },
  {
    number: "4",
    name: "Gërmia - Bregu i Diellit",
    from: "Gërmia",
    to: "Bregu i Diellit",
    status: "on-time",
    accent: "blue",
  },
];

const news: NewsItem[] = [
  {
    tag: "NEWS",
    date: "26/11/2026",
    title: "New Line 1C Introduced",
    text: "A new express line connecting the center with the airport is now active.",
  },
  {
    tag: "DELAY",
    date: "26/11/2026",
    title: "Road Maintenance on Bill Clinton Blvd",
    text: "Expect delays of up to 15 minutes on Lines 3 and 4 due to road works.",
  },
];

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

function Logo({ variant }: { variant: "header" | "footer" }) {
  return (
    <a href="#top" className={`logo logo--${variant}`}>
      <span className="logo__icon">
        <Bus size={variant === "header" ? 22 : 26} strokeWidth={2} />
      </span>
      <span className="logo__text">
        <span className="logo__mov i">Movi</span>{" "}
        <span className="logo__alerta">Alerta</span>{" "}
        <span className="logo__quito">Quito</span>
      </span>
    </a>
  );
}

export default function App() {
  return (
    <div className="app" id="top">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="container navbar__inner">
          <Logo variant="header" />
          <nav className="navbar__nav">
            <a href="#inicio">Inicio</a>
            <a href="#planificar">Planificar viaje</a>
            <a href="#incidencias">Incidencias</a>
            <a href="#nosotros">Nosotros</a>
            <span className="navbar__divider" />
            <a href="#administracion" className="navbar__login">
              Administración
            </a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="container hero__inner" id="inicio">
          <span className="hero__badge">
            <span className="badge__blue">MOVILIDAD URBANA</span>
            <span className="badge__red">DE</span>
            <span className="badge__blue">QUITO</span>
          </span>

          <h1 className="hero__title">
            Muévete por{" "}
            <span className="hero__title-accent">
              <span className="quito__blue">Qu</span>
              <span className="quito__red">it</span>
              <span className="quito__blue">o</span>
            </span>
            <br />
            de forma más informada
          </h1>

          <p className="hero__text">
            Planifica tus viajes, consulta incidencias del transporte público
            y comparte información que ayude a mejorar la movilidad en la ciudad.
          </p>

          <div className="hero__actions">
            <a href="#planificar" className="btn btn--lg btn--primary btn--glow">
              Planificar mi viaje <ArrowRight size={20} />
            </a>

            <a href="#incidencias" className="btn btn--lg btn--red">
              Consultar incidencias
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="container features__grid">
          {features.map(({ icon: Icon, tone, title, text, link }) => (
            <article className="feature-card" key={title}>
              <span className={`feature-card__icon feature-card__icon--${tone}`}>
                <Icon size={22} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
              <a href="#more" className="link">
                {link} <ArrowRight size={16} />
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* POPULAR LINES + NEWS */}
      {/* INFORMACIÓN DEL SISTEMA */}
        <section className="content" id="nosotros">
          <div className="container content__grid">
            <div id="planificar">
              <div className="section-head">
                <h2>
                  <MapIcon size={22} className="section-head__icon" />
                  Planifica tu recorrido
                </h2>
              </div>

              <div className="stack">
                <article className="line-card line-card--blue">
                  <span className="line-card__number">
                    <MapIcon size={22} />
                  </span>
                  <div className="line-card__info">
                    <h3>Selecciona tu origen y destino</h3>
                    <p>Indica desde dónde sales y hacia dónde deseas llegar.</p>
                  </div>
                </article>

                <article className="line-card line-card--yellow">
                  <span className="line-card__number">
                    <Bus size={22} />
                  </span>
                  <div className="line-card__info">
                    <h3>Consulta alternativas de viaje</h3>
                    <p>El sistema permitirá consultar opciones de recorrido y conexiones.</p>
                  </div>
                </article>

                <article className="line-card line-card--blue">
                  <span className="line-card__number">
                    <CircleCheck size={22} />
                  </span>
                  <div className="line-card__info">
                    <h3>Elige tu recorrido</h3>
                    <p>Compara las alternativas disponibles para organizar tu viaje.</p>
                  </div>
                </article>
              </div>
            </div>

            <div id="incidencias">
              <div className="section-head">
                <h2>
                  <Info size={22} className="section-head__icon" />
                  Información de la comunidad
                </h2>
              </div>

              <div className="stack">
                <article className="news-card">
                  <div className="news-card__top">
                    <span className="tag tag--news">COMUNIDAD</span>
                  </div>
                  <h3>Consulta incidencias</h3>
                  <p>
                    Revisa los reportes relacionados con rutas, paradas y el servicio
                    de transporte público.
                  </p>
                </article>

                <article className="news-card">
                  <div className="news-card__top">
                    <span className="tag tag--delay">PARTICIPACIÓN</span>
                  </div>
                  <h3>Comparte información</h3>
                  <p>
                    Reporta problemas del transporte para mantener informada a la
                    comunidad.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

      {/* CTA BAND (franja azul visible entre el contenido y el footer) */}
      

      
      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer__grid">
          <div className="footer__brand">
            <Logo variant="footer" />
            <p>
              MoviAlerta Quito facilita la consulta de información del transporte
              público, la planificación de viajes y el reporte de incidencias
              para contribuir a una movilidad mejor informada.
            </p>
          </div>

          <div>
            <h4>Explora</h4>
            <ul>
              <li><a href="#inicio">Inicio</a></li>
              <li><a href="#planificar">Planificar viaje</a></li>
              <li><a href="#incidencias">Incidencias</a></li>
              <li><a href="#nosotros">Cómo funciona</a></li>
            </ul>
          </div>

          <div>
            <h4>Participa</h4>
            <ul>
              <li><a href="#incidencias">Consultar incidencias</a></li>
              <li><a href="#incidencias">Reportar una incidencia</a></li>
              <li><a href="#administracion">Administración</a></li>
            </ul>
          </div>
        </div>

        <div className="container footer__bottom">
          © 2026 MoviAlerta Quito. Proyecto académico.
        </div>
      </footer>

    </div>
  );
}
