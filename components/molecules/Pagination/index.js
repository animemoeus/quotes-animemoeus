import Link from "next/link";

export function Pagination(props) {
  return (
    <nav className="mt-3">
      <ul className="pagination justify-content-center">
        {props.previous !== null && (
          <li className="page-item">
            <Link href={`/?page=${parseInt(props.page) - 1}`}>
              <a className="page-link" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </Link>
          </li>
        )}
        {props.previous === null && (
          <li className="page-item disabled">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
        )}
        <li className="page-item disabled">
          <p className="page-link">
            Page {props.page} of {props.numPages}
          </p>
        </li>
        {props.next !== null && (
          <li className="page-item">
            <Link href={`/?page=${parseInt(props.page) + 1}`}>
              <a className="page-link" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </Link>
          </li>
        )}
        {props.next === null && (
          <li className="page-item disabled">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}

export function CharacterPagination(props) {
  return (
    <nav className="mt-3">
      <ul className="pagination justify-content-center">
        {props.previous !== null && (
          <li className="page-item">
            <Link
              href={`/character/${props.characterSlug}?page=${
                parseInt(props.page) - 1
              }`}
            >
              <a className="page-link" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </Link>
          </li>
        )}
        {props.previous === null && (
          <li className="page-item disabled">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
        )}
        <li className="page-item disabled">
          <p className="page-link">
            Page {props.page} of {props.numPages}
          </p>
        </li>
        {props.next !== null && (
          <li className="page-item">
            <Link
              href={`/character/${props.characterSlug}/?page=${
                parseInt(props.page) + 1
              }`}
            >
              <a className="page-link" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </Link>
          </li>
        )}
        {props.next === null && (
          <li className="page-item disabled">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}
