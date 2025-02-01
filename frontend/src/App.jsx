import react from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import {SignUp} from "./pages/SignUp";
import {SignIn} from "./pages/SignIn";
import {Dashboard} from "./pages/Dashboard";
import {SendMoney} from "./pages/SendMoney";
import {Home} from "./pages/Home"
function App() {

  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/" element={<SignUp/>}/>
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/send" element={<SendMoney/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
