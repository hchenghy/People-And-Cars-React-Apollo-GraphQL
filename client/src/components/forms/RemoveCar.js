import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { GET_CARS, REMOVE_CAR, GET_CARS_BY_PERSONID } from "../../graphql/queries";
import filter from "lodash.filter";

const RemoveCar = ({ id }) => {
  const [removeCar] = useMutation(REMOVE_CAR, {
    update(cache, { data: { removeCar } }) {
      const { car } = cache.readQuery({ query: GET_CARS });
      const filteredCar = filter(car, car => car.id !== id);
      cache.writeQuery({
        query: GET_CARS,
        data: { car: filteredCar },
      });
    },
  });

  const handleButtonClick = () => {
    let result = window.confirm("Are you sure you want to delete this car?");

    if (result) {
      removeCar({
        variables: {
          id,
        },
      });
    }
  };

  return (
    <DeleteOutlined
      key="delete"
      style={{ color: "red" }}
      onClick={handleButtonClick}
    />
  );
};

export default RemoveCar;
