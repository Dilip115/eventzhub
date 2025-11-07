import React, { useState } from 'react';
import { BACKEND } from '../api';

type Booking = {
  id: number;
  name: string;
  eventType: string;
  eventDate: string;
  email: string;
  phone: string;
  status: string;
  created_at: string;
}

const Admin: React.FC = () => {
  const [pass, setPass] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [msg, setMsg] = useState('');

  async function load() {
    setMsg('Loading...');
    const res = await fetch(`${BACKEND}/api/bookings?adminPassword=${encodeURIComponent(pass)}`);
    if(res.status === 401) { setMsg('Unauthorized'); return; }
    const data = await res.json();
    setBookings(data);
    setMsg('');
  }

  async function setStatus(id:number, confirm:boolean) {
    const res = await fetch(`${BACKEND}/api/bookings/${id}/confirm`, {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ confirm, adminPassword: pass })
    });
    if(res.ok) {
      await load();
    } else {
      setMsg('Action failed');
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Admin — Recent Bookings</h2>
      <div className="flex items-center gap-2">
        <input placeholder="Admin password" type="password" value={pass} onChange={e => setPass(e.target.value)} className="p-2 border rounded" />
        <button onClick={load} className="px-3 py-2 bg-indigo-600 text-white rounded">Load</button>
        <span className="text-sm text-gray-500">{msg}</span>
      </div>

      <div className="space-y-2">
        {bookings.map(b => (
          <div key={b.id} className="p-3 bg-white rounded shadow flex justify-between">
            <div>
              <div className="font-semibold">{b.name} — {b.eventType}</div>
              <div className="text-sm text-gray-600">Date: {b.eventDate} — {b.email} — {b.phone}</div>
              <div className="text-xs text-gray-500">Status: {b.status}</div>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={() => setStatus(b.id, true)} className="px-2 py-1 bg-green-500 text-white rounded">Confirm</button>
              <button onClick={() => setStatus(b.id, false)} className="px-2 py-1 bg-red-500 text-white rounded">Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
