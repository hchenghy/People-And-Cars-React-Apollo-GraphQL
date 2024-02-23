import { useParams } from 'react-router-dom'
import { List } from "antd"
import { GET_CARS_BY_PERSONID } from "../../graphql/queries"
import { useQuery } from "@apollo/client"
import CarCard from "../listItems/CarCard"

const PeoplePage = () => {
    const personId = useParams()
    console.log(personId)
    const styles = getStyles()

    const { loading, error, data } = useQuery(GET_CARS_BY_PERSONID, {
        variables: { personId: personId.personId },
    });

    if (loading) return 'Data loading...'
    if (error) return `Error: ${error.message}`

    if (!data || !data.cars || data.cars.length === 0) {
        return <div>No cars found for this person.</div>;
    }

    return (
        <div>
            <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
                {data.cars.map(({ id, make, model, year, price }) => (
                    <List.Item key={id}>
                        <CarCard id={id} make={make} model={model} year={year} price={price} />
                    </List.Item>
                ))}
            </List>
        </div>
    );
}

const getStyles = () => ({
    list: {
        display: 'flex',
        justifyContent: 'center'
    }
})

export default PeoplePage;
