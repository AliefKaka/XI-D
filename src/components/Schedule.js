import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/id';

dayjs.locale('id');

const allSchedules = {
  senin: {
    pelajaran: [
      { time: '06:45 - 07:25', subject: 'UPACARA' },
      { time: '07:25 - 08:05', subject: 'KIM - Achmad Fatony, S. Pd' },
      // ... tambahkan jadwal hari Senin lainnya
    ],
    piket: ['HYUGA', 'DODIK', 'ILHAM', 'BILQIS', 'FARAH', 'AQILA', 'FANY'],
  },
  selasa: {
    pelajaran: [
      { time: '06:45 - 08:05', subject: 'BADER - Nur Fadilah, S. Pd' },
      // ... tambahkan jadwal hari Selasa lainnya
    ],
    piket: ['NUR', 'ALAN', 'TYO', 'FARICHAN', 'FIRSHA', 'SARISMA', 'DINI'],
  },
  // ... tambahkan jadwal untuk Rabu, Kamis, dan Jumat
  rabu: {
    pelajaran: [
      { time: '06:45 - 08:05', subject: 'BIG - Zaenah Naili Su\'ad, S.Pd.' },
      // ...
    ],
    piket: ['AKBAR', 'ALIF', 'RAFI', 'HENDRICO', 'FIRLA', 'DWITA', 'KHANYA'],
  },
  kamis: {
    pelajaran: [
      { time: '06:45 - 08:05', subject: 'KIM - Achmad Fatony, S. Pd' },
      // ...
    ],
    piket: ['DEIGA', 'KHALFANY', 'RAFI ISL', 'ANISA', 'INTAN', 'CILLA', 'NABILA'],
  },
  jumat: {
    pelajaran: [
      { time: '06:45 - 08:05', subject: 'BIO - Indinah Dwi Wahyu P, S.Pd' },
      // ...
    ],
    piket: ['CANDIKA', 'FARDAN', 'DAFFA', 'ADRIAN', 'FIZA', 'TALITHA', 'AYZIRA', 'NAJWA'],
  },
};

const Schedule = () => {
  const [currentDay, setCurrentDay] = useState('');
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    const today = dayjs().format('dddd').toLowerCase();
    setCurrentDay(today);

    if (allSchedules[today]) {
      setSchedule(allSchedules[today]);
    } else {
      setSchedule(null); // Ini untuk hari Sabtu dan Minggu
    }
  }, []);

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-4 border-b-2 border-primary-green pb-2">Jadwal Hari Ini</h3>
      <p className="text-lg font-semibold capitalize mb-4">
        {currentDay ? `Hari: ${currentDay}` : 'Hari ini adalah hari libur'}
      </p>

      {schedule ? (
        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Jadwal Pelajaran */}
          <div className="md:w-1/2">
            <h4 className="font-bold text-xl mb-2">Jadwal Pelajaran</h4>
            <ul className="space-y-2">
              {schedule.pelajaran.map((lesson, index) => (
                <li key={index} className="p-3 bg-white rounded-md shadow-sm">
                  <span className="font-bold text-secondary-blue mr-2">{lesson.time}</span>
                  <span>{lesson.subject}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Jadwal Piket */}
          <div className="md:w-1/2 mt-8 md:mt-0">
            <h4 className="font-bold text-xl mb-2">Jadwal Piket</h4>
            <ul className="space-y-2">
              {schedule.piket.map((name, index) => (
                <li key={index} className="p-2 bg-white rounded-md shadow-sm">{name}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p className="text-center text-xl mt-8">LIBUR</p>
      )}
    </div>
  );
};

export default Schedule;
