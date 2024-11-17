"use client"
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { downloadExcel } from 'react-export-table-to-excel';
import { useDispatch } from 'react-redux';
import { UpdateClient, getClientById, saveClient } from '@/app/dashboard/api/clients';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';


type Params = {
    params: {
      id: any;
    };
  };
  

const EditClient = ({ params: { id } }: Params) => {
    const [hasChange, setHasChange] = useState(false);
    const router = useRouter()
    const [client,setClient] = useState({
        nom : "",
        prenom : "",
        email : "",
        adresse : "",
        numero :""
    })
    useEffect(() => {
        getClientById(id)
        
        .then(res=>{

         console.log(res)
         if(res){
            setClient({
                nom : res.nom,
                prenom : res.prenom,
                email : res.email,
                adresse : res.adresse,
                numero :res.numero
            })
         }
        })
        .catch(error=>{
            console.log(error)
            if ( error === 401) {
                router.push("/login");  
            } 
        })
      }, []);
    const isClientComplete = () => {
        return Object.values(client).every((value) => value.trim() !== "");
      };
    const addClient=() => {
        
        if(isClientComplete()){
            
            UpdateClient(id,client)
            .then(res=>{
             if(res){
                showMessage('Client modifié avec Succès.');
                router.push("/dashboard/effectifs/clients")
             }
            })
            .catch(error=>{
                if (error.response && error.response.status === 401) {
                    router.push("/login");  
                } 
            })
        }
    }
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
             <div className=" flex mb-4 items-center justify-between overflow-x-auto whitespace-nowrap p-3 dark:text-white text-black font-semibold text-lg">
  <span>Ajouter Client</span>
  <div className="flex space-x-2 ml-auto">
    <button className="btn btn-success text-white " type='button' onClick={()=>{setHasChange(true);addClient()}}>
      <span className="text-sm">Enregistrer</span>
    </button>
    <button className="btn btn-warning text-white" type='button' onClick={()=> router.push("/dashboard/effectifs/clients")}>
      <span className="text-sm">Annuler</span>
    </button>
  </div>
</div>

        <div className="space-y-5 panel">
        <div className="flex space-x-4">
  <div className={hasChange && client.prenom==="" ? "has-error w-1/2" : "w-1/2"} >
    <input type="text" placeholder="Prénom *" defaultValue={client.prenom} className="form-input w-full" onChange={(e:any)=>{setClient({ ...client, prenom: e.target.value })}}/>
    {hasChange && client.prenom==="" && (
                              <p className="text-red-500">
                                Ce champ est requis
                              </p>
                            )}
  </div>
  <div className={hasChange && client.nom==="" ? "has-error w-1/2" : "w-1/2"}>
    <input type="text" placeholder="Nom *" defaultValue={client.nom} className="form-input w-full" onChange={(e:any)=>{setClient({ ...client, nom: e.target.value })}} />
    {hasChange && client.nom==="" && (
                              <p className="text-red-500">
                                Ce champ est requis
                              </p>
                            )}
  </div>
</div>
    <div className={hasChange && client.email==="" ? "has-error " : ""}>
        <input type="email" placeholder="Enter Email Address *" defaultValue={client.email} className="form-input" onChange={(e:any)=>{setClient({ ...client, email: e.target.value })}} />
        {hasChange && client.email==="" && (
                              <p className="text-red-500">
                                Ce champ est requis
                              </p>
                            )}
    </div >
    <div  className="flex space-x-4">
        <div className={hasChange && client.adresse==="" ? "has-error w-1/2" : "w-1/2"}>
    <input type="text" placeholder="Adresse *" defaultValue={client.adresse} className="form-input" onChange={(e:any)=>{setClient({ ...client, adresse: e.target.value })}}/>
    {hasChange && client.adresse==="" && (
                              <p className="text-red-500">
                                Ce champ est requis
                              </p>
                            )}
    </div>
    <div className={hasChange && client.numero==="" ? "has-error w-1/2" : "w-1/2"}>
    <input type="number" placeholder="Numero *" defaultValue={client.numero} className="form-input" onChange={(e:any)=>{setClient({ ...client, numero: e.target.value })}}/>
    {hasChange && client.numero==="" && (
                              <p className="text-red-500">
                                Ce champ est requis
                              </p>
                            )}
    </div>
</div>
    <div className="!mt-2">
        <span className="text-white-dark text-[11px] inline-block">*Required Fields</span>
    </div>
    
</div>
</div>
    );
};

export default EditClient;
