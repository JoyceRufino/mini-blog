import { Link } from 'react-router-dom'

//CSS
import styles from './About.module.css'


const About = () => {
  return (
    <div className={styles.about}>
        <h1>Sobre o Mini <span>Blog</span> </h1>
        <p>Este projeto consiste em um blog, feito com ReactJS no front-end e, Firebase no back-end.</p>
        <Link to='/post/create' className='btn'>Criar post.</Link>
    </div>
  )
}

export default About