import router from "next/router";
import { getUser } from ".";

export const handleLogout = async () => {
    const user = getUser();

    
    try {
        const responsegetUserbyID = await fetch('http://localhost:3080/auth/getUserbyID', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        console.log(responsegetUserbyID);

        const response = await fetch('http://localhost:3080/auth/logout', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ responsegetUserbyID }),
            credentials: 'include',
            
        });
        if (response.ok) {
            console.log('Logout successful');
            setTimeout(() => {
            router.push('/login');
        }, 1000); // Pause for 1 second

        }else{
            console.log('Logout failed');
            console.log(response);
        }
    } catch (error) {
        console.log(error);
    }
  };

  