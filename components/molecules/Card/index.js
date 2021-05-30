import Link from "next/link";

export default function Card(props) {
  return (
    <div className="card text-center mb-2 shadow-sm">
      <div className="card-body">
        <blockquote className="blockquote mb-0">
          <p>{props.quote}</p>
          <footer className="blockquote-footer">
            <Link href={`/character/${props.character_slug}/`}>
              <a className="text-decoration-none text-muted">
                {props.character}
              </a>
            </Link>
            {", "}
            <Link href={`/anime/${props.anime_slug}/`}>
              <a className="text-decoration-none text-muted">
                <cite title={props.anime}>{props.anime}</cite>
              </a>
            </Link>
          </footer>
        </blockquote>
      </div>
    </div>
  );
}
