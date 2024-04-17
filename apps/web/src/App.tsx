import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import CreateBlog from "./components/CreateBlog"


function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/create" element={<CreateBlog />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
