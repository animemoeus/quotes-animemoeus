import Error from "next/error";
import Link from "next/link";
import { useState } from "react";

import { Card, Navbar } from "../components/molecules";
import { Layout } from "../components/templates/";

export default function Home(props) {
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
              <Card
                key={index}
                quote={quote.quote}
                character={quote.character}
                character_slug={quote.character_slug}
                anime={quote.anime}
                anime_slug={quote.anime_slug}
              />
            );
          })}
          {/* pagination */}
          <nav className="mt-3">
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
                  Page {props.page} of {numPages}
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
