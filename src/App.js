import Login from "./Components/Login";
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import RootLayout from './Components/RootLayout.js'
import Dashboard from "./Components/Dashboard";
import Error from './Components/Error.js'
const router = createBrowserRouter([
  {path:'/',element:<RootLayout/>,children:[
    {path:'/login',element :<Login/>},
    {path:'/dashboard',element :<Dashboard/>},
    {path:'/error',element :<Error/>},
  ]}
])

function App() {

  return <RouterProvider router={router}/>
}
export default App;
// so created the dashboard will show nothing in the sideBar first
// when clicked on the options things will be shown in the side bar

// 