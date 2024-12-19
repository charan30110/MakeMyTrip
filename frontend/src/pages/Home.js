import React from 'react'
import Login from './Login'
import Register from './Register'

function Home() {

  const Header = () => (
    <header style={headerStyles.header}>
      <p style={headerStyles.title}>MakeMyTrip</p>
    </header>
  )

  const Footer = () => (
    <footer style={footerStyles.footer}>
      <p style={footerStyles.text}>© 2024. All rights reserved.</p>
    </footer>
  )

  return (
    <div style={{display:'flex',flexDirection:'column',height:'100vh'}}>
      <Header />
      <div style={styles.container}>
        <Login style={styles.item} />
        <Register styles={styles.item} />
      </div>
      <Footer />
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '100%',
    flexWrap: 'wrap'
  },
}

const headerStyles = {
  header: {
    backgroundColor: '#fA5',
    fontSize:'1.5vw',
    fontWeight:'bold',
    paddingLeft:'3vw'
  },
  title: {
    color:'#f00'
  }
}

const footerStyles = {
  footer: {
    backgroundColor: '#Af5',
    textAlign: 'center',
    fontSize:'1.5vw',
    fontWeight:'bold',
  }
};

export default Home