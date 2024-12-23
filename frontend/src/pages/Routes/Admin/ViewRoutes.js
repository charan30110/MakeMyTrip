import React, { useEffect, useState } from 'react';
import { AiOutlineLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';

const VehicleRouteList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([])

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.post('http://localhost:4002/admin/viewRoute', data, {
          headers: {},
          withCredentials: true
        })
          .catch((error) => {
            toast.dismiss()
            toast.error(error.response.data, { position: 'top-right', autoClose: 2500 })
          })
        if (res) {
          console.log(res)
          const sortedData = res.data.sort((a, b) => a.mode.localeCompare(b.mode));
          setData(sortedData)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[data])

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      <button
        onClick={handleBack}
        style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '10px' }}
        aria-label="Back"
      >
        <AiOutlineLeft size={30} color="black" />
      </button>

      <div style={styles.container}>
        {data.map((route, index) => (
          <div key={index} style={styles.box}>
            <div style={styles.item}><strong>ID:</strong> {route.id}</div>
            <div style={styles.item}><strong>Mode:</strong> {route.mode}</div>
            <div style={styles.item}><strong>From:</strong> {route.from}</div>
            <div style={styles.item}><strong>To:</strong> {route.to}</div>
            <div style={styles.item}><strong>Starts At:</strong> {route.startsAt}</div>
            <div style={styles.item}><strong>Duration:</strong> {route.duration}</div>
            <div style={styles.item}><strong>Passengers:</strong> {route.passengers.length}/{route.capacity}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    padding: '20px',
    overflowY: 'auto',
    flex: 1,
    alignItems: 'flex-start', // Ensures items align at the top
  },
  box: {
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  item: {
    marginBottom: '10px',
    fontSize: '14px',
    color: '#333',
  },
};

export default VehicleRouteList;
