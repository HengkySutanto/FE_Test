import { Button, OptionsDropdown, Select, TextInput } from '@mantine/core'
import React from 'react'

export default function UserDashboard() {
  return (
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
        <div className="bg-gray-100 border border-gray-300 p-3 rounded apply-center flex-col">
          <div className="font-semibold">Belum ada barang</div>
          <div className="text-sm text-gray-400">Silakan tambah barang terlebih dahulu untuk mulai memindahkan</div>

          <Button mt="sm" color="orange" onClick={() => console.log('tambah barang')}>
            Tambah Barang
          </Button>
        </div>
      </div>
    </div>
  )
}
