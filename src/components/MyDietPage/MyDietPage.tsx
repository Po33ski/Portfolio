import {useState, useContext} from 'react';
import './MyDietPage.css';
import { AppContext, appContextType } from '../../App';
import {IDietOption} from "../ShowDietPage/ShowDietPage"




export const MyDietPage: React.FC = () => {
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);
  const bmrContext = useContext<appContextType | null>(AppContext);
  const bmr = () : number => bmrContext !== null ? bmrContext.CalculateCaloriesData.bmr : 1000;

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dietName = event.target.value;
    setSelectedDiets((prevSelectedDiets) => {
      if (prevSelectedDiets.includes(dietName)) {
        return prevSelectedDiets.filter((diet) => diet !== dietName);
      } else {
        return [...prevSelectedDiets, dietName];
      }
    });
  };

    // This is list with each kind of diet
    const dietOptions: IDietOption[] = [
        // diet options data...
        {
          name: 'Fit Diet',
          carbohydrates: Math.round(bmr() * 0.6),
          proteins: Math.round(bmr() * 0.35),
          fats: Math.round(bmr() * 0.15),
        },
        {
          name: 'Keto Diet',
          carbohydrates: Math.round(bmr() * 0.1),
          proteins: Math.round(bmr() * 0.3),
          fats: Math.round(bmr() * 0.6),
        },
        {
          name: 'Mediterranean Diet',
          carbohydrates: Math.round(bmr() * 0.6),
          proteins: Math.round(bmr() * 0.2),
          fats: Math.round(bmr() * 0.2),
        },
        {
          name: 'Low-carb Diet',
          carbohydrates: Math.round(bmr() * 0.2),
          proteins: Math.round(bmr() * 0.4),
          fats: Math.round(bmr() * 0.4),
        },
        {
          name: 'High Protein Diet',
          carbohydrates: Math.round(bmr() * 0.5),
          proteins: Math.round(bmr() * 0.4),
          fats: Math.round(bmr() * 0.1),
        },
        {
          name: 'Traditional Diet',
          carbohydrates: Math.round(bmr() * 0.6),
          proteins: Math.round(bmr() * 0.3),
          fats: Math.round(bmr() * 0.1),
        },  
    ];

  return (
    <div className="show-diet-container">
      <header>
        <h1>Show Diet</h1>
      </header>
          <fieldset>
            <legend>Show me diets</legend>
              {dietOptions.map((dietOption) => (
                <label key={dietOption.name}>
                    <input
                      type="checkbox"
                      name={dietOption.name}
                      value={dietOption.name}
                      checked={selectedDiets.includes(dietOption.name)}
                      onChange={handleCheckboxChange}
                    />
                    {dietOption.name}
                </label>
              ))}
          </fieldset>

        <h4>You should eat daily depending on your diet: </h4>
        {dietOptions
          .filter((dietOption) => selectedDiets.includes(dietOption.name))
          .map((dietOption, index) => (
              <div key={index} className="diet-option">
                <h3>{dietOption.name}</h3>
                <div className="diet-progress">
                <div
                className="diet-progress-bar carbohydrates-bar"
                style={{ width: `${(dietOption.carbohydrates / bmr()) * 100}%` }}
            >
            </div>
            <div
              className="diet-progress-bar proteins-bar"
              style={{ width: `${(dietOption.proteins / bmr()) * 100}%` }}
            ></div>
           <div
              className="diet-progress-bar fats-bar"
              style={{ width: `${(dietOption.fats / bmr()) * 100}%` }}
           ></div>
          </div>
            <ul className="calorie-info">
            <li>Carbohydrates: {dietOption.carbohydrates} calories</li>
            <li>Proteins: {dietOption.proteins} calories</li>
            <li>Fats: {dietOption.fats} calories</li>
            </ul>
          </div>
        ))} 
    </div>
  )
};

