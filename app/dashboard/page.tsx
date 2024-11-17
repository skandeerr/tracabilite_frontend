"use client"
import { IRootState } from '@/store';
import dynamic from 'next/dynamic';
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});
export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
  const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
  useEffect(() => {
      setIsMounted(true);
  });
  const items = ['carousel1.jpg', 'carousel2.jpeg', 'carousel3.jpeg'];

  const themeConfig = useSelector((state: IRootState) => state.themeConfig);

  const donutChart: any = {
    series: [44, 55, 13],
    options: {
        chart: {
            height: 300,
            type: 'donut',
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        stroke: {
            show: false,
        },
        labels: ['Team A', 'Team B', 'Team C'],
        colors: ['#4361ee', '#805dca', '#e2a03f'],
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200,
                    },
                },
            },
        ],
        legend: {
            position: 'bottom',
        },
    },
    
};
const lineChart: any = {
  series: [
      {
          name: 'Sales',
          data: [45, 55, 75, 25, 45, 110],
      },
  ],
  options: {
      chart: {
          height: 300,
          type: 'line',
          toolbar: false,
      },
      colors: ['#4361EE'],
      tooltip: {
          marker: false,
          y: {
              formatter(number: number) {
                  return '$' + number;
              },
          },
      },
      stroke: {
          width: 2,
          curve: 'smooth',
      },
      xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
          axisBorder: {
              color: isDark ? '#191e3a' : '#e0e6ed',
          },
      },
      yaxis: {
          opposite: isRtl ? true : false,
          labels: {
              offsetX: isRtl ? -20 : 0,
          },
      },
      grid: {
          borderColor: isDark ? '#191e3a' : '#e0e6ed',
      },
  },
};
  return (

<div className='mt-5'>
<Swiper
                            modules={[Navigation, Pagination]}
                            navigation={{
                                nextEl: '.swiper-button-next-ex1',
                                prevEl: '.swiper-button-prev-ex1',
                            }}
                            pagination={{ clickable: true }}
                            className="swiper mx-auto mb-5 max-w-3xl"
                            id="slider1"
                            dir={themeConfig.rtlClass}
                            key={themeConfig.rtlClass === 'rtl' ? 'true' : 'false'}
                        >
                            <div className="swiper-wrapper">
                                {items.map((item, i) => {
                                    return (
                                        <SwiperSlide key={i}>
                                            <img src={`/assets/images/${item}`} className="max-h-80 w-full object-cover" alt="itemImage" />
                                        </SwiperSlide>
                                    );
                                })}
                            </div>
                            <button className="swiper-button-prev-ex1 absolute top-1/2 z-[999] grid -translate-y-1/2 place-content-center rounded-full border border-primary p-1  text-primary transition hover:border-primary hover:bg-primary hover:text-white ltr:left-2 rtl:right-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rtl:rotate-180">
                                    <path d="M15 5L9 12L15 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <button className="swiper-button-next-ex1 absolute top-1/2 z-[999] grid -translate-y-1/2 place-content-center rounded-full border border-primary p-1  text-primary transition hover:border-primary hover:bg-primary hover:text-white ltr:right-2 rtl:left-2">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="rtl:rotate-180">
                                    <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </Swiper>
                        <div className="bg-white rounded-lg shadow-lg p-8  mx-auto mt-10">
  <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">Turki Métal</h1>

  <div className="flex flex-col md:flex-row justify-between mt-3">

    <div className="md:w-1/2 md:pr-8">
      <p className="text-gray-700 text-lg mb-6">
        La société Turki Métal est une société à responsabilité limitée créée en 1992. 
        Elle est spécialisée dans le découpage, le refondage, le profilage et la perforation de tous types de métal, ainsi qu’à la fabrication de tubes en acier.
      </p>
      <p className="text-gray-700 text-lg mb-6">
        Appartenant au groupe Turki initié par feu Ali Turki dans les années 70, la société a été transmise à ses héritiers après son décès à la fin des années 90, sous la direction de M. Mounir Turki. Aujourd’hui, Turki Métal est une référence dans la transformation de l’acier et commercialise ses produits en Afrique du Nord et Centrale.
      </p>
    </div>

    <div className="md:w-1/2 text-left md:text-right mt-8 md:mt-0">
      <h2 className="text-2xl font-semibold text-gray-800">Contact</h2>
      <p className="text-gray-700 mt-4">
        <strong>Adresse :</strong> Route de Gabès Km 1.5, Sfax, Tunisie, CP 3003
      </p>
      <p className="text-gray-700 mt-2">
        <strong>Tél. :</strong> (+216) 74 453 020
      </p>
      <p className="text-gray-700 mt-2">
        <strong>Fax :</strong> (+216) 74 453 995
      </p>
      <p className="text-gray-700 mt-2">
        <strong>Email :</strong> <a href="mailto:turkimetal@gturki.com.tn" className="text-blue-500">turkimetal@gturki.com.tn</a>
      </p>
    </div>

  </div>
</div>

                        </div>
  )
}
