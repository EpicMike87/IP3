import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Best 11
      </Link>
      <ul>
        <CustomLink to="/player">Players</CustomLink>
        <CustomLink to="/team">Teams</CustomLink>
        <CustomLink to="/ranking">Rankings</CustomLink>
        <CustomLink to="/manager">Managers</CustomLink>
        <CustomLink to="/PlayerComparison">Compare Players</CustomLink>
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