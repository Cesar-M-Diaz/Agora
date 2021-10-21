import React from 'react';
import '../assets/styles/components/CreditCard.scss';

function CreditCard({ card, selectCard, token_card }) {
  return (
    <div className="credit-card__body">
      <div className="credit-card__text">
        <div>{card.mask}</div>
      </div>
      <button
        className={`credit-card__button${card.token === token_card ? '-selected' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          selectCard(card);
        }}
      ></button>
    </div>
  );
}

export default CreditCard;
