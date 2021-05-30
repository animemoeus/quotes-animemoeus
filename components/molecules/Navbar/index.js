import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg shadow-sm sticky-top navbar-light bg-light">
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand">Anime Quotes</a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://github.com/animemoeus/quotes-animemoeus"
                target="_blank"
                rel="norefferer"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
