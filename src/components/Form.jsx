import { useState } from 'react'

export default function Form(props) {

    const [dateError, setDateError] = useState({
        dateEmpty: false,
        datePattern: false,
        dateShort: false
    })

    function handleDateError() {
        if (props.formData.expiryMonth.error.empty || props.formData.expiryYear.error.empty) {
            setDateError(
                {
                    dateEmpty: true,
                    datePattern: false,
                    dateShort: false
                }
            )
        } else if (props.formData.expiryMonth.error.pattern || props.formData.expiryYear.error.pattern) {
            setDateError(
                {
                    dateEmpty: false,
                    datePattern: true,
                    dateShort: false
                }
            )
        } else if (props.formData.expiryMonth.error.short || props.formData.expiryYear.error.short) {
            setDateError({
                dateEmpty: false,
                datePattern: false,
                dateShort: true
            }
            )
        }
    }

    function handleSubmit(event) {
        event.preventDefault()
        props.setSubmit(prevSubmit => !prevSubmit)
    }

    function handleUpdate(event) {
        const target = event.target
        if (target.classList.contains('error'))
            target.classList.remove('error')
        props.setFormData(prevData => {
            return {
                ...prevData,
                [event.target.name]: {
                    value: event.target.value,
                    error: { empty: false, pattern: false, short: false }
                }
            }
        })
    }

    function handleNumber(event) {
        const inputVal = event.target.value.replace(/ /g, "");
        let inputNumbersOnly = inputVal.replace(/\D/g, "");

        if (inputNumbersOnly.length > 16) {
            inputNumbersOnly = inputNumbersOnly.substr(0, 16);
        }

        const splits = inputNumbersOnly.match(/.{1,4}/g);

        let spacedNumber = "";
        if (splits) {
            spacedNumber = splits.join(" ");
        }

        props.setFormData(prevData => {
            return {
                ...prevData,
                [event.target.name]: {
                    value: spacedNumber,
                    error: { empty: false, pattern: false, short: false }
                }
            }
        })
    }

    return <>
        <form className='form' onSubmit={handleSubmit}>
            <div className='form__name'>
                <label htmlFor='name' className='form__nameText'>CARDHOLDER NAME</label>
                <input
                    onBlur={(event) => props.handleBlur(event)}
                    onChange={(event) => { props.handleChange(event), handleUpdate(event) }}
                    type="text"
                    className='form__nameInput'
                    name='cardholderName'
                    id='name'
                    placeholder='e.g Jane Appleseed'
                    value={props.formData.cardholderName.value}
                    maxLength='30'
                    pattern='^[A-Za-z ]+[\s][A-Za-z]+'
                    required
                />
                {props.formData.cardholderName.error.empty && <p className='errorText'>Can't be blank</p>}
                {props.formData.cardholderName.error.pattern && <p className='errorText'>Type name as shown on card</p>}
                {props.formData.cardholderName.error.short && <p className='errorText'>Too short</p>}


            </div>
            <div className='form__cardNumber'>
                <label htmlFor='number' className='form__cardNumberText'>CARD NUMBER</label>
                <input
                    onBlur={(event) => props.handleBlur(event)}
                    onChange={(event) => { props.handleChange(event), handleNumber(event) }}
                    type="text"
                    className='form__cardNumberInput'
                    name='cardNumber'
                    id='number'
                    placeholder='e.g 1234 5678 0123 0000'
                    value={props.formData.cardNumber.value}
                    maxLength='19'
                    minLength='19'
                    pattern="[0-9\s]+"
                    required
                />
                {props.formData.cardNumber.error.empty && <p className='errorText'>Can't be blank</p>}
                {props.formData.cardNumber.error.pattern && <p className='errorText'>Wrong format, numbers only</p>}
                {props.formData.cardNumber.error.short && <p className='errorText'>Too short</p>}
            </div>
            <div className='form__date'>
                <label htmlFor='date' className='form__dateText'>EXP. DATE (MM/YY)</label>
                <input
                    onBlur={(event) => { props.handleBlur(event), handleDateError(event) }}
                    onChange={(event) => { props.handleChange(event), handleUpdate(event) }}
                    type="text"
                    className='form__monthInput'
                    name='expiryMonth'
                    id='date'
                    placeholder='MM'
                    value={props.formData.expiryMonth.value}
                    maxLength='2'
                    minLength='2'
                    pattern='[0-9]+'
                    required
                />
                {dateError.dateEmpty && <p className='errorText'>Can't be blank</p>}
                {dateError.datePattern && <p className='errorText'>Numbers only</p>}
                {dateError.dateShort && <p className='errorText'>Too short</p>}

                <input
                    onBlur={(event) => { props.handleBlur(event), handleDateError(event) }}
                    onChange={(event) => { props.handleChange(event), handleUpdate(event) }}
                    type="text"
                    className='form__yearInput'
                    name='expiryYear'
                    id='date'
                    placeholder='YY'
                    value={props.formData.expiryYear.value}
                    maxLength='2'
                    minLength='2'
                    pattern="[0-9]+"
                    required
                />



                <label htmlFor='cvc' className='form__cvcText'>CVC</label>
                <input
                    onBlur={(event) => props.handleBlur(event)}
                    onChange={(event) => { props.handleChange(event), handleUpdate(event) }}
                    type="text"
                    className='form__cvcInput'
                    id='cvc'
                    name='cvc'
                    placeholder='e.g. 123'
                    value={props.formData.cvc.value}
                    maxLength='3'
                    minLength='3'
                    pattern="[0-9]+"
                    required
                />

                {props.formData.cvc.error.empty && <p className='errorText cvcErrorText'>Can't be blank</p>}
                {props.formData.cvc.error.pattern && <p className='errorText cvcErrorText'>Numbers only</p>}
                {props.formData.cvc.error.short && <p className='errorText cvcErrorText'>Too short</p>}
            </div>

            <button className='form__btn'>Confirm</button>
        </form>
    </>
}