import Link from 'next/link';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            All Flashcards
          </Link>
        </li>
        <li>
          <Link href="/create">
            Create Flashcard
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
