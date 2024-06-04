import { FC, useState, ChangeEvent } from 'react';
import './styles.css';
import TaxCalculation from './taxCalculation';
import DataValidation from './dataValidation';
import { TaxListContentInterface } from './data';

const initState = {
    year: 2023,
    salary: 53000
}

let confirmedYear: number = 2023
let confirmedSalary: number = 0

const SalaryInputForm: FC = () => {
    const [taxAmount, setTaxAmount] = useState<{year: number, salary: number}>(initState)
    const [errorMessage, setErrorMessage] = useState('')
    const [taxListContent, setTaxListContent] = useState<TaxListContentInterface[]>([])

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setTaxAmount({
        ...taxAmount,
        [name]: value
      });

      let dataValidationResult: number | string;

      if (name === "year") {
        dataValidationResult  = DataValidation(name, value);

        if (typeof dataValidationResult === "number") {
            confirmedYear = dataValidationResult;
            setErrorMessage('');
        } else {
            setErrorMessage(dataValidationResult);
        }
      } else if (name === "salary") {
          dataValidationResult  = DataValidation(name, value);
          if (typeof dataValidationResult === "number") {
            confirmedSalary = dataValidationResult;
            setErrorMessage('');
        } else {
            setErrorMessage(dataValidationResult);
        }
      }
      
      setTaxListContent(await TaxCalculation(confirmedYear, confirmedSalary))
    }

    return (
      <>
      <form>
        <input
          id="year"
          name="year"
          type="text"
          placeholder="Year"
          className="controlInput"
          onChange={handleChange}
          value={taxAmount.year}
        />
        <input
          id="salary"
          name="salary"
          type="text"
          placeholder="Salary"
          className="controlInput"
          onChange={handleChange}
          value={taxAmount.salary}
        />
      </form>
      <div id='errorMessage' className='errorMessage'>{errorMessage}</div>
      <div id='taxList' className='taxList'>
        <div className='tableRow'>
          <span>Bracket</span>
          <span>Taxes per bracket</span>
          <span>Taxes total</span>
          <span>Rate</span>
        </div>
        
        {taxListContent.map((taxListEntry) => (
          <div className='tableRow' key={taxListEntry.id}>
            <span>{taxListEntry.bracket}</span>
            <span>{taxListEntry.taxes.toFixed(2)}</span>
            <span>{taxListEntry.taxesTotal.toFixed(2)}</span>
            <span>{taxListEntry.rate}</span>
          </div>
        ))}
        
      </div>
  
      </>
    );
  }
  
  export default SalaryInputForm;