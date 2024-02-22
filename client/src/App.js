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

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Title />
        <Subtitle subtitle="Add Person" />
        <AddPerson />
        <Subtitle subtitle="Add Car" />
        <AddCar />
        <Subtitle subtitle="Record" />
        <People />
        <CarsOwnedByPeople />

      </div>
    </ApolloProvider>
  );
}

export default App;
