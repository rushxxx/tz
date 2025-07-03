import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RequestsList from '../pages/RequestsList';
import RequestCreate from '../pages/RequestCreate';
import RequestDetail from '../pages/RequestDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/requests" element={<RequestsList />} />
        <Route path="/requests/new" element={<RequestCreate />} />
        <Route path="/requests/:id" element={<RequestDetail />} />
        <Route path="*" element={<Navigate to="/requests" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
