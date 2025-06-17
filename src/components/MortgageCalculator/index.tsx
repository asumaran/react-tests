// Build a simple mortgage calculator widget that takes in a loan amount, interest rate, loan term, and calculates the monthly mortgage payment, total payment amount, and total interest paid.
//
// Requirements
// - The user should be able to enter:
//   - Loan amount ($)
//   - Annual interest rate (%). This is also known as the annual percentage rate (APR)
//   - Loan term (in years)
// - Using the inputs, the calculator should compute the following and display the results to the user:
//   - Monthly mortgage payment
//   - Total payment amount
//   - Total interest paid
// - If a non-numerical string is entered into any input field, the calculator should display an error message. Additionally, the calculator should handle any other invalid inputs that may arise.
// - Round the result amounts to 2 decimal places.
//
// The last two requirements might not be given to you during interviews, you're expected to clarify.
//
// The formula for calculating the monthly payment is:
//
// M = P * [r * (1 + r)^n] / [(1 + r)^n - 1]
//
// M: Monthly mortgage payment
// P: Loan amount
// i: Monthly interest rate (APR / 12)
// n: Total number of payments (loan term in years x 12)

import { useReducer } from 'react';

const initialState: State = {
  amount: '',
  interest: '',
  years: '',
  monthlyPayment: null,
  totalPaymentAmount: null,
  totalInterest: null,
  error: '',
};

type State = {
  amount: string;
  interest: string;
  years: string;
  monthlyPayment: number | null;
  totalPaymentAmount: number | null;
  totalInterest: number | null;
  error: string;
};

type Action =
  | { type: 'SET_AMOUNT'; payload: string }
  | { type: 'SET_INTEREST'; payload: string }
  | { type: 'SET_YEARS'; payload: string }
  | { type: 'SUBMIT' };

function mortgageReducer(
  state: typeof initialState,
  action: Action,
): typeof initialState {
  switch (action.type) {
    case 'SET_AMOUNT':
      return { ...state, amount: action.payload, error: '' };
    case 'SET_INTEREST':
      return { ...state, interest: action.payload, error: '' };
    case 'SET_YEARS':
      return { ...state, years: action.payload, error: '' };
    case 'SUBMIT': {
      const P = Number(state.amount);
      const i = Number(state.interest) / 100 / 12; // convert to percentage first
      const n = Number(state.years) * 12;

      // podriamos mostrar un error después de algunas validaciones
      if (isNaN(P) || isNaN(i) || isNaN(n)) {
        return { ...state, error: 'Please enter numeric values only' };
      }

      // positive numbers only
      if (P < 0 || i < 0 || n < 0) {
        return { ...state, error: 'Please enter positive numbers only' };
      }

      let monthlyPayment;
      if (i === 0) {
        monthlyPayment = P / n;
      } else {
        monthlyPayment =
          (P * (i * Math.pow(1 + i, n))) / (Math.pow(1 + i, n) - 1);
      }

      const totalPaymentAmount = monthlyPayment * n;
      const totalInterest = totalPaymentAmount - P;
      return {
        ...state,
        monthlyPayment,
        totalPaymentAmount,
        totalInterest,
        error: '',
      };
    }
    default:
      return state;
  }
}

function MortgageCalculator() {
  const [state, dispatch] = useReducer(mortgageReducer, initialState);

  return (
    <>
      <form
        className='flex flex-col space-y-5 mb-5'
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: 'SUBMIT' });
        }}
      >
        {state.error && <p className='text-red-700'>{state.error}</p>}
        <p>
          <label htmlFor='amount'>Loan amount ($)</label>
          <input
            value={state.amount}
            className='border p-2 rounded-sm'
            name='amount'
            id='amount'
            required={true}
            placeholder='amount'
            type='number'
            onChange={(e) =>
              dispatch({ type: 'SET_AMOUNT', payload: e.target.value })
            }
          />
        </p>
        <p>
          <label htmlFor='interest'>Annual interest rate (%)</label>
          <input
            value={state.interest}
            className='border p-2 rounded-sm'
            name='interest'
            id='interest'
            placeholder='interest'
            type='number'
            required={true}
            onChange={(e) =>
              dispatch({ type: 'SET_INTEREST', payload: e.target.value })
            }
          />
        </p>
        <p>
          <label htmlFor='years'>Loan term (in years)</label>
          <input
            value={state.years}
            className='border p-2 rounded-sm'
            name='years'
            id='years'
            placeholder='years'
            type='number'
            required={true}
            onChange={(e) =>
              dispatch({ type: 'SET_YEARS', payload: e.target.value })
            }
          />
        </p>
        <p>
          <button className='border px-5 py-2' type='submit'>
            Send
          </button>
        </p>
      </form>

      <p>Monthly mortgage payment: {displayAmount(state.monthlyPayment)}</p>
      <p>Total payment amount: {displayAmount(state.totalPaymentAmount)}</p>
      <p>Total interest paid: {displayAmount(state.totalInterest)}</p>
    </>
  );
}

function displayAmount(amount: number | null) {
  if (amount === null || isNaN(amount)) {
    return '--';
  }

  if (typeof amount === 'number') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  }

  throw new Error('Unsupported amount type');
}

export default MortgageCalculator;
