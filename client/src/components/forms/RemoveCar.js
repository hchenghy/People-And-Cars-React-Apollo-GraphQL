import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { REMOVE_CAR, GET_CARS_BY_PERSONID } from "../../graphql/queries";

const RemoveCar = ({ id }) => {

  const [removeCar] = useMutation(REMOVE_CAR, {
    update(cache, { data: { removeCar } }) {
      console.log(removeCar)
      try {
        const originalData = cache.readQuery({ query: GET_CARS_BY_PERSONID, variables: { personId: removeCar.personId } });
        console.log(originalData)
        if (!originalData) return;

        const updatedCars = originalData.getCarsByPersonId.filter(car => car.id !== removeCar.id);
        console.log(updatedCars)
        cache.writeQuery({
          query: GET_CARS_BY_PERSONID,
          variables: { personId: removeCar.personId },
          data: { getCarsByPersonId: updatedCars },
        });
      } catch (error) {
        console.error('Error updating cache:', error);
      }
    },
  });

  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this car?');
    if (confirmDelete) {
      removeCar({ variables: { id } });
    }
  };

  return (
    <DeleteOutlined
      key='delete'
      style={{ color: 'red' }}
      onClick={handleDelete}
    />
  );
};

export default RemoveCar;