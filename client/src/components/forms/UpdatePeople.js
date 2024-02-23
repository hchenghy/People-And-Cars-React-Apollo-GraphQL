import { useEffect, useState } from 'react'
import { Button, Form, Input } from 'antd'
import { useMutation } from '@apollo/client'
import { UPDATE_PEOPLE } from '../../graphql/queries'

const UpdatePeople = props => {
  const styles = getStyles()
  const { id, firstName, lastName } = props
  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  const [updatePeople] = useMutation(UPDATE_PEOPLE)

  const onFinish = values => {
    const { firstName, lastName } = values

    updatePeople({
      variables: {
        id,
        firstName,
        lastName
      }
    })
    console.log('onButtonClick called');
    props.onButtonClick()
  }

  useEffect(() => {
    forceUpdate()
  }, [])

  return (
    <Form
      name='update-people-form'
      layout='inline'
      style={styles.form}
      form={form}
      onFinish={onFinish}
      initialValues={{
        firstName,
        lastName
      }}
    >
      <Form.Item
        name='firstName'
        rules={[{ required: true, message: 'Please enter a first name' }]}
      >
        <Input placeholder='i.e. John' />
      </Form.Item>
      <Form.Item name='lastName' rules={[{ required: true, message: 'Please enter a last name' }]}>
        <Input placeholder='i.e. Smith' />
      </Form.Item>
      <Button htmlType='submit'>Update</Button>

      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  )
}

const getStyles = () => ({
  form: {
    justifyContent: 'center'
  }
})

export default UpdatePeople