'use client'

import { useSession } from "next-auth/react";

export default function Profile() {
    const session = useSession()

    if(session.data?.user) {
        return (
            <div>
                Client Components: {JSON.stringify(session.data.user)}
            </div>
        )  
    }

    return <div>Signed out</div>
}