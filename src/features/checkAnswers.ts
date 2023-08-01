// Here are algorithms that check if the answers are not too contadictory
// these algorithms come from the AHP method which I used in my bachalor 
type DietCriteriaData = {
    amount: number,
    wellBeing: number,
    health: number,
    price: number,
    moreFat: number,
    buildingMuscleMass: number,
  };


const calculateLambda = (criterionsWeightList : number[], sumeOfColumnsList : number[] ) => {
    let lambda = 0;
    for(let i = 0; i < criterionsWeightList.length; i++){
       lambda = lambda + criterionsWeightList[i] * sumeOfColumnsList[i];
    };
    return lambda;
};

function multiply(a : number[][], b : number [][]) {
    var aNumRows = a.length, aNumCols = a[0].length,
        bNumRows = b.length, bNumCols = b[0].length,
        m = new Array(aNumRows);  // initialize array of rows
    for (var r = 0; r < aNumRows; ++r) {
      m[r] = new Array(bNumCols); // initialize the current row
      for (var c = 0; c < bNumCols; ++c) {
        m[r][c] = 0;             // initialize the current cell
        for (var i = 0; i < aNumCols; ++i) {
          m[r][c] += a[r][i] * b[i][c];
        }
      }
    }
    return m;
};

function CreateAnswersMatrix(answersList : number[]) {
    let i : number = -1;
    const answersMatrix : number[][] = [
        answersList,
        answersList,
        answersList,
        answersList,
        answersList,
        answersList,
    ]
    .map((rowOfAnswers : number[]) => {
        i++;
        return(
            rowOfAnswers.map((answer : number) => {
                return answersList[i]/answer;
            })
        );
    });
   return answersMatrix;
};

function assumeRows(answersMatrix : number[][]){
    const reducer = (accumulator : number, currentValue : number) => accumulator + currentValue;
    const sumeOfRows : number[] = answersMatrix.reduce((sumeOfRow : number[], rowOfAnswers : number []) => {
        sumeOfRow.push(rowOfAnswers.reduce(reducer));
        return sumeOfRow;
    }, []);

    return sumeOfRows;
};

function assumeColumns(answersMatrix : number[][]){
    let i : number = -1;
    const sumeOfColumns : number[] = answersMatrix.reduce((sumeOfColumns : number[], rowOfAnswers : number []) => {
        i++;
        sumeOfColumns[i] = 0;
        rowOfAnswers.forEach((value : number) => {sumeOfColumns[i] = sumeOfColumns[i] + value;});
        return sumeOfColumns;
    }, []);

    return sumeOfColumns;
}

export const checkAnswers = (answers: DietCriteriaData) : boolean => {
    
    const answersList : number[] = [
        answers.amount,
        answers.wellBeing,
        answers.health,
        answers.price,
        answers.moreFat,
        answers.buildingMuscleMass,
    ];
    

    const answersMatrix = CreateAnswersMatrix(answersList);

    const sumeOfRows = assumeRows(answersMatrix);

    const reducer = (accumulator : number, currentValue : number) => accumulator + currentValue;
    const sumeOfMatrix : number = sumeOfRows.reduce(reducer);

    const criterionsWeight : number[] = sumeOfRows.map((value : number) => value/sumeOfMatrix);

    const sumeOfColumns : number[] = assumeColumns(answersMatrix);

    const lambdaMax : number = calculateLambda(criterionsWeight, sumeOfColumns);

    const factorCI : number= (lambdaMax - answersList.length)/(answersList.length - 1);

    const factorCR : number = factorCI / 0.6;

    return (factorCR < 1 ? true : false);
};

export const calculateAHP = (answers: DietCriteriaData) => {

    const answersList : number[] = [
        answers.amount,
        answers.wellBeing,
        answers.health,
        answers.price,
        answers.moreFat,
        answers.buildingMuscleMass,
    ];
    const answersMatrix = CreateAnswersMatrix(answersList);
    const MatrixSquare = multiply(answersMatrix,answersMatrix);
    const sumeOfRows = assumeRows(answersMatrix);

    const reducer = (accumulator : number, currentValue : number) => accumulator + currentValue;
    const sumeOfMatrix : number = sumeOfRows.reduce(reducer);
    const criterionsWeight : number[] = sumeOfRows.map((value : number) => value/sumeOfMatrix);
    

   const answersListDict : Record<string, number> = {};

   answersListDict["amount"] = criterionsWeight[0];
   answersListDict["wellBeing"] = criterionsWeight[1];
   answersListDict["health"] = criterionsWeight[2];
   answersListDict["price"] = criterionsWeight[3];
   answersListDict["moreFat"] = criterionsWeight[4];
   answersListDict["buildingMuscleMass"] = criterionsWeight[5];
   
    return answersListDict;
};


