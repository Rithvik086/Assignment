import { useRef } from 'react'
import './App.css'
import { useNavigate, Link } from 'react-router-dom'

function App() {
  const passwordRef = useRef()
  const nameRef = useRef()
  const emailRef = useRef()
  const navigate = useNavigate()
  const submithandler = async (e) => {
    e.preventDefault()

    const name = nameRef.current.value
    const email = emailRef.current.value
    const password = passwordRef.current.value // ✅ Correct ref

    const formData = { name, email, password }

    try {
      const response = await fetch('https://assignment-backend-bgnl.onrender.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert('Signup successful')
        navigate('/tasks')
      } else {
        alert('Signup failed')
      }
    } catch (err) {
      console.error('Error submitting form:', err)
      alert('Something went wrong.')
    }
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-6 text-center">User Registration</h1>
        <form
          onSubmit={submithandler}
          className="flex flex-col gap-4 w-80 bg-white p-6 rounded shadow-md"
        >
          <input
            className="border border-black border-2 rounded px-2 py-1"
            placeholder="Enter name"
            type="text"
            ref={nameRef}
          />
          <input
            className="border border-black border-2 rounded px-2 py-1"
            placeholder="Enter email"
            type="text"
            ref={emailRef}
          />
          <input
            className="border border-black border-2 rounded px-2 py-1"
            placeholder="Enter password"
            type="password"
            ref={passwordRef}
          />

          <button
            type="submit"
            className="bg-black text-white rounded-3xl py-2 hover:bg-gray-800"
          >
            Submit
          </button>
          <p>
            Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default App
