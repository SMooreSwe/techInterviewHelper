import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export const Home = () => {
    const [ subtitle, setSubtitle ] = useState<string>('');

    useEffect(() => {
        fetch('http://localhost:8080/quotes')
            .then(response => response.json())
            .then(response => setSubtitle(response))
    }, [])

    return(
    <div className="home">
    <h1 className="home__title">The Technical Interview Helper!</h1>
    <h3 className="home__subtitle">{`"${subtitle}"`}</h3>
    <div className="home__buttonBar">
        <Link to='/login'>Login</Link>
        <Link to='/createUser'>Create an Account</Link>
    </div>
    </div>
     
    )
}