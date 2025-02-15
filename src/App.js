import React, { useState, useEffect } from 'react';
import 'moment/locale/ru';

import {
  signIn,
  signOut,
  updateProfile,
  createEvent,
  deleteEvent,
  editEvent,
  createService,
  editService,
  deleteService,
} from './provider/firebase';
import AppRouter from './AppRouter';
import { AuthContext } from './context/AuthContext';
import { DataContext } from './context/DataContext';

import useAuth from './hooks/useAuth';
import useData from './hooks/useData';

const App = () => {
  const { user, connectingToFirebase } = useAuth();
  const {
    events,
    services,
    config,
    communities,
    loadingEvents,
    loadingServices,
  } = useData();

  //
  // NOTE!
  // Этот стейт создан только для одного случая, когда пользователь меняет свое ФИО
  //
  // TODO: подумать, как можно спрятать эту логику
  //
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  const updateProfileHandler = async displayName => {
    const updatedUser = await updateProfile(displayName);
    setCurrentUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        signIn,
        signOut,
        updateProfile: updateProfileHandler,
        connectingToFirebase,
      }}
    >
      <DataContext.Provider
        value={{
          events,
          services,
          communities,
          createEvent,
          deleteEvent,
          editEvent,
          createService,
          editService,
          deleteService,
          config,
          loadingEvents,
          loadingServices,
        }}
      >
        <AppRouter />
      </DataContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
