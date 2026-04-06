import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

const STORAGE_KEY = 'flashcards';
const MAX_FIELD_LENGTH = 1000;

const CreatePage = () => {
  const router = useRouter();
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const formRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        if (formRef.current) {
          formRef.current.requestSubmit();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const trimmedFront = front.trim();
    const trimmedBack = back.trim();

    if (!trimmedFront || !trimmedBack) {
      setError('Both front and back fields are required.');
      return;
    }

    if (trimmedFront.length > MAX_FIELD_LENGTH || trimmedBack.length > MAX_FIELD_LENGTH) {
      setError(`Each field must be ${MAX_FIELD_LENGTH} characters or fewer.`);
      return;
    }

    let cards = [];
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        cards = Array.isArray(parsed) ? parsed : [];
      } catch {
        cards = [];
      }
    }

    const newCard = {
      id: Date.now(),
      front: trimmedFront,
      back: trimmedBack,
    };
    const updated = [...cards, newCard];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    setFront('');
    setBack('');
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      router.push('/');
    }, 1000);
  };

  return (
    <Layout>
      <div className="max-w-lg mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Create a Flashcard</h1>
          <p className="mt-2 text-slate-500">Fill in the front and back of your new card</p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md border border-slate-200 p-8 space-y-6">
          <div>
            <label htmlFor="front" className="block text-sm font-semibold text-slate-700 mb-2">
              Front
            </label>
            <textarea
              id="front"
              name="front"
              rows={3}
              value={front}
              onChange={(e) => setFront(e.target.value)}
              required
              maxLength={MAX_FIELD_LENGTH}
              placeholder="Enter the question or prompt..."
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
            />
          </div>

          <div>
            <label htmlFor="back" className="block text-sm font-semibold text-slate-700 mb-2">
              Back
            </label>
            <textarea
              id="back"
              name="back"
              rows={3}
              value={back}
              onChange={(e) => setBack(e.target.value)}
              required
              maxLength={MAX_FIELD_LENGTH}
              placeholder="Enter the answer..."
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Flashcard
          </button>

          <p className="text-center text-xs text-slate-400">
            Press <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-slate-500 font-mono text-xs">⌘</kbd> + <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-slate-500 font-mono text-xs">Enter</kbd> to save
          </p>

          {error && (
            <div className="text-center py-2 px-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          {saved && (
            <div className="text-center py-2 px-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 text-sm font-medium">Flashcard saved successfully!</p>
            </div>
          )}
        </form>
      </div>
    </Layout>
  );
};

export default CreatePage;
