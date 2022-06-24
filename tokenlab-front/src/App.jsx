import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Login } from './pages/login';
import { SignUp } from './pages/signUp';
import { Events } from './pages/events';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/cadastro' element={<SignUp/>}/>
        <Route path='/eventos' element={<Events/>}/>
      </Routes>
    </Router>
  );
}

export default App;
