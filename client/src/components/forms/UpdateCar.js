import { useEffect, useState } from 'react'
import { Button, Form, Input, Select } from 'antd'
import { useMutation, useQuery } from '@apollo/client'
import { GET_CARS_BY_PERSONID, GET_PEOPLES, UPDATE_CAR } from '../../graphql/queries'

const UpdateCar = props => {
  const { Option } = Select;
  const styles = getStyles()
  const { data: peopleData } = useQuery(GET_PEOPLES);


  const [people, setPeople] = useState([]);
  const {
    id,
    year,
    make,
    model,
    price,
    personId
  } = props
  const [form] = Form.useForm()
  const [selectedPersonId, setSelectedPersonId] = useState(personId);

  const [, forceUpdate] = useState()

  const [updateCar] = useMutation(UPDATE_CAR, {
    refetchQueries: [
      { query: GET_CARS_BY_PERSONID, variables: { personId: selectedPersonId } },
      { query: GET_CARS_BY_PERSONID, variables: { personId } }
    ],
    onCompleted: () => {
      setSelectedPersonId(personId);
    }
  });
  const { data } = useQuery(GET_PEOPLES);

  useEffect(() => {
    if (peopleData && peopleData.people) {
      form.setFieldsValue({
        year,
        make,
        model,
        price,
        personId: selectedPersonId
      });
    }
  }, [peopleData, selectedPersonId]);

  const handleChange = value => {
    setSelectedPersonId(value);
  };

  const onFinish = values => {
    const {
      year,
      make,
      model,
      price,
    } = values

    updateCar({
      variables: {
        id,
        year: parseInt(year),
        make,
        model,
        price: parseFloat(price),
        personId: selectedPersonId
      }
    })
    props.onButtonClick()
  }

  useEffect(() => {
    forceUpdate()
  }, [])

  return (
    <Form
      name='update-car-form'
      layout='inline'
      style={styles.form}
      onFinish={onFinish}
      initialValues={{
        year,
        make,
        model,
        price,
        personId
      }}
    >
      <Form.Item
        label='Year:'
        name='year'
        rules={[{ required: true, message: 'Please enter year' }]}
      >
        <Input placeholder='Year' />
      </Form.Item>
      <Form.Item
        label='Make:'
        name='make' rules={[{ required: true, message: 'Please enter make' }]}>
        <Input placeholder='Make' />
      </Form.Item>
      <Form.Item
        label='Model:'
        name='model' rules={[{ required: true, message: 'Please enter model' }]}>
        <Input placeholder='Model' />
      </Form.Item>
      <Form.Item
        label='Price:'
        name='price' rules={[{ required: true, message: 'Please enter price' }]}>
        <Input placeholder='$' />
      </Form.Item>
      <Form.Item
        name='personId'
        rules={[{ required: true, message: 'Please select a person' }]}
      >
        <Select
          placeholder='Select a person'
          onChange={handleChange}
          allowClear
        >
          {peopleData && peopleData.people && peopleData.people.map(person => (
            <Option key={person.id} value={person.id}>
              {person.firstName} {person.lastName}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Button htmlType='submit'>
        Update Car
      </Button>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form >
  )
}

const getStyles = () => ({
  form: {
    justifyContent: 'center'
  }
})

export default UpdateCar