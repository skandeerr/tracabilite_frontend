import Swal from "sweetalert2";

const api_url = "http://localhost:9092/tracabilite/"

export const savebandeLivraison = async (data:any) => {
    try {
      const response = await fetch(api_url+"api/BandeLivraison", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           'Authorization': 'Bearer ' +localStorage.getItem("token")
        },
        body: JSON.stringify(data)
      });
      if (response.status === 401) {
        window.location.href = "/";  // Redirection vers la page de login
        return;
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  export const getBandesLivraisons = async () => {
    try {
      const response = await fetch(api_url+"api/BandeLivraison/bandeLivraisons", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
           'Authorization': 'Bearer '+localStorage.getItem("token") // Si nécessaire
        }
      });
      if (response.status === 401) {
        window.location.href = "/";  // Redirection vers la page de login
        return;
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  export const getBandesLivraisonsStatistic = async () => {
    try {
      const response = await fetch(api_url+"api/BandeLivraison/statistic", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
           'Authorization': 'Bearer '+localStorage.getItem("token") // Si nécessaire
        }
      });
      if (response.status === 401) {
        window.location.href = "/";  // Redirection vers la page de login
        return;
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  export const getLivraisonById = async (id:number) => {
    try {
      const response = await fetch(api_url+"api/BandeLivraison/"+id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
           'Authorization': 'Bearer '+localStorage.getItem("token") // Si nécessaire
        }
      });
      if (response.status === 401) {
        window.location.href = "/";  // Redirection vers la page de login
        return;
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  export const EditLivraison = async (id:any,data:any) => {
    try {
      const response = await fetch(api_url+"api/BandeLivraison/"+id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
           'Authorization': 'Bearer ' +localStorage.getItem("token")
        },
        body: JSON.stringify(data)
      });
      if (response.status === 401) {
        window.location.href = "/";  // Redirection vers la page de login
        return;
      }
      if (response.status === 400) {
        showMessage('Stock insuffisant.'); // Redirection vers la page de login
        return;
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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
};