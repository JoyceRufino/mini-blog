import styles from './Register.module.css';
import { useState, useEffect } from 'react';


const Register = () => {

  const [displayName, setDispalyName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  //preciso juntar os dados e enviar no formulário
  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    const user = {
      displayName,
      email,
      password
    }
    if(password !== confirmPassword){
      setError("as senhas precisam ser iguais!")
      return
    }
    console.log(user)
  }

  return (
    <div className={styles.register}>
        <h1>Cadastre-se para postar</h1>
        <p>Crie seu usuário e compartilhe suas histórias.</p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Nome:</span>
            <input 
              type="text"
              name="displayName"
              required
              placeholder="Nome do Usuário"
              value={displayName}
              onChange={(e) => setDispalyName(e.target.value)}
            />
          </label>
          <label>
            <span>E-mail:</span>
            <input 
              type="email"
              name="email"
              required
              placeholder="E-mail do Usuário"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <span>Senha:</span>
            <input 
              type="password"
              name="password"
              required
              placeholder="Insira sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label>
            <span>Confirmação de Senha:</span>
            <input 
              type="password"
              name="confirmPassword"
              required
              placeholder="Confirme a sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          <button className='btn'>Cadastrar</button>
          {error && <p className='error'>{error}</p>}
        </form>
    </div>
  )
}

export default Register;