import React, { } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import newRoute from '../../assets/bg1.jpg'
import viewRoute from '../../assets/bg6.jpg'

function Admin() {

  const navigate = useNavigate()
  const [, , removeCookie] = useCookies([]);

  const handleLogout = () => {
    localStorage.clear()
    localStorage.setItem('isLoggingOut', true);
    removeCookie('jwt')
    navigate('/')
  }

  const handleNewRoute = () => {
    navigate('newRoute/')
  }

  const handleViewRoutes = () => {
    navigate('viewRoutes/')
  }

  const Header = () => (
    <header style={headerStyles.header}>
      <span style={headerStyles.title}>NIEPID</span>
      <button onClick={handleLogout} style={headerStyles.button}>
        Logout
      </button>
    </header>
  )

  const Footer = () => (
    <footer style={footerStyles.footer}>
      <p style={footerStyles.text}>© 2024. All rights reserved.</p>
    </footer>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <div style={styles.container}>
        <div 
        style={{
          ...styles.subContainer,
          backgroundImage:`url(${newRoute})`
        }} onClick={handleNewRoute}>
          <p style={styles.subContainerText}>New Route</p>
        </div>
        <div 
        style={{
          ...styles.subContainer,
          backgroundImage:`url(${viewRoute})`
        }} onClick={handleViewRoutes}>
          <p style={styles.subContainerText}>View Routes</p>
        </div>
      </div>
      <Footer />
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    height:'100%',
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '1vw',
    cursor:'pointer',
    padding: '2vw',
    margin: '5vw 0',
    width:'30%',
    height:'60%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  subContainerText:{
    fontSize:'3vw',
    fontWeight:'bold',
  }
}

const headerStyles = {
  header: {
    backgroundColor: '#fA5',
    fontWeight: 'bold',
    padding: '1vw 0vw',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    marginLeft: '3vw',
    fontSize: '1.5vw',
    color: '#f00'
  },
  button: {
    padding: '1vw 1.5vw',
    backgroundColor: '#ff4d4d',
    fontSize: '1.3vw',
    color: '#fff',
    border: 'none',
    borderRadius: '1vw',
    cursor: 'pointer',
    marginRight: '3vw',
  }
}

const footerStyles = {
  footer: {
    backgroundColor: '#Af5',
    textAlign: 'center',
    fontSize: '1.5vw',
    fontWeight: 'bold',
    width: '100vw',
  }
};

export default Admin