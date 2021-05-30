import Error from "next/error";
import Link from "next/link";
import { useState } from "react";

import { Card, Navbar, CharacterPagination } from "../../components/molecules";
import { Layout } from "../../components/templates/";

export default function Character(props) {
  if (props.status !== 200) {
    return <Error statusCode={props.status} />;
  }

  const [numPages, setNumPages] = useState(
    props.quotes.count % 15 > 0
      ? parseInt(props.quotes.count / 15) + 1
      : parseInt(props.quotes.count / 15)
  );

  return (
    <Layout title={`${props.quotes.results[0].character} Quotes | AnimeMoeUs`}>
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

          <CharacterPagination
            previous={props.quotes.previous}
            next={props.quotes.next}
            page={props.page}
            numPages={numPages}
            characterSlug={props.slug}
          />
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
