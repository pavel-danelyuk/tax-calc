const DataValidation = (fieldType: string = '', fieldValue: string = '') : number | string => {
    const errorMessage: string[] = [
        "Year is not a number",
        "Salary is not a number",
        "Year shall be between 2019 and 2023",
        "Salary shall be greater than 0",
        "Internal Error"
    ]


    if (fieldType === "year") {
        const numberValue: number = +fieldValue;

        if (!isNaN(numberValue)) {
            if (numberValue >= 2019 && numberValue <= 2023) {
                return numberValue
            } else {
                return errorMessage[2];
            }
        } else {
            return errorMessage[0];
        }
    } else if (fieldType === "salary") {
        const numberValue: number = +fieldValue;
        if (!isNaN(numberValue)) {
            if (numberValue >= 0) {
                return numberValue
            } else {
                return errorMessage[3];
            }
        } else {
            return errorMessage[1];
        }
    } else {
        return errorMessage[4];
    }
}

export default DataValidation