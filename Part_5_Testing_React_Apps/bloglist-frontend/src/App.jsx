import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

import './styles.css'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  const handleLogin = async (event) => {
    event.preventDefault()

    try{
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch( exception ){
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } 
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => {

    const hideWhenVisible = { display: loginVisible ? 'none' : ''}
    const showWhenVisible = { display: loginVisible ? '' : 'none'}

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={ () => setLoginVisible(true)}>
            Login
          </button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm 
            handleSubmit={ handleLogin }
            handleUsernameChange={ ({ target }) => setUsername(target.value) }
            handlePasswordChange={ ({ target }) => setPassword(target.value) }
            username={ username }
            password={ password }
          />
          <button onClick={ () => setLoginVisible(false)}>Cancel</button>
        </div>
      </div>
    )
  }

  const logout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const addBlog = ( noteObject ) => {
    blogService
      .create(noteObject)
      .then( returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
  }
  const blogForm = () => (
    <BlogForm
      createBlog={addBlog}
      setSuccessMessage={setSuccessMessage}
    />
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification errorMessage={errorMessage} successMessage={successMessage} />

      { !user && loginForm() }
      { user && 
        <div>
          <p>{user.name} logged in <button onClick={logout}>Logout</button></p>
          {blogForm()}
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App