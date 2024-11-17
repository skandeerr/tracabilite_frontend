const api_url = "http://localhost:9092/tracabilite/"

export const getClients = async () => {
    try {
      const response = await fetch(api_url+"api/client/clients", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
           'Authorization': 'Bearer '+localStorage.getItem("token") 
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

  export const getClientById = async (id:number) => {
    try {
      const response = await fetch(api_url+"api/client/"+id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
           'Authorization': 'Bearer '+localStorage.getItem("token")
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

  export const saveClient = async (data: any) => {
    try {
      const response = await fetch(api_url + "api/client", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token") // Si nécessaire
        },
        body: JSON.stringify(data) // Convertir l'objet data en JSON
      });
      if (response.status === 401) {
        window.location.href = "/";  // Redirection vers la page de login
        return;
      }
      if (!response.ok) {
        // Gérer les erreurs HTTP, par exemple, 404, 500, etc.
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error saving client:', error);
      throw error; // Propager l'erreur si nécessaire pour gestion ultérieure
    }
  };
  

  export const UpdateClient = async (id:any,data:any) => {
    try {
      const response = await fetch(api_url+"api/client/"+id, {
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
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  export const deleteClientById = async (id: number) => {
    try {
      const response = await fetch(api_url + "api/client/" + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token")
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
  