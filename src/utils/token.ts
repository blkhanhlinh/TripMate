import { Preferences } from '@capacitor/preferences'
import { TOKEN } from '../constants/token'

class Token {
    public static async setToken(token: string) {
        return await setObject(TOKEN.ACCESS, token)
    }

    public static async getToken() {
        return await getObject(TOKEN.ACCESS)
    }

    public static async removeToken() {
        return await removeObject(TOKEN.ACCESS)
    }
}
// JSON "set" example
async function setObject(key: string, value: any) {
    await Preferences.set({
        key: key,
        value: value,
    })
}

// JSON "get" example
async function getObject(key: string) {
    const ret = await Preferences.get({ key })
    return ret.value
}

// JSON "remove" example
async function removeObject(key: string) {
    await Preferences.remove({ key })
}

async function removeAll() {
    await Preferences.clear()
}

export { setObject, getObject, removeObject, removeAll }
export default Token
