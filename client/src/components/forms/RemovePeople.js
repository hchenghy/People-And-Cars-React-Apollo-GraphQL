import { DeleteOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { GET_PEOPLES, REMOVE_PEOPLE } from '../../graphql/queries';
import filter from 'lodash.filter';

const RemovePeople = ({ id }) => {
    const [removePeople] = useMutation(REMOVE_PEOPLE, {
        update(cache, { data: { removePeople } }) {
            const { people } = cache.readQuery({ query: GET_PEOPLES });
            const filteredPeople = filter(people, people => people.id !== id);
            cache.writeQuery({
                query: GET_PEOPLES,
                data: { people: filteredPeople },
            });
        },
    });

    const handleButtonClick = () => {
        let result = window.confirm('Are you sure you want to delete this?');
        if (result) {
            removePeople({
                variables: { id },
            });
        }
    };

    return <DeleteOutlined key='delete' style={{ color: 'red' }} onClick={handleButtonClick} />;
};

export default RemovePeople;
