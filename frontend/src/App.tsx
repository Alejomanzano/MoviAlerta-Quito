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
    title: "Accurate Routes",
    text: "Explore all 15+ urban lines and their designated stops across the city.",
    link: "Find your route",
  },
  {
    icon: Clock,
    tone: "yellow",
    title: "Live Timetable",
    text: "Real-time arrival and departure information for every bus stop in Prishtina.",
    link: "Check times",
  },
  {
    icon: Bell,
    tone: "red",
    title: "Service Alerts",
    text: "Stay informed about delays, route changes, or maintenance updates.",
    link: "See latest alerts",
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
        Prishtina<span className="logo__accent">Bus</span>
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
            <a href="#routes">Routes</a>
            <a href="#timetable">Timetable</a>
            <a href="#map">Map</a>
            <a href="#news">News</a>
            <span className="navbar__divider" />
            <a href="#login" className="navbar__login">Log in</a>
            <a href="#signup" className="btn btn--sm btn--primary">Sign up</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="container hero__inner">
          <span className="hero__badge">LIVE URBAN TRANSPORT</span>
          <h1 className="hero__title">
            Travel Through <span className="hero__title-accent">Prishtina</span>
            <br />
            with Confidence
          </h1>
          <p className="hero__text">
            Get real-time updates, accurate bus schedules, and route maps for the
            capital's urban transport system.
          </p>
          <div className="hero__actions">
            <a href="#routes" className="btn btn--lg btn--primary btn--glow">
              Explore Routes <ArrowRight size={20} />
            </a>
            <a href="#map" className="btn btn--lg btn--ghost">
              View Live Map
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
      <section className="content">
        <div className="container content__grid">
          <div id="routes">
            <div className="section-head">
              <h2>
                <Bus size={22} className="section-head__icon" /> Popular Lines
              </h2>
              <a href="#routes" className="section-head__link">View all</a>
            </div>
            <div className="stack">
              {lines.map((line) => (
                <article className={`line-card line-card--${line.accent}`} key={line.number}>
                  <span className="line-card__number">{line.number}</span>
                  <div className="line-card__info">
                    <h3>{line.name}</h3>
                    <p>
                      {line.from} → {line.to}
                    </p>
                  </div>
                  {line.status === "on-time" ? (
                    <span className="status status--ok">
                      <CircleCheck size={14} /> On Time
                    </span>
                  ) : (
                    <span className="status status--warn">
                      <TriangleAlert size={14} /> Delayed
                    </span>
                  )}
                </article>
              ))}
            </div>
          </div>

          <div id="news">
            <div className="section-head">
              <h2>
                <Info size={22} className="section-head__icon" /> News &amp; Updates
              </h2>
              <a href="#news" className="section-head__link">Read all</a>
            </div>
            <div className="stack">
              {news.map((item) => (
                <article className="news-card" key={item.title}>
                  <div className="news-card__top">
                    <span className={`tag tag--${item.tag.toLowerCase()}`}>{item.tag}</span>
                    <time>{item.date}</time>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA BAND (franja azul visible entre el contenido y el footer) */}
      <section className="cta">
        <div className="container cta__inner">
          <h2>Plan your next trip</h2>
          <a href="#routes" className="btn btn--lg btn--yellow">
            Explore Routes <ArrowRight size={20} />
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer__grid">
          <div className="footer__brand">
            <Logo variant="footer" />
            <p>
              Reliable urban transport information for Prishtina. Real-time updates,
              accurate routes, and easy planning for your daily commute.
            </p>
          </div>

          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#routes">Routes</a></li>
              <li><a href="#timetable">Timetables</a></li>
              <li><a href="#map">Map</a></li>
              <li><a href="#news">News &amp; Alerts</a></li>
            </ul>
          </div>

          <div>
            <h4>Contact</h4>
            <ul>
              <li>Trafiku Urban Prishtinë</li>
              <li>Rr. Tahir Zajmi, Prishtinë</li>
              <li>+383 38 123 456</li>
            </ul>
            <div className="footer__social">
              <a href="#twitter" aria-label="Twitter"><TwitterIcon /></a>
              <a href="#facebook" aria-label="Facebook"><FacebookIcon /></a>
              <a href="#github" aria-label="GitHub"><GithubIcon /></a>
            </div>
          </div>
        </div>

        <div className="container footer__bottom">
          © 2026 Prishtina Bus Dashboard. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
