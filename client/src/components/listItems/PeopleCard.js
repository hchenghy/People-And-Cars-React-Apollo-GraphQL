import { useState } from 'react'
import { Card } from 'antd'
import { REMOVE_PEOPLE } from '../../graphql/queries'
import { EditOutlined } from '@ant-design/icons'
import UpdatePeople from '../forms/UpdatePeople'
import RemovePeople from '../forms/RemovePeople'

const PeopleCard = props => {

  const [editMode, setEditMode] = useState(false)
  const styles = getStyles()
  const { id, firstName, lastName } = props

  const handleButtonClick = () => {
    setEditMode(!editMode)
  }

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
            <RemovePeople id={id} />
          ]}
        >
          {firstName} {lastName}
        </Card>
      )}
    </div>
  )
}

const getStyles = () => ({
  card: {
    width: '500px',
    // display: 'flex',
    // justifyContent: 'center'
  }
})

export default PeopleCard