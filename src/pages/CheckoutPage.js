import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import CreditCard from '../components/CreditCard';
import history from '../utils/history';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../assets/styles/pages/checkout.scss';

export default function CheckoutPage(props) {
  const tutorshipData = props.location.state.state;
  const { tutorship_id, tutorship_price } = tutorshipData;
  const MySwal = withReactContent(Swal);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const user_id = useSelector((state) => state.currentUser._id);
  const [cardName, setCardName] = useState({
    card_name: '',
  });
  const [count, setCount] = useState(1);
  const [hidden, setHidden] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [epayco_customer_id, setEpayco_customer_id] = useState('');
  const [existingCards, setExistingCards] = useState({
    cards: [],
  });
  const [token_card, setToken_card] = useState('');
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
    address: '',
    phone: '',
  });
  const [paymentInfo, setPaymentInfo] = useState({
    doc_type: '',
    doc_number: '',
    value: tutorship_price,
    tax: '16000',
    tax_base: '30000',
    currency: 'COP',
    dues: '',
  });

  function previous() {
    setCount(count - 1);
    if (count === 1) {
      setCount(1);
    }
  }

  function next() {
    setCount(count + 1);
    if (count === 4) {
      setCount(4);
    }
  }

  useEffect(() => {
    axios.get(`/get-customer?id=${user_id}`).then((result) => {
      const customer = result.data.customer.data;
      setEpayco_customer_id(customer.id_customer);
      setCustomerInfo((prevState) => ({
        ...prevState,
        name: customer.name,
        email: customer.email,
        address: customer.address,
        phone: customer.phone,
      }));
      setExistingCards((prevState) => ({
        ...prevState,
        cards: customer.cards,
      }));
      if (customer.id_customer) {
        setHidden(true);
      }
      setIsLoading(false);
    });
  }, [epayco_customer_id, user_id]);

  function selectCard(card) {
    setToken_card(card.token);
  }

  function customerInfoChange(e) {
    setCustomerInfo((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  }

  function cardInfoChange(e) {
    setCardInfo((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  }

  function paymentInfoChange(e) {
    setPaymentInfo((state) => ({
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
    setLoadingPayment(true);
    try {
      if (epayco_customer_id) {
        await axios.post('/payment', {
          tutorship_id,
          user_id,
          currentPaymentData: {
            customer_id: epayco_customer_id,
            token_card: token_card,
            ...paymentInfo,
            ...customerInfo,
          },
        });
        MySwal.fire({
          icon: 'success',
          title: <p className="swal__tittle">Succesfull payment!</p>,
          confirmButtonColor: '#0de26f',
        });
        history.push('/profile/tutorships');
      } else {
        await axios.post('/payment', {
          tutorship_id,
          user_id,
          cardInfo,
          customerInfo,
          paymentInfo,
        });
        MySwal.fire({
          icon: 'success',
          title: <p className="swal__tittle">Succesfull payment!</p>,
          confirmButtonColor: '#0de26f',
        });
        history.push('/profile/tutorships');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="payment__body">
      <div className="payment__page-body">
        {isLoading ? (
          <Loader />
        ) : hidden ? (
          count === 1 && (
            <div>
              <h2 className="payment__credit-card-title">select card</h2>
              {existingCards.cards.map((card) => {
                return <CreditCard card={card} selectCard={selectCard} key={card.token} />;
              })}
              {/* <button>add new card</button> */}
            </div>
          )
        ) : (
          count === 1 && (
            <form action="" className="payment__form">
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
            </form>
          )
        )}

        {count === 2 && (
          <form action="" className="payment__form">
            <div className="payment__form-slot">
              <label>name</label>
              <input type="text" name="name" value={customerInfo.name} onChange={customerInfoChange} />
              <span className="payment__errors"></span>
            </div>
            <div className="payment__form-slot">
              <label>last_name</label>
              <input type="text" name="last_name" value={customerInfo.last_name} onChange={customerInfoChange} />
              <span className="payment__errors"></span>
            </div>

            <div className="payment__card-form">
              <div className="payment__id-type-form-slot">
                <label>id type</label>
                <input type="text" name="doc_type" value={paymentInfo.doc_type} onChange={paymentInfoChange} />
              </div>
              <div className="payment__id-num-form-slot">
                <label>id number</label>
                <input type="number" name="doc_number" value={paymentInfo.doc_number} onChange={paymentInfoChange} />
              </div>
            </div>
            <span className="payment__errors"></span>

            <div className="payment__form-slot">
              <label>email</label>
              <input type="text" name="email" value={customerInfo.email} onChange={customerInfoChange} />
              <span className="payment__errors"></span>
            </div>
            <div className="payment__form-slot">
              <label>address</label>
              <input type="text" name="address" value={customerInfo.address} onChange={customerInfoChange} />
              <span className="payment__errors"></span>
            </div>
            <div className="payment__form-slot">
              <label>phone</label>
              <input type="number" name="phone" value={customerInfo.phone} onChange={customerInfoChange} />
              <span className="payment__errors"></span>
            </div>
          </form>
        )}
        {count === 3 && !loadingPayment && (
          <form action="" className="payment__form" onSubmit={handleSubmit}>
            <div className="payment__form-slot">
              <label>total ammount</label>
              <input type="number" name="value" defaultValue={paymentInfo.value} />
              <span className="payment__errors"></span>
              <label>installments</label>
              <input type="number" name="dues" value={paymentInfo.dues} onChange={paymentInfoChange} />
              <span className="payment__errors"></span>
            </div>
            <button className="payment__pay-button">pay</button>
          </form>
        )}
        {loadingPayment && (
          <div>
            <h1 className="payment__loader-title">Processing payment, please wait</h1>
            <Loader />
          </div>
        )}
        <div className="payment__button-container">
          <button
            onClick={previous}
            disabled={count === 1}
            hidden={isLoading || loadingPayment}
            className={count === 1 ? 'payment__previous-button-disabled' : 'payment__page-button'}
          >
            previous
          </button>
          <button
            onClick={next}
            disabled={count === 3}
            hidden={isLoading || loadingPayment}
            className={count === 3 ? 'payment__next-button-disabled' : 'payment__page-button'}
          >
            next
          </button>
        </div>
      </div>
    </div>
  );
}
