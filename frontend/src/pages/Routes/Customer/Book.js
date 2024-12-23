import React, { useEffect, useState } from 'react';
import { AiOutlineLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const VehicleRouteList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null); // Track the selected route
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

  const handleBack = () => {
    navigate(-1);
  };

  const handleBoxClick = (route) => {
    setSelectedRoute(route);  // Store the selected route
    setIsModalOpen(true);      // Open the modal
  };

  const handleBookRoute = async () => {
    const uname = localStorage.getItem('uname');
    if (selectedRoute) {
      try {
        const res = await axios.post('http://localhost:4002/customer/book', { id: selectedRoute.id, uname: uname }, {
          headers: {},
          withCredentials: true,
        })
        .catch((error) => {
          toast.dismiss();
          toast.error(error.response.data, { position: 'top-right', autoClose: 2500 });
        });

        if (res) {
          toast.dismiss();
          toast.success(res.data, { position: 'top-right', autoClose: 2500 });
          setIsModalOpen(false);  // Close the modal
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.post('http://localhost:4002/customer/viewRoute', data, {
          headers: {},
          withCredentials: true,
        });

        if (res) {
          const sortedData = res.data.sort((a, b) => a.mode.localeCompare(b.mode));
          setData(sortedData);
        }
      } catch (error) {
        toast.dismiss();
        toast.error(error.response.data, { position: 'top-right', autoClose: 2500 });
      }
    }
    fetchData();
  }, [data]);

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
        {/* Check if data is empty */}
        {data.length === 0 ? (
          <div style={styles.noRoutes}>No Routes found</div>
        ) : (
          data.map((route, index) => (
            <div key={index} style={styles.box} onClick={() => handleBoxClick(route)}>
              <div style={styles.item}><strong>ID:</strong> {route.id}</div>
              <div style={styles.item}><strong>Mode:</strong> {route.mode}</div>
              <div style={styles.item}><strong>From:</strong> {route.from}</div>
              <div style={styles.item}><strong>To:</strong> {route.to}</div>
              <div style={styles.item}><strong>Starts At:</strong> {route.startsAt}</div>
              <div style={styles.item}><strong>Duration:</strong> {route.duration}</div>
              <div style={styles.item}><strong>Passengers:</strong> {route.passengers.length}/{route.capacity}</div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2>Do you want to Book this Route?</h2>
            <div>
              <button onClick={handleBookRoute} style={styles.button}>Yes</button>
              <button onClick={handleCloseModal} style={styles.button}>No</button>
            </div>
          </div>
        </div>
      )}
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
    cursor: 'pointer',  // Makes it clear the box is clickable
  },
  item: {
    marginBottom: '10px',
    fontSize: '14px',
    color: '#333',
  },
  modal: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '1000',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    width: '300px',
  },
  button: {
    margin: '10px',
    padding: '10px 20px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: 'white',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  noRoutes: {
    fontSize: '18px',
    color: '#555',
    textAlign: 'center',
    width: '100%',
    marginTop: '20px',
  },
};

export default VehicleRouteList;
