"use client"
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { downloadExcel } from 'react-export-table-to-excel';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../../store/themeConfigSlice';
import { saveClient } from '@/app/dashboard/api/clients';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { getMachines } from '@/app/dashboard/api/machine';
import Select from 'react-select';
import { machine } from 'os';
import { savePersonnel } from '@/app/dashboard/api/effectif';




const AddPersonnel = () => {
    const [hasChange, setHasChange] = useState(false);
    const [optionMachine, setOptionMachine] = useState<any[]>([]);
    const [optionRole, setOptionRole] = useState<any[]>([{
      label : "Administrateur",
      value : "ADMIN"
    },
    {
      label : "Responsable Production",
      value : "RESPONSABLE_PRODUCTION"
    },
    {
      label : "Chef d'équipe",
      value : "CHEF_EQUIPE"
    }
  ]);

    const router = useRouter()
    const [personnel,setPersonnel] = useState({
        fullName : "",
        email : "",
        role : "",
        numero :"",
        password : "",
        username :"",
        machine :""
    })
    const isPersonnelComplete = () => {
        return Object.values(personnel).every((value) => value !== "");
      };
      useEffect(() => {
        getAllMachine()
    }, []);
    console.log(optionMachine)
      const getAllMachine =()=>{
        getMachines()
        .then(res=>{
         console.log(res)
         if(res){
            let option :any[]= []
            res.map((r:any)=>{
              option.push({
                label:r.name,
                value :r.name,
                id : r.id

              })
            })
            setOptionMachine(option)
         }
        })
        .catch(error=>{
 
        }) 
    }
    const addPersonnel=() => {
        
        if(isPersonnelComplete()){
            let clientToBeSave = {
                fullName : personnel.fullName ,
                email : personnel.email,
                username : personnel.username,
                numero : personnel.numero,
                role : personnel.role,
                password : personnel.password,
                machine :personnel.machine
            }
            savePersonnel(clientToBeSave)
            .then(res=>{
             console.log(res)
             if(res){
                showMessage('Personnel ajoutée avec success.');
                router.push("/dashboard/effectifs/personnels")

             }
            })
            .catch(error=>{
     
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
             <div className=" flex mb-4 items-center justify-between overflow-x-auto whitespace-nowrap p-3 text-black font-semibold text-lg">
  <span>Ajouter Personnel</span>
  <div className="flex space-x-2 ml-auto">
    <button className="btn btn-success text-white " type='button' onClick={()=>{setHasChange(true);addPersonnel()}}>
      <span className="text-sm">Enregistrer</span>
    </button>
    <button className="btn btn-warning text-white" type='button' onClick={()=>router.push("/dashboard/effectifs/personnels")}>
      <span className="text-sm">Annuler</span>
    </button>
  </div>
</div>

        <div className="space-y-5 panel">
        <div className="flex space-x-4">
  <div className={hasChange && personnel.fullName==="" ? "has-error w-1/2" : "w-1/2"} >
    <input type="text" placeholder="Prénom et Nom *" className="form-input w-full" onChange={(e:any)=>{setPersonnel({ ...personnel, fullName: e.target.value })}}/>
    {hasChange && personnel.fullName==="" && (
                              <p className="text-red-500">
                                Ce champ est requis
                              </p>
                            )}
  </div>
  <div className={hasChange && personnel.username==="" ? "has-error w-1/2" : "w-1/2"}>
    <input type="text" placeholder="username *" className="form-input w-full" onChange={(e:any)=>{setPersonnel({ ...personnel, username: e.target.value })}} />
    {hasChange && personnel.username==="" && (
                              <p className="text-red-500">
                                Ce champ est requis
                              </p>
                            )}
  </div>
</div>
  <div className='flex space-x-4'>
    <div className={hasChange && personnel.email==="" ? "has-error w-1/2" : "w-1/2"}>
        <input type="email" placeholder="Enter Email Address *" className="form-input" onChange={(e:any)=>{setPersonnel({ ...personnel, email: e.target.value })}} />
        {hasChange && personnel.email==="" && (
                              <p className="text-red-500">
                                Ce champ est requis
                              </p>
                            )}
    </div >
    <div className={hasChange && personnel.email==="" ? "has-error w-1/2" : "w-1/2"}>
    <Select  options={optionRole} placeholder="Role " onChange={(data:any)=>{setPersonnel({ ...personnel, role: data.value })}} isSearchable={false} /> 
            {hasChange && personnel.email==="" && (
                              <p className="text-red-500">
                                Ce champ est requis
                              </p>
                            )}
    </div >
    </div>
    <div  className="flex space-x-4">
        <div className={hasChange && personnel.machine==="" ? "has-error w-1/2" : "w-1/2"}>
        <Select  options={optionMachine} placeholder="Machine" onChange={(data:any)=>{setPersonnel({ ...personnel, machine: data.id })}} isSearchable={false} />    {hasChange && personnel.machine==="" && (
                              <p className="text-red-500">
                                Ce champ est requis
                              </p>
                            )}
    </div>
    <div className={hasChange && personnel.numero==="" ? "has-error w-1/2" : "w-1/2"}>
    <input type="number" placeholder="Numero *" className="form-input" onChange={(e:any)=>{setPersonnel({ ...personnel, numero: e.target.value })}}/>
    {hasChange && personnel.numero==="" && (
                              <p className="text-red-500">
                                Ce champ est requis
                              </p>
                            )}
    </div>

</div>
<div className={hasChange && personnel.password==="" ? "has-error " : ""}>
    <input type="password" placeholder="Password *" className="form-input" onChange={(e:any)=>{setPersonnel({ ...personnel, password: e.target.value })}}/>
    {hasChange && personnel.password==="" && (
                              <p className="text-red-500">
                                Ce champ est requis
                              </p>
                            )}
    </div>
    <div className="!mt-2">
        <span className="text-white-dark text-[11px] inline-block">*Required Fields</span>
    </div>
    
</div>
</div>
    );
};

export default AddPersonnel;
