import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

const domNode = document.getElementById('root');
const root = createRoot(domNode);


const App: React.FC = () => {
  console.log(`testing, 1, 2, 3, 4`);
  return (
    <>
      <div></div>
    </>
  )
    
    
}

root.render(<App />);