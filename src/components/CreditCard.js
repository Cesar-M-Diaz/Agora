import React from 'react';
import '../assets/styles/components/CreditCard.scss';

function CreditCard({ card, selectCard }) {
  return (
    <div className="credit-card__body">
      <div className="credit-card__text">
        <div>{card.mask}</div>
      </div>
      <button className="credit-card__button" onClick={() => selectCard(card)}></button>
    </div>
  );
}

export default CreditCard;
