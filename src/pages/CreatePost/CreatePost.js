import styles from './CreatePost.module.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("")

  const { user } = useAuthValue()

  const { InsertDocument, response } = useInsertDocument("posts")

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("")

    //validar url da imagem

    //array de tags

    //checar todos os valores

    InsertDocument({
      title,
      image,
      body,
      tags,
      uid: user.uid,
      createdBy: user.displayName
    })

    //redirected home page

  }

  return (
    <div className={styles.create_post}>
      <h1>Criar post</h1>
      <p>Escreva sobre o que quiser e compartilhe seu conhecimento!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="title"
            required
            placeholder='Pense num bom título.'
            value={title}
            onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          <span>URL da imagem:</span>
          <input
            type="text"
            name="image"
            required
            placeholder='Insira uma imagem que representa seu post.'
            value={image}
            onChange={(e) => setImage(e.target.value)} />
        </label>
        <label>
          <span>Conteúdo:</span>
          <textarea
            name='body'
            required
            placeholder='Insira o conteúdo do post.'
            value={body}
            onChange={(e) => setBody(e.target.value)}>
          </textarea>
        </label>
        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            required
            placeholder='Insira as tags separadas por vírgulas.'
            value={tags}
            onChange={(e) => setTags(e.target.value)} />
        </label>
        {!response.loading && <button className='btn'>Cadastrar</button>}
        {response.loading && <button className='btn' disabled>Aguardar....</button>}
        {response.error && <p className='error'>{response.error}</p>}

      </form>
    </div>
  )
}

export default CreatePost