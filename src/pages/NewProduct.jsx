import React, { useState } from 'react';
import Button from '../components/ui/Button';
import { uploadeImage } from '../api/uploader';
import { addNewProduct } from '../api/firebase';

export default function NewProduct() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if(name ==='file') {
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({...product, [name]: value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    uploadeImage(file)
    .then(url => {
      addNewProduct(product, url)
      .then(()=> {
        setSuccess('성공적으로 제품이 추가되었습니다.');
        setTimeout(()=> {
          setSuccess(null);
        }, 4000);
      })
    })
    .finally(()=>setIsUploading(false));
  }

  return (
    <section className='w-full text-center'>
      <h2 className='text-2xl font-bold my-4'>새로운 제품 등록</h2>
      {success && <p className='my-2'>✔{ success }</p>}
      {file && <img className='w-96 mx-auto mb-2' src={URL.createObjectURL(file)} alt='local file' />}
      <form
        onSubmit={ handleSubmit }
        className='flex flex-col px-12'
      >
        <input type='file' accept='image/*' name='file' required onChange={ handleChange } />
        <input type='text' name='title' value={product.title ?? ''} required onChange={ handleChange } placeholder='제품명' />
        <input type='number' name='price' value={product.price ?? ''} required onChange={ handleChange } placeholder='가격' />
        <input type='text' name='category' value={product.category ?? ''} required onChange={ handleChange } placeholder='카테고리' />
        <input type='text' name='description' value={product.description ?? ''} required onChange={ handleChange } placeholder='제품설명' />
        <input type='text' name='options' value={product.options ?? ''} required onChange={ handleChange } placeholder='옵션들(콤마(,)로 구분)' />
        <Button text={ isUploading ? '업로드중...': '제품 등록하기' } disabled={ isUploading } />
      </form>
    </section>
    
  );
}
