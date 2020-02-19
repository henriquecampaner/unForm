import React, { useEffect, useRef } from 'react';

import { useField } from '@unform/core';
// useField = conecta input com unform

export default function Input({ name, ...rest }) {
  const inputRef = useRef(null);
  // da acesso aos valores do input

  const { fieldName, registerField, defaultValue, error } = useField(name);
  // name = propriedade obrigatoria
  // fieldName = nome final do input(name)
  // defaultValue = e o valor pre definido(ex: name, email)
  // error = pega o erro enviado via ref no Form
   /**
    * registerField = funcao disparada no useEffect
    * registra o input no unform*/ 

  

  useEffect(() => {
    registerField({
      name: fieldName, //nome do input(name)
      ref: inputRef.current, // referencia(user o current)
      path: 'value' // propriedade que contem o valor do input dentro da referencia(value)
    })
  }, [fieldName, registerField])

  return (
    <div>
    <input ref={inputRef} defaultValue={defaultValue} {...rest}/>

    {error && 
      <span style={{color: '#f00'}}>{error}</span>
    }
    </div>
  );
}
