import { Camera, CameraResultType } from '@capacitor/camera'

export default function useCamera() {
    const takePicture = async () => {
        try {
            const image = await Camera.getPhoto({
                quality: 100,
                allowEditing: true,
                resultType: CameraResultType.Uri,
            })
            console.log({ image })
            return image
        } catch {
            return null
        }
    }

    const getPhotos = async () => {
        const images = await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            resultType: CameraResultType.Uri,
        })
        return images
    }

    const pickImages = async () => {
        const images = await Camera.pickImages({
            quality: 90,
        })
        return images
    }

    return { takePicture, getPhotos, pickImages }
}
