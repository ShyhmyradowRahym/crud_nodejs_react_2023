import { Modal } from '@mantine/core'
import React from 'react'
import service from '../../api'

const AdminsDeleteModal = ({ id, opened, setOpened, forceUpdate }) => {
    const handleDelete = () => {
        service.delete(`/api/delete-operator/${id}`)
            .then(res => { res.status === 200 && setOpened(false); forceUpdate() })
    }
    return (
        <Modal
            centered
            opened={opened}
            onClose={() => setOpened(false)}
            title="Do you delete to user!"
        >
            <div className='flex'>
                <button type="button" onClick={() => setOpened(false)} className="w-1/2 inline-block px-6 py-2 border-2 border-green-500 text-green-500 font-medium text-xs leading-tight rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">No, don't delete it</button>
                <button className='py-0.5 px-1 w-1/2 ml-2 text-md rounded text-white bg-red-500' onClick={() => handleDelete()}>Delete user</button>
            </div>
        </Modal>
    )
}

export default AdminsDeleteModal