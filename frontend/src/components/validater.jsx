import axios from "axios"
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

const Validate = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        const check = async () => {
            try {
                const response = await axios.get('https://fullstack-chat-app-backend.up.railway.app/api/news/check', {
                    withCredentials: true
                })

                console.log(response);
            }
            catch(err){
                console.log(err);
                navigate('/signin')
            }
        }

        check();

    }, [navigate]);
}

export default Validate;