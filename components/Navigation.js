import Link from 'next/link';

const Navigation = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-indigo-600 tracking-tight">
          FlashCards
        </Link>
        <ul className="flex items-center gap-2">
          <li>
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
            >
              All Cards
            </Link>
          </li>
          <li>
            <Link
              href="/create"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm"
            >
              + New Card
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
