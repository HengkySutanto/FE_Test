import { Button, Checkbox, Input, OptionsDropdown, Select, Table, TextInput } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import ModalMasterBarang from '../components/Modals/ModalMasterBarang'
import ModalLokasi from '../components/Modals/ModalLokasi';
import { IoMdTrash } from 'react-icons/io';

export default function UserDashboard() {
  const [showModalMasterBarang, setShowModalMasterBarang] = useState(false)
  const [listBarang, setListBarang] = useState([]);
  const [listLokasi, setListLokasi] = useState([]);
  const [rowsBarang, setRowsBarang] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showModalLokasi, setShowModalLokasi] = useState(false);
  const [currentElement, setCurrentElement] = useState(null);
  const [currenIndex, setCurrenIndex] = useState();
  
  useEffect(() => {
    const newRows = listBarang.map((element, idx) => (
      <>
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
          <Table.Td align='center'>{element.merk}</Table.Td>
          <Table.Td align='center'>{element.jenis_barang}</Table.Td>
          <Table.Td align='center'>{element.gudang}</Table.Td>
          <Table.Td align='center'>{element.total_stock}</Table.Td>
          <Table.Td align='center'>
            <div className='border border-orange-500 rounded hover:bg-orange-200 text-center text-orange-500 cursor-pointer' 
              onClick={() => set_openModalLocation(element, idx)}>
                + lokasi
            </div>
          </Table.Td>
        </Table.Tr>
        {element.lokasi?.length === 0 ? null :
          <Table.Td colSpan={6}>
            <Table.Tr className='text-xs'>
              <Table.Th />
              <Table.Th><div className='font-semibold text-center'>Lokasi Awal</div></Table.Th>
              <Table.Th><div className='font-semibold text-center'>QTY (PCS)</div></Table.Th>
              <Table.Th><div className='font-semibold text-center'>Satuan</div></Table.Th>
              <Table.Th><div className='font-semibold text-center'>Jumlah</div></Table.Th>
              <Table.Th><div className='font-semibold text-center'>Tindakan</div></Table.Th>
              <Table.Th />
            </Table.Tr>
            {element.lokasi?.map((loc, index) => (
              <Table.Tr key={index}>
                <Table.Td />
                <Table.Td>{loc.jenis}</Table.Td>
                <Table.Td><Input placeholder='0' className='w-20' /></Table.Td>
                <Table.Td >
                  <Select
                    // label="Pilih Satuan"
                    placeholder="Pilih Satuan"
                    data={['PC', 'Box', 'Kodi', 'Lusin']}
                    className='w-32'
                  />
                </Table.Td>
                <Table.Td>{loc.volume}</Table.Td>
                <Table.Td align='center'><IoMdTrash color='red' onClick={() => deleteLocation(element, idx, loc, index)} /></Table.Td>
              </Table.Tr>
            )
            )}
          </Table.Td>
        }
      </>
    ));
    setRowsBarang(newRows)
  }, [listBarang, selectedRows])

  useEffect(() => {
    const new_list_barang = JSON.parse(JSON.stringify(listBarang))
    if(listLokasi.length) {
      new_list_barang[currenIndex].lokasi = listLokasi
    }
    setListBarang(new_list_barang)
  } , [listLokasi])

  const handleBatal = () => {
    setListBarang([])
    setRowsBarang([])
    setSelectedRows([])
  }

  const deleteLocation = (element, idx, loc, index) => {
    let tempListBarang = JSON.parse(JSON.stringify(listBarang))
    tempListBarang[idx].lokasi.splice(index, 1)
    setListBarang(tempListBarang)
  }

  const set_openModalLocation = (element, idx) => {
    setShowModalLokasi(true)
    setCurrentElement(element)
    setCurrenIndex(idx)
  }


  return (
    <>
      <div className='mt-4'>
        <div className='bg-[#f8f8f8] p-5'>
          <div className="font-semibold">Buat Task Baru</div>
          <div className="border-b-2 -mx-5 my-5"></div>
          <div className="flex gap-x-5 items-center">
            <TextInput
              label="Task No."
              // description="Input description"
              placeholder="Input placeholder"
            />
            <Select
              label="Ditugaskan ke"
              placeholder="Pilih karyawan"
              data={['Karyawan 1', 'Karyawan 2', 'Karyawan 3']}
            />
          </div>
          <div className="border-b-2 -mx-5 my-5"></div>
          {!listBarang.length ?
            <div className="bg-gray-100 border border-gray-300 p-3 rounded apply-center flex-col">
              <div className="font-semibold">Belum ada barang</div>
              <div className="text-sm text-gray-400">Silakan tambah barang terlebih dahulu untuk mulai memindahkan</div>

              <Button mt="sm" color="orange" onClick={() => setShowModalMasterBarang(true)}>
                Tambah Barang
              </Button>
            </div>
            :
            <>
              <div className="flex justify-end">
                <Button mt="sm" color="orange" onClick={() => setShowModalMasterBarang(true)}>
                  Tambah Barang
                </Button>
              </div>
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th />
                    <Table.Th>Kode Barang</Table.Th>
                    <Table.Th>Nama Barang</Table.Th>
                    <Table.Th align='center'>Merk</Table.Th>
                    <Table.Th align='center'>Jenis Barang</Table.Th>
                    <Table.Th align='center'>Gudang</Table.Th>
                    <Table.Th align='center'>Total Stock (pcs)</Table.Th>
                    <Table.Th />
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rowsBarang}</Table.Tbody>
              </Table>
              <hr className='mt-5 mb-2' />

              <div className="flex justify-end items-center gap-x-3">
                <div className='text-sm text-gray-600 px-5 py-1 rounded border border-gray-400 hover:bg-gray-200 cursor-pointer'
                  onClick={handleBatal}
                >
                  Batal
                </div>
                <div className={`${selectedRows?.length ? "text-white bg-orange-500 hover:bg-orange-600 border-orange-500" : "text-gray-400 border-gray-200 bg-gray-100"} text-sm  px-5 py-1 rounded border  cursor-pointer`}
                  onClick={() => { }}
                >
                  Generate Task
                </div>
              </div>
            </>
          }
        </div>
      </div>
      <ModalMasterBarang
        showModalMasterBarang={showModalMasterBarang}
        setShowModalMasterBarang={setShowModalMasterBarang}
        listBarang={listBarang}
        setListBarang={setListBarang}
      />
      <ModalLokasi
        showModalLokasi={showModalLokasi}
        setShowModalLokasi={setShowModalLokasi}
        listLokasi={listLokasi}
        setListLokasi={setListLokasi}
      />
    </>
  )
}
