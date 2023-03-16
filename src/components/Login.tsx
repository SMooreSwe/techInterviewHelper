import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export const Login = () => {
    const [, setIsUser] = useState<boolean>(false)
    const [wrongLogin, setWrongLogin] = useState<boolean>(false)
    const [isError, setIsError ] = useState<boolean>(false)
    const navigate = useNavigate()
   
    const userInput = useRef<HTMLInputElement>(null)
    const passInput = useRef<HTMLInputElement>(null)

    const loginChecker = () => {
        const username = userInput.current?.value;
        const password = passInput.current?.value;
        if (!username || !password) {
            setIsError(true)
            setTimeout(()=>setIsError(false), 2000)
        } else {
            const userSearch = {
                username: username,
                password: password,
            }
    
            fetch('http://localhost:8080/users', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(userSearch)
              })
              .then(response => response.json())
              .then(response => {
                if (response.length === 0) {
                    setIsUser(false)
                    setWrongLogin(true)
                    setTimeout(()=>setWrongLogin(false), 5000)
                } else {
                    setIsUser(true)
                    const user = response[0]
                    navigate(`/login/${user.username}`,
                        {
                            state: {user}
                        }
                    )
                }
            })
        } 
    }

    return(
        <>
        <form className="login" onSubmit={(e) => {e.preventDefault()}}>
            <input className="login__usernameInput" ref={userInput} type="text" placeholder="Username"/>
            <p className={isError ? "errorMessage" : "hidden"}>Please input a username</p>
            <input className="login__passwordInput" ref={passInput} type="password" placeholder="Password"/>
            <p className={isError ? "errorMessage" : "hidden"}>Please input a password</p>
            <button className="login__btn" onClick={() => {loginChecker()}}>Login</button>
        </form>
        <p className={ wrongLogin ? "errorMessage" : "hidden" }>Account Not Found - follow the link below to create an account</p>
        <Link to='/'>Home</Link>
        <Link to='/createUser'>Create an Account</Link>
        </>
    )
}