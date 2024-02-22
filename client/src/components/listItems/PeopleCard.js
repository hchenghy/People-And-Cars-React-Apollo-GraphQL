import { useState } from 'react'
import { Card } from 'antd'
import { REMOVE_PEOPLE } from '../../graphql/queries'
import { EditOutlined } from '@ant-design/icons'
import UpdatePeople from '../forms/UpdatePeople'
import RemovePeople from '../forms/RemovePeople'
import { GET_CARS_BY_PERSONID } from '../../graphql/queries'
import { useQuery } from '@apollo/client';

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
            {cars.length > 0 && (
              <div>
                <p>Cars Owned:</p>
                <ul>
                  {cars.map(car => (
                    <li key={car.id}>
                      {car.year} {car.make} {car.model} - ${car.price}
                    </li>
                  ))}
                </ul>
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
    width: '500px',
    // display: 'flex',
    // justifyContent: 'center'
  }
})

export default PeopleCard
