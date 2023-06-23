/* eslint-disable @typescript-eslint/no-extra-semi */
import { useIonRouter } from '@ionic/react'
import { useEffect } from 'react'
import { PAGE } from '../constants/page'
import Token from '../utils/token'

export default function useNavigate({
    currentPage,
    pageToNavigate,
}: {
    currentPage: string
    pageToNavigate: string
}) {
    const router = useIonRouter()

    useEffect(() => {
        ;(async function () {
            const token = await Token.getToken()
            if (!token) {
                router.push(PAGE.LOGIN)
            } else {
                pageToNavigate !== currentPage && router.push(pageToNavigate)
            }
        })()
    }, [])
}
