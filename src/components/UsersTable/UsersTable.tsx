import { BsFillCheckCircleFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { FaEdit, FaRegTimesCircle, FaTrashAlt } from 'react-icons/fa'
import { UserInfo } from '../../types'
import styles from './UsersTable.module.scss'
import { setAlert, useDeleteUserMutation } from '../../slices'
import { SmallLoader } from '../UI'

type UsersTableProps = {
  users: UserInfo[]
  refetch: () => void
}

function UsersTable({ users, refetch }: UsersTableProps) {
  const [deleteUser, { isLoading }] = useDeleteUserMutation()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const dispatch = useDispatch()

  const onDeleteUser = async (userId: string, index: number) => {
    try {
      setActiveIndex(index)
      await deleteUser(userId).unwrap()
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

  return users.map((user, index) => (
    <tr key={user._id}>
      <td>{user._id}</td>
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
          to='/users/edit'
          aria-label='edit-user'
          className={styles.editIconButton}
        >
          <FaEdit />
        </Link>
        <button
          type='button'
          aria-label='delete-product'
          className={styles.trashIconButton}
          onClick={() => onDeleteUser(user._id, index)}
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
