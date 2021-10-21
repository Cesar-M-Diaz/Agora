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
  const user_email = useSelector((state) => state.currentUser.email);
  const user_name = useSelector((state) => state.currentUser.name);
  const firstName = user_name.split(' ')[0];
  const lastName = user_name.split(' ')[1];
  const [cardName, setCardName] = useState({
    card_name: user_name,
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
    last_name: lastName,
    email: '',
  });
  const [paymentInfo, setPaymentInfo] = useState({
    doc_type: '',
    doc_number: '',
    value: `${tutorship_price}`,
    tax: '16000',
    tax_base: '30000',
    currency: 'COP',
    dues: '',
  });
  const [errors, setErrors] = useState({
    dues: '',
    doc_type: '',
    doc_number: '',
    'card[number]': '',
    'card[exp_year]': '',
    'card[exp_month]': '',
    'card[cvc]': '',
    name: '',
    last_name: '',
    email: '',
    card_name: '',
  });
  const [isValid, setIsValid] = useState({
    dues: false,
    doc_type: false,
    doc_number: false,
    'card[number]': false,
    'card[exp_year]': false,
    'card[exp_month]': false,
    'card[cvc]': false,
    name: true,
    last_name: true,
    email: true,
    card_name: true,
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
        name: customer.name || firstName,
        email: customer.email || user_email,
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
  }, [epayco_customer_id, user_id, user_email, firstName]);

  function validateinputs(e) {
    const input = e.target.name;
    const value = e.target.value;
    const textRegex = /^[a-zA-Z\s]*$/;
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (
      !value &&
      (input === 'card[exp_month]' ||
        input === 'card[exp_year]' ||
        input === 'card[cvc]' ||
        input === 'doc_type' ||
        input === 'doc_number')
    ) {
      setErrors((state) => ({
        ...state,
        [input]: 'this fields are mandatory, please fill each one of them',
      }));
      setIsValid((state) => ({
        ...state,
        [input]: false,
      }));
    } else if (!value) {
      setErrors((state) => ({
        ...state,
        [input]: 'this field is mandatory',
      }));
      setIsValid((state) => ({
        ...state,
        [input]: false,
      }));
    } else if (
      (input === 'card_name' || input === 'name' || input === 'last_name') &&
      !textRegex.test(String(e.target.value).toLowerCase())
    ) {
      setErrors((state) => ({
        ...state,
        [input]: 'field must only contain letters',
      }));
      setIsValid((state) => ({
        ...state,
        [input]: false,
      }));
    } else if (input === 'email' && !emailRegex.test(String(value).toLowerCase())) {
      setErrors((state) => ({
        ...state,
        [input]: 'please enter a valid email',
      }));
      setIsValid((state) => ({
        ...state,
        [input]: false,
      }));
    } else {
      setErrors((state) => ({
        ...state,
        [input]: '',
      }));
      setIsValid((state) => ({
        ...state,
        [input]: true,
      }));
    }
  }

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
      setLoadingPayment(false);
      const errorMessage = err.response.data;
      MySwal.fire({
        icon: 'error',
        title: <p className="swal__tittle">Oops... Please try again</p>,
        text: errorMessage,
        confirmButtonColor: '#ce4c4c',
      });
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
                return <CreditCard card={card} selectCard={selectCard} key={card.token} token_card={token_card} />;
              })}
            </div>
          )
        ) : (
          count === 1 && (
            <form action="" className="payment__form">
              <div className="payment__form-slot">
                <label>name on card</label>
                <input
                  type="text"
                  name="card_name"
                  value={cardName.card_name}
                  onChange={cardNameChange}
                  onBlur={validateinputs}
                />
                <span className="payment__errors">{errors.card_name}</span>
              </div>
              <div className="payment__form-slot">
                <label>card number</label>
                <input
                  type="number"
                  name="card[number]"
                  value={cardInfo['card[number]']}
                  onChange={cardInfoChange}
                  onBlur={validateinputs}
                />
                <span className="payment__errors">{errors['card[number]']}</span>
              </div>
              <div className="payment__card-form">
                <div className="payment__card-form-slot">
                  <label>exp date</label>
                  <select
                    name="card[exp_month]"
                    id="month"
                    onChange={cardInfoChange}
                    onBlur={validateinputs}
                    value={cardInfo['card[exp_month]']}
                  >
                    <option value={0} hidden>
                      month
                    </option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                    <option value={11}>11</option>
                    <option value={12}>12</option>
                  </select>
                </div>
                <div className="payment__card-form-slot">
                  <label className="payment__hidden">.</label>
                  <input
                    type="number"
                    name="card[exp_year]"
                    placeholder="year"
                    onChange={cardInfoChange}
                    onBlur={validateinputs}
                  />
                </div>
                <div className="payment__cvc-form-slot">
                  <label>cvc</label>
                  <input
                    type="number"
                    name="card[cvc]"
                    value={cardInfo['card[cvc]']}
                    onChange={cardInfoChange}
                    onBlur={validateinputs}
                  />
                </div>
              </div>
              <span className="payment__errors">
                {errors['card[cvc]'] || errors['card[exp_year]'] || errors['card[exp_month]']}
              </span>
            </form>
          )
        )}

        {count === 2 && (
          <form action="" className="payment__form">
            <div className="payment__form-slot">
              <label>name</label>
              <input
                type="text"
                name="name"
                value={customerInfo.name}
                onChange={customerInfoChange}
                onBlur={validateinputs}
              />
              <span className="payment__errors">{errors.name}</span>
            </div>
            <div className="payment__form-slot">
              <label>last_name</label>
              <input
                type="text"
                name="last_name"
                value={customerInfo.last_name}
                onChange={customerInfoChange}
                onBlur={validateinputs}
              />
              <span className="payment__errors">{errors.last_name}</span>
            </div>

            <div className="payment__card-form">
              <div className="payment__id-type-form-slot">
                <label>id type</label>
                <select
                  name="doc_type"
                  id="doc_type"
                  onChange={paymentInfoChange}
                  value={paymentInfo.doc_type}
                  onBlur={validateinputs}
                >
                  <option value={0} hidden>
                    please select
                  </option>
                  <option value="cc">CC</option>
                  <option value="nit">NIT</option>
                </select>
              </div>
              <div className="payment__id-num-form-slot">
                <label>id number</label>
                <input
                  name="doc_number"
                  type="number"
                  value={paymentInfo.doc_number}
                  onChange={paymentInfoChange}
                  onBlur={validateinputs}
                />
              </div>
            </div>
            <span className="payment__errors">{errors.doc_type || errors.doc_number}</span>

            <div className="payment__form-slot">
              <label>email</label>
              <input
                type="text"
                name="email"
                value={customerInfo.email}
                onChange={customerInfoChange}
                onBlur={validateinputs}
              />
              <span className="payment__errors">{errors.email}</span>
            </div>
          </form>
        )}
        {count === 3 && !loadingPayment && (
          <form action="" className="payment__form" onSubmit={handleSubmit}>
            <div className="payment__form-slot">
              <label>total ammount</label>
              <input type="number" name="value" value={paymentInfo.value} readOnly />
              <span className="payment__errors">{errors.value}</span>
              <label>installments</label>
              <input
                type="number"
                name="dues"
                value={paymentInfo.dues}
                onChange={paymentInfoChange}
                onBlur={validateinputs}
              />
              <span className="payment__errors">{errors.dues}</span>
            </div>
            <button
              className="payment__pay-button"
              disabled={
                !(
                  isValid.dues &&
                  isValid.doc_type &&
                  isValid.doc_number &&
                  isValid['card[number]'] &&
                  isValid['card[exp_year]'] &&
                  isValid['card[exp_month]'] &&
                  isValid['card[cvc]'] &&
                  isValid.name &&
                  isValid.last_name &&
                  isValid.email &&
                  isValid.card_name
                )
              }
            >
              pay
            </button>
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
