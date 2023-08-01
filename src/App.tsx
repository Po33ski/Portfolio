import React, { useState, Suspense, createContext} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {MainPage} from './components/MainPage/MainPage';
import {CalculatorPage} from './components/CalculatorPage/CalculatorPage';
import {CreateTargetPage} from './components/TargetPage/TargetPage';
import {ShowDietPage } from './components/ShowDietPage/ShowDietPage';
import {ContactPage} from './components/ContactPage/ContactPage';
import {MyDietPage} from "./components/MyDietPage/MyDietPage";
import {Navbar} from './components/Navbar/Navbar';
import {Login} from "./components/Login/Login";
import {useAuthState} from 'react-firebase-hooks/auth'; 
import {auth} from "./config/firebase";
import './App.css';


const CreateDietPage : React.FC = React.lazy(async () => ({ 
  default: (await import('./components/CreateDietPage/CreateDietPage')).CreateDietPage }));

export interface IDietsResultsData {
  name : string,
  result : number,
};

export interface ICalculateCaloriesData {
  gender: string;
  age: number;
  weight: number;
  height: number;
  factorPAL: number;
  bmr: number
};

export type appContextType = {
  ResultDiets: IDietsResultsData[];
  CalculateCaloriesData: ICalculateCaloriesData;
  handleResultDiets : (rdData : IDietsResultsData[]) => void;
  handleCalculateCaloriesData : (calData : ICalculateCaloriesData) => void;
};

export const AppContext = createContext<appContextType | null>(null);

export const App: React.FC= () => {
  //It gives the information about  user
  const [user] = useAuthState(auth);
  const [ResultDiets, setResultDiets] = useState<IDietsResultsData[]>([{name : '', result : 0}]);

  const [CalculateCaloriesData, setCalculateCaloriesData] = useState<ICalculateCaloriesData>({
    gender: "Man",
    age: 18,
    weight: 80,
    height: 180,
    factorPAL: 1,
    bmr: 1000
  });
  
  const handleResultDiets = (resultDietsData : IDietsResultsData[]) => {
    const newResultDietsData : IDietsResultsData[] = [];
    resultDietsData.forEach((data : IDietsResultsData) => {
      newResultDietsData.push(data)
  });
    
    setResultDiets(newResultDietsData);
  };

  const handleCalculateCaloriesData = (calculateCaloriesData : ICalculateCaloriesData) => {
    const newCalculateCaloriesData : ICalculateCaloriesData = {
      gender: calculateCaloriesData.gender,
      age: calculateCaloriesData.age,
      weight: calculateCaloriesData.weight,
      height: calculateCaloriesData.height,
      factorPAL: calculateCaloriesData.factorPAL,
      bmr: calculateCaloriesData.bmr,
    };
    setCalculateCaloriesData(newCalculateCaloriesData);
  };

 // I add the properties bmr and handleBMR to 2 pages on the purpose to hanlde the same value (bmr) on the 2 pages.
  return (
    <Router>
    <div className="app">
      <Navbar/>
      <Suspense fallback={<h1>Loading...</h1>}>
        <AppContext.Provider value={{
          ResultDiets, 
          CalculateCaloriesData,  
          handleResultDiets, 
          handleCalculateCaloriesData
        }} 
          >
          {user ? (
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/calculator" element={<CalculatorPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/create-diet" element={<CreateDietPage  />} />
              <Route path="/create-target" element={<CreateTargetPage  />} />
              <Route path="/show-diet" element={<ShowDietPage  />} />
              <Route path="/my-diets" element={<MyDietPage />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/calculator" element={<CalculatorPage />} />
            </Routes>
          )}
        </AppContext.Provider>
      </Suspense>
    </div>
  </Router>
  );
};

export default App;

