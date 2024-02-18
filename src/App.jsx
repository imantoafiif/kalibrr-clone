import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Main from "./components/Main/Main"
import Login from "./components/Login/Login"

const router = createBrowserRouter([
    { path: '/', element: <Main/> },
    { path: '/login', element: <Login/> },

])

const App = () => {
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    )
}

export default App