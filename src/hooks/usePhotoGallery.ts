import { useEffect, useState } from "react";
import { Photo } from "../model/Photo";
import { Camera, CameraResultType, CameraSource, Photo as CameraPhoto } from "@capacitor/camera";
import { isPlatform } from "@ionic/react";
import { Filesystem, Directory } from '@capacitor/filesystem'
import { Capacitor } from "@capacitor/core";
import { Preferences } from "@capacitor/preferences";

const PHOTOS_PREF_KEY = 'photos';

export const usePhotoGallery = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);

    useEffect(() => {
        const loadSaved = async () => {
            const { value } = await Preferences.get({key: PHOTOS_PREF_KEY})
            const photosInPrefs: Photo[] = value ? JSON.parse(value) : [];

            if(!isPlatform('hybrid')) {
                for(const photo of photosInPrefs) {
                    const file = await Filesystem.readFile({
                        path: photo.filePath,
                        directory: Directory.Data
                    })
                    photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
                }
            }

            setPhotos(photosInPrefs)
        }
        loadSaved()
    }, [])

    useEffect(() => {
        if(photos.length > 0) {
            Preferences.set({key: PHOTOS_PREF_KEY, value: JSON.stringify(photos)})
        }
    }, [photos])

    const takePhoto = async () => {
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100
        })

        const fileName = new Date().getTime() + '.jpeg';
        const savedFileImage = await savePhoto(photo, fileName)

        
        setPhotos([...photos, savedFileImage])
    };

    const savePhoto = async (photo: CameraPhoto, fileName: string): Promise<Photo> => {
        let base64Data: string;

        if(isPlatform('hybrid')) {
            const file = await Filesystem.readFile({
                path: photo.path!
            })

            base64Data = file.data
        } else {
            base64Data = await base64FromPath(photo.webPath!)
        }
        const savedFile = await Filesystem.writeFile({
            path: fileName,
            directory: Directory.Data,
            data: base64Data
        })

        if(isPlatform('hybrid')) {
            return {
                filePath: savedFile.uri,
                webviewPath: Capacitor.convertFileSrc(savedFile.uri)
            }
        }
        return {
            filePath: fileName,
            webviewPath: photo.webPath
        }
    }

    const deletePhoto = async (fileName: string) => {
        setPhotos(photos.filter((photo) => photo.filePath !== fileName));

        await Filesystem.deleteFile({
            path: fileName,
            directory: Directory.Data
        })
    };

    return {
        photos,
        takePhoto,
        deletePhoto
    }
}

async function base64FromPath(path: string): Promise<string> {
    const response = await fetch(path);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
            if(typeof reader.result == 'string') {
                resolve(reader.result);
            } else {
                reject('method did not return a string');
            }
        };
        reader.readAsDataURL(blob);
    })
}