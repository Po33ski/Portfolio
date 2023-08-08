import React, {useState, useContext, useEffect, useMemo} from 'react';
import { useForm } from "react-hook-form";
import { checkAnswers, calculateAHP } from '../../features/checkAnswers';
import { findDiet } from '../../features/calculateDietWeight';
import './CreateDietPage.css';
import { AppContext, IDietsResultsData, appContextType } from '../../App';
import { useNavigate } from 'react-router-dom';

export interface IDietCriteriaData {
  amount: number,
  wellBeing: number,
  health: number,
  price: number,
  moreFat: number,
  buildingMuscleMass: number,
};

// I used this component to set together other components, which create the whole Create Diet page
export const CreateDietPage: React.FC = () => {
 const bmrContext = useContext<appContextType | null>(AppContext);
 const [isSub, setIsSubmitted] = useState<boolean | null>(false);
 const [isCorrect, setIsCorrect] = useState<boolean | null>(false);
 const [valueAhp, setAhp] = useState<Record<string, number> >({'' : 0});
 const [answers, setAnswers] = useState<IDietCriteriaData | null >({
  amount: 0,
  wellBeing: 0,
  health: 0,
  price: 0,
  moreFat: 0,
  buildingMuscleMass: 0,
 });
 
 const getTheBestDiet = useMemo<IDietsResultsData[]>(() => 
   findDiet(valueAhp),  
  [valueAhp]
 );

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IDietCriteriaData>();
  
  const onCreateCriteria = (data: IDietCriteriaData) => {
    
    if(checkAnswers(data)){
      setAhp(calculateAHP(data));
      setAnswers(data);
      setIsCorrect(true);
      console.log(answers); // is not necessary
    }
    else{
      data.amount = 0;
      data.wellBeing = 0;
      data.health = 0;
      data.price = 0;
      data.moreFat = 0;
      data.buildingMuscleMass = 0;
      
      setIsCorrect(false);
    };
    
  };
  
  useEffect(() => {
    document.addEventListener("submit", () => {
      bmrContext?.handleResultDiets(getTheBestDiet);
    });
  },[valueAhp]);

  const showDiets = () => {
    return (
      <div>
        <div> {bmrContext?.ResultDiets[0]?.name} </div>
        <div>{bmrContext?.ResultDiets[1]?.name} </div>
      </div>
    )
  };
/*
const showDiets = (answers : IDietCriteriaData) => {
  setAhp(calculateAHP(answers));
  bmrContext?.handleResultDiets(getTheBestDiet);
  return (
    <div>
      <div> {bmrContext?.ResultDiets[0]?.name} </div>
      <div>{bmrContext?.ResultDiets[1]?.name} </div>
    </div>
  )
};*/

  const navigate = useNavigate();
  const NavigateToShowDiet = () => {
    console.log(valueAhp);
    console.log(getTheBestDiet);
    navigate("/show-diet"); // redirection to the crate diet page 
  };
  const NavigateToCreateTarget = () => {
    navigate("/create-target"); // redirection to the create diet page 
  };


  return (
    <div className='create-diet-container'>
      <form className="formCreateDiet" onSubmit={handleSubmit(onCreateCriteria)}>
        <header>
          <h1>Create Diet</h1>
        </header>
        <div className="create-diet-container-form">
          <h4>The amount of food</h4>
            <select {...register("amount", { required: true })}>
              <option value="1">Completely Irrelevant</option>
              <option value="3">Very Little Important</option>
              <option value="5">Little Important</option>
              <option value="7">Important </option>
              <option value="9">Very Important</option>
            </select>
            {errors.amount && (
              <p style={{ color: "red" }}>Please select one of the option</p>
            )}
            <h4>Your well-being</h4>
            <select {...register("wellBeing", { required: true })}>
              <option value="1">Completely Irrelevant</option>
              <option value="3">Very Little Important</option>
              <option value="5">Little Important</option>
              <option value="7">Important </option>
              <option value="9">Very Important</option>
            </select>
            {errors.wellBeing && (
              <p style={{ color: "red" }}>Please select one of the option</p>
            )}
            <h4>Your health</h4>
            <select {...register("health", { required: true })}>
              <option value="1">Completely Irrelevant</option>
              <option value="3">Very Little Important</option>
              <option value="5">Little Important</option>
              <option value="7">Important </option>
              <option value="9">Very Important</option>
            </select>
            {errors.health && (
              <p style={{ color: "red" }}>Please select one of the option</p>
            )}
            <h4>Price of food</h4>
            <select {...register("price", { required: true })}>
              <option value="1">Completely Irrelevant</option>
              <option value="3">Very Little Important</option>
              <option value="5">Little Important</option>
              <option value="7">Important </option>
              <option value="9">Very Important</option>
            </select>
            {errors.price && (
              <p style={{ color: "red" }}>Please select one of the option</p>
            )}
            <h4>The amount of Fat</h4>
            <select {...register("moreFat", { required: true })}>
              <option value="1">Completely Irrelevant</option>
              <option value="2">Very Little Important</option>
              <option value="5">Little Important</option>
              <option value="7">Important </option>
              <option value="9">Very Important</option>
            </select>
            {errors.moreFat && (
              <p style={{ color: "red" }}>Please select one of the option</p>
            )}
            <h4>Muscle Mass Building</h4>
            <select {...register("buildingMuscleMass", { required: true })}>
              <option value="1">Completely Irrelevant</option>
              <option value="3">Very Little Important</option>
              <option value="5">Little Important</option>
              <option value="7">Important </option>
              <option value="9">Very Important</option>
            </select>
            {errors.buildingMuscleMass && (
              <p style={{ color: "red" }}>Please select one of the option</p>
            )}
             <div>
              <input
                type="submit" 
                value="Calculate Diet"
                className="submitForm"
                onClick={() => { setIsSubmitted(true)
                }}
            />
            </div>
            <div>
              <input
                type="button"
                onClick={() => { reset();
                }}
                value="Clear"
                className="buttonForm"
              />
            </div>
        </div>
      </form>
      <div className='create-diet-result'>
      <div>
          {isCorrect ? (
                <div>
                  Your answers are ok 
                </div>
              ) : (
                <div>
                  We can not find diet for you.
                  Please Change your answers.
                </div>
              )}
            </div>
              {isCorrect && (
              <div>
                <h4> The best diets for you: </h4>
                <div>
                   { showDiets() }
                </div>
              </div>
              )}
          <div>
          {isSub && isCorrect && (
              <div>
              <input
                type="button"
                onClick={() => {                  
                  NavigateToShowDiet();
                  }}
                value="Next"
                className="buttonForm"
              />
          </div>
          )}        
        </div>
        <div>
            <input
              type="button"
              onClick={() => {                  
                NavigateToCreateTarget();
              }}
              value="Back to select your Target"
              className="buttonForm"
            />
        </div>
      </div>
    </div>
  );
};



