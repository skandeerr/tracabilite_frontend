const api_url = "http://localhost:9092/tracabilite/"

export const saveBandeCommande = async (data:any) => {
    try {
      const response = await fetch(api_url+"api/bandeCommande", {
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

  export const getBandesCommandes = async () => {
    try {
      const response = await fetch(api_url+"api/bandeCommande/bandeCommandes", {
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