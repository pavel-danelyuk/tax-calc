import { FC } from 'react';
import SalaryInputForm from './components/salaryInputForm';
import './App.css';

/*
type taxBracket = {
  min: number,
  max?: number,
  rate: number
}
*/
const App: FC = () => {
  return (
    <div className="App">
      <div className="wrapper">
        <h1 className='headTitle'>Tax Calculator</h1>
        <SalaryInputForm />
      </div>
    </div>
  );
}

export default App;

