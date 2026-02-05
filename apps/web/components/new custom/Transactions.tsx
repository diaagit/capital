'use client'

import { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { format } from 'date-fns'
import getBackendUrl from '@/lib/config'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface Transaction {
  id: string
  amount: number
  type: string
  description: string
  created_at: string
  canceled_at: string | null
  bank_name: string
  card?: {
    bank_name: string
  }
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)

const getStatusColor = (
  type: string,
  canceled_at: string | null
): 'default' | 'secondary' | 'destructive' | 'outline' => {
  if (canceled_at) return 'destructive'
  if (type === 'REFUND') return 'secondary'
  return 'default'
}

const getStatusLabel = (type: string, canceled_at: string | null) => {
  if (canceled_at) return 'Canceled'
  if (type === 'REFUND') return 'Refunded'
  return 'Completed'
}

const getAmountColor = (type: string) => {
  if (type === 'REFUND' || type === 'WITHDRAWAL') return 'text-red-600'
  return 'text-emerald-600'
}

export const TypeDescription: Record<string, string> = {
  withdrawal:
    'Funds have been securely transferred from your account to the selected destination.',
  deposit:
    'The deposited amount has been successfully credited to your account balance.',
  refund:
    'This transaction has been refunded and the amount returned to the original payment method.',
  initiate:
    'The payment has been initiated and is currently being processed.',
}

export default function TransactionsList() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<Transaction | null>(null)

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const token = localStorage.getItem('token')
      const URL = getBackendUrl()

      const res = await axios.get(`${URL}/transactions/my`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      setTransactions(res.data.transactions ?? [])
    } catch {
      setError('Failed to load transactions')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  const exportPDF = () => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()

    doc.setFontSize(16)
    doc.text('Transactions Report', 14, 18)
    doc.text('Capital Payments', pageWidth-14,18,{
        align: "right"
    })
    doc.setFontSize(10)
    doc.text(
      `Generated: ${format(new Date(), 'PPP p')}`,
      14,
      26
    )

    const rows = transactions.map((t) => [
      format(new Date(t.created_at), 'MMM dd, yyyy'),
      t.type,
      t.description || TypeDescription[t.type.toLowerCase()],
      (t.card?.bank_name || t.bank_name || '—').toUpperCase(),
      formatCurrency(t.amount),
      getStatusLabel(t.type, t.canceled_at),
    ])

    autoTable(doc, {
      startY: 32,
      head: [['Date', 'Type', 'Description', 'Bank', 'Amount', 'Status']],
      body: rows,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [16, 16, 16] },
      columnStyles: { 4: { halign: 'right' } },
    })

    doc.save('transactions.pdf')
  }

  return (
    <>
      <Card className="flex flex-col h-full rounded-xl overflow-hidden border shadow-sm">
        <div className="px-6 py-5 border-b bg-muted/30 shrink-0 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              Transactions
            </h2>
            <p className="text-sm text-muted-foreground">
              View your recent payments and refunds
            </p>
          </div>

          <Button size="sm" onClick={exportPDF}>
            Export PDF
          </Button>
        </div>

        {!loading && !error && (
          <div className="flex-1 overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Bank</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {transactions.map((t) => {
                  const bank = t.card?.bank_name || t.bank_name || '—'

                  return (
                    <TableRow key={t.id}>
                      <TableCell>
                        {format(new Date(t.created_at), 'MMM dd, yyyy')}
                      </TableCell>

                      <TableCell>{t.type.toUpperCase()}</TableCell>

                      <TableCell>
                        {t.description ||
                          TypeDescription[t.type.toLowerCase()]}
                      </TableCell>

                      <TableCell className="uppercase">{bank}</TableCell>

                      <TableCell
                        className={`text-right font-semibold ${getAmountColor(
                          t.type
                        )}`}
                      >
                        {formatCurrency(t.amount)}
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant={getStatusColor(t.type, t.canceled_at)}
                        >
                          {getStatusLabel(t.type, t.canceled_at)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}