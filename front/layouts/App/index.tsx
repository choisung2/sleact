import React from 'react';
import loadable from '@loadable/component';
import { Route, Routes, Navigate } from 'react-router-dom';

const LogIn = loadable(() => import('@pages/LogIn'));
const SignUp = loadable(() => import('@pages/SignUp'));
const Workspace = loadable(() => import('@layouts/Workspace'));
const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/workspace/:workspace" element={<Workspace />} />
      <Route path="/workspace/:workspace/channel/:channel" element={<Channel />} />
      <Route path="/workspace/:workspace/dm/:id" element={<DirectMessage />} />
      <Route path="/redirect" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
