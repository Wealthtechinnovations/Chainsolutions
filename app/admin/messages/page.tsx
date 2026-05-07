'use client'

import { useState, useEffect, useCallback } from 'react'
import { Mail, MailOpen, Trash2, Search, Filter, ChevronLeft, ChevronRight, Eye } from 'lucide-react'

export default function AdminMessages() {
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [filter, setFilter] = useState<'ALL' | 'UNREAD' | 'READ'>('ALL')
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null)

  const fetchMessages = useCallback(async () => {
    setLoading(true)
    try {
      const url = new URL('/api/admin/messages', window.location.origin)
      url.searchParams.set('page', page.toString())
      if (filter !== 'ALL') url.searchParams.set('status', filter)

      const res = await fetch(url.toString())
      if (res.ok) {
        const data = await res.json()
        setMessages(data.messages)
        setTotalPages(data.pagination.pages)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [page, filter])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/admin/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      fetchMessages()
      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, status })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const deleteMessage = async (id: string) => {
    if (!confirm('Supprimer définitivement ce message ?')) return
    try {
      await fetch(`/api/admin/messages/${id}`, { method: 'DELETE' })
      fetchMessages()
      if (selectedMessage?.id === id) setSelectedMessage(null)
    } catch (error) {
      console.error(error)
    }
  }

  const handleViewMessage = async (msg: any) => {
    setSelectedMessage(msg)
    if (msg.status === 'UNREAD') {
      await updateStatus(msg.id, 'READ')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-[#0A1628]">Messages</h1>
        
        <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-gray-200">
          {(['ALL', 'UNREAD', 'READ'] as const).map((f) => (
            <button
              key={f}
              onClick={() => { setFilter(f); setPage(1); }}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-[#0A1628] text-white'
                  : 'text-gray-500 hover:text-[#0A1628] hover:bg-gray-100'
              }`}
            >
              {f === 'ALL' ? 'Tous' : f === 'UNREAD' ? 'Non lus' : 'Lus'}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-12 flex justify-center">
            <div className="w-8 h-8 border-2 border-[#D4A017] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            Aucun message trouvé.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 font-medium">Statut</th>
                  <th className="px-6 py-4 font-medium">Contact</th>
                  <th className="px-6 py-4 font-medium">Sujet</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {messages.map((msg) => (
                  <tr key={msg.id} className={`hover:bg-gray-50 transition-colors ${msg.status === 'UNREAD' ? 'bg-blue-50/30' : ''}`}>
                    <td className="px-6 py-4">
                      {msg.status === 'UNREAD' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          Non lu
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                          Lu
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className={`text-[#0A1628] ${msg.status === 'UNREAD' ? 'font-semibold' : 'font-medium'}`}>
                        {msg.firstName} {msg.lastName}
                      </p>
                      <p className="text-gray-500 text-xs">{msg.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className={`text-[#0A1628] truncate max-w-[200px] lg:max-w-[300px] ${msg.status === 'UNREAD' ? 'font-semibold' : ''}`}>
                        {msg.subject}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(msg.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleViewMessage(msg)}
                          className="p-2 text-gray-400 hover:text-[#0A1628] hover:bg-gray-100 rounded-lg transition-colors" title="Voir">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => updateStatus(msg.id, msg.status === 'UNREAD' ? 'READ' : 'UNREAD')}
                          className="p-2 text-gray-400 hover:text-[#0A1628] hover:bg-gray-100 rounded-lg transition-colors" title="Changer statut">
                          {msg.status === 'UNREAD' ? <MailOpen className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                        </button>
                        <button onClick={() => deleteMessage(msg.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Supprimer">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
            <span className="text-sm text-gray-500">Page {page} sur {totalPages}</span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg border border-gray-200 bg-white text-gray-600 disabled:opacity-50 hover:bg-gray-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-lg border border-gray-200 bg-white text-gray-600 disabled:opacity-50 hover:bg-gray-50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Lecture Message */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h3 className="font-semibold text-[#0A1628]">Détails du message</h3>
              <button onClick={() => setSelectedMessage(null)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">De</p>
                  <p className="font-medium text-[#0A1628]">{selectedMessage.firstName} {selectedMessage.lastName}</p>
                  <a href={`mailto:${selectedMessage.email}`} className="text-[#D4A017] text-sm hover:underline">{selectedMessage.email}</a>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Entreprise / Tel</p>
                  <p className="font-medium text-[#0A1628]">{selectedMessage.company || '-'}</p>
                  <p className="text-gray-600 text-sm">{selectedMessage.phone || '-'}</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Sujet</p>
                <p className="font-semibold text-lg text-[#0A1628]">{selectedMessage.subject}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Message</p>
                <div className="bg-gray-50 rounded-xl p-4 text-gray-700 whitespace-pre-wrap text-sm leading-relaxed border border-gray-100">
                  {selectedMessage.message}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button onClick={() => setSelectedMessage(null)}
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-100">
                Fermer
              </button>
              <a href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                className="px-4 py-2 rounded-lg bg-[#0A1628] text-white text-sm font-medium hover:bg-[#0A1628]/90 flex items-center gap-2">
                <Mail className="w-4 h-4" /> Répondre
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
