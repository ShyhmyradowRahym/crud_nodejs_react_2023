import React, { useEffect, useState } from 'react'
import { Modal } from '@mantine/core';
import { TextInput, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import service from '../../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AdminsCreateModal = ({ opened, setOpened, forceUpdate }) => {
    const form = useForm({
        initialValues: {
            role: '',
            username: '',
            email: '',
            phone: '',
            // login: '',
            password: ''
        },

        validate: {
            role: (value) => (value.length < 2 ? "Role must have at least 2 letters" : null),
            username: (value) => (value.length < 2 ? "Userame must have at least 2 letters" : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            phone: (value) => (value.length < 8 ? "Phone must have at least 8 letters" : null),
            // login: (value) => (value.length < 3 ? "Login must have at least 3 letters" : null),
            password: (value) => (value.length < 4 ? "4-den kici we 8-den uly bolmaly dal" : null),
        },
    });
    const notify = (err) => {
        err.map(e => {
            toast.error(<p className='text-xs'>{e.message}</p>, {
                position: "top-right",
                autoClose: 5000,
            })
        })
    };
    const handleCreate = (value) => {
        service.post('/admin/create-operator', value).
            then(res => { if (res.status === 201) { setOpened(false); forceUpdate() } }).
            catch(err => {
                notify(err.response.data)
                // setError(err.response.data)
            })
    }
    return ( 
        <div className='w-full'>
            <ToastContainer />
            <Modal
                centered
                opened={opened}
                onClose={() => setOpened(false)}
                size={'md'}
            >
                <form onSubmit={form.onSubmit(value => handleCreate(value))}>
                    <div className='flex w-full'>
                        <TextInput
                            className='w-1/2'
                            required
                            label="Role"
                            placeholder="admin"
                            {...form.getInputProps('role')}
                        />
                        <TextInput
                            className='w-1/2 ml-2'
                            required
                            label="Username"
                            placeholder="Username"
                            {...form.getInputProps('username')}
                        />
                    </div>
                    <div className='flex my-5 w-full'>
                        <TextInput
                            className='w-1/2'
                            required
                            label="Email"
                            placeholder="your@email.com"
                            {...form.getInputProps('email')}
                        />
                        <TextInput
                            className='w-1/2 ml-2'
                            required
                            label="Phone"
                            placeholder="+9936*******"
                            {...form.getInputProps('phone')}
                        />
                    </div>
                    <div className='flex w-full'>
                        {/* <TextInput
                            className='w-1/2'
                            required
                            label="Login"
                            placeholder="Login"
                            {...form.getInputProps('login')}
                        /> */}
                        <TextInput
                            className='w-full'
                            required
                            label="Password"
                            type='password'
                            placeholder="password"
                            {...form.getInputProps('password')}
                        />
                    </div>
                    <Group position="right" mt="md">
                        <button type="submit" className='px-2 py-1 bg-blue-500 text-white rounded-md text-md'>Create</button>
                    </Group>
                </form>
            </Modal>
        </div>
    )
}

export default AdminsCreateModal