import { useEffect, useState } from 'react'
import { Button, Form, Input } from 'antd'
import { useMutation } from '@apollo/client'
import { UPDATE_CAR } from '../../graphql/queries'

const UpdateCar = props => {
  const styles = getStyles()
  const { id,
    year,
    make,
    model,
    price,
    personId
  } = props
  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  const [updateCar] = useMutation(UPDATE_CAR)

  const onFinish = values => {
    const {
      year,
      make,
      model,
      price,
      personId
    } = values

    updateCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
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
      form={form}
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
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            form={form}
            type='primary'
            htmlType='submit'
            disabled={
              (!form.isFieldTouched('firstName') && !form.isFieldTouched('lastName')) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Car
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  )
}

const getStyles = () => ({
  form: {
    justifyContent: 'center'
  }
})

export default UpdateCar