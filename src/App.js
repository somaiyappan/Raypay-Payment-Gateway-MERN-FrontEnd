import { BrowserRouter,Routes,Route } from "react-router-dom";
import Details from "./components/Details";


function App() {
 return(
   <BrowserRouter>
   <Routes>
     <Route exact path="/" element={<Details/>} ></Route>
   
   </Routes>
   </BrowserRouter>
 )
}

export default App;
