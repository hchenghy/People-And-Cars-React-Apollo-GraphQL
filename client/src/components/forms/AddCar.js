import { useState, useEffect } from "react";
import { Form, Input, Button, Select, InputNumber } from 'antd';
import { ADD_CAR, GET_PEOPLES, GET_CARS_BY_PERSONID } from "../../graphql/queries";
import { v4 as uuidv4 } from 'uuid';
import { useMutation, useQuery } from '@apollo/client';

const { Option } = Select;

const AddCar = () => {
    const styles = getStyles();
    const [form] = Form.useForm();
    const [, forceUpdate] = useState();
    const [people, setPeople] = useState([]);
    const [personId, setPersonId] = useState('');
    const [addCar] = useMutation(ADD_CAR);
    const { data } = useQuery(GET_PEOPLES);

    useEffect(() => {
        if (data && data.people) {
            setPeople(data.people);
        }
    }, [data]);

    const handleChange = value => {
        setPersonId(value);
    };

    const id = uuidv4();
    const onFinish = values => {
        addCar({
            variables: {
                id,
                make: values.make,
                model: values.model,
                year: parseInt(values.year),
                price: parseFloat(values.price),
                personId
            },
            refetchQueries: [{ query: GET_CARS_BY_PERSONID, variables: { personId } }]
        });
        form.resetFields();
    };

    if (!people || people.length === 0) {
        return "Please add people.";
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
                <Input placeholder='Year'  />
            </Form.Item>
            <Form.Item
                label='Make:'
                name='make' rules={[{ required: true, message: 'Please enter make' }]}>
                <Input placeholder='Make'  />
            </Form.Item>
            <Form.Item
                label='Model:'
                name='model' rules={[{ required: true, message: 'Please enter model' }]}>
                <Input placeholder='Model'  />
            </Form.Item>
            <Form.Item
                label='Price:'
                name='price' rules={[{ required: true, message: 'Please enter price' }]}>
                <InputNumber
                    placeholder='Price'
                    formatter={(value) =>
                        `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                    min={0}
                />
            </Form.Item>

            <Form.Item
                name='personId'
                rules={[{ required: true, message: 'Please select a person' }]}
            >
                <Select
                    placeholder='Select a person'
                    onChange={handleChange}
                    styles={{ borderRadius: '0 !important' }}
                >
                    {people.map(person => (
                        <Option key={person.id} value={person.id} >
                            {person.firstName} {person.lastName}
                        </Option>
                    ))}
                </Select>
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
    );
};

const getStyles = () => ({
    form: {
        paddingBottom: '40px',
        justifyContent: 'center',
    },

});

export default AddCar;
