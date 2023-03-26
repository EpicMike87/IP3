import { Link, useMatch, useResolvedPath } from "react-router-dom"
import logo from "../images/logo.png";


export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
      <img src={logo} alt="Logo" width={120}height={100}></img>
        
      </Link>
      
      <ul>
        
        <CustomLink to="/player">Players</CustomLink>
        <CustomLink to="/team">Teams</CustomLink>
        <CustomLink to="/manager">Managers</CustomLink>
        <CustomLink to="/ranking">Ranking</CustomLink>
        
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>

  )
}