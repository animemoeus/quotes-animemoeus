import Error from "next/error";
import Link from "next/link";
import { useState } from "react";

import { Navbar } from "../../components/molecules";
import { Layout } from "../../components/templates/";

export default function Character(props) {
  const [numPages, setNumPages] = useState(
    props.quotes.count % 15 > 0
      ? parseInt(props.quotes.count / 15) + 1
      : parseInt(props.quotes.count / 15)
  );

  if (props.status !== 200) {
    return <Error statusCode={props.status} />;
  }

  return (
    <Layout title="Quotes | AnimeMoeUs">
      <Navbar />

      <div className="container-md mt-3 p-1">
        <div className="container-fluid p-0">
          {props.quotes.results.map((quote, index) => {
            return (
              <div className="card text-center mb-2 shadow-sm" key={index}>
                <div className="card-body">
                  <blockquote className="blockquote mb-0">
                    <p>{quote.quote}</p>
                    <footer className="blockquote-footer">
                      <Link href={`/character/${quote.character_slug}/`}>
                        <a className="text-decoration-none text-muted">
                          {quote.character}
                        </a>
                      </Link>
                      {", "}
                      <Link href={`/anime/${quote.anime_slug}/`}>
                        <a className="text-decoration-none text-muted">
                          <cite title={quote.anime}>{quote.anime}</cite>
                        </a>
                      </Link>
                    </footer>
                  </blockquote>
                </div>
              </div>
            );
          })}
          {/* pagination */}
          <nav className="mt-3 shadow-sm">
            <ul className="pagination justify-content-center">
              {props.quotes.previous !== null && (
                <li className="page-item">
                  <Link
                    href={`/character/${props.slug}?page=${
                      parseInt(props.page) - 1
                    }`}
                  >
                    <a className="page-link" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </Link>
                </li>
              )}
              {props.quotes.previous === null && (
                <li className="page-item disabled">
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
              )}
              <li className="page-item disabled">
                <p className="page-link">
                  Page {props.page} of {numPages}
                </p>
              </li>
              {props.quotes.next !== null && (
                <li className="page-item">
                  <Link
                    href={`/character/${props.slug}?page=${
                      parseInt(props.page) + 1
                    }`}
                  >
                    <a className="page-link" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </Link>
                </li>
              )}
              {props.quotes.next === null && (
                <li className="page-item disabled">
                  <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              )}
            </ul>
          </nav>
          {/* end pagination */}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(props) {
  const page = props.query.page === undefined ? 1 : props.query.page;

  const res = await fetch(
    `http://api.localhost:8000/quotes/character/${props.query.character_slug}/?page=${page}`
  );

  const data = await res.json();

  return {
    props: {
      quotes: data,
      page: page,
      slug: props.query.character_slug,
      status: res.status,
    },
  };
}
