import { useRef, useState } from "react"
import { Link } from "react-router-dom"

export const CreateUser = () => {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isPasswordError, setIsPasswordError ] = useState(false)
    
    const username = useRef<HTMLInputElement>(null)
    const passwordOne = useRef<HTMLInputElement>(null)
    const passwordTwo = useRef<HTMLInputElement>(null)

    const submitUser = () => {
        const userN = username.current?.value;
        const passOne = passwordOne.current?.value;
        const passTwo = passwordTwo.current?.value;
        if(passOne !== passTwo) {
            setIsPasswordError(true)
            setTimeout(()=>setIsPasswordError(false), 2000)
            return
        }
        if (userN && passOne && passTwo) {
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
    }

    return(
        <div className="createUser">
        <div className="createUser__title-container">
            <h2 className="title-container__title">Technical Interview Helper</h2>
        </div>
        <h3 className="createUser__form-title">Create a Profile Here</h3>
        <form className="createUser__form"onSubmit={(e) => {e.preventDefault()}}>
            <input ref={username} type="text" placeholder="Choose Username" required/>
            <input ref={passwordOne} type="password" placeholder="Enter Password" required/>
            <p className={isPasswordError ? "errorMessage" : "hidden"}>Your passwords do not match!</p>
            <input ref={passwordTwo} type="password" placeholder="Confirm Password" required/>
            <p className={isPasswordError ? "errorMessage" : "hidden"}>Your passwords do not match!</p>
            <button className="createUser__btn" onClick={()=> submitUser()}>Create an Account</button>
        </form>
        <div className="login__button-bar">
            <Link to='/'>Home</Link>
            <Link to='/login' className={isSubmitted? "button-bar__link" : "hidden"}>Your Account is Created! Please Click the Link to go to the Login Page</Link>
        </div>
        </div>
    )
}