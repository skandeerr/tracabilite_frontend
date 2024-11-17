"use client"
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { downloadExcel } from 'react-export-table-to-excel';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../../store/themeConfigSlice';
import { getClients, saveClient } from '@/app/dashboard/api/clients';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { getMachines } from '@/app/dashboard/api/machine';
import Select from 'react-select';
import { machine } from 'os';
import { getAllPersonnels, savePersonnel } from '@/app/dashboard/api/effectif';
import { getArticles } from '@/app/dashboard/api/article';
import { saveBandeCommande } from '@/app/dashboard/api/bandeCommande';
import { savebandeLivraison } from '@/app/dashboard/api/BandeLivraison';




const AddPersonnel = () => {
    const [hasChange, setHasChange] = useState(false);
    const [optionArticle, setOptionArticle] = useState<any[]>([]);
    const [optionPersonnels, setOptionPersonnels] = useState<any[]>([]);
    const [optionClient, setOptionClient] = useState<any[]>([]);

    const [itemsLivraison, setItemsLivraison] = useState<any[]>([{
        id:1,
        articleId :0,
        quantite : 0
    }]);

    

    const router = useRouter()
    const [bandeCommande,setbandeCommande] = useState({
        startDate : "",
        endDate : "",
        designation : "",
        personnelId :0,
        client :0,
        bandeCommandeStatus : ""
    })
    const allItemsFilled = (): boolean => {
        return itemsLivraison.every(item => item.articleId !== 0 && item.quantite !== 0);
      };
    const getAllClient=()=>{
        getClients()
        
        .then(res=>{

         console.log(res)
         if(res){
           let opt :any[]=[]
           res.map((p:any)=>{
            opt.push({
                label:p.nom+" "+p.prenom,
                value:p.nom+" "+p.prenom,
                id:p.id
            })
           })
           setOptionClient(opt)
         }
        })
        .catch(error=>{
            console.log(error)
            if ( error === 401) {
                router.push("/login");  
            } 
        })
    }
    useEffect(() => {
        getArticles()
        .then(res=>{
         if(res){
            let opt:any[]=[]
            res.map((p:any)=>{
                opt.push({
                    label:p.designation,
                    value:p.designation,
                    id:p.id
                })
            })
            setOptionArticle(opt)
         }
        })
        .catch(error=>{
 
        }) 
        getAllClient()
    }, []);
    const addItem=()=>{
        setItemsLivraison([...itemsLivraison,{
            id:itemsLivraison.length+1,
            articleId :0,
            quantite : 0
        }])
    }
    const addLivraisons =(idbandeCommande:any)=>{
        let finalList :any[]=[]
        itemsLivraison.map((item:any)=>{
            finalList.push({
                bandeCommandeId:idbandeCommande,
                articleId : item.articleId,
                quantite : item.quantite,
                bandeLivraisonStatus : "NEW"
            })
        })
        savebandeLivraison(finalList)
        .then(res=>{
         if(res){     
            showMessage('Bande Commande ajoutée avec success.');
            router.push("/dashboard/bandeCommande/bandeCommandes")
         }
        })
        .catch(error=>{
            if (error.response && error.response.status === 401) {
                router.push("/login");  
            } 
        })
    }
    const addSubmit=()=>{
        if(allItemsFilled() && bandeCommande.designation!="" && bandeCommande.startDate!="" && bandeCommande.endDate!="" && bandeCommande.personnelId!=0 ){
            bandeCommande.bandeCommandeStatus="NEW"
            saveBandeCommande(bandeCommande)
            .then(res=>{
             if(res){
               addLivraisons(res.id)
             }
            })
            .catch(error=>{
                if (error.response && error.response.status === 401) {
                    router.push("/login");  
                } 
            })
        }
    }
    const handleChangeArticle=(data:any,id:any)=>{
        let list = itemsLivraison
        let item = list.find((f:any)=>f.id===id)
        item.articleId=data.id
        setItemsLivraison([...list])
    }
    const handleChangeQuantite=(e:any,id:any)=>{
        let list = itemsLivraison
        let item = list.find((f:any)=>f.id===id)
        item.quantite=e.target.value
        setItemsLivraison([...list])
    }

    useEffect(() => {
        getAllPersonnels()
        .then(res=>{
        let opt :any[]=[]
         if(res){
           res.map((r:any)=>{
            if(r.role==="CHEF_EQUIPE"){
                opt.push({
                    label : r.fullName,
                    value :r.fullName,
                    id:r.id
                })
            }
           })
           setOptionPersonnels(opt)
         }
        })
        .catch(error=>{
            console.log(error)
            if ( error === 401) {
                router.push("/login");  
            } 
        })
    }, []);

    const showMessage = (msg = '', type = 'success') => {
        const toast: any = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    };
    return (
        <div className='panel mt-5'>
             <div className=" flex mb-4 items-center justify-between overflow-x-auto whitespace-nowrap p-3 text-black font-semibold text-lg">
  <span>Ajouter bon de Commande</span>
  <div className="flex space-x-2 ml-auto">
    <button className="btn btn-success text-white " type='button' onClick={()=>{setHasChange(true);addSubmit()}}>
      <span className="text-sm">Enregistrer</span>
    </button>
    <button className="btn btn-warning text-white" type='button' onClick={()=>router.push("/dashboard/bandeCommande/bandeCommandes")}>
      <span className="text-sm">Annuler</span>
    </button>
  </div>
</div>

        <div className="space-y-5 panel">
        <div className="flex space-x-4">
  <div className={hasChange && bandeCommande.designation==="" ? "has-error w-full" : "w-full"} >
    <textarea  placeholder="designation *" className="form-input w-full" onChange={(e:any)=>{setbandeCommande({ ...bandeCommande, designation: e.target.value })}}/>
    {hasChange &&bandeCommande.designation==="" && (
                              <p className="text-red-500">
                                Ce champ est requis
                              </p>
                            )}
  </div>

</div>
  <div className='flex space-x-4'>
    <div className={hasChange && bandeCommande.startDate==="" ? "has-error w-1/2" : "w-1/2"}>
        <input type="date" placeholder="date debut *" className="form-input" onChange={(e:any)=>{setbandeCommande({ ...bandeCommande, startDate: e.target.value })}} />
        {hasChange && bandeCommande.startDate==="" && (
                              <p className="text-red-500">
                                Ce champ est requis
                              </p>
                            )}
    </div >
    <div className={hasChange && bandeCommande.endDate==="" ? "has-error w-1/2" : "w-1/2"}>
    <input type="date" placeholder="date fin *" className="form-input" onChange={(e:any)=>{setbandeCommande({ ...bandeCommande, endDate: e.target.value })}} />
            {hasChange && bandeCommande.endDate==="" && (
                              <p className="text-red-500">
                                Ce champ est requis
                              </p>
                            )}
    </div >
    </div>
    <div  className="flex space-x-4">
        <div className={hasChange && bandeCommande.personnelId===0 ? "has-error w-1/2" : "w-1/2"}>
        <Select  options={optionPersonnels} placeholder="Personnel" onChange={(data:any)=>{setbandeCommande({ ...bandeCommande, personnelId: data.id })}} isSearchable={false} />    {hasChange && bandeCommande.personnelId===0 && (
                              <p className="text-red-500">
                                Ce champ est requis
                              </p>
                            )}
    </div>
    <div className={hasChange && bandeCommande.client===0 ? "has-error w-1/2" : "w-1/2"}>
        <Select  options={optionClient} placeholder="Client" onChange={(data:any)=>{setbandeCommande({ ...bandeCommande, client: data.id })}} isSearchable={false} />    {hasChange && bandeCommande.client===0 && (
                              <p className="text-red-500">
                                Ce champ est requis
                              </p>
                            )}
    </div>
  

</div>
<div className='mt-6'>
<label htmlFor="" className="flex items-center">
  Bon de Livraison 
  <button type='button' onClick={()=>addItem()}>
  <svg className="w-6 h-6 ml-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
  </svg>
  </button>
</label>

{itemsLivraison.map((item:any)=>(
    <>
    <div className='flex space-x-4 mt-4'>
    <div className={hasChange && item.articleId===0 ? "has-error w-1/2" : "w-1/2"}>
        <Select  options={optionArticle} placeholder="Articles" onChange={(data:any)=>{handleChangeArticle(data,item.id)}} isSearchable={false} />    {hasChange && item.articleId===0 && (
                              <p className="text-red-500">
                                Ce champ est requis
                              </p>
                            )}
    </div>
    <div className={hasChange && item.quantite===0 ? "has-error w-1/2" : "w-1/2"}>
        <input type="number" placeholder="Quantite *" className="form-input" onChange={(e:any)=>{handleChangeQuantite(e,item.id)}} />
        {hasChange && item.quantite===0 && (
                              <p className="text-red-500">
                                Ce champ est requis
                              </p>
                            )}
    </div >

    </div>
    </>
))}
</div>
    <div className="!mt-2">
        <span className="text-white-dark text-[11px] inline-block">*Required Fields</span>
    </div>
    
</div>
</div>
    );
};

export default AddPersonnel;
