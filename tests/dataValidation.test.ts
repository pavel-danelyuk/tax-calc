import DataValidation  from '../src/components/dataValidation';

test('Correct year', () => {
  expect(DataValidation('year', '2023')).toBe(2023);
});

test('Year out of range', () => {
    expect(DataValidation('year', '1999')).toBe("Year shall be between 2019 and 2023");
});

test('Incorrect year', () => {
    expect(DataValidation('year', '20 is a string')).toBe("Year is not a number");
});

test('Correct salary', () => {
    expect(DataValidation('salary', '130000')).toBe(130000);
});
  
test('Salary out of range', () => {
    expect(DataValidation('salary', '-1')).toBe("Salary shall be greater than 0");
});
  
test('Incorrect salary', () => {
    expect(DataValidation('salary', '130 is a string')).toBe("Salary is not a number");
});
