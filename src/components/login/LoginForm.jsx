import React from 'react'
import { useForm } from '@mantine/form';
import { TextInput, Button, PasswordInput } from '@mantine/core';
import '@mantine/core/styles.css';

export default function LoginForm({ handleLogin }) {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { name: '', password: '' },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) => (value.length < 3 ? 'Name must have at least 3 letters' : null),
    },
  });

  return (
    <form onSubmit={form.onSubmit(handleLogin)} className='w-60 flex flex-col items-center'>
      <TextInput
        label="Userame"
        placeholder="Name"
        key={form.key('name')}
        {...form.getInputProps('name')}
        className='w-full'
      />
      <PasswordInput
        mt="sm"
        label="Password"
        placeholder="Password"
        key={form.key('password')}
        {...form.getInputProps('password')}
        className='w-full'
      />
      <Button type="submit" mt="sm" color="orange">
        Login
      </Button>
    </form>
  )
}
