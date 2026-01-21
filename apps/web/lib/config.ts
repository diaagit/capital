"use client"

function getBackendUrl() {
  return process.env.NEXT_PUBLIC_BACKEND_URL ?? "";
}

export default getBackendUrl;