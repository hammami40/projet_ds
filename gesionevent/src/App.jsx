import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Editevent from "./component/Editevent"; 
import Insertevent from "./component/Insertevent"; 
import Listevent from "./component/Listevent";
import  Viewevent  from "./component/Viewevent"; 
import Menu from "./component/Menu";
const App=() =>{
 return ( 
 <div>
  <Router>
  <Menu/>
     <Routes> 
      <Route path="/events" element={<Listevent/>}/> 
      <Route path="/event/add" element={<Insertevent/>}/>
     <Route path="/event/edit/:id" element={<Editevent/>}/> 
     <Route path="/event/view/:id" element={<Viewevent/>}/> 
     </Routes> 
     </Router> 
     </div> 
     );
     } 
     export default App;