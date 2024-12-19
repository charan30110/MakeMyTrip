import React, { useState } from 'react';
import bg3 from '../assets/bg3.jpg'

function Login() {

  const [formData, setFormData] = useState({
    uname: '',
    password: ''
  })

  const handleChange = (e) => {
    e.preventDefault()
    let { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

  }

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Login Form</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formItem}>
          <label style={styles.formLabel} htmlFor='uname'>
            Username:
          </label>
          <input
            style={styles.formInput}
            type="text"
            id="uname"
            name="uname"
            value={formData.uname}
            onChange={handleChange}
            placeholder='Enter username'
          />
        </div>
        <div style={styles.formItem}>
          <label style={styles.formLabel} htmlFor='password'>
            Password:
          </label>
          <input
            style={styles.formInput}
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder='Enter password'
          />
        </div>
        <div style={styles.formItem}>
          <button style={styles.formButton}>Submit</button>
        </div>
      </form>
    </div>
  )
}

const styles = {
  container: {
    width: '35vw',
    height: '90%',
    border: 'none',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '2vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundImage: `url(${bg3})`,
    backgroundSize: "cover",
  },
  header: {
    width:'90%',
    display:'flex',
    justifyContent:'center',
    backgroundColor:'#DDD',
    padding:'2%'
  },
  form: {
    width: '100%',
    height:'100%',
    paddingTop:'7%'
  },
  formItem: {
    marginLeft: '10%',
    marginBottom: '2%',
    display: 'flex',
    flexDirection: 'column',
  },
  formLabel: {
    marginBottom: '1%',
    fontSize:'1rem',
    fontStyle:'italic',
    fontWeight:'bold'
  },
  formInput: {
    padding: '1.5%',
    border: '1px solid #ccc',
    borderRadius: '0.5rem',
    width: '80%',
  },
  formButton: {
    width: '83%',
    padding:'2%',
    marginTop:'4%',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '0.25rem',
    cursor: 'pointer',
    backgroundColor:'#A5f'
  }
}

export default Login