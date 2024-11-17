"use client"
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { useParams, useRouter } from 'next/navigation';
import { getLivraisonById } from '@/app/dashboard/api/BandeLivraison';
import { useReactToPrint } from 'react-to-print';

const Details = () => {
    const { id } = useParams();
    const [livraison, setlivraison] = useState<any>();
    const router = useRouter()
    const tableRef = useRef<HTMLDivElement>(null); // Typage spécifique pour TypeScript
    const handlePrint = useReactToPrint({
        print: () => tableRef.current as any, // Vérifie bien que l'élément existe
      });
    const exportTable = () => {
        window.print();
    };
    useEffect(() => {
        if(id!=undefined){
            getLivraison(id)
        }
    }, [id]);
    const getLivraison =(id:any)=>{
        getLivraisonById(id)
        
        .then(res=>{

         console.log(res)
         if(res){
            setlivraison(res)
         }
        })
        .catch(error=>{
            console.log(error)
            if ( error === 401) {
                router.push("/login");  
            } 
        })
    }
    const items = [
        {
            id: 1,
            title: 'Calendar App Customization',
            quantity: 1,
            price: '120',
            amount: '120',
        },
        {
            id: 2,
            title: 'Chat App Customization',
            quantity: 1,
            price: '230',
            amount: '230',
        },
        {
            id: 3,
            title: 'Laravel Integration',
            quantity: 1,
            price: '405',
            amount: '405',
        },
        {
            id: 4,
            title: 'Backend UI Design',
            quantity: 1,
            price: '2500',
            amount: '2500',
        },
    ];

    const columns = [
        {
            key: 'id',
            label: 'Id',
        },
        {
            key: 'Article',
            label: 'Article',
        },
        {
            key: 'Quantite',
            label: 'Quantite',
        },
        {
            key: 'Tonnage total',
            label: 'Tonnage total',
        },
        
    ];

    return (
        <div ref={tableRef}>
            <div className="mb-6 flex flex-wrap items-center justify-center gap-4 lg:justify-end">
             

                <button type="button" className="btn btn-primary gap-2" onClick={() => exportTable()}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6 17.9827C4.44655 17.9359 3.51998 17.7626 2.87868 17.1213C2 16.2426 2 14.8284 2 12C2 9.17157 2 7.75736 2.87868 6.87868C3.75736 6 5.17157 6 8 6H16C18.8284 6 20.2426 6 21.1213 6.87868C22 7.75736 22 9.17157 22 12C22 14.8284 22 16.2426 21.1213 17.1213C20.48 17.7626 19.5535 17.9359 18 17.9827"
                            stroke="currentColor"
                            strokeWidth="1.5"
                        />
                        <path opacity="0.5" d="M9 10H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M19 14L5 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path
                            d="M18 14V16C18 18.8284 18 20.2426 17.1213 21.1213C16.2426 22 14.8284 22 12 22C9.17157 22 7.75736 22 6.87868 21.1213C6 20.2426 6 18.8284 6 16V14"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                        <path
                            opacity="0.5"
                            d="M17.9827 6C17.9359 4.44655 17.7626 3.51998 17.1213 2.87868C16.2427 2 14.8284 2 12 2C9.17158 2 7.75737 2 6.87869 2.87868C6.23739 3.51998 6.06414 4.44655 6.01733 6"
                            stroke="currentColor"
                            strokeWidth="1.5"
                        />
                        <circle opacity="0.5" cx="17" cy="10" r="1" fill="currentColor" />
                        <path opacity="0.5" d="M15 16.5H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path opacity="0.5" d="M13 19H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    Print
                </button>

            </div>
            <div className="panel">
                <div className="flex flex-wrap justify-between gap-4 px-4">
                    <div className="text-2xl font-semibold uppercase">Turki Metal</div>
                    
                </div>
                <div className="px-4 ltr:text-right rtl:text-left">
                    <div className="mt-6 space-y-1 text-white-dark">
                        <div>Route de Gabès km 4.5 Sfax, Thyna 3052</div>
                        <div>turkimetal@gturki.com.tn</div>
                        <div>74 453 020</div>
                    </div>
                </div>

                <hr className="my-6 border-white-light dark:border-[#1b2e4b]" />
                <div className="flex flex-col flex-wrap justify-between gap-6 lg:flex-row">
                    <div className="flex-1">
                        <div className="space-y-1 text-white-dark">
                            <div>Client : </div>
                            <div className="font-semibold text-black dark:text-white">{livraison?.bandeCommande?.client?.nom} {livraison?.bandeCommande?.client?.prenom}</div>
                            <div>{livraison?.bandeCommande?.client?.adresse}</div>
                            <div>{livraison?.bandeCommande?.client?.email}</div>
                            <div>{livraison?.bandeCommande?.client?.numero}</div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between gap-6 sm:flex-row lg:w-2/3">
                        <div className="xl:1/3 sm:w-1/2 lg:w-2/5">
                            <div className="mb-2 flex w-full items-center justify-between">
                                <div className="text-white-dark">Bande Commande :</div>
                                <div>{livraison?.bandeCommande?.designation}</div>
                            </div>
                            <div className="mb-2 flex w-full items-center justify-between">
                                <div className="text-white-dark">Date début :</div>
                                <div>{livraison?.bandeCommande?.startDate}</div>
                            </div>
                            <div className="mb-2 flex w-full items-center justify-between">
                                <div className="text-white-dark">Date fin</div>
                                <div>{livraison?.bandeCommande?.endDate}</div>
                            </div>
                           
                        </div>
                        <div className="xl:1/3 sm:w-1/2 lg:w-2/5">
                            <div className="mb-2 flex w-full items-center justify-between">
                                <div className="text-white-dark">Article:</div>
                                <div className="whitespace-nowrap">{livraison?.article?.designation}</div>
                            </div>
                            <div className="mb-2 flex w-full items-center justify-between">
                                <div className="text-white-dark">Code:</div>
                                <div>{livraison?.article?.code}</div>
                            </div>
                            <div className="mb-2 flex w-full items-center justify-between">
                                <div className="text-white-dark">Longeur :</div>
                                <div>{livraison?.article?.longeur} m</div>
                            </div>
                            <div className="mb-2 flex w-full items-center justify-between">
                                <div className="text-white-dark">Largeur:</div>
                                <div>{livraison?.article?.largeur} m</div>
                            </div>
                            <div className="mb-2 flex w-full items-center justify-between">
                                <div className="text-white-dark">Epaisseur :</div>
                                <div>{livraison?.article?.epaisseur} m</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="table-responsive mt-6">
                    <table className="table-striped">
                        <thead>
                            <tr>
                                {columns.map((column) => {
                                    return (
                                        <th key={column.key}>
                                            {column.label}
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                          
                                    <tr key={livraison?.id}>
                                    <td>{livraison?.id}</td>
                                        <td>{livraison?.article?.designation}</td>
                                        <td>{livraison?.quantite}</td>
                                        <td>{livraison?.quantite * livraison?.article?.tonnage} </td>
                                    </tr>
                                
                        </tbody>
                    </table>
                </div>
              
            </div>
        </div>
    );
};

export default Details;
