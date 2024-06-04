import { BracketDataInterface , TaxListContentInterface } from './data';

const TaxCalculation = async (year: number = 2023, salary: number = 0): Promise<TaxListContentInterface[]> => {
    const loadData = async (year: number): Promise<BracketDataInterface[]> => {
        const bracketsDataModule = await import(/* @vite-ignore */'../data-source/tax-brackets--'+year+'.json');
          
        return bracketsDataModule.default;
    };

    const displayAmounts = (bracketsData: BracketDataInterface[], salary: number): TaxListContentInterface[] => {
        const taxListTable: TaxListContentInterface[] = []
        let totalTaxAmount: number = 0
        let bracketTaxAmount: number = 0
        let prevBracket: number = 0
        let bracket: number = 0

        while (salary > bracketsData[bracket].max) {
            bracketTaxAmount = (bracketsData[bracket].max - prevBracket) * bracketsData[bracket].rate
            totalTaxAmount = totalTaxAmount + bracketTaxAmount
            prevBracket = bracketsData[bracket].max

            const taxListEntry: TaxListContentInterface = {
                id: bracket,
                bracket : bracketsData[bracket].max,
                taxes : bracketTaxAmount,
                taxesTotal : totalTaxAmount,
                rate : bracketsData[bracket].rate
            }

            taxListTable.push(taxListEntry)

            bracket++
        } 

        bracketTaxAmount = (salary - prevBracket) * bracketsData[bracket].rate
        totalTaxAmount = totalTaxAmount + bracketTaxAmount

        const taxListEntry: TaxListContentInterface = {
            id: bracket,
            bracket : bracketsData[bracket].max,
            taxes : bracketTaxAmount,
            taxesTotal : totalTaxAmount,
            rate : bracketsData[bracket].rate
        }

        taxListTable.push(taxListEntry)

        return taxListTable
    };

    const bracketsData = await loadData(year);

    const taxListContent: TaxListContentInterface[] = displayAmounts(bracketsData, salary)

    return taxListContent
}

export default TaxCalculation;