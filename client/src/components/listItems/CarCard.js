import { EditOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import RemoveCar from '../forms/RemoveCar'
import UpdateCar from '../forms/UpdateCar'
import { useState } from 'react'


const CarCard = ({ props }) => {
    const styles = getStyles()
    const [editMode, setEditMode] = useState(false)

    const { id, make, model, year, price } = props

    const handleButtonClick = () => {
        setEditMode(!editMode)
    }

    return (
        <div>
            <Card
                style={styles.card}
                actions={[
                    <EditOutlined key='edit' onClick={handleButtonClick} />,
                    <RemoveCar id={id} />
                ]}
            >
                {make} {model} {year} {price}
            </Card>
        </div>
    )
}
const getStyles = () => ({
    card: {
        width: '500px'
    }
})

export default CarCard