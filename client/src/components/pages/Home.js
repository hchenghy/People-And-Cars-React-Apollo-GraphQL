
import AddPerson from '../forms/AddPeople';
import Subtitle from '../layout/Subtitle';
import AddCar from '../forms/AddCar';
import People from '../lists/People'
import Title from '../layout/Title';
import { getStyle } from 'antd/es/checkbox/style';

const HomePage = () => {
  const styles = getStyles();
  return (
    <div className="App" style={styles.container}>
      <Title />
      <Subtitle subtitle="Add Person" />
      <AddPerson />
      <Subtitle subtitle="Add Car" />
      <AddCar />
      <Subtitle subtitle="Records" />
      <People />
    </div>
  )
}

const getStyles = () => ({
  container: {
    padding: '3%'
  }

})

export default HomePage;
