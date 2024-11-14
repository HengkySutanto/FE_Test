import React, { useEffect, useState } from 'react'
import { Button, Checkbox, CloseButton, Input, Modal, NumberInput, Pagination, Select, Table } from '@mantine/core'
import { masterlokasi } from '../../assets/master_barang'
import { MdSearch } from 'react-icons/md';

export default function ModalLokasi({
  showModalLokasi,
  setShowModalLokasi,
  listLokasi,
  setListLokasi,
}) {
  const [masterLokasi, setMasterLokasi] = useState(masterlokasi)
  const [selectedRows, setSelectedRows] = useState([]);
  const [rows, setRows] = useState([]);
  const [activePage, setPage] = useState(1);
  const [perPage, setPerPage] = useState(4);
  const [search, setSearch] = useState('');

  useEffect(() => {
    handleFilter()
  }, [activePage, perPage, selectedRows])

  const handleFilter = () => {
    const newRows = masterLokasi.map((element) => (
        <Table.Tr
          key={element.nama_lokasi}
          bg={selectedRows.includes(element.nama_lokasi) ? 'var(--mantine-color-blue-light)' : undefined}
        >
          <Table.Td>
            <Checkbox
              aria-label="Select row"
              checked={selectedRows.includes(element.nama_lokasi)}
              onChange={(event) => {
                setSelectedRows(
                  event.currentTarget.checked
                    ? [...selectedRows, element.nama_lokasi]
                    : selectedRows.filter((position) => position !== element.nama_lokasi)
                )
              }
              }
            />
          </Table.Td>
          <Table.Td>{element.nama_lokasi}</Table.Td>
          <Table.Td>{element.gudang}</Table.Td>
          <Table.Td>{element.jenis}</Table.Td>
          <Table.Td>{element.volume}</Table.Td>
          <Table.Td>{element.deskripsi}</Table.Td>
        </Table.Tr>
      ));
    setRows(newRows)
  }

  const handleTambahListLokasi = () => {
    const newListBarang = masterLokasi.filter((barang) => selectedRows.includes(barang.nama_lokasi))
    setListLokasi(newListBarang)
    setSelectedRows([])
    setShowModalLokasi(false)
  }

  const handleClose = () => {
    setSelectedRows([])
    setShowModalLokasi(false)
  }
  return (
    <Modal size="xl" opened={showModalLokasi} onClose={handleClose} title="Pilih Lokasi">
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th />
            <Table.Th>Nama Lokasi</Table.Th>
            <Table.Th>Gudang</Table.Th>
            <Table.Th>Jenis</Table.Th>
            <Table.Th>Volume</Table.Th>
            <Table.Th>Deskripsi</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>

      <hr className='mt-5 mb-2' />

      <div className="flex justify-end items-center gap-x-3">
        <div className='text-sm text-gray-600 px-5 py-1 rounded border border-gray-400 hover:bg-gray-200 cursor-pointer'
          onClick={handleClose}
        >
          Batal
        </div>
        <div className={`${selectedRows?.length ? "text-gray-600 border-gray-400" : "text-gray-400 border-gray-200 bg-gray-100"} text-sm  px-5 py-1 rounded border hover:bg-green-200 cursor-pointer`}
          onClick={handleTambahListLokasi}
        >
          Tambahkan
        </div>
      </div>
    </Modal>
  )
}
