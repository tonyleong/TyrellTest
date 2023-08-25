import React, { useState } from 'react';

function distributeCards(numPeople) {
  if (!numPeople || isNaN(numPeople) || numPeople < 0) {
    return ["Input value does not exist or value is invalid"];
  }

  const suits = ['S', 'H', 'D', 'C'];
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'X', 'J', 'Q', 'K'];
  const cards = [];

  suits.forEach(suit => {
    ranks.forEach(rank => {
      cards.push(`${suit}-${rank}`);
    });
  });

  // Shuffle the cards
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  const peopleHands = Array.from({ length: numPeople }, () => []);

  cards.forEach((card, index) => {
    const personIndex = index % numPeople;
    peopleHands[personIndex].push(card);
  });

  return peopleHands.map(personHand => personHand.join(','));
}

function App() {
  try {
    const [numPeople, setNumPeople] = useState('');
    const [distributedCards, setDistributedCards] = useState([]);

    const handleDistribution = () => {
      const distributedHands = distributeCards(parseInt(numPeople));
      setDistributedCards(distributedHands);
    };

    const handleKeyUp = (e) => {
      if (e.key === 'Enter') {
        handleDistribution()
      }
    }

    return (
      <div className='container'>
        <h1>Card Distribution</h1>
        <label>
          Number of People:
          <input
            type="number"
            value={numPeople}
            onChange={e => setNumPeople(e.target.value)}
            onKeyUp={handleKeyUp}
          />
        </label>
        <button onClick={handleDistribution}>Distribute Cards</button>
        <div>
          {distributedCards.length > 0 &&
            distributedCards.map((hand, index) => (
              <p key={index}>{hand}</p>
            ))}
        </div>
      </div>
    );
  } catch (error) {
    return <div className='container'><h1>Irregularity occurred</h1></div>
  }
}

export default App;
