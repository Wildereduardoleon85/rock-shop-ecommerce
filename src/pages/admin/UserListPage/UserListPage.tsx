import { Meta, Table } from '../../../components'
import { useGetUsersQuery } from '../../../slices'

function UserListPage() {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery()

  return (
    <>
      <Meta />
      <Table
        variant='users'
        data={users}
        isLoading={isLoading}
        error={error}
        refetch={refetch}
      />
    </>
  )
}

export default UserListPage
