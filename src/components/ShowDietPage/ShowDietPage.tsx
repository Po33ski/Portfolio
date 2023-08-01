import {useState, useContext} from 'react';
import './ShowDietPage.css';
import { AppContext, appContextType } from '../../App';
import { useNavigate } from 'react-router-dom';

export interface IDietOption {
    name: string;
    carbohydrates: number;
    proteins: number;
    fats: number;
};

// This component shows every type of diet using list
export const ShowDietPage: React.FC = () => {
    const [selectedDiets, setSelectedDiets] = useState<string[]>([]);
    const bmrContext = useContext<appContextType | null>(AppContext);
    const bmr = () : number => bmrContext !== null ? bmrContext.CalculateCaloriesData.bmr : 0;

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
      const navigate = useNavigate();
      const NavigateToCreateDiet = () => {
        navigate("/create-diet"); // redirection to the crate diet page 
    };

    const ShowIncredients = (dietOptions : IDietOption[], dietName : any ) => {
      return (dietOptions.filter((data : IDietOption) => data.name === dietName)
      .map(
        (dietOption, index) => (
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
    )))
  };


  return (
    <div>
      <div>
          <div className="show-diet-container">
            <header>
              <h3>Choose your diet</h3>
            </header>
            
            <h4>If you want to achieve your gol, you have to eat daily: {bmr()} kcal</h4>
            <h4>The best diet for you is: {bmrContext?.ResultDiets[0]?.name}</h4>
            <div>
            {ShowIncredients(dietOptions, bmrContext?.ResultDiets[0]?.name)}
            </div>
            <h4>The alternative for you is: {bmrContext?.ResultDiets[1]?.name}</h4>
            <div>
            {ShowIncredients(dietOptions, bmrContext?.ResultDiets[1]?.name)}
            </div>
          </div>
      </div>
      <div>
            <input
              type="button"
              onClick={() => {                  
                NavigateToCreateDiet();
              }}
              value="Back to create target"
              className="buttonForm"
            />
        </div>
    </div>
    );
};

