import {useState} from "react";
import {IDietsResultsData} from '../App';

// Here are algorithms that calculate the best choice using 6 criteria
// these algorithms come from the AHP method which I used in my bachalor 
interface DietsData {
    name : string,
    dietValue: Record<string,number>
};


const dietOptions: DietsData[] = [
    // diet options data...
    {
        name: 'Fit Diet',
        dietValue : {
            ["amount"] : 5,
            ["wellBeing"] : 7,
            ["health"] : 8,
            ["price"] : 7,
            ["moreFat"] : 4,
            ["buildingMuscleMass"] : 5,
        },
    },
    {
        name: 'Keto Diet',
        dietValue : {
            ["amount"] : 4,
            ["wellBeing"] : 9,
            ["health"] : 4,
            ["price"] : 2,
            ["moreFat"] : 9,
            ["buildingMuscleMass"] : 7,
        },
    },
    {
        name: 'Mediterranean Diet',
        dietValue : {
            ["amount"] : 5,
            ["wellBeing"] : 7,
            ["health"] : 9,
            ["price"] : 5,
            ["moreFat"] : 4,
            ["buildingMuscleMass"] : 6,
        },
    },
    {
        name: 'Low-carb Diet',
        dietValue : {
            ["amount"] : 5,
            ["wellBeing"] : 7,
            ["health"] : 7,
            ["price"] : 3,
            ["moreFat"] : 8,
            ["buildingMuscleMass"] : 5,
        },
    },
    {
        name: 'High Protein Diet',
        dietValue : {
            ["amount"] : 8,
            ["wellBeing"] : 5,
            ["health"] : 5,
            ["price"] : 4,
            ["moreFat"] : 6,
            ["buildingMuscleMass"] : 9,
        },
    },
    {
        name: 'Traditional Diet',
        dietValue : {
            ["amount"] : 7,
            ["wellBeing"] : 6,
            ["health"] : 5,
            ["price"] : 6,
            ["moreFat"] : 5,
            ["buildingMuscleMass"] : 6,
        },
    },
];

export const findDiet = (answersResult : Record<string, number>) => { // names of criteria with values (from answers)
   // const dietOptionsResult = fillDietsData(dietOptions); // name of diet and names of criteria with values
    const finalResult : Record<string, number> = {
        ["Fit Diet"] : 0,
        ["Keto Diet"] : 0,
        ["Mediterranean Diet"] : 0,
        ["Low-carb Diet"] : 0,
        ["High Protein Diet"] : 0,
        ["Traditional Diet"] : 0,
    }; // name of Diet and value 

    const nameOfDiets : string[] = [
        "Fit Diet",
        "Keto Diet",
        "Mediterranean Diet",
        "Low-carb Diet",
        "High Protein Diet",
        "Traditional Diet",
    ];
    
    const nameOfCriteria : string[] = [
        "amount",
        "wellBeing",
        "health",
        "price",
        "moreFat",
        "buildingMuscleMass",
    ];
    
    dietOptions.forEach((dietOption : DietsData) => {
        let result = finalResult[dietOption.name];
        nameOfCriteria.forEach((criteria: string) => {
            let value = answersResult[criteria];
            result = result + value * dietOption.dietValue[criteria];
        });
        finalResult[dietOption.name] = result;
    });

    const finalResultList : IDietsResultsData[] = [];
    nameOfDiets.forEach((name : string) => {
        finalResultList.push({name: name, result: finalResult[name]});
    });
    let l = finalResultList.length
    for(let i = 0; i < l; i++){
        let temp = finalResultList[i];
        for(let j = i+1; j < l; j++){
            if (temp.result < finalResultList[j].result){
                let temp2 = temp;
                temp = finalResultList[j];
                finalResultList[j] = temp2;
            };
            finalResultList[i] = temp;
            //finalResultList[j] = temp2;
        };
    };

    return finalResultList;
};

/*
    const finalResultList : IDietsresultsData[] = [
        {name : "Fit Diet", result : finalResult["Fit Diet"]},
        {name : "Fit Diet", result : finalResult["Fit Diet"]},
        {name : "Fit Diet", result : finalResult["Fit Diet"]},
        {name : "Fit Diet", result : finalResult["Fit Diet"]},
        {name : "Fit Diet", result : finalResult["Fit Diet"]},
        {name : "Fit Diet", result : finalResult["Fit Diet"]},
    ];
    */
/*
const dietOptions: DietsData[] = [
    // diet options data...
    {
    name: 'Fit Diet',
    amount: 5,
    wellBeing: 7,
    health: 8,
    price: 7,
    moreFat: 4,
    buildingMuscleMass: 5
    },
    {
    name: 'Keto Diet',
    amount: 4,
    wellBeing: 9,
    health: 4,
    price: 2,
    moreFat: 9,
    buildingMuscleMass: 7,
    },
    {
    name: 'Mediterranean Diet',
    amount: 5,
    wellBeing: 7,
    health: 8,
    price: 6,
    moreFat: 4,
    buildingMuscleMass: 6,
    },
    {
    name: 'Low-carb Diet',
    amount: 5,
    wellBeing: 8,
    health: 8,
    price: 3,
    moreFat: 8,
    buildingMuscleMass: 6,
    },
    {
    name: 'Fit Diet',
    amount: 5,
    wellBeing: 7,
    health: 8,
    price: 7,
    moreFat: 4,
    buildingMuscleMass: 5
    },
    {
    name: 'High Protein Diet',
    amount: 8,
    wellBeing: 5,
    health: 5,
    price: 4,
    moreFat: 6,
    buildingMuscleMass: 9,
    },
];

function fillDietsData (diets: DietsData[]){
    const dietOptions = diets;
    // Fit Diet
    dietOptions[0].dietValue["amount"] = 5,
    dietOptions[0].dietValue["wellBeing"] = 7,
    dietOptions[0].dietValue["health"] = 8,
    dietOptions[0].dietValue["price"] = 7,
    dietOptions[0].dietValue["moreFat"] = 4,
    dietOptions[0].dietValue["buildingMuscleMass"] = 5
    // Keto Diet
    dietOptions[1].dietValue["amount"] = 4,
    dietOptions[1].dietValue["wellBeing"] = 9,
    dietOptions[1].dietValue["health"] = 4,
    dietOptions[1].dietValue["price"] = 2,
    dietOptions[1].dietValue["moreFat"] = 9,
    dietOptions[1].dietValue["buildingMuscleMass"] = 7,
    // Mediterranean Diet
    dietOptions[2].dietValue["amount"] = 5,
    dietOptions[2].dietValue["wellBeing"] = 7,
    dietOptions[2].dietValue["health"] = 9,
    dietOptions[2].dietValue["price"] = 5,
    dietOptions[2].dietValue["moreFat"] = 4,
    dietOptions[2].dietValue["buildingMuscleMass"] = 6,
    // Low-carb Diet
    dietOptions[3].dietValue.set("amount", 5)
    dietOptions[3].dietValue.set("wellBeing", 8)
    dietOptions[3].dietValue.set("health", 8)
    dietOptions[3].dietValue.set("price", 3)
    dietOptions[3].dietValue.set("moreFat", 8)
    dietOptions[3].dietValue.set("buildingMuscleMass", 6)
    // High Protein Diet
    dietOptions[4].dietValue.set("amount", 8)
    dietOptions[4].dietValue.set("wellBeing", 5)
    dietOptions[4].dietValue.set("health", 5)
    dietOptions[4].dietValue.set("price", 4)
    dietOptions[4].dietValue.set("moreFat", 6)
    dietOptions[4].dietValue.set("buildingMuscleMass", 9)
    // Traditional Diet
    dietOptions[5].dietValue.set("amount", 7)
    dietOptions[5].dietValue.set("wellBeing", 6)
    dietOptions[5].dietValue.set("health", 5)
    dietOptions[5].dietValue.set("price", 6)
    dietOptions[5].dietValue.set("moreFat", 5)
    dietOptions[5].dietValue.set("buildingMuscleMass", 6)

    return dietOptions;
};

export const findDiet = (answersResult : Map<string, number>) => { // names of criteria with values (from answers)
    const dietOptionsResult = fillDietsData(dietOptions); // name of diet and names of criteria with values

    const finalResult = new Map<string,number>(); // name of Diet and value 
    for(let i = 0; i < dietOptionsResult.length; i++){
        finalResult.set(dietOptionsResult[i].name, 0);
       // console.log(finalResult.get(dietOptionsResult[i].name));
    }
    finalResult.forEach((value : number, key : string) => {
        answersResult.forEach((valueOfCriteriaFromAnswers : number, keyOfCriteriaFromAnswers : string) => {
            dietOptionsResult.forEach((dietsData : DietsData) => {
                dietsData.dietValue.forEach((basicValueOfCriteria : number, keyOfCriteria : string) => {
                    if(dietsData.name === key && keyOfCriteria === keyOfCriteriaFromAnswers){
                        value = value + basicValueOfCriteria * valueOfCriteriaFromAnswers;
                    }
                });
            });
        });
    });
    
    return finalResult;

};
*/

/*
 dietOptionsResult.forEach((dietOption : DietsData) => {
        let result = finalResult[dietOption.name];
        answersResult.forEach((value : number, criteria: string) => {
            result = result + value * dietOption.dietValue[criteria];
        });
        finalResult[dietOption.name] = result;
    });
    */

    /*
function fillDietsData (diets: DietsData[]){
    const dietOptions = diets;
    // Fit Diet
    dietOptions[0].dietValue["amount"] = 5,
    dietOptions[0].dietValue["wellBeing"] = 7,
    dietOptions[0].dietValue["health"] = 8,
    dietOptions[0].dietValue["price"] = 7,
    dietOptions[0].dietValue["moreFat"] = 4,
    dietOptions[0].dietValue["buildingMuscleMass"] = 5
    // Keto Diet
    dietOptions[1].dietValue["amount"] = 4,
    dietOptions[1].dietValue["wellBeing"] = 9,
    dietOptions[1].dietValue["health"] = 4,
    dietOptions[1].dietValue["price"] = 2,
    dietOptions[1].dietValue["moreFat"] = 9,
    dietOptions[1].dietValue["buildingMuscleMass"] = 7,
    // Mediterranean Diet
    dietOptions[2].dietValue["amount"] = 5,
    dietOptions[2].dietValue["wellBeing"] = 7,
    dietOptions[2].dietValue["health"] = 9,
    dietOptions[2].dietValue["price"] = 5,
    dietOptions[2].dietValue["moreFat"] = 4,
    dietOptions[2].dietValue["buildingMuscleMass"] = 6,
    // Low-carb Diet
    dietOptions[3].dietValue["amount"] = 5,
    dietOptions[3].dietValue["wellBeing"] = 8,
    dietOptions[3].dietValue["health"] = 9,
    dietOptions[3].dietValue["price"] = 3,
    dietOptions[3].dietValue["moreFat"] = 8,
    dietOptions[3].dietValue["buildingMuscleMass"] = 6
    // High Protein Diet
    dietOptions[4].dietValue["amount"] = 8,
    dietOptions[4].dietValue["wellBeing"] = 5,
    dietOptions[4].dietValue["health"] = 5,
    dietOptions[4].dietValue["price"] = 4,
    dietOptions[4].dietValue["moreFat"] = 6,
    dietOptions[4].dietValue["buildingMuscleMass"] = 9
    // Traditional Diet
    dietOptions[5].dietValue["amount"] = 7,
    dietOptions[5].dietValue["wellBeing"] = 6,
    dietOptions[5].dietValue["health"] = 5,
    dietOptions[5].dietValue["price"] = 6,
    dietOptions[5].dietValue["moreFat"] = 5,
    dietOptions[5].dietValue["buildingMuscleMass"] = 6

    return dietOptions;
};
*/