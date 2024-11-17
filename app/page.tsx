"use client"
import Image from 'next/image'
import { useState } from 'react';
import { Auth } from './dashboard/interface/Auth';
import { Signin } from './dashboard/api/auth';
import { useRouter } from 'next/navigation';
import { error } from 'console';
import Swal from 'sweetalert2';

export default function Home() {
    const [username, setUsername] = useState("");
    const [password, setPaswword] = useState("");
    const router = useRouter()
    const login=()=>{
       const auth : Auth = {
        username : username,
        password : password
       } 
       console.log("hdg")
       Signin(auth)
       .then(res=>{
        console.log(res)
        if(res){
            console.log(res)
            localStorage.setItem("token",res.accessToken)
            localStorage.setItem("role",res.roles)
            localStorage.setItem("id",res.id)
            showMessage('Login avec success.');
            router.push("/dashboard")
        }
       })
       .catch(error=>{
        if (error.status === 400 || error.status === 400) {
            showMessage('Vérifier username ou mot de passe.'); // Redirection vers la page de login
            return;
          }
       })
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
<div className="bg-white dark:bg-gray-900">
        <div className="flex justify-center h-screen">
            <div className="hidden bg-cover lg:block lg:w-2/3"   style={{ 
    backgroundImage: "url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)" 
  }}>
                <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                    <div>
                        <h2 className="text-4xl font-bold text-white">Turki Metal</h2>
                        
                    </div>
                </div>
            </div>
            
            <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                <div className="flex-1">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">Login</h2>
                        
                        <p className="mt-3 text-gray-500 dark:text-gray-300">Connectez-vous pour accéder à votre compte.</p>
                    </div>

                    <div className="mt-8">
                        <form>
                            <div>
                                <label  className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email Address</label>
                                <input type="text"  placeholder="Username" onChange={(e)=>setUsername(e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                            </div>

                            <div className="mt-6">
                                <div className="flex justify-between mb-2">
                                    <label  className="text-sm text-gray-600 dark:text-gray-200">Password</label>
                                </div>

                                <input type="password"  onChange={(e)=>setPaswword(e.target.value)} placeholder="Your Password" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                            </div>

                            <div className="mt-6">
                                <button
                                type='button'
                                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                                    onClick={()=>login()}
                                    >
                                    Se connecter
                                    
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
