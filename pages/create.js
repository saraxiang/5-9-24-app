import React, { useState } from 'react';
import Layout from '../components/Layout';

const CreatePage = () => {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ front, back });
    setFront('');
    setBack('');
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <Layout>
      <div className="max-w-lg mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Create a Flashcard</h1>
          <p className="mt-2 text-slate-500">Fill in the front and back of your new card</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md border border-slate-200 p-8 space-y-6">
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
