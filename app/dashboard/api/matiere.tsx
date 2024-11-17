const api_url = "http://localhost:9092/tracabilite/"

export const getMatiere = async () => {
    try {
      const response = await fetch(api_url+"api/matiere/matieres", {
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

  export const getMatiereById = async (id:number) => {
    try {
      const response = await fetch(api_url+"api/matiere/"+id, {
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

  export const saveMatiere = async (data:any) => {
    try {
      const response = await fetch(api_url+"api/matiere", {
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

  export const EditMatiere = async (id:any,data:any) => {
    try {
      const response = await fetch(api_url+"api/matiere/"+id, {
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

  export const deleteMatiereById = async (id: number) => {
    try {
      const response = await fetch(api_url + "api/matiere/" + id, {
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