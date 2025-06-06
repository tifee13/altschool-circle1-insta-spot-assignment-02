import React, { useEffect, useState } from 'react';
import { cardsData } from '../../insta-spot-react/src/data/CardsData';
import Card from './Card';

const Cards = ({ extraCards = [], likes = {}, onLikeToggle }) => {
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [allCards, setAllCards] = useState([]);

  useEffect(() => {
    const merged = [...extraCards, ...cardsData];
    setAllCards(merged);
  }, [extraCards]);

  return (
    <>
      <style>{`
        .like-icon:focus { outline: none; }
        .like-icon.liked path { fill: red; stroke: red; }
        .card-img-container { overflow: hidden; }
        .card-img { transition: transform 0.3s ease-in-out; }
        .card.focused .card-img { transform: scale(1.1); }
      `}</style>

      <section className="container" aria-label="Photo gallery">
        {allCards.map((card, index) => (
          <Card
            key={index}
            card={card}
            focused={index === focusedIndex}
            liked={!!likes[card.imgSrc]}
            onLikeToggle={() => onLikeToggle(card.imgSrc)}
            onMouseEnter={() => setFocusedIndex(index)}
            onMouseLeave={() => setFocusedIndex(null)}
          />
        ))}
      </section>
    </>
  );
};

export default Cards;
