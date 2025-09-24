import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Ambil foto dari Supabase
  const fetchPhotos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('gallery_photos')
      .select('*')
      .order('uploadedAt', { ascending: false });

    if (error) {
      console.error('Error fetching photos:', error);
    } else {
      setPhotos(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  // Unggah foto baru
  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Silakan pilih file terlebih dahulu.');
      return;
    }

    setUploading(true);
    const fileName = `${Date.now()}-${file.name}`;
    
    // Unggah file ke Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('gallery-bucket')
      .upload(fileName, file);

    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      alert('Gagal mengunggah foto. Silakan coba lagi.');
      setUploading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from('gallery-bucket')
      .getPublicUrl(fileName);

    const photoUrl = publicUrlData.publicUrl;

    // Simpan URL foto ke database
    const { data: insertData, error: insertError } = await supabase
      .from('gallery_photos')
      .insert([
        { photo_url: photoUrl, title: 'Foto Baru', description: 'Deskripsi opsional' }
      ]);

    if (insertError) {
      console.error('Error saving to database:', insertError);
      alert('Foto berhasil diunggah, tapi gagal menyimpan ke database.');
    } else {
      alert('Foto berhasil diunggah!');
      setFile(null);
      fetchPhotos(); // Muat ulang foto setelah berhasil
    }
    setUploading(false);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } }
    ]
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-4 border-b-2 border-primary-green pb-2">Galeri Kelas</h3>
      
      {/* Bagian Carousel */}
      {loading ? (
        <p className="text-center">Memuat foto...</p>
      ) : photos.length > 0 ? (
        <Slider {...settings} className="mb-8">
          {photos.map((photo) => (
            <div key={photo.id} className="px-2">
              <img 
                src={photo.photo_url} 
                alt={photo.title} 
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center text-gray-500 mb-8">Belum ada foto di galeri. Unggah foto pertamamu!</p>
      )}

      {/* Bagian Upload Foto */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <h4 className="text-xl font-semibold mb-4">Unggah Foto Baru</h4>
        <form onSubmit={handleFileUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Pilih Foto</label>
            <input 
              type="file" 
              accept=".jpg,.jpeg,.png,.webp" 
              onChange={(e) => setFile(e.target.files[0])} 
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-secondary-blue file:text-white
                hover:file:bg-blue-600"
            />
          </div>
          <button 
            type="submit" 
            disabled={uploading}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-green hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-green disabled:opacity-50"
          >
            {uploading ? 'Mengunggah...' : 'Unggah Foto'}
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-2">
          Didukung format JPG, PNG, dan WEBP.
        </p>
      </div>
    </div>
  );
};

export default Gallery;
