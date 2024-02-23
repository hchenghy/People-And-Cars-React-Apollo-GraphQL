import { EditOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import RemoveCar from '../forms/RemoveCar'
import UpdateCar from '../forms/UpdateCar'
import { useState } from 'react'


const CarCard = ({ car }) => {
    const styles = getStyles()
    const [editMode, setEditMode] = useState(false)

    const { id, year, make, model, price, personId, setIsRefresh } = car

    const handleButtonClick = () => {
        setEditMode(!editMode)
    }

    const formatCurrency = (value) => {
        return `$ ${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    };

    return (
        <div>
            {editMode ? (
                <UpdateCar
                    id={id}
                    year={year}
                    make={make}
                    model={model}
                    price={price}
                    onButtonClick={handleButtonClick}
                    personId={personId}
                />
            ) : (
                <Card
                    style={styles.card}
                    actions={[
                        <EditOutlined key='edit' onClick={handleButtonClick} />,
                        <RemoveCar id={id} />

                    ]}
                >
                    {year} {make} {model} - &gt; {formatCurrency(price)}
                </Card>
            )}
        </div>
    )
}

const getStyles = () => ({
    card: {
        textAlign: 'left',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: "0",
        marginBottom: "10px",
    }
})

export default CarCard