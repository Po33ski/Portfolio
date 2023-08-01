import React, {useState, useRef} from 'react';
import './MainPage.css';

// It's main page with description of me and short descripton of this project

const myCoverLetter : string = `I started programming at the Polytechnic. 
My first language was Python and C++. When I started learning C++ I discovered my passion to programming. 
I can program in C++, C#, Java Script, Type Script and I know the basics of SQL and Python. 
At the beginning programming in C++ turned out to be the most interesting for me.  
I have been learning this language for 2 years from books such as Opus Magnum C ++ by Jerzy Grebosz or The C ++ Programming Language by Bjarne Stroustrup and others. 
After a while I started to learn C # and I liked its full objectivity.
I learned C++ from online courses, however, it was the books and practice that gave me the most knowledge.
I have a good understanding of object oriented programming and memory management.
Currently, I am mainly interested in web programming and for a long time I have been learning React and developing my projects in it.
I also know other languages ​​needed in web programming, i.e. HTML and CSS.
I practice my algorithmic skills solving tasks on codewars.com, which is a form of entertainment for me. 
`;

const myProject : string = `This is calories calculator. Using it, you can calculate your caloric needs.
On the Show Diets page you will see what the proportions of nutritional values ​​should be depending on the diet.
After you calculate your BMR and choose your target, you will be redirected to the page, that shows the best diet for you.
If you are not logged in, you can only calculate your BMR. 
If you enter the name of some page that is not available without logging in in the address of the application, 
then the website will not be opened.
I will tell you more about this project during the job interview:)
I created this project using Type Script and React. 
`;

export const MainPage: React.FC = () => {
  const [opinion, setOpinion] = useState<string>("");

  return (
    <div className="main-page">
      <h1>About Me</h1>
      <div>
        {myCoverLetter}
      </div>
      <h1>About This Project</h1>
      <div>
        {myProject}
      </div>
      <h1>Share your opinion</h1>
      <p></p>
      <div>
        <input
          type="text"
          value={opinion}
          onChange={(e) => setOpinion(e.target.value)}
        />
      </div>
      <p></p>    
      <div>
        {opinion}
      </div>
    </div>
  );
}

