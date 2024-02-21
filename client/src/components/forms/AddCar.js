import { useState, useEffect } from "react"
import { Form, Input, Button, Dropdown } from 'antd';
import { ADD_CAR, GET_CARS } from "../../graphql/queries";
import { v4 as uuidv4 } from 'uuid'
import { useMutation } from '@apollo/client'


const AddCar = () => {
    const styles = getStyles()
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    const [addCar] = useMutation(ADD_CAR)

    useEffect(() => {
        forceUpdate({})
    }, [])

    const onFinish = values => {
        const {
            year,
            make,
            model,
            price,
            personId
        } = values
        const id = uuidv4();

        addCar({
            variables: {
                id,
                year,
                make,
                model,
                price,
                personId
            },
            update: (cache, { data: { addCar } }) => {
                const data = cache.readQuery({ query: GET_CARS });
                if (data && data.car) {
                    cache.writeQuery({
                        query: GET_CARS,
                        data: {
                            ...data,
                            contacts: [...data.car, addCar]
                        }
                    });
                }
            }
        });

    }


    return (
        <Form
            style={styles.form}
            name='add-car-form'
            layout='inline'
            size='large'
            form={form}
            onFinish={onFinish}
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
                        type='primary'
                        htmlType='submit'
                        disabled={
                            !form.isFieldsTouched(true) ||
                            form.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                    >
                        Add Car
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

export default AddCar