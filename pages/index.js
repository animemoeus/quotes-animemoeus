import Error from "next/error";
import Link from "next/link";
import { useRouter } from "next/router";

import { Navbar } from "../components/molecules";
import { Layout } from "../components/templates/";

export default function Home(props) {
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
          <hr />
          <nav>
            <ul className="pagination justify-content-center">
              {props.quotes.previous !== null && (
                <li className="page-item">
                  <Link href={`/?page=${parseInt(props.page) - 1}`}>
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
                  Page {props.page} of {parseInt(props.quotes.count / 15) + 1}
                </p>
              </li>
              {props.quotes.next !== null && (
                <li className="page-item">
                  <Link href={`/?page=${parseInt(props.page) + 1}`}>
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

  const res = await fetch(`http://api.localhost:8000/quotes/?page=${page}`);

  const data = await res.json();

  return { props: { quotes: data, page: page, status: res.status } };
}
