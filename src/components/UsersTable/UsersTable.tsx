import { BsFillCheckCircleFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaEdit, FaRegTimesCircle, FaTrashAlt } from 'react-icons/fa'
import { UserInfo } from '../../types'
import styles from './UsersTable.module.scss'
import {
  openModal,
  setAlert,
  setModalConfirm,
  useDeleteUserMutation,
} from '../../slices'
import { SmallLoader } from '../UI'
import { RootState } from '../../store'
import { ROUTES } from '../../constants'

type UsersTableProps = {
  users: UserInfo[]
  refetch: () => void
}

function UsersTable({ users, refetch }: UsersTableProps) {
  const [deleteUser, { isLoading }] = useDeleteUserMutation()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [idToDelete, setIdToDelete] = useState<string>('')
  const dispatch = useDispatch()
  const modal = useSelector((state: RootState) => state.modal)
  const { isConfirmed } = modal

  async function removeUser() {
    try {
      await deleteUser(idToDelete).unwrap()
      dispatch(setAlert({ message: 'user deleted successfully!' }))
      refetch()
    } catch (error: any) {
      dispatch(
        setAlert({
          variant: 'error',
          message: error?.data?.message ?? 'something went wrong',
        })
      )
    }
  }

  useEffect(() => {
    if (isConfirmed) {
      removeUser()
      dispatch(setModalConfirm(false))
    }
  }, [isConfirmed])

  const onDeleteButtonClick = (userId: string, index: number) => {
    dispatch(openModal('do you really want to delete this user?'))
    setActiveIndex(index)
    setIdToDelete(userId)
  }

  return users.map((user, index) => (
    <tr key={user._id}>
      <th scope='row'>{user._id}</th>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        {user.isAdmin ? (
          <BsFillCheckCircleFill className={styles.checkIcon} />
        ) : (
          <FaRegTimesCircle className={styles.timesIcon} />
        )}
      </td>
      <td className={styles.iconButtonsContainer}>
        <Link
          to={ROUTES.userEdit.replace(':id', user._id)}
          aria-label='edit-user'
          className={styles.editIconButton}
        >
          <FaEdit />
        </Link>
        <button
          type='button'
          aria-label='delete-product'
          className={styles.trashIconButton}
          onClick={() => onDeleteButtonClick(user._id, index)}
          disabled={isLoading && index === activeIndex}
        >
          <div>
            {isLoading && activeIndex === index ? (
              <SmallLoader />
            ) : (
              <FaTrashAlt />
            )}
          </div>
        </button>
      </td>
    </tr>
  ))
}

export default UsersTable
