import Swal from "sweetalert2";
import { Auth } from "../interface/Auth";
const api_url = "http://localhost:9092/tracabilite/"
export const Signin =async (data:Auth)=>{
    const response = await fetch(api_url+"api/auth/signin", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data) 
      });
      if (response.status === 400 || response.status === 400) {
        showMessage('Vérifier username ou mot de passe.'); // Redirection vers la page de login
        return;
      }
      return response.json(); 
}

const showMessage = (msg = '', type = 'error') => {
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
}