
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Successful from './components/Successful';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Analysis from './components/Analysis';
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/successful' element={<Successful />}></Route>
        <Route path='/submissions' element={<Analysis />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
