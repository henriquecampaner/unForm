import React, { useRef, useEffect, useState } from 'react';
import './App.css';

import * as Yup from 'yup'
import { Form } from '@unform/web';
import { Scope } from '@unform/core';
import Input from './components/Form/Input';


function App() {
  const formRef = useRef(null);

  async function handleSubmit(data, { reset }) {
    // if (data.name === '') {
    //   // formRef.current.setFieldError('name', 'Name required')
    //   // repassa os error
    //   formRef.current.setErrors({
    //     name: 'Name required',
    //     address: {
    //       city: 'City required'
    //     }
    //   })
    // }
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Name required'),
        email: Yup.string().email('email invalid').required('Email required'),
        address: Yup.object().shape({
          city: Yup.string().min(3, 'Min 3 chacacteres').required('City required')
        })
      });

      await schema.validate(data, {
        abortEarly: false,
      })

      formRef.current.setErrors({})

    } catch (err) {
      if(err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message
        })

        formRef.current.setErrors(errorMessages)
      }
    }

    // reset();
    //reseta formulario
  }

  useEffect(() => {
    setTimeout(() => {
    formRef.current.setData({ // para consumir os dados vindos da api
      name: 'Henrique',
      email: 'henrique@campaner.me',
      address: {
        city: 'Maringa',
        number: '123',
        street: 'rua doidera'
      }
    })
    }, 2000);
  }, [])

  return (
    <div className="App">
      <h1>hello</h1>
      {/* ref={formRef} = repassa os error */}
      {/* initialData para dados estaticos */}
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="name" />
        <Input type="email" name="email" />
        {/* <Input type="password" name="password" /> */}
        {/* passando address.item o valor vira um objeto */}
        <Scope path="address">
          {/* Com scope eu defino o objeto a ser criado */}
          <Input name="street" />
          <Input name="number" />
          <Input name="city" />
          <Input name="state" /> 
        </Scope>
        
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}

export default App;
