import React, { useState } from 'react';
import bg4 from '../assets/bg4.jpg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

function Register() {

  const [formData, setFormData] = useState({
    uname: '',
    password: '',
    reTypePassword: '',
    phone: ''
  })

  const handleChange = (e) => {
    e.preventDefault()
    let { name, value } = e.target
    if(name==='uname') value = value.trim()
    if (name === "phone")
      value = value.replaceAll(/[^0-9]/g, '')
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleValidation = () => {
    const { uname, password, reTypePassword, phone } = formData;
    toast.dismiss()
    if (!(uname.trim() && password.trim() && reTypePassword.trim() && phone.trim())) {
      toast.error("All fields are required", { position: 'top-right', autoClose: 2500 })
      return false
    } else if (password !== reTypePassword) {
      toast.error("Enter the same passwords", { position: 'top-right', autoClose: 2500 })
      return false
    } else if (phone.length !== 10) {
      toast.error("Phone number must be 10 digits", { position: 'top-right', autoClose: 2500 })
      return false
    } else {
      return true
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!handleValidation()) return;
    try {
      let res = await axios.post('http://localhost:4002/register', { formData }, { withCredentials: true })
        .catch((error) => {
          throw error
        })
      if (res) {
        toast.dismiss()
        toast.success("Registered Successfully!!!", { position: 'top-right', autoClose: 2500 })
        toast.success("You can login now!!!", { position: 'top-right', autoClose: 2500 })
      }
    } catch (error) {
      console.log(error)
      toast.dismiss()
      toast.error(error.response.data, { position: 'top-right', autoClose: 2500 })
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Registration Form</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formItem}>
          <label style={styles.formLabel} htmlFor='uname1'>
            Username:
          </label>
          <input
            style={styles.formInput}
            type="text"
            id="uname1"
            name="uname"
            value={formData.uname}
            onChange={handleChange}
            placeholder='Enter username'
          />
        </div>
        <div style={styles.formItem}>
          <label style={styles.formLabel} htmlFor='password1'>
            Password:
          </label>
          <input
            style={styles.formInput}
            type="password"
            id="password1"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder='Enter password'
          />
        </div>
        <div style={styles.formItem}>
          <label style={styles.formLabel} htmlFor='reTypePassword'>
            ReType Password:
          </label>
          <input
            style={styles.formInput}
            type="password"
            id="reTypePassword"
            name="reTypePassword"
            value={formData.reTypePassword}
            onChange={handleChange}
            placeholder='ReType password'
          />
        </div>
        <div style={styles.formItem}>
          <label style={styles.formLabel} htmlFor='phone'>
            Mobile:
          </label>
          <input
            style={styles.formInput}
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            maxLength={10}
            placeholder='Enter mobile no.'
          />
        </div>
        <div style={styles.formItem}>
          <button style={styles.formButton}>Register</button>
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
    backgroundImage: `url(${bg4})`,
    backgroundSize: "cover",
  },
  header: {
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#DDD',
    padding: '2%'
  },
  form: {
    width: '100%',
  },
  formItem: {
    marginLeft: '10%',
    marginBottom: '2%',
    display: 'flex',
    flexDirection: 'column',
  },
  formLabel: {
    marginBottom: '1%',
    fontSize: '1rem',
    fontStyle: 'italic',
    fontWeight: 'bold'
  },
  formInput: {
    padding: '1.5%',
    border: '1px solid #ccc',
    borderRadius: '0.5rem',
    width: '80%',
  },
  formButton: {
    width: '83%',
    padding: '2%',
    marginTop: '1%',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '0.25rem',
    cursor: 'pointer',
    backgroundColor: '#5Af'
  }
}

export default Register