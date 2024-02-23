import React, { useState } from 'react';
import { Card, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { GET_CARS_BY_PERSONID } from '../../graphql/queries';
import UpdatePeople from '../forms/UpdatePeople';
import RemovePeople from '../forms/RemovePeople';
import CarCard from './CarCard';
import { useNavigate } from 'react-router-dom';

const PeopleCard = ({ id, firstName, lastName }) => {
  const [editMode, setEditMode] = useState(false);
  const [showAllCars, setShowAllCars] = useState(false);
  const styles = getStyles();
  const navigate = useNavigate()

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  // Fetch cars data for the specific person
  const { loading, error, data } = useQuery(GET_CARS_BY_PERSONID, {
    variables: { personId: id },
  });

  if (loading) return 'Loading...';
  if (error) return `Error: ${error.message}`;

  const cars = data && data.getCarsByPersonId;
  const displayCars = showAllCars ? cars : cars.slice(0, 3);

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
            <RemovePeople id={id} />,
          ]}
        >
          <div>
            <p>{firstName} {lastName}</p>
            {displayCars && (
              <div>
                {displayCars.map(car => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            )}
            {cars.length > 3 && (
              <a onClick={() => navigate(`/people/${id}`)}>
                Learn More
              </a>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

const getStyles = () => ({
  card: {
    width: '100%',
    borderRadius: '0px',
    textAlign: 'left'
  },
});

export default PeopleCard;
