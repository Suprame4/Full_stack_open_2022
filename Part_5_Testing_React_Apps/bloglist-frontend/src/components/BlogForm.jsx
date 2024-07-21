import { useState } from 'react'
import Notification from './Notification'

const BlogForm = ({ createBlog, setSuccessMessage }) => {
    const [ newTitle, setNewTitle ] = useState('')
    const [ newAuthor, setNewAuthor] = useState('')
    const [ newUrl, setNewUrl ] = useState('')
    // const [ successMessage, setSuccessMessage ] = useState(null)
    
    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl,
            likes: 0
        })

        setSuccessMessage(`a new blog ${newTitle} by ${newAuthor} added`)
        setTimeout(() => {
            setSuccessMessage(null)
        }, 5000)

        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
    }

    return (
        <div>
            <h2>Create a new blog post</h2>

            <form onSubmit={addBlog}>
                Title:
                <input
                    value={newTitle}
                    onChange={ event => setNewTitle(event.target.value)}
                />
                <br/>
                Author:
                <input
                    value={newAuthor}
                    onChange={ event => setNewAuthor(event.target.value)}
                />
                <br/>
                Url:
                <input
                    value={newUrl}
                    onChange={event => setNewUrl(event.target.value)}
                />
                <br/>
                <button type='submit'>
                    create
                </button>
            </form>
        </div>
    )
}

export default BlogForm;