import githublogo from '../images/github_logo.png'
export const Header = () => {
    return(
        <header className="header">
            <a className="header__link" href="https://github.com/SMooreSwe"><img className="header__img" src={githublogo} alt="a logo for github" /></a>
        </header>
    )
}