import { useState} from 'react';
import Header from './components/Header';
import ToDoPage from './components/ToDoPage';
import './App.css';
import { TaskProvider } from './context/taskContext';
import Footer from './components/Footer';

function App() {
  const [theme, setTheme] = useState('light');
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };
  return (
    <div className={`App ${theme === 'dark' ? 'dark' : ''}`}>
    <TaskProvider>
      <header>  
        <Header  handleThemeChange={handleThemeChange} theme={theme}/>  
      </header>
      <ToDoPage theme={theme}/>
      </TaskProvider>
      <Footer />
    </div>
  );
}

export default App;
