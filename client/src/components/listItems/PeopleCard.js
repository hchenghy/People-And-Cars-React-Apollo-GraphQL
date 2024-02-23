import { useState } from 'react'
import { Card } from 'antd'
import { REMOVE_PEOPLE } from '../../graphql/queries'
import { EditOutlined } from '@ant-design/icons'
import UpdatePeople from '../forms/UpdatePeople'
import RemovePeople from '../forms/RemovePeople'
import { GET_CARS_BY_PERSONID } from '../../graphql/queries'
import { useQuery } from '@apollo/client';
import CarCard from './CarCard'

const PeopleCard = props => {
  const [editMode, setEditMode] = useState(false)
  const styles = getStyles()
  const { id, firstName, lastName } = props

  const handleButtonClick = () => {
    setEditMode(!editMode)
  }

  // Fetch cars data for the specific person
  const { loading, error, data } = useQuery(GET_CARS_BY_PERSONID, {
    variables: { personId: id },
  });

  if (loading) return 'Loading...';
  if (error) return `Error: ${error.message}`;

  const cars = data && data.getCarsByPersonId;
  console.log(cars)

  return (
    <div>
      {editMode ? (
        <UpdatePeople
          id={id}
          firstName={firstName}
          lastName={lastName}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          style={styles.card}
          actions={[
            <EditOutlined key='edit' onClick={handleButtonClick} />,
            <RemovePeople id={id} />
          ]}
        >
          <div>
            <p>{firstName} {lastName}</p>
            {cars && (
              <div>
                {cars.map(car => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}

const getStyles = () => ({
  card: {
    width: '100%',
    // display: 'flex',
    // justifyContent: 'center'
  }
})

export default PeopleCard
