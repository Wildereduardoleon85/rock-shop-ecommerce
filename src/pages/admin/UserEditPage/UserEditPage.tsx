import { useParams } from 'react-router-dom'
import { useGetUserDetailsQuery } from '../../../slices'
import { Loader } from '../../../components/UI'
import { ErrorPage } from '../..'
import { UserEdit } from '../../../components'

function UserEditPage() {
  const { id: userId } = useParams()
  const {
    data: userDetails,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId as string)

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    const err = error as any
    if (err.status === 404) {
      return <ErrorPage variant='not-found' />
    }
    return <ErrorPage />
  }

  return userDetails && <UserEdit refetch={refetch} userDetails={userDetails} />
}

export default UserEditPage
