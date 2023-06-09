import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate,useLocation } from 'react-router-dom'


const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)


    const location = useLocation()

    const navigate = useNavigate()

    let loginUser = async (e )=> {
        e.preventDefault()
        let response = await fetch('https://jhadevansh0809.pythonanywhere.com/api/token/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
        })
        let data = await response.json()
        // console.log(data);

        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            if(location.state?.from)
                navigate(location.state.from)
            else
                navigate('/')
        }else{
            alert('Wrong credentials!')
        }
    }

    let signupUser = async (e )=> {
        e.preventDefault()
        let response = await fetch('https://jhadevansh0809.pythonanywhere.com/api/register/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'firstname':e.target.firstname.value,'lastname':e.target.lastname.value, 'username':e.target.username.value,'email':e.target.email.value, 'password1':e.target.password1.value,'password2':e.target.password2.value})
        })
        let data = await response.json()
        // console.log(data);
        if(data.status === true){
            navigate('/login')
        }else{
            alert(data.message)
        }
    }

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/')
    }

    let updateToken = async ()=> {

        let response = await fetch('https://jhadevansh0809.pythonanywhere.com/api/token/refresh/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authTokens?.refresh})
        })

        let data = await response.json()
        
        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else{
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }
    
    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
        signupUser:signupUser,
    }


    useEffect(()=> {

        if(loading){
            updateToken()
        }

        let oneFifteenMinutes = 1000 * 60 * 115

        let interval =  setInterval(()=> {
            if(authTokens){
                updateToken()
            }
        }, oneFifteenMinutes)
        return ()=> clearInterval(interval)

    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
}