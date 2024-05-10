import React, { useState } from 'react';
import Layout from '../components/Layout';

const CreatePage = () => {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would usually send the new flashcard to the server or state management
    console.log({ front, back });
    // Reset the form fields
    setFront('');
    setBack('');
  };

  return (
    <Layout>
      <div>
        <h1>Create Flashcard</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="front">Front:</label>
            <input
              type="text"
              id="front"
              name="front"
              value={front}
              onChange={(e) => setFront(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="back">Back:</label>
            <input
              type="text"
              id="back"
              name="back"
              value={back}
              onChange={(e) => setBack(e.target.value)}
              required
            />
          </div>
          <button type="submit">Save Flashcard</button>
        </form>
      </div>
    </Layout>
  );
};

export default CreatePage;
