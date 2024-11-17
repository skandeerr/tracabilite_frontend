const api_url = "http://localhost:9092/tracabilite/"

export const get = async () => {
    try {
      const response = await fetch(api_url+"api/clients/client", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
           'Authorization': 'Bearer token' // Si nécessaire
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

  export const savePersonnel = async (data: any) => {
    try {
      const response = await fetch(api_url + "api/auth/signup", {
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
 
  export const getAllPersonnels = async () => {
    try {
      const response = await fetch(api_url+"api/personnel/personnels", {
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
           'Authorization': 'Bearer token' // Si nécessaire
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

  export const saveClient = async () => {
    try {
      const response = await fetch(api_url+"api/clients", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           'Authorization': 'Bearer token' // Si nécessaire
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

  export const EditClient = async () => {
    try {
      const response = await fetch(api_url+"api/clients", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
           'Authorization': 'Bearer token' // Si nécessaire
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