import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';
import useCart from '../hooks/useCart';
import { useAuthContext } from '../context/AuthContext';

export default function ProductDetail() {
  const { uid } = useAuthContext();
  const { addOrUpdateItem } = useCart();
  const {
    state: {
      product: { id, image, title, description, category, price, options }
    }
  } = useLocation();
  const [success, setSuccess] = useState();

  const [selected, setSelected] = useState(options && options[0]);

  const handleSelect = (e) => setSelected(e.target.value);

  const handleClick = async(e) => {
    if(uid !== null && uid !== undefined){
      const product = { id, image, title, price, option: selected, quantity: 1 };
      addOrUpdateItem.mutate(product, {
        onSuccess: () => {
          setSuccess('장바구니에 추가되었습니다.');
          setTimeout(()=> setSuccess(null), 3000);
        }
      });
    } else {
      setSuccess('로그인 후 이용해주세요.');
      setTimeout(()=> setSuccess(null), 3000);
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
          {success && <p className='my-2'>{ success }</p>}
          <Button text='장바구니에 추가' onClick={ handleClick }/>
        </div>
      </section>
    </>
  )
}
