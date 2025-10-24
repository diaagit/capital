import type { BankName } from "@repo/db"
import { useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"

const baseUrl = "http://localhost:3002/api/v1/webhook/transaction/"

const transactionMap: Record<string,string> = {
    withdraw: `${baseUrl}/withdraw`,
    deposit: `${baseUrl}/deposit`,
    refund: `${baseUrl}/refund`,
    payout: `${baseUrl}/payout`
}

const providerMap: Record<BankName,string> = {
    hdfc: "/hdfcbank.png",
    icic: "/icicbank.png",
    kotak: "/kotak.png",
    yesbank: "/yesbank.png",
    bob: "/bob.png"
}

export default function Bank() {
    const {provider} = useParams<{provider: string}>();
    const searchParam = useSearchParams()
    const [amount, setAmount] = useState("")
    const [token, setToken] = useState("")
    
    return(
        <div>
            <h1>Hii there on Bank</h1>
        </div>
    )
}