import './App.css'
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import NavBar from "./components/NavBar";
import { useSelector } from 'react-redux';
import LoadingScreen from './components/LoadingScreen';
import Purchases from './pages/Purchases';
import ProtectedRoutes from "./components/ProtectedRoutes";
import { Container } from 'react-bootstrap';

function App() {

const isLoading = useSelector(state => state.isLoading)

  return (
    <HashRouter>
      <NavBar />
      {isLoading && <LoadingScreen/>}
      <Container className='my-5'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoutes/>}>
            <Route path="/purchases" element={<Purchases />} />
          </Route>
        </Routes>
      </Container>
    </HashRouter>
  );
}

export default App;
