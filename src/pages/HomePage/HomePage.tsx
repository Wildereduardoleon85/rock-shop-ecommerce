/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useRef, useState } from 'react'
import joi from 'joi'
import { ErrorPage } from '..'
import { ProductCard } from '../../components'
import { Loader } from '../../components/UI'
import { useGetProductsQuery } from '../../slices'
import styles from './HomePage.module.scss'

function HomePage() {
  const { data: products, isError, isLoading } = useGetProductsQuery()

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <ErrorPage />
  }

  return (
    products && (
      <>
        <h1 className={styles.title}>Latest Products</h1>
        <div className={styles.container}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </>
    )
  )
}

export default HomePage

// const [formValues, setFormValues] = useState<{
//   firstName: string
//   lastName: string
//   file: File | null
// }>({ firstName: '', lastName: '', file: null })
// const [fileName, setFileName] = useState<string>('No file chosen')

// const imgInput = useRef<HTMLInputElement>(null)

// const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   if (e.target.type === 'file' && e.target.files) {
//     setFormValues({ ...formValues, [e.target.name]: e.target.files[0] })
//     setFileName(e.target.files[0].name)
//   } else {
//     setFormValues({ ...formValues, [e.target.name]: e.target.value })
//   }
// }

// function onUploadImageHandler(e: React.KeyboardEvent<HTMLSpanElement>) {
//   if (e.key === 'Enter' || e.key === ' ') {
//     e.preventDefault()
//     imgInput.current?.click()
//   }
// }

// async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
//   e.preventDefault()
// // const formData = new FormData()
// // formData.append('image', formValues.file as File)

// // const res = await fetch('server/api/v1/upload', {
// //   method: 'POST',
// //   body: formData,
// // })
// // const data = await res.json()
// // console.log(data)

//   const nameSchema = joi.string().required().min(3)

//   const { error } = nameSchema.validate(formValues.firstName)

//   console.log(error?.details[0].message.replace('"value"', 'field name'))
// }

// return (
//   <div
//     className={styles.root}
//     style={{
//       width: '480px',
//       margin: '5rem auto 0 auto',
//       border: '1px solid black',
//       padding: '2rem',
//       borderRadius: '1rem',
//     }}
//   >
//     <form
//       style={{
//         display: 'flex',
//         flexDirection: 'column',
//       }}
//       onSubmit={onSubmit}
//     >
//       <input
//         style={{
//           margin: '0.5rem 0',
//           padding: '0.5rem',
//         }}
//         type='text'
//         name='firstName'
//         value={formValues.firstName}
//         onChange={onChange}
//       />
//       <input
//         style={{
//           margin: '0.5rem 0',
//           padding: '0.5rem',
//         }}
//         type='text'
//         name='lastName'
//         value={formValues.lastName}
//         onChange={onChange}
//       />

//       <label className={styles.imageInput} htmlFor='file'>
//         <input
//           id='file'
//           type='file'
//           name='file'
//           ref={imgInput}
//           onChange={onChange}
//         />
//         <span className={styles.label}>{fileName}</span>
//       </label>

//       <button style={{ padding: '0.5rem' }} type='submit'>
//         Submit
//       </button>
//     </form>
//   </div>
// )
