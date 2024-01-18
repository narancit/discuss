import { Button } from '@nextui-org/react'
import * as actions from '@/app/actions'
import { auth } from '@/auth'
import Profile from '@/app/components/profile';


export default async function Home() {
  const session = await auth();

  return (
    <div>
      <form action={actions.signIn}>
        <Button type='submit'>Sign me up</Button>
      </form>

      <form action={actions.signOut}>
        <Button type='submit'>Sign out</Button>
      </form>

      {session?.user ? (
        <div>
          Server Components: {JSON.stringify(session.user)}
        </div>
      ) : (
        <div>Signed out</div>
      )}

      <Profile />
    </div>
  )
}
