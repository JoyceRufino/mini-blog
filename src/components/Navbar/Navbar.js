import { NavLink } from 'react-router-dom'

// para fazer a função de Logout
import { useAuthentication } from '../../hooks/useAuthentication'

// para pegar o valor do contexto
import { useAuthValue } from '../../context/AuthContext'

import styles from './Navbar.module.css'

const Navbar = () => {

  // pega o usuario que esta sendo compartilhado no Provider  (que eu só tenho acesso depois que carrega tudo - loading)
  const { user } = useAuthValue();
  const {logout} = useAuthentication()

  return (
    <>
      <nav className={styles.navbar}>
        <NavLink to='/' className={styles.brand}>
          Mini <span>Blog</span>
        </NavLink>
        <ul className={styles.links_list}>
          <li>
            <NavLink to="/" end className={({ isActive }) => (isActive ? styles.active : "")} >
              Home
            </NavLink>
          </li>

          {/* Se não tiver usuário, exibir Entrar e Cadastrar */}
          {!user && (
            <>
              <li>
                <NavLink to="/login" className={({ isActive }) => (isActive ? styles.active : "")} >
                  Entrar
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className={({ isActive }) => (isActive ? styles.active : "")} >
                  Cadastrar
                </NavLink>
              </li>
            </>
          )}
          {/* Páginas para usuarios que estão logados */}
          {user && (
            <>
              <li>
                <NavLink to="/post/create" className={({ isActive }) => (isActive ? styles.active : "")} >
                  Novo Post
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard" className={({ isActive }) => (isActive ? styles.active : "")} >
                  Dashboard
                </NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? styles.active : "")} >
              Sobre
            </NavLink>
          </li>
          {
            user && (
              <li>
                <button onClick={logout}>Sair</button>
              </li>
            )
          }
        </ul>
      </nav>
    </>
  )
}

export default Navbar