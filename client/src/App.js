import logo from './logo.svg';
import './App.css';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import Title from './components/layout/Title';
import AddPerson from './components/forms/AddPeople';
import PeopleCard from './components/listItems/PeopleCard';
import Subtitle from './components/layout/Subtitle';
import AddCar from './components/forms/AddCar';
import People from './components/lists/People'
import UpdatePeople from './components/forms/UpdatePeople';
import CarsOwnedByPeople from './components/lists/CarsOwnedByPeople';
import HomePage from './components/pages/Home';
import PeoplePage from './components/pages/PeoplePage';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/people/:id" element={<PeoplePage />} />
      </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
