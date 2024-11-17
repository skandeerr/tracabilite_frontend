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
import Dropdown from '@/components/Dropdown';
import { getBandesLivraisonsStatistic } from '../../api/BandeLivraison';
import { useRouter } from 'next/navigation';
import { getAllPersonnels } from '../../api/effectif';
import { getBandesCommandes } from '../../api/bandeCommande';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});
export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [personnels, setPersonnels] = useState<any[]>([]);
  const [bandeCommande, setbandeCommandes] = useState<any[]>([]);

  const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
  const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
  const [salesByCategory, setsalesByCategory] = useState<any>({ series: [0, 0, 0],
    options: {
        chart: {
            type: 'donut',
            height: 460,
            fontFamily: 'Nunito, sans-serif',
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 25,
            colors: isDark ? '#0e1726' : '#fff',
        },
        colors: isDark ? ['#5c1ac3', '#e2a03f', '#e7515a', '#e2a03f'] : ['#e2a03f', '#5c1ac3', '#e7515a'],
        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            fontSize: '14px',
            markers: {
                width: 10,
                height: 10,
                offsetX: -2,
            },
            height: 50,
            offsetY: 20,
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '65%',
                    background: 'transparent',
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '29px',
                            offsetY: -10,
                        },
                        value: {
                            show: true,
                            fontSize: '26px',
                            color: isDark ? '#bfc9d4' : undefined,
                            offsetY: 16,
                            formatter: (val: any) => {
                                return val;
                            },
                        },
                        total: {
                            show: true,
                            label: 'Total',
                            color: '#888ea8',
                            fontSize: '29px',
                            formatter: (w: any) => {
                                return w.globals.seriesTotals.reduce(function (a: any, b: any) {
                                    return a + b;
                                }, 0);
                            },
                        },
                    },
                },
            },
        },
        labels: ['Terminer', 'En cours', 'Nouveau'],
        states: {
            hover: {
                filter: {
                    type: 'none',
                    value: 0.15,
                },
            },
            active: {
                filter: {
                    type: 'none',
                    value: 0.15,
                },
            },
        },
}});
  const router = useRouter()

  useEffect(() => {
      setIsMounted(true);
  });
  const getAllBandesCommandes =()=>{
    getBandesCommandes()
    .then(res=>{
     console.log(res)
     if(res){
        setbandeCommandes(res)
        
        
     }
    })
    .catch(error=>{

    }) 
}
  useEffect(() => {
    getAllBandesCommandes()
    getAllPersonnels()
    
    .then(res=>{

     console.log(res)
     if(res){
       setPersonnels(res)
     }
    })
    .catch(error=>{
        console.log(error)
        if ( error === 401) {
            router.push("/login");  
        } 
    })
}, []);
// const salesByCategory: any = {
//     series: [985, 737, 270],
//     options: {
//         chart: {
//             type: 'donut',
//             height: 460,
//             fontFamily: 'Nunito, sans-serif',
//         },
//         dataLabels: {
//             enabled: false,
//         },
//         stroke: {
//             show: true,
//             width: 25,
//             colors: isDark ? '#0e1726' : '#fff',
//         },
//         colors: isDark ? ['#5c1ac3', '#e2a03f', '#e7515a', '#e2a03f'] : ['#e2a03f', '#5c1ac3', '#e7515a'],
//         legend: {
//             position: 'bottom',
//             horizontalAlign: 'center',
//             fontSize: '14px',
//             markers: {
//                 width: 10,
//                 height: 10,
//                 offsetX: -2,
//             },
//             height: 50,
//             offsetY: 20,
//         },
//         plotOptions: {
//             pie: {
//                 donut: {
//                     size: '65%',
//                     background: 'transparent',
//                     labels: {
//                         show: true,
//                         name: {
//                             show: true,
//                             fontSize: '29px',
//                             offsetY: -10,
//                         },
//                         value: {
//                             show: true,
//                             fontSize: '26px',
//                             color: isDark ? '#bfc9d4' : undefined,
//                             offsetY: 16,
//                             formatter: (val: any) => {
//                                 return val;
//                             },
//                         },
//                         total: {
//                             show: true,
//                             label: 'Total',
//                             color: '#888ea8',
//                             fontSize: '29px',
//                             formatter: (w: any) => {
//                                 return w.globals.seriesTotals.reduce(function (a: any, b: any) {
//                                     return a + b;
//                                 }, 0);
//                             },
//                         },
//                     },
//                 },
//             },
//         },
//         labels: ['Apparel', 'Sports', 'Others'],
//         states: {
//             hover: {
//                 filter: {
//                     type: 'none',
//                     value: 0.15,
//                 },
//             },
//             active: {
//                 filter: {
//                     type: 'none',
//                     value: 0.15,
//                 },
//             },
//         },
//     },
// };
useEffect(() => {
    getBandesLivraisonsStatistic()
    
    .then(res=>{

     console.log(res)
     if(res){
        setsalesByCategory({ series: [res.TERMINETED, res.PROCESS, res.NEW],
            options: {
                chart: {
                    type: 'donut',
                    height: 460,
                    fontFamily: 'Nunito, sans-serif',
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    show: true,
                    width: 25,
                    colors: isDark ? '#0e1726' : '#fff',
                },
                colors: isDark ? ['#5c1ac3', '#e2a03f', '#e7515a', '#e2a03f'] : ['#e2a03f', '#5c1ac3', '#e7515a'],
                legend: {
                    position: 'bottom',
                    horizontalAlign: 'center',
                    fontSize: '14px',
                    markers: {
                        width: 10,
                        height: 10,
                        offsetX: -2,
                    },
                    height: 50,
                    offsetY: 20,
                },
                plotOptions: {
                    pie: {
                        donut: {
                            size: '65%',
                            background: 'transparent',
                            labels: {
                                show: true,
                                name: {
                                    show: true,
                                    fontSize: '29px',
                                    offsetY: -10,
                                },
                                value: {
                                    show: true,
                                    fontSize: '26px',
                                    color: isDark ? '#bfc9d4' : undefined,
                                    offsetY: 16,
                                    formatter: (val: any) => {
                                        return val;
                                    },
                                },
                                total: {
                                    show: true,
                                    label: 'Total',
                                    color: '#888ea8',
                                    fontSize: '29px',
                                    formatter: (w: any) => {
                                        return w.globals.seriesTotals.reduce(function (a: any, b: any) {
                                            return a + b;
                                        }, 0);
                                    },
                                },
                            },
                        },
                    },
                },
                labels: ['Terminer', 'En cours', 'Nouveau'],
                states: {
                    hover: {
                        filter: {
                            type: 'none',
                            value: 0.15,
                        },
                    },
                    active: {
                        filter: {
                            type: 'none',
                            value: 0.15,
                        },
                    },
                },
     }})
     }
    })
    .catch(error=>{
        console.log(error)
        if ( error === 401) {
            router.push("/login");  
        } 
    })
}, []);
  return (

<div className='mt-5'>
<div className="mb-6 grid grid-cols-1 gap-6 text-white sm:grid-cols-2 xl:grid-cols-4">
                    <div className="panel bg-gradient-to-r from-cyan-500 to-cyan-400">
                        <div className="flex justify-between">
                            <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Administrateur</div>
                            
                        </div>
                        <div className="mt-5 flex items-center">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> {personnels.filter((f:any)=>f.role==="ADMIN").length} </div>
                        </div>
                   
                    </div>

                    {/* Sessions */}
                    <div className="panel bg-gradient-to-r from-violet-500 to-violet-400">
                        <div className="flex justify-between">
                            <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Responsable Production</div>
                         
                        </div>
                        <div className="mt-5 flex items-center">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> {personnels.filter((f:any)=>f.role==="RESPONSABLE_PRODUCTION").length} </div>
                        </div>
                     
                    </div>

                    {/*  Time On-Site */}
                    <div className="panel bg-gradient-to-r from-blue-500 to-blue-400">
                        <div className="flex justify-between">
                            <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Chef projet</div>
                         
                        </div>
                        <div className="mt-5 flex items-center">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> {personnels.filter((f:any)=>f.role==="CHEF_EQUIPE").length} </div>
                        </div>
                     
                    </div>

                    {/* Bounce Rate */}
                    <div className="panel bg-gradient-to-r from-fuchsia-500 to-fuchsia-400">
                        <div className="flex justify-between">
                            <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Bande Commande</div>
                           
                        </div>
                        <div className="mt-5 flex items-center">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> {bandeCommande.length} </div>
                        </div>
                  
                    </div>
                </div>
                <div className="panel h-full">
                            <div className="mb-5 flex items-center">
                                <h5 className="text-lg font-semibold dark:text-white-light">Bande Livraison</h5>
                            </div>
                            <div>
                                <div className="rounded-lg bg-white dark:bg-black">
                                    {isMounted ? (
                                        <ReactApexChart series={salesByCategory.series} options={salesByCategory.options} type="donut" height={460} width={'100%'} />
                                    ) : (
                                        <div className="grid min-h-[325px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                                            <span className="inline-flex h-5 w-5 animate-spin rounded-full  border-2 border-black !border-l-transparent dark:border-white"></span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        </div>
  )
}
