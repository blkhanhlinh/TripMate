/* eslint-disable @typescript-eslint/no-extra-semi */
import { useEffect, useState } from 'react'
import Token from '../utils/token'
import { AuthState } from '../model/User'

export default function useAuthentication() {
    const [token, setToken] = useState<string | null>(null)
    useEffect(() => {
        ;(async function () {
            const token = await Token.getToken()
            setToken(token)
        })()
    }, [])

    return token !== null ? AuthState.AUTHORIZED : AuthState.UNAUTHORIZED
}
