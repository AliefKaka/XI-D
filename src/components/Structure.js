import React from 'react';

const Structure = () => {
  const classStructure = [
    { title: "Wali Kelas", name: "Saidatul A'yun, S.Ag", role: "Wali Kelas", children: [] },
    {
      title: "Ketua Kelas",
      name: "Dodik",
      role: "Ketua",
      children: [
        { title: "Wakil Ketua", name: "Firla", role: "Wakil Ketua" },
        {
          title: "Sekretaris",
          name: "Annisa (1), Farichan (2)",
          role: "Sekretaris",
          children: []
        },
        {
          title: "Bendahara",
          name: "Firsha (1), Hendrico (2)",
          role: "Bendahara",
          children: []
        }
      ]
    }
  ];

  const renderStructure = (items) => {
    return (
      <ul className="list-none p-0">
        {items.map((item, index) => (
          <li key={index} className="relative py-2 pl-6">
            <div className="bg-light-blue border-l-4 border-secondary-blue p-3 rounded-md shadow-sm">
              <h4 className="font-bold text-lg">{item.title}</h4>
              <p className="text-sm">{item.name}</p>
            </div>
            {item.children && item.children.length > 0 && (
              <div className="pl-6 pt-2 border-l border-gray-300 ml-3">
                {renderStructure(item.children)}
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-4 border-b-2 border-primary-green pb-2">Struktur Kelas</h3>
      {renderStructure(classStructure)}
    </div>
  );
};

export default Structure;
