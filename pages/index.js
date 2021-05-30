import Error from "next/error";
import Link from "next/link";
import { useState } from "react";

import { Card, Navbar, Pagination } from "../components/molecules";
import { Layout } from "../components/templates/";

export default function Home(props) {
  if (props.status !== 200) {
    return <Error statusCode={props.status} />;
  }

  const [numPages, setNumPages] = useState(
    props.quotes.count % 15 > 0
      ? parseInt(props.quotes.count / 15) + 1
      : parseInt(props.quotes.count / 15)
  );

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

          <Pagination
            previous={props.quotes.previous}
            next={props.quotes.next}
            page={props.page}
            numPages={numPages}
          />
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
