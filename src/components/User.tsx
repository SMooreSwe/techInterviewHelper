import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Quote } from "./Quote";

export const User = () => {
    const { state } = useLocation();
    const { _id, username, savedQuotes } = state.user
    const [quote, setQuote] = useState<string>('')
    const [quoteList, setQuoteList] = useState<string[]>(savedQuotes)

    const quoteGenerator = () => {
        fetch('http://localhost:8080/quotes')
        .then(response => response.json())
        .then(response => setQuote(response))
    }

    const saveQuote = () => {
        const quoteInput = {
            id: _id,
            quote: quote
        }
        fetch('http://localhost:8080/users/quotes', {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(quoteInput)
        })
        const newQuoteList = [...quoteList, quote]
        setQuoteList(newQuoteList)
    }

    const quoteDeleter = (selection: string) => {
        const newQuoteList = quoteList.filter(quote => quote !== selection)
        setQuoteList(newQuoteList)
    }

    return(
        <>
        <h2>{username}</h2>
        <section>
            <p>{quote}</p>
            <button onClick={() => quoteGenerator()}>Generate a new quote!</button>
            <button onClick={() => saveQuote()}>Save this quote!</button>
        </section>
        
        <ul>
            {quoteList && quoteList.map((quote : string) => {
                return( <Quote key={crypto.randomUUID()} userId={_id} quote={quote} setter={quoteDeleter}/>)
            })}
        </ul>
        <Link to='/'>Logout</Link>
        </>
        
    )
}