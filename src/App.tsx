import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Home from './components/Home';
import Edit from './components/Edit';
import { CustomersApi } from './api/CustomersApi';

export default function App() {
  const apiClient = new CustomersApi();

  function EditComp() {
    let { id } = useParams();
    return <Edit id={parseInt(id ?? '')} client={apiClient} />
  }

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home client={apiClient} />} />
          <Route path="/edit" element={<Edit client={apiClient} />} />
          <Route path="/edit/:id" Component={EditComp} />
        </Routes>
      </div>
    </Router>
  );
}
