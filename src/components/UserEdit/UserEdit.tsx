import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './UserEdit.module.scss'
import { UserInfo } from '../../types'
import { userEditFormValues } from '../../config/userEditformValues'
import { useFormValues } from '../../hooks'
import { Form } from '..'
import { Checkbox, GobackButton } from '../UI'
import { isFormValid } from '../../helpers'
import { setAlert, useUpdateUserMutation } from '../../slices'
import { ROUTES } from '../../constants'

type UserEditProps = {
  userDetails: UserInfo
}

function UserEdit({ userDetails }: UserEditProps) {
  const [isAdmin, setIsAdmin] = useState<boolean>(userDetails.isAdmin)
  const [updateUser, { isLoading }] = useUpdateUserMutation()
  const dispatch = useDispatch()

  const formValues = useFormValues(
    userEditFormValues({
      nameValue: userDetails.name,
      emailValue: userDetails.email,
    })
  )

  const [nameInput, emailInput] = formValues
  const isUserChanged =
    nameInput.value !== userDetails.name ||
    emailInput.value !== userDetails.email ||
    isAdmin !== userDetails.isAdmin

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isFormValid(formValues)) {
      formValues.forEach((value) => {
        value.onBlur()
      })
      return
    }

    if (isUserChanged) {
      try {
        await updateUser({
          userId: userDetails._id,
          name: nameInput.value,
          email: emailInput.value,
          isAdmin,
        }).unwrap()
        dispatch(setAlert({ message: 'user updated successfuly!' }))
      } catch (error: any) {
        dispatch(
          setAlert({
            variant: 'error',
            message: error?.data?.message ?? 'something went wrong',
          })
        )
      }
    }
  }

  return (
    <>
      <GobackButton className={styles.gobackButton} to={ROUTES.userList} />
      <div className={styles.root}>
        <h1>Edit User</h1>
        <Form
          className={styles.form}
          formInputs={formValues}
          buttonLabel='UPDATE'
          onFormSubmit={onSubmit}
          isLoading={isLoading}
          aditionalformElement={
            <Checkbox
              label='isAdmin'
              checked={isAdmin}
              setChecked={setIsAdmin}
            />
          }
        />
      </div>
    </>
  )
}

export default UserEdit
