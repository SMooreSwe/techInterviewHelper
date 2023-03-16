import { useRef, useState } from "react"
import { Link } from "react-router-dom"

export const CreateUser = () => {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isPasswordError, setIsPasswordError ] = useState(false)
    
    const username = useRef<HTMLInputElement>(null)
    const passwordOne = useRef<HTMLInputElement>(null)
    const passwordTwo = useRef<HTMLInputElement>(null)

    const submitUser = () => {
        const passOne = passwordOne.current?.value;
        const passTwo = passwordTwo.current?.value;
        if(passOne !== passTwo) {
            setIsPasswordError(true)
            setTimeout(()=>setIsPasswordError(false), 2000)
            return
        }
        const newUser = {
            username: username.current?.value,
            password: passOne,
        }
        fetch('http://localhost:8080/users/new', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newUser)
        })
        setIsSubmitted(true)
    }

    return(
        <>
        <h2>Create a Profile Here</h2>
        <form onSubmit={(e) => {e.preventDefault()}}>
            <input ref={username} type="text" placeholder="Choose a Username" required/>
            <input ref={passwordOne} type="password" placeholder="Enter a Password" required/>
            <p className={isPasswordError ? "errorMessage" : "hidden"}>Your passwords do not match!</p>
            <input ref={passwordTwo} type="password" placeholder="Confirm your Password" required/>
            <p className={isPasswordError ? "errorMessage" : "hidden"}>Your passwords do not match!</p>
            <button onClick={()=> submitUser()}>Create an Account</button>
        </form>
        <Link to='/login' className={isSubmitted? "errorMessage" : "hidden"}>Your Account is Created! Please Click the Link to go to the Login Page</Link>
        </>
    )
}