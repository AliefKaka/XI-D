import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import dayjs from 'dayjs';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [senderName, setSenderName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [profileColor, setProfileColor] = useState('#2563EB'); // Default color is secondary-blue

  // Ambil pesan dari Supabase
  const fetchMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) {
      console.error('Error fetching messages:', error);
    } else {
      setMessages(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Kirim pesan baru
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const finalName = isAnonymous ? 'Anonim' : senderName || 'Pengirim Rahasia';
    const finalColor = isAnonymous ? '#3B826A' : profileColor; // Anonymous sender uses primary-green color

    const { data, error } = await supabase
      .from('messages')
      .insert([
        { 
          sender_name: finalName, 
          message: newMessage, 
          is_anonymous: isAnonymous,
          profile_color: finalColor
        }
      ]);

    if (error) {
      console.error('Error sending message:', error);
      alert('Gagal mengirim pesan. Silakan coba lagi.');
    } else {
      setNewMessage('');
      setSenderName('');
      setIsAnonymous(false);
      fetchMessages(); // Muat ulang pesan setelah berhasil
    }
  };
  
  // Fungsi untuk mendapatkan warna acak
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-4 border-b-2 border-primary-green pb-2">Pesan Untuk Kelas</h3>
      
      {/* Form Pengiriman Pesan */}
      <form onSubmit={handleSubmit} className="mb-8 p-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="anonymous-checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="form-checkbox h-4 w-4 text-primary-green border-gray-300 rounded"
          />
          <label htmlFor="anonymous-checkbox" className="ml-2 text-sm text-gray-700">Kirim sebagai Anonim</label>
        </div>

        {!isAnonymous && (
          <div className="mb-4">
            <label htmlFor="sender-name" className="block text-sm font-medium text-gray-700">Nama</label>
            <input
              type="text"
              id="sender-name"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="Nama kamu (opsional)"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary-blue focus:ring focus:ring-secondary-blue focus:ring-opacity-50"
            />
          </div>
        )}
        
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Pesan</label>
          <textarea
            id="message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            rows="3"
            required
            placeholder="Tulis pesanmu di sini..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary-blue focus:ring focus:ring-secondary-blue focus:ring-opacity-50"
          ></textarea>
        </div>
        
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-green hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-green"
        >
          Kirim Pesan
        </button>
      </form>

      {/* Daftar Pesan */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {loading ? (
          <p className="text-center text-gray-500">Memuat pesan...</p>
        ) : messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg.id} className="p-4 bg-white rounded-lg shadow-sm border-l-4" style={{ borderColor: msg.profile_color }}>
              <div className="flex items-center mb-1">
                <span className="font-bold text-gray-800">{msg.sender_name}</span>
                <span className="ml-auto text-xs text-gray-500">
                  {dayjs(msg.createdAt).format('DD MMMM YYYY [pukul] HH:mm')}
                </span>
              </div>
              <p className="text-gray-600">{msg.message}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Belum ada pesan. Kirim pesan pertamamu!</p>
        )}
      </div>
    </div>
  );
};

export default Messages;
