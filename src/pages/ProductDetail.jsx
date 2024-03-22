import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuthContext } from '../context/AuthContext';
import { addOrUpdateToCart } from '../api/firebase';

export default function ProductDetail() {
  const { uid } = useAuthContext();
  const {
    state: {
      product: { id, image, title, description, category, price, options }
    }
  } = useLocation();

  const [selected, setSelected] = useState(options && options[0]);

  const handleSelect = (e) => setSelected(e.target.value);

  const handleClick = async(e) => {
    const product = { id, image, title, price, option: selected, quantity: 1 };
    if(uid.exist()){
      console.log('카트 추가 완료')
      addOrUpdateToCart(uid, product);
    } else {
      console.log('로그인이 필요합니다')
    }
  }

  return(
    <>
      <section className='flex flex-col md:flex-row p-4'>
        <div className='basis-7/12'>
          <img className='w-full px-4' src={ image } alt={ title } />
        </div>
        <div className='w-full basis-5/12 flex flex-col p-4'>
          <h2 className='text-3xl font-bold py-2'>{ title }</h2>
          <p className='text-xl font-bold py-2 border-b border-gray-400'>{ price }원</p>
          <p className='py-4 text-lg'>{ description }</p>
          <p className='text-md text-blue-600'>#{ category }</p>
          <div className='flex items-center'>
            <label className='text-brand font-bold' htmlFor='select'>옵션: </label>
            <select id='select' className='p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none' onChange={ handleSelect } valus={ selected }>
              { options && options.map((option, index) => <option key={index}>{ option }</option>)}
            </select>
          </div>
          <Button text='장바구니에 추가' onClick={ handleClick }/>
        </div>
      </section>
    </>
  )
}
