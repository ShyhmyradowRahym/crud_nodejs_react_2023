import React, { useEffect, useReducer, useState } from 'react'
import { Button, Table } from '@mantine/core';
import { BiEdit } from 'react-icons/bi'
import { MdOutlineDelete } from 'react-icons/md'
import Paginate from '../components/Paginate/Paginate';
import { Select } from '@mantine/core';
import { Tooltip } from '@mantine/core';
import Loading from '../components/Loading';
import service from '../api';
import { AiOutlinePlus } from 'react-icons/ai'
import AdminsDeleteModal from '../Modals/Admins/AdminsDeleteModal'
import AdminsCreateModal from '../Modals/Admins/AdminsCreaeModal'
import AdminsEditModal from '../Modals/Admins/AdminsEditModal'
import { Avatar } from '@mantine/core';
const Admins = () => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(["10"])
  const [pageCount, setPageCount] = useState(1);
  const handlePageClick = (data) => {
    setPageCount(data.selected + 1)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  const [valueReducer, forceUpdate] = useReducer(x => x + 1, 0)
  useEffect(() => {
    getData();
    setLoading(true)
  }, [valueReducer])
  const getData = async () => {
    const res = await service.get('/api/users');
    setData(res.data)
    setLoading(false)
  }

  const [opened, setOpened] = useState(false);
  const [id, setId] = useState()
  const [admin, setAdmin] = useState()
  const [deleteAdmin, setDeleteAdmin] = useState(false)
  const rows = data && data.map((element) => (
    <tr key={element.id}>
      <td>{element.id}</td>
      <td>
        <input type='file' id='actual-button' hidden />
        <label for='actual-button'>{element.image ? <Avatar src={element.image} alt="it's me" /> : <Avatar src="https://imgv3.fotor.com/images/homepage-feature-card/Upload-an-image.jpg" alt="it's me" />}</label>
      </td>
      <td>{element.email}</td>
      <td>{element.phone}</td>
      <td>{element.role}</td>
      <td>{element.username}</td>
      <td>
        <Tooltip
          label="Edit"
          color="blue"
          withArrow
          offset={1}
          arrowSize={6}>
          <div className='flex justify-center'>
            <BiEdit onClick={() => { setOpened(true); setAdmin(element); setId(element.id) }} className='text-indigo-600 text-center cursor-pointer text-xl' />
          </div>
        </Tooltip >
      </td>
      <td>
        <Tooltip
          label="Delete"
          color="red"
          withArrow
          offset={1}
          arrowSize={6}>
          <div className='flex justify-center'>
            <MdOutlineDelete onClick={() => { setId(element.id); setDeleteAdmin(true) }} className='text-red-500 cursor-pointer text-xl' />
          </div>
        </Tooltip >
      </td>
    </tr>
  ));
  const [adminsCreateModal, setAdminsCreateModal] = useState(false)
  return (
    <div className=''>
      {deleteAdmin && <AdminsDeleteModal opened={deleteAdmin} setOpened={setDeleteAdmin} id={id} forceUpdate={forceUpdate} />}
      {opened && <AdminsEditModal forceUpdate={forceUpdate} admin={admin} opened={opened} id={id} setOpened={setOpened} />}
      {adminsCreateModal && <AdminsCreateModal forceUpdate={forceUpdate} opened={adminsCreateModal} id={id} setOpened={setAdminsCreateModal} />}
      {loading ? <Loading /> :
        <div className='w-full'>
          <div className='flex items-center mb-1 h-10 w-full border-b'>
            <button onClick={() => { setAdminsCreateModal(true) }} className='ml-3 p-1 text-xl bg-indigo-600 text-white '>
              <AiOutlinePlus />
            </button>
          </div>
          <div className='px-1 shadow-xl border scrolll h-[44rem] overflow-y-scroll w-full'>
            <Table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Image</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Username</th>
                  <th style={{ textAlign: 'center' }}>Edit</th>
                  <th style={{ textAlign: 'center' }}>Delete</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </div>
          <div className='border-t  w-full my-auto md:p-3 p-0 flex justify-between items-center'>
            {/* <p className='md:block hidden'>1- {page}  из {data && data.meta.itemCount}</p> */}
            {/* {data && <Paginate dataPage={data.meta.itemCount / page} handlePageClick={handlePageClick} />} */}
            <Select
              placeholder="10"
              searchable
              nothingFound="No options"
              data={['10', '20', '30', '40', '50']}
              value={page}
              onChange={setPage}
            />
          </div>
        </div>}
    </div>
  )
}

export default Admins