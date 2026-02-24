import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

const STORAGE_KEY = 'flashcards';

const DEFAULT_CARDS = [
  { id: 1, front: 'test1', back: 'test2' },
  { id: 2, front: 'test3', back: 'test4' },
  { id: 3, front: 'test5', back: 'test6' }
];

const FlashCard = ({ front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="perspective cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`flip-card-inner relative w-full h-48 ${isFlipped ? 'flipped' : ''}`}>
        <div className="flip-card-front absolute inset-0 bg-white rounded-xl shadow-md border border-slate-200 flex flex-col items-center justify-center p-6 hover:shadow-lg transition-shadow">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">Front</span>
          <p className="text-lg font-medium text-slate-800 text-center">{front}</p>
          <span className="mt-4 text-xs text-slate-400">Click to flip</span>
        </div>
        <div className="flip-card-back absolute inset-0 bg-indigo-600 rounded-xl shadow-md flex flex-col items-center justify-center p-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-200 mb-2">Back</span>
          <p className="text-lg font-medium text-white text-center">{back}</p>
          <span className="mt-4 text-xs text-indigo-300">Click to flip</span>
        </div>
      </div>
    </div>
  );
};

const IndexPage = () => {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setFlashcards(JSON.parse(stored));
    } else {
      setFlashcards(DEFAULT_CARDS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CARDS));
    }
  }, []);

  return (
    <Layout>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Your Flashcards</h1>
          <p className="mt-2 text-slate-500">Click any card to reveal the answer</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {flashcards.map(card => (
            <FlashCard key={card.id} front={card.front} back={card.back} />
          ))}
        </div>
        {flashcards.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">No flashcards yet. Create your first one!</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default IndexPage;
