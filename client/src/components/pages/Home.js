
import AddPerson from '../forms/AddPeople';
import Subtitle from '../layout/Subtitle';
import AddCar from '../forms/AddCar';
import People from '../lists/People'
import Title from '../layout/Title';

const HomePage = () => {
    return (
        <div className="App">
            <Title />
            <Subtitle subtitle="Add Person" />
            <AddPerson />
            <Subtitle subtitle="Add Car" />
            <AddCar />
            <Subtitle subtitle="Record" />
            <People />

        </div>
    )
}


export default HomePage;
