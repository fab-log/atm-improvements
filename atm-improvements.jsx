const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  const choice = ['Deposit', 'Cash Back'];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <label className="label huge">
    <hr />
      <h3> {choice[Number(!isDeposit)]}</h3>
      <div className="center">
        <input id="number-input" type="number" width="200" onChange={onChange} placeholder="type in amount"></input><br />
      </div>
      <div className="center">
        <input type="submit" disabled={!isValid} width="200" value="Submit" id="submit-input"></input>
      </div>
    </label>
  );
};

const Account = () => {
  // let deposit = 0; // state of this transaction
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState('');
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = `${totalState.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  })}`;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  
  const handleChange = (event) => {
    console.log(Number(event.target.value));
    if (Number(event.target.value) <= 0) {
      return setValidTransaction(false);
    }
    if (atmMode === 'Cash Back' && Number(event.target.value) > totalState) {
      setValidTransaction(false);
    } else {
      setValidTransaction(true);
    }
    setDeposit(Number(event.target.value));
  };

  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
    event.preventDefault();
  };

  const handleModeSelect = (event) => {
    console.log(event.target.value);
    setAtmMode(event.target.value);
    setValidTransaction(false);
    if (event.target.value === 'Deposit') {
      setIsDeposit(true);
    } else {
      setIsDeposit(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <>
        <h2 id="total">Account Balance<br />{status}</h2>
        <hr />
        <label>Select an action below to continue</label>
        <div className="center">
          <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
            <option id="no-selection" value=""></option>
            <option id="deposit-selection" value="Deposit">
              Deposit
            </option>
            <option id="cashback-selection" value="Cash Back">
              Cash Back
            </option>
          </select>
        </div>
        {atmMode && (
          <ATMDeposit onChange={handleChange} isDeposit={isDeposit} isValid={validTransaction}></ATMDeposit>
        )}
      </>
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));