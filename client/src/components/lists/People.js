import { useQuery } from '@apollo/client'
import { GET_PEOPLES } from './../../graphql/queries'
import { List } from 'antd'
import PeopleCard from '../listItems/PeopleCard'

const People = () => {
    const styles = getStyles()

    const { loading, error, data } = useQuery(GET_PEOPLES)

    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`

    if (!data || !data.people || data.people.length === 0) {
        return <div>No people found.</div>;
    }
    
    console.log('data', data)

    return (
        <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
            {data.people.map(({ id, firstName, lastName }) => (
                <List.Item key={id}>
                    <PeopleCard id={id} firstName={firstName} lastName={lastName} />
                </List.Item>
            ))}
        </List>
    )
}

const getStyles = () => ({
    list: {
        // display: 'flex',
        // justifyContent: 'center'
    }
})

export default People