import { useEffect, useState } from 'react'
import { Button, Form, Input, Select } from 'antd'
import { useMutation, useQuery } from '@apollo/client'
import { GET_PEOPLES, UPDATE_CAR } from '../../graphql/queries'

const UpdateCar = props => {
  const { Option } = Select;
  const styles = getStyles()
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
  const [, forceUpdate] = useState()

  const [updateCar] = useMutation(UPDATE_CAR)
  const { data } = useQuery(GET_PEOPLES);

  useEffect(() => {
    if (data && data.people) {
      setPeople(data.people);
    }
  }, [data]);

  const handleChange = value => {
    personId = value;
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
        personId
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
      <Form.Item>
        <Select
          placeholder='Select a person'
          onChange={handleChange}
          allowClear
          defaultValue={people.map(person=>(person))}
        >
          {people.map(person => (
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