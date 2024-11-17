"use client"
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { Fragment, useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { downloadExcel } from 'react-export-table-to-excel';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import { useRouter } from 'next/navigation';
import { Dialog, Transition } from '@headlessui/react';

import Swal from 'sweetalert2';
import { EditMachine, deleteMachineById, getMachineById, getMachines, saveMachine } from '../../api/machine';



const Machine = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Machine'));
    });
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [rowData, setrowData] = useState([]);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [machine, setMachine] = useState<any>();
    const router = useRouter()
    const [showModal, setShowModal] = useState(false);
    const [hasChange, setHasChange] = useState(false);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [machineToBeAdd, setMachineToBeAdd] = useState({
        name :"",
    });

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });
console.log(rowData)
    useEffect(() => {
        setPage(1);
    }, [pageSize]);
    useEffect(() => {
        getAllMachine()
    }, []);
    const getAllMachine =()=>{
        getMachines()
        .then(res=>{
         console.log(res)
         if(res){
            setrowData(res)
             setInitialRecords(res)
             setRecordsData(res)
         }
        })
        .catch(error=>{
 
        }) 
    }
    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return rowData.filter((item: any) => {
                return (
                    item.designation.toString().includes(search.toLowerCase()) ||
                    item.code.toLowerCase().includes(search.toLowerCase()) 
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);

    const getMachine =(id:any)=>{
        getMachineById(id)
        
        .then(res=>{

         console.log(res)
         if(res){
            setMachine(res)
            setMachineToBeAdd({
                name:res.name,
            })
         }
        })
        .catch(error=>{
            console.log(error)
            if ( error === 401) {
                router.push("/login");  
            } 
        })
    }
    const CloseModal = () => {
        setShowModal(false);
      };
      const deleteRow = async (id: any) => {
        if (id) {
          try {
            await deleteMachineById(id ).then((response) => {
         
              if (response) {
              
    
                showMessage("Supprimé avec Succès");
              
                setInitialRecords(
                  initialRecords?.filter((clientInitial:any) => clientInitial.id !== id)
                );
                setRecordsData(
                  initialRecords?.filter((clientRecords:any) => clientRecords.id !== id)
                );
                setShowModal(false);
                setMachineToBeAdd({
                    name:"",
                })
                setSearch("");
                return response;
              }
            });
          } catch (error) {
            console.error("An error occurred:", error);
          }
        }
      };
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
    const addMachine =()=>{
      if(machineToBeAdd.name!=""){
        saveMachine(machineToBeAdd)
        .then(res=>{
         if(res){
            showMessage('Machine ajoutée avec Succès.');
            setShowModalAdd(false)
            setMachineToBeAdd({
                name:"",
            })
            setHasChange(false)
            getAllMachine()
         }
        })
        .catch(error=>{
            if (error.response && error.response.status === 401) {
                router.push("/login");  
            } 
        })
      }
    }
    const UpdateMachine =()=>{
        EditMachine(machine.id,machineToBeAdd)
        .then(res=>{
         if(res){
            showMessage('Machine ajoutée avec Succès.');
            setShowModalEdit(false)
            setMachineToBeAdd({
                name:"",
            })
            setHasChange(false)
            getAllMachine()
         }
        })
        .catch(error=>{
            if (error.response && error.response.status === 401) {
                router.push("/login");  
            } 
        })
    }
    return (
        <div>
            
             <div className="panel flex items-center justify-between overflow-x-auto whitespace-nowrap p-3 text-black font-semibold text-lg">
  <span>Listes des machines</span>
  <button className="btn btn-primary text-white px-2 py-1 rounded-md" type='button' onClick={()=>setShowModalAdd(true)}> <span className='text-sm'>Ajouter</span></button>
</div>
            <div className="panel mt-6">
            
                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className="table-hover whitespace-nowrap"
                        records={recordsData}
                        columns={[
                            { accessor: 'id', title: '#', sortable: true,render: ({ id }) => <div>{id}</div> },
                            { accessor: 'Nom', sortable: true,render: ({ name }) => <div>{name}</div> },
                            { accessor: 'Action', title: 'Action', sortable: true,render: ({ id }) => <div className="mx-auto ml-3 flex w-max items-center gap-4">
                                <button  className="flex hover:text-info" type='button' onClick={()=>{setShowModalEdit(true);getMachine(id)}}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5">
                                <path
                                    opacity="0.5"
                                    d="M22 10.5V12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2H13.5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                ></path>
                                <path
                                    d="M17.3009 2.80624L16.652 3.45506L10.6872 9.41993C10.2832 9.82394 10.0812 10.0259 9.90743 10.2487C9.70249 10.5114 9.52679 10.7957 9.38344 11.0965C9.26191 11.3515 9.17157 11.6225 8.99089 12.1646L8.41242 13.9L8.03811 15.0229C7.9492 15.2897 8.01862 15.5837 8.21744 15.7826C8.41626 15.9814 8.71035 16.0508 8.97709 15.9619L10.1 15.5876L11.8354 15.0091C12.3775 14.8284 12.6485 14.7381 12.9035 14.6166C13.2043 14.4732 13.4886 14.2975 13.7513 14.0926C13.9741 13.9188 14.1761 13.7168 14.5801 13.3128L20.5449 7.34795L21.1938 6.69914C22.2687 5.62415 22.2687 3.88124 21.1938 2.80624C20.1188 1.73125 18.3759 1.73125 17.3009 2.80624Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                ></path>
                                <path
                                    opacity="0.5"
                                    d="M16.6522 3.45508C16.6522 3.45508 16.7333 4.83381 17.9499 6.05034C19.1664 7.26687 20.5451 7.34797 20.5451 7.34797M10.1002 15.5876L8.4126 13.9"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                ></path>
                            </svg>
                        </button>
                        <button type="button" className="flex hover:text-danger" onClick={()=>{setShowModal(true);getMachine(id)}} >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                                <path d="M20.5001 6H3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                                <path
                                    d="M18.8334 8.5L18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                ></path>
                                <path opacity="0.5" d="M9.5 11L10 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                                <path opacity="0.5" d="M14.5 11L14 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                                <path
                                    opacity="0.5"
                                    d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                ></path>
                            </svg>
                        </button></div> },
                        ]}
                        totalRecords={initialRecords.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
            </div>
            {showModal ? (
          <>
            <div className="fixed inset-0 z-50 bg-[black]/10 overflow-y-auto">
              <div
                className="fixed inset-0 w-full h-full "
                onClick={() => setShowModal(false)}
              ></div>
              <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative w-full max-w-lg p-4 mx-auto bg-white dark:bg-black rounded-md shadow-sm">
                  <div className="mt-3 sm:flex">
                    <div className="mt-2 text-center sm:ml-4 sm:text-left px-6">
                      <button
                        type="button"
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent  hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 "
                        data-modal-hide="popup-modal"
                      >
                        <span className="sr-only">Close modal</span>
                      </button>
                      <div className="p-6 text-center">
                        <svg
                          className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                        <h4 className="mb-5 font-normal text-gray-500 dark:text-gray-400">
                          Êtes-vous sûr(e) de vouloir supprimer cette machine ?
                        </h4>
                        <button
                          onClick={(e) => deleteRow(machine.id)}
                          data-modal-hide="popup-modal"
                          type="button"
                          className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                        >
                          Supprimer
                        </button>
                        <button
                          onClick={(e) => CloseModal()}
                          data-modal-hide="popup-modal"
                          type="button"
                          className="text-gray-500  hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                        >
                          Annuler
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
            <Transition appear show={showModalAdd} as={Fragment}>
                    <Dialog as="div" open={showModalAdd} onClose={() => {setShowModalAdd(false);setHasChange(false);setMachineToBeAdd({
                                name:"",
                            })}} className="relative z-50">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-[black]/60" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center px-4 py-8">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="panel w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                        <button
                                            type="button"
                                            onClick={() => {setShowModalAdd(false);setHasChange(false);setMachineToBeAdd({
                                                name:""
                                            })}}
                                            className="absolute top-4 text-gray-400 outline-none hover:text-gray-800 ltr:right-4 rtl:left-4 dark:hover:text-gray-600"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </button>
                                        <div className="bg-[#fbfbfb] py-3 text-lg font-medium ltr:pl-5 ltr:pr-[50px] rtl:pr-5 rtl:pl-[50px] dark:bg-[#121c2c]">
                                           Ajouter machine
                                        </div>
                                        <div className="p-5">
                                        <div className=" mb-5">
                          <div className="mt-4">
                            <div
                              className={
                                hasChange && machineToBeAdd.name==="" ? "has-error" : ""
                              }
                            >
                              <label>Nom *</label>
                              <input
                                type="text"
                                onChange={(e:any)=>{
                                    setHasChange(false);
                                    setMachineToBeAdd({ ...machineToBeAdd, name: e.target.value })
                                }}
                                className="form-input"
                                placeholder="Nom de la machine *"
                                
                              />
                             {hasChange && machineToBeAdd.name==="" && (
                                <p className="text-red-500">
                                  Ce champ  est requis
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                   
                        <div className=" mx-20 inline-flex gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-1 ">
                          <button
                            data-modal-hide="popup-modal"
                            type="button"
                            className="  btn btn-success  gap-2"
                            onClick={()=>{setHasChange(true);addMachine()}}
                           
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 shrink-0 ltr:mr-2 rtl:ml-2"
                            >
                              <path
                                d="M3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12C22 11.6585 22 11.4878 21.9848 11.3142C21.9142 10.5049 21.586 9.71257 21.0637 9.09034C20.9516 8.95687 20.828 8.83317 20.5806 8.58578L15.4142 3.41944C15.1668 3.17206 15.0431 3.04835 14.9097 2.93631C14.2874 2.414 13.4951 2.08581 12.6858 2.01515C12.5122 2 12.3415 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                              />
                              <path
                                d="M17 22V21C17 19.1144 17 18.1716 16.4142 17.5858C15.8284 17 14.8856 17 13 17H11C9.11438 17 8.17157 17 7.58579 17.5858C7 18.1716 7 19.1144 7 21V22"
                                stroke="currentColor"
                                strokeWidth="1.5"
                              />
                              <path
                                opacity="0.5"
                                d="M7 8H13"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                            </svg>
                            Enregistrer
                          </button>
                          <button
                            data-modal-hide="popup-modal"
                            type="button"
                            className="btn text-white bg-slate-500 gap-2  "
                            onClick={()=>{setHasChange(false);setMachineToBeAdd({
                                name:""
                            });setShowModalAdd(false)}}
                          >
                            Annuler
                          </button>
                        </div>

                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
                <Transition appear show={showModalEdit} as={Fragment}>
                    <Dialog as="div" open={showModalEdit} onClose={() => {setShowModalEdit(false);setHasChange(false);setMachineToBeAdd({
                                name:""
                            })}} className="relative z-50">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-[black]/60" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center px-4 py-8">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="panel w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                        <button
                                            type="button"
                                            onClick={() => {setShowModalEdit(false);setHasChange(false);setMachineToBeAdd({
                                                name:""
                                                
                                            })}}
                                            className="absolute top-4 text-gray-400 outline-none hover:text-gray-800 ltr:right-4 rtl:left-4 dark:hover:text-gray-600"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </button>
                                        <div className="bg-[#fbfbfb] py-3 text-lg font-medium ltr:pl-5 ltr:pr-[50px] rtl:pr-5 rtl:pl-[50px] dark:bg-[#121c2c]">
                                           Modifier machine
                                        </div>
                                        <div className="p-5">
                                        <div className=" mb-5">
                          <div className="mt-4">
                            <div
                              className={
                                hasChange && machineToBeAdd.name==="" ? "has-error" : ""
                              }
                            >
                              <label>Nom *</label>
                              <input
                                type="text"
                                onChange={(e:any)=>{
                                    setHasChange(false);
                                    setMachineToBeAdd({ ...machineToBeAdd, name: e.target.value })
                                }}
                                defaultValue={machineToBeAdd.name}
                                className="form-input"
                                placeholder="Nom de la machine *"
                                
                              />
                             {hasChange && machineToBeAdd.name==="" && (
                                <p className="text-red-500">
                                  Ce champ  est requis
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                    
                        <div className=" mx-20 inline-flex gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-1 ">
                          <button
                            data-modal-hide="popup-modal"
                            type="button"
                            className="  btn btn-success  gap-2"
                            onClick={()=>{setHasChange(true);UpdateMachine()}}
                           
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 shrink-0 ltr:mr-2 rtl:ml-2"
                            >
                              <path
                                d="M3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12C22 11.6585 22 11.4878 21.9848 11.3142C21.9142 10.5049 21.586 9.71257 21.0637 9.09034C20.9516 8.95687 20.828 8.83317 20.5806 8.58578L15.4142 3.41944C15.1668 3.17206 15.0431 3.04835 14.9097 2.93631C14.2874 2.414 13.4951 2.08581 12.6858 2.01515C12.5122 2 12.3415 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                              />
                              <path
                                d="M17 22V21C17 19.1144 17 18.1716 16.4142 17.5858C15.8284 17 14.8856 17 13 17H11C9.11438 17 8.17157 17 7.58579 17.5858C7 18.1716 7 19.1144 7 21V22"
                                stroke="currentColor"
                                strokeWidth="1.5"
                              />
                              <path
                                opacity="0.5"
                                d="M7 8H13"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                            </svg>
                            Enregistrer
                          </button>
                          <button
                            data-modal-hide="popup-modal"
                            type="button"
                            className="btn text-white bg-slate-500 gap-2  "
                            onClick={()=>{setHasChange(false);setMachine({
                                name:""
                            });setShowModalEdit(false)}}
                          >
                            Annuler
                          </button>
                        </div>

                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
        </div>
    );
};

export default Machine;
