import { useState } from 'react'
import '../dist/css/App.css'
import Form from './components/Form'
import logo from './images/card-logo.svg'
import cardFront from './images/bg-card-front.png'
import cardBack from './images/bg-card-back.png'
import complete from './images/icon-complete.svg'


function App() {

  const [ccNumber, setCcNumber] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    cardholderName: {
      value: '',
      error: { empty: false, pattern: false, short: false }
    },
    cardNumber: {
      value: '',
      error: { empty: false, pattern: false, short: false }
    },
    expiryMonth: {
      value: '',
      error: { empty: false, pattern: false, short: false }
    },
    expiryYear: {
      value: '',
      error: { empty: false, pattern: false, short: false }
    },
    cvc: {
      value: '',
      error: { empty: false, pattern: false, short: false }
    }
  })

  function handleClick() {
    setIsSubmitted(prevSubmit => !prevSubmit)
    setFormData({
      cardholderName: {
        value: '',
        error: { empty: false, pattern: false, short: false }
      },
      cardNumber: {
        value: '',
        error: { empty: false, pattern: false, short: false }
      },
      expiryMonth: {
        value: '',
        error: { empty: false, pattern: false, short: false }
      },
      expiryYear: {
        value: '',
        error: { empty: false, pattern: false, short: false }
      },
      cvc: {
        value: '',
        error: { empty: false, pattern: false, short: false }
      }
    })
  }

  function gatherData(event) {
    setFormData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: {
          value: event.target.value,
          error: { empty: false, pattern: false, short: false }
        }
      }
    })
  }

  function handleBlur(event) {
    const target = event.target.validity
    if (target.valueMissing) {
      event.target.classList.add('error')
      setFormData(prevData => {
        return {
          ...prevData,
          [event.target.name]: {
            value: event.target.value,
            error: { empty: true, pattern: false, short: false }
          }
        }
      })
    } else if (target.patternMismatch) {
      event.target.classList.add('error')
      setFormData(prevData => {
        return {
          ...prevData,
          [event.target.name]: {
            value: event.target.value,
            error: { empty: false, pattern: true, short: false }
          }
        }
      })
    }
    else if (target.tooShort) {
      event.target.classList.add('error')
      setFormData(prevData => {
        return {
          ...prevData,
          [event.target.name]: {
            value: event.target.value,
            error: { empty: false, pattern: false, short: true }
          }
        }
      })
    }
    else {
      event.target.classList.remove('error')
      setFormData(prevData => {
        return {
          ...prevData,
          [event.target.name]: {
            value: event.target.value,
            error: { empty: false, pattern: false, short: false }
          }
        }
      })
    }
  }

  return (
    <>
      <div className='cards'>
        <img className='cards__front' src={cardFront} alt="card front" />
        <p className='cards__name'>{formData.cardholderName.value === '' ? 'Jane Appleseed' : formData.cardholderName.value}</p>
        <p className='cards__cardNumber'>{formData.cardNumber.value === '' ? '0000 0000 0000 0000' : formData.cardNumber.value}</p>
        <p className='cards__date'>{formData.expiryMonth.value === '' ? '00' : formData.expiryMonth.value}/{formData.expiryYear.value === '' ? '00' : formData.expiryYear.value}</p>
        <p className='cards__cvc'>{formData.cvc.value === '' ? '000' : formData.cvc.value}</p>
        <img className='cards__logo' src={logo} alt="card logo" />
        <img className='cards__back' src={cardBack} alt="card back" />
      </div>
      <div className='formSection'>
        {isSubmitted ? <div className='complete'>
          <img src={complete} alt="complete" />
          <p className='complete__thx'>THANK YOU!</p>
          <p className='complete__text'>We've added your card details</p>
          <button
            onClick={handleClick}
            className='complete__btn'
          >Continue</button>
        </div>
          : <Form
            handleChange={gatherData}
            setSubmit={setIsSubmitted}
            formData={formData}
            setFormData={setFormData}
            handleBlur={handleBlur}
            setCcNumber={setCcNumber}
          />
        }
      </div>
    </>
  )
}

export default App
