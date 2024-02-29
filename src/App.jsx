import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./components/Main/Main"
import Login from "./components/Login/Login"

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route exact path="/" element={<Main/>} />
                    <Route exact path="/login" element={<Login />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App