import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js';

// Rejestracja niezbędnych elementów w Chart.js
ChartJS.register(
  CategoryScale,   // Skala kategoryczna (dla osi X)
  LinearScale,     // Skala liniowa (dla osi Y)
  BarElement,      // Element słupkowy
  Title,           // Tytuł wykresu
  Tooltip,         // Narzędzie podpowiedzi
  Legend           // Legenda
);

// Przykładowe dane wykresu z grupami słupków
const chartData = {
  labels: ['Accounts', 'Deposits', 'Loans'],  // Kategorii (oś X)
  datasets: [
    {
      label: 'Current',
      data: [5000, 0, 0],  // Wartości dla "Current Account"
      backgroundColor: 'rgba(0, 148, 157, 0.7)',  // Kolor dla "Current Account"
      barPercentage: 0.8,  // Zwiększona szerokość słupków
      categoryPercentage: 1,  // Pełne wykorzystanie dostępnej szerokości dla grupy
    },
    {
      label: 'Savings',
      data: [15000, 0, 0],  // Wartości dla "Savings Account"
      backgroundColor: 'rgba(255, 99, 132, 0.7)',  // Kolor dla "Savings Account"
      barPercentage: 0.8,
      categoryPercentage: 1,
    },
    {
      label: '3-month Deposit',
      data: [0, 10000, 0],  // Wartości dla "3-month Deposit"
      backgroundColor: 'rgba(54, 162, 235, 0.7)',  // Kolor dla "3-month Deposit"
      barPercentage: 0.8,
      categoryPercentage: 1,
    },
    {
      label: '6-month Deposit',
      data: [0, 15000, 0],  // Wartości dla "6-month Deposit"
      backgroundColor: 'rgba(75, 192, 192, 0.7)',  // Kolor dla "6-month Deposit"
      barPercentage: 0.8,
      categoryPercentage: 1,
    },
    {
      label: 'Mortgage Loan',
      data: [0, 0, 2000],  // Wartości dla "Mortgage Loan"
      backgroundColor: 'rgba(153, 102, 255, 0.7)',  // Kolor dla "Mortgage Loan"
      barPercentage: 0.8,
      categoryPercentage: 1,
    },
    {
      label: 'Personal Loan',
      data: [0, 0, 10000],  // Wartości dla "Personal Loan"
      backgroundColor: 'rgba(255, 159, 64, 0.7)',  // Kolor dla "Personal Loan"
      barPercentage: 0.8,
      categoryPercentage: 1,
    },
  ],
};

// Opcje wykresu z grupowaniem słupków
const options: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,  // Wykres nie utrzyma proporcji, dostosuje się do kontenera
  aspectRatio: 2,              // Określa stosunek szerokości do wysokości (opcjonalne)
  plugins: {
    legend: {
      position: 'right',  // Zmieniono pozycję legendy na prawą stronę
      labels: {
        usePointStyle: true, // Używa okrągłych symboli w legendzie
        boxWidth: 20,        // Ustala rozmiar symboli w legendzie
      },
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          return `${context.dataset.label}: ${context.raw} EUR`;  // Formatowanie tooltipa
        },
      },
    },
  },
  scales: {
    x: {
      beginAtZero: true,  // Rozpoczynanie osi X od zera
      stacked: false,    // Wyłączenie zgrupowania słupków w pionie
      grid: {
        display: false,  // Ukrywanie siatki na osi X
      },
    },
    y: {
      beginAtZero: true,  // Rozpoczynanie osi Y od zera
      stacked: false,    // Włączenie osobnych słupków dla każdej kategorii
    },
  },
};

const AccountSummaryWidget = () => {
  const [isModalOpen, setModalOpen] = useState(false); // Stan do obsługi otwarcia modalu
  const [isDarkBackground, setDarkBackground] = useState(false); // Stan do zarządzania ciemnym tłem

  // Funkcja do otwierania modalu
  const openModal = () => {
    setDarkBackground(true);  // Ustawienie ciemnego tła
    setModalOpen(true);  // Otwieranie modalu
  };

  // Funkcja do zamykania modalu
  const closeModal = () => {
    setDarkBackground(false);  // Przywracenie normalnego tła
    setModalOpen(false);  // Zamknięcie modalu
  };

  useEffect(() => {
    return () => {
      // Można dodać czyszczenie po wykresie lub inne operacje po unmount
    };
  }, []);

  return (
    <>
      {/* Tło, które będzie ciemniało po kliknięciu */}
      {isDarkBackground && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50"></div>
      )}

      {/* Główny widget */}
      <div className="p-6 bg-commerzBrightGreen text-commerzBlue max-w-7x1 mx-auto rounded-lg shadow-lg cursor-pointer " onClick={openModal}>
        <h2 className="text-2xl font-bold mb-4">Account Summary</h2>
        {/* Wykres wyświetlający dane */}
        <div className="mb-6">
          <Bar data={chartData} options={options} />
        </div>
      </div>

      {/* Modal z powiększonym wykresem */}
      {isModalOpen && (
        <div className="fixed top-1/4 left-1/4 w-1/2 h-1/2 bg-white p-6 rounded-lg shadow-lg z-50">
          <h2 className="text-2xl font-bold mb-4">Expanded Account Summary</h2>
          <div className="mb-6">
            <Bar data={chartData} options={options} />
          </div>
          <button onClick={closeModal} className="bg-commerzBlue text-white px-4 py-2 rounded-lg">Close</button>
        </div>
      )}
    </>
  );
};

export default AccountSummaryWidget;
