import Swal from "sweetalert2";

const api_url = "http://localhost:9092/tracabilite/"

export const getMachines = async () => {
    try {
      const response = await fetch(api_url+"api/machine/machine", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +localStorage.getItem("token")
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

  export const getMachineById = async (id:number) => {
    try {
      const response = await fetch(api_url+"api/machine/"+id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +localStorage.getItem("token")
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

  export const saveMachine = async (data:any) => {
    try {
      const response = await fetch(api_url+"api/machine", {
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
      if (response.status === 400) {
        showMessage('Nom de la machine existe déja.'); // Redirection vers la page de login
        return;
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  export const EditMachine = async (id:any,data:any) => {
    try {
      const response = await fetch(api_url+"api/machine/"+id, {
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
        showMessage('Nom de la machine existe déja.'); // Redirection vers la page de login
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
  export const deleteMachineById = async (id: number) => {
    try {
      const response = await fetch(api_url + "api/machine/" + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +localStorage.getItem("token")
        }
      });
  
      if (response.status === 401) {
        // Si l'utilisateur n'est pas autorisé, redirection vers la page de connexion
        window.location.href = "/";
        return;
      }
  
      if (!response.ok) {
        // Si la suppression échoue, on affiche un message d'erreur
        console.error('Erreur lors de la suppression du client');
        return;
      }
  
      return await response.json(); // Optionnel si l'API retourne une réponse après suppression
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };