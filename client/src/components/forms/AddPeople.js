import { useState, useEffect } from "react"
import { Form, Input, Button } from 'antd';
import { ADD_PEOPLE, GET_PEOPLES } from "../../graphql/queries";
import { v4 as uuidv4 } from 'uuid'
import { useMutation } from '@apollo/client'


const AddPeople = () => {
    const styles = getStyles()
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    const [addPeople] = useMutation(ADD_PEOPLE)

    useEffect(() => {
        forceUpdate({})
    }, [])

    const onFinish = values => {
        const { firstName, lastName } = values
        const id = uuidv4();

        addPeople({
            variables: {
                id,
                firstName,
                lastName
            },
            update: (cache, { data: { addPeople } }) => {
                const data = cache.readQuery({ query: GET_PEOPLES });
                if (data && data.people) {
                    cache.writeQuery({
                        query: GET_PEOPLES,
                        data: {
                            ...data,
                            people: [...data.people, addPeople]
                        }
                    });
                }
                form.resetFields()
            }
        });

    }


    return (
        <Form
            style={styles.form}
            name='add-people-form'
            layout='inline'
            size='large'
            form={form}
            onFinish={onFinish}
        >
            <Form.Item
                label='First Name:'
                name='firstName'
                rules={[{ required: true, message: 'Please enter a first name' }]}
            >
                <Input placeholder='First Name' />
            </Form.Item>
            <Form.Item
                label='Last Name:'
                name='lastName' rules={[{ required: true, message: 'Please enter a last name' }]}>
                <Input placeholder='Last Name' />
            </Form.Item>
            <Form.Item shouldUpdate={true}>
                {() => (
                    <Button
                        type='primary'
                        htmlType='submit'
                        disabled={
                            !form.isFieldsTouched(true) ||
                            form.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                    >
                        Add People
                    </Button>
                )}
            </Form.Item>
        </Form>
    )
}

const getStyles = () => ({
    form: {
        marginBottom: '40px',
        justifyContent: 'center'
    }
})

export default AddPeople