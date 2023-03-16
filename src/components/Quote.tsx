import { useState } from "react"

type QuoteProps = {
    userId: string,
    quote: string
    setter: Function,
}

export const Quote = ({userId, quote, setter} : QuoteProps) => {

    const [ isSelected, setIsSelected ] = useState<boolean>(false)

    const deleteQuote = () => {
        const quoteInput = {
            id: userId,
            quote: quote,
        }
        fetch('http://localhost:8080/users/quotes', {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(quoteInput)
        })
        setter(quote)
    }

    return(
        <li className="quote" onMouseEnter={() => setIsSelected(true)} onMouseLeave={() => setIsSelected(false)}>
            <div className={isSelected? "quote__text--bold" : "quote__text"} >{quote}</div>
            <button className={isSelected? "quote__btn" : "hidden"} onClick={() => deleteQuote()}>Delete</button>
        </li>
    )
}