import React from 'react';
import '../assets/styles/components/CreditCard.scss';

function CreditCard({ card, selectCard, deleteCard }) {
  return (
    <div className="credit-card__body">
      <div className="credit-card__text">
        <div>{card.mask}</div>
      </div>
      {deleteCard ? (
        <button className="credit-card__button-delete" onClick={() => deleteCard(card)}>
          delete card
        </button>
      ) : (
        <button className="credit-card__button" onClick={() => selectCard(card)}></button>
      )}
    </div>
  );
}

export default CreditCard;
