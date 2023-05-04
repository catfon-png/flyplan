import axios from "axios";
import { toast } from "react-toastify";

  export const getAutoSuggest = async () => {
    try {
        
      const response = await axios.get(
        'https://flyplan.onrender.com/api/search',
        // 'http://localhost:5500/api/search',
      );
      return response.data
    } catch (error: any) {
      toast.error("Sorry, there is a server error. Please, try again later.");
      throw error;
    }
  };
  

