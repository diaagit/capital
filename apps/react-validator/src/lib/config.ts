const getBackendUrl = () => {
    return import.meta.env.VITE_API_URL ?? ""
}

export const getMainURL = () => {
    return import.meta.env.VITE_FRONTEND_URL ?? ""
}

export default getBackendUrl