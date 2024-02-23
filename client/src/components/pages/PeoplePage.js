import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { List, Card } from "antd";
import { GET_PERSON_AND_CARS } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import Subtitle from '../layout/Subtitle';

const PeoplePage = () => {
    const { id: personId } = useParams();
    const styles = getStyles();

    const { loading, error, data, refetch } = useQuery(GET_PERSON_AND_CARS, {
        variables: { personId },
    });

    useEffect(() => {
        refetch(); 
    }, [refetch, personId]);

    if (loading) return 'Data loading...';
    if (error) return `Error: ${error.message}`;

    const { person } = data;
    const cars = person.cars;

    return (
        <div style={styles.container}>
            <Link to="/">Back To Home</Link>
            <Subtitle subtitle={`Cars owned by ${person.firstName} ${person.lastName}`} />
            <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
                {cars.map(car => (
                    <Card key={car.id} style={styles.card}>
                        <ul>
                            <li>
                                <strong>Model:</strong> {car.model}
                            </li>
                            <li>
                                <strong>Make:</strong> {car.make}
                            </li>
                            <li>
                                <strong>Year:</strong> {car.year}
                            </li>
                            <li>
                                <strong>Price:</strong> ${car.price}
                            </li>
                        </ul>
                    </Card>
                ))}
            </List>
        </div>
    );
}

const getStyles = () => ({
    container: {
        padding: '3%'
    },
    card: {
        borderRadius: '0',
        marginBottom: '10px'
    }
});

export default PeoplePage;
