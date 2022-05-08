import React from 'react';
import loadable from '@loadable/component';
import { Route, Routes } from 'react-router-dom';

const LogIn = loadable(() => import('@pages/LogIn'));
const SignUp = loadable(() => import('@pages/SignUp'));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/login" element={<SignUp />} />
    </Routes>
  );
};

export default App;
