import '@xyflow/react/dist/style.css';
import { BrowserRouter , Routes , Route } from "react-router-dom";
import { CreateWorkflow } from './components/CreateWorkflow';

export function App() {
  return <div>
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<CreateWorkflow />} />
      </Routes>
    </BrowserRouter>
  </div>
}