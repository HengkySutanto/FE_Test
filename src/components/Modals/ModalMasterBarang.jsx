import React, { useEffect, useState } from 'react'
import { Button, Checkbox, CloseButton, Input, Modal, NumberInput, Pagination, Select, Table } from '@mantine/core'
import { masterbarang } from '../../assets/master_barang'
import { MdSearch } from 'react-icons/md';

export default function ModalMasterBarang({
  showModalMasterBarang,
  setShowModalMasterBarang,
  listBarang,
  setListBarang,
}) {
  const [masterBarang, setMasterBarang] = useState(masterbarang)
  const [selectedRows, setSelectedRows] = useState([]);
  const [rows, setRows] = useState([]);
  const [activePage, setPage] = useState(1);
  const [perPage, setPerPage] = useState(4);
  const [search, setSearch] = useState('');

  useEffect(() => {
    handleFilter()
  }, [activePage, selectedRows])

  useEffect(() => {
    handleFilter("search")
  }, [search, perPage])

  const handleFilter = (searchFilter) => {
    const newRows = masterBarang
      .filter((barang) =>
        barang.kode_barang.toLowerCase().includes(search.toLowerCase()) ||
        barang.nama_barang.toLowerCase().includes(search.toLowerCase()) ||
        barang.merk.toLowerCase().includes(search.toLowerCase()) ||
        barang.jenis_barang.toLowerCase().includes(search.toLowerCase()) ||
        barang.gudang.toLowerCase().includes(search.toLowerCase())
      )
      .slice((activePage - 1) * perPage, activePage * perPage).map((element) => (
        <Table.Tr
          key={element.kode_barang}
          bg={selectedRows.includes(element.kode_barang) ? 'var(--mantine-color-blue-light)' : undefined}
        >
          <Table.Td>
            <Checkbox
              aria-label="Select row"
              checked={selectedRows.includes(element.kode_barang)}
              onChange={(event) => {
                setSelectedRows(
                  event.currentTarget.checked
                    ? [...selectedRows, element.kode_barang]
                    : selectedRows.filter((position) => position !== element.kode_barang)
                )
              }
              }
            />
          </Table.Td>
          <Table.Td>{element.kode_barang}</Table.Td>
          <Table.Td>{element.nama_barang}</Table.Td>
          <Table.Td>{element.merk}</Table.Td>
          <Table.Td>{element.jenis_barang}</Table.Td>
          <Table.Td>{element.gudang}</Table.Td>
          <Table.Td>{element.total_stock}</Table.Td>
        </Table.Tr>
      ));
    setMasterBarang(masterbarang
      .filter((barang) =>
        barang.kode_barang.toLowerCase().includes(search.toLowerCase()) ||
        barang.nama_barang.toLowerCase().includes(search.toLowerCase()) ||
        barang.merk.toLowerCase().includes(search.toLowerCase()) ||
        barang.jenis_barang.toLowerCase().includes(search.toLowerCase()) ||
        barang.gudang.toLowerCase().includes(search.toLowerCase())
      ))
    if (searchFilter) {
      setPage(1)
    }
    setRows(newRows)
  }

  const handleTambahListBarang = () => {
    const newListBarang = masterBarang.filter((barang) => selectedRows.includes(barang.kode_barang))
                                      // .map((newbarang) => listBarang.map(i => i.kode_barang))
    const filterNewListBarang = newListBarang.filter(i => !listBarang.map(a => a.kode_barang).includes(i.kode_barang))
    const gabungan = [...listBarang, filterNewListBarang].flat()
    setListBarang(gabungan)
    setSelectedRows([])
    setShowModalMasterBarang(false)
  }

  const handleClose = () => {
    setSelectedRows([])
    setShowModalMasterBarang(false)
  }
  return (
    <Modal size="xl" opened={showModalMasterBarang} onClose={handleClose} title="Tambah Barang">
      <Input
        placeholder="Cari Kode / Nama Barang"
        value={search}
        onChange={(event) => setSearch(event.currentTarget.value)}
        rightSectionPointerEvents="all"
        mt="md"
        rightSection={
          <div className='bg-orange-500 h-9 w-10 rounded apply-center'>
            <MdSearch color='white' size={20} className='' />
          </div>
        }
      />

      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th />
            <Table.Th>Kode Barang</Table.Th>
            <Table.Th>Nama Barang</Table.Th>
            <Table.Th>Merk</Table.Th>
            <Table.Th>Jenis Barang</Table.Th>
            <Table.Th>Gudang</Table.Th>
            <Table.Th>Total Stock (pcs)</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <div className="flex gap-x-3 justify-end items-center">
        <Pagination
          value={activePage}
          onChange={setPage}
          total={Math.ceil(masterBarang.length / perPage)}
        />
        <div className="relative">
          <Select
            // label="perpage"
            placeholder={perPage}
            value={perPage}
            data={['3', '5', '10']}
            className='w-24'
            onChange={(value) => setPerPage(value)}
          />
          <div className="absolute top-[9px] right-7 text-gray-500 text-xs">/page</div>
        </div>
        <div className="flex gap-x-1 items-center">
          go to:
          <NumberInput value={activePage} placeholder="" hideControls className='w-16' onChange={(value) => setPage(value)} />
        </div>
      </div>

      <hr className='mt-5 mb-2' />

      <div className="flex justify-end items-center gap-x-3">
        <div className='text-sm text-gray-600 px-5 py-1 rounded border border-gray-400 hover:bg-gray-200 cursor-pointer'
          onClick={handleClose}
        >
          Batal
        </div>
        <div className={`${selectedRows?.length ? "text-gray-600 border-gray-400" : "text-gray-400 border-gray-200 bg-gray-100"} text-sm  px-5 py-1 rounded border hover:bg-green-200 cursor-pointer`}
          onClick={handleTambahListBarang}
        >
          Tambah ke Daftar Pemindahan
        </div>
      </div>
    </Modal>
  )
}
