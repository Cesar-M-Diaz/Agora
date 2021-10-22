import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import CreditCard from '../components/CreditCard';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../assets/styles/pages/checkout.scss';

function PaymentMethods() {
  const MySwal = withReactContent(Swal);
  const user_id = useSelector((state) => state.currentUser._id);
  const [cardName, setCardName] = useState({
    card_name: '',
  });
  const [hidden, setHidden] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [epayco_customer_id, setEpayco_customer_id] = useState(null);
  const [existingCards, setExistingCards] = useState({
    cards: [],
  });
  const [cardInfo, setCardInfo] = useState({
    'card[number]': '',
    'card[exp_year]': '',
    'card[exp_month]': '',
    'card[cvc]': '',
  });
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    last_name: '',
    email: '',
  });

  useEffect(() => {
    axios.get(`/get-customer?id=${user_id}`).then((result) => {
      const customer = result.data.customer.data;
      console.log(customer);
      setEpayco_customer_id(customer.id_customer);
      if (customer.id_customer) {
        setExistingCards((prevState) => ({
          ...prevState,
          cards: customer.cards,
        }));
      }
      setIsLoading(false);
    });
  }, [epayco_customer_id, user_id]);

  function cardInfoChange(e) {
    setCardInfo((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  }

  function cardNameChange(e) {
    setCardName((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (epayco_customer_id) {
        await axios.post('/create-card', {
          epayco_customer_id,
          cardInfo,
        });
      } else {
        await axios.post('/create-user', {
          customerInfo,
          cardInfo,
        });
      }
      await axios.get(`/get-customer?id=${user_id}`).then((result) => {
        const customer = result.data.customer.data;
        setEpayco_customer_id(customer.id_customer);
        setExistingCards((prevState) => ({
          ...prevState,
          cards: customer.cards,
        }));
        setIsLoading(false);
      });
      MySwal.fire({
        icon: 'success',
        title: <p className="swal__tittle">Card Created</p>,
        confirmButtonColor: '#0de26f',
      });
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }

  function handleCancel() {
    setHidden(true);
    setCardInfo({
      'card[number]': '',
      'card[exp_year]': '',
      'card[exp_month]': '',
      'card[cvc]': '',
    });
    setCardName({
      card_name: '',
    });
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : existingCards.cards.length === 0 ? (
        <>
          <h2 className="payment__credit-card-title">My Credit Cards</h2>
          <button onClick={() => setHidden(false)} hidden={!hidden}>
            add card
          </button>
        </>
      ) : (
        <div>
          <h2 className="payment__credit-card-title">My Credit Cards</h2>
          {existingCards.cards.map((card) => {
            return <CreditCard card={card} key={card.token} />;
          })}
        </div>
      )}

      {!hidden && (
        <form action="" className="payment__form" onSubmit={handleSubmit}>
          <div className="payment__form-slot">
            <label>name on card</label>
            <input type="text" name="card_name" value={cardName.card_name} onChange={cardNameChange} />
            <span className="payment__errors"></span>
          </div>
          <div className="payment__form-slot">
            <label>card number</label>
            <input type="number" name="card[number]" value={cardInfo['card[number]']} onChange={cardInfoChange} />
            <span className="payment__errors"></span>
          </div>
          <div className="payment__card-form">
            <div className="payment__card-form-slot">
              <label>exp date</label>
              <input
                type="number"
                name="card[exp_month]"
                placeholder="month"
                value={cardInfo['card[exp_month]']}
                onChange={cardInfoChange}
              />
            </div>
            <div className="payment__card-form-slot">
              <label className="payment__hidden">.</label>
              <input
                type="number"
                name="card[exp_year]"
                placeholder="year"
                value={cardInfo['card[exp_year]']}
                onChange={cardInfoChange}
              />
            </div>
            <div className="payment__cvc-form-slot">
              <label>cvc</label>
              <input type="number" name="card[cvc]" value={cardInfo['card[cvc]']} onChange={cardInfoChange} />
            </div>
          </div>
          <span className="payment__errors"></span>
          <button>save card</button>
          <button onClick={handleCancel}>cancel</button>
        </form>
      )}
    </>
  );
}

export default PaymentMethods;
