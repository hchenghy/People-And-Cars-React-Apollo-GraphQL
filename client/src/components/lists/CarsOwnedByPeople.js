import { List } from "antd"
import { GET_CARS_BY_PERSONID } from "../../graphql/queries"
import { useQuery } from "@apollo/client"
import CarCard from "../listItems/CarCard"
import { useEffect, useState } from "react";

const CarsOwnedByPeople = ({ personId }) => {
    const styles = getStyles()

    const { loading, error, data } = useQuery(GET_CARS_BY_PERSONID, {
        variables: { personId },
    });

    if (loading) return 'Data loading...'
    if (error) return `Error: ${error.message}`

    if (!data || !data.cars || data.cars.length === 0) {
        return <div>No cars found for this person.</div>;
    }


    return (
        <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
            {data.cars.map(({ id, make, model, year, price }) => (
                <List.Item key={id}>
                    <CarCard id={id} make={make} model={model} year={year} price={price} />
                </List.Item>
            ))}
        </List>
    )
}

const getStyles = () => ({
    list: {
        display: 'flex',
        justifyContent: 'center'
    }
})

export default CarsOwnedByPeople
