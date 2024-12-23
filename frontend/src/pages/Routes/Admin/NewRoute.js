import React, { useState } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';
import { AiOutlineLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom'

function VehicleRouteForm() {
  const [formData, setFormData] = useState({
    id: '',
    mode: '',
    from: '',
    to: '',
    startsAt: { hours: '', minutes: '', period: '' },
    duration: '',
    capacity: '',
  });
  const navigate = useNavigate()

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === 'hours' || name === 'minutes' || name === 'period') {
      setFormData((prevData) => ({
        ...prevData,
        startsAt: {
          ...prevData.startsAt,
          [name]: value,
        },
      }));
    } else {
      if (name === "capacity" || name === "duration") {
        value = value.replace(/[^0-9]/g, '')
      }
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleBack = () => {
    navigate(-1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...formData };
    const { hours, minutes, period } = formData.startsAt;
    data.startsAt = `${hours}:${minutes} ${period}`;
    data.passengers = []
    try {
      const res = await axios.post('http://localhost:4002/admin/newRoute', data, {
        headers: {},
        withCredentials: true
      })
        .catch((error) => {
          toast.dismiss()
          toast.error(error.response.data, { position: 'top-right', autoClose: 2500 })
        })
      if (res) {
        toast.dismiss()
        toast.success(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  };

  const styles = {
    form: {
      width: '50%',
      margin: '2rem auto',
      padding: '2rem',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif',
    },
    field: {
      marginBottom: '1.2rem',
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: 'bold',
      color: '#333',
    },
    input: {
      width: '95%',
      padding: '0.8rem',
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontSize: '1rem',
    },
    select: {
      width: '100%',
      padding: '0.8rem',
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontSize: '1rem',
    },
    button: {
      width: '100%',
      padding: '0.8rem',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: 'bold',
    },
    buttonHover: {
      backgroundColor: '#45a049',
    },
    timeField: {
      display: 'flex',
      gap: '0.5rem',
    },
  };

  return (
    <div style={{display:'flex',flexDirection:'row'}}>
      <button
        onClick={handleBack}
        style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
        aria-label="Back"  // Accessible label for screen readers
      >
        <AiOutlineLeft size={30} color="black" />
      </button>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label style={styles.label}>ID:</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Mode:</label>
          <select
            name="mode"
            value={formData.mode}
            onChange={handleChange}
            required
            style={styles.select}
          >
            <option value="">Select Mode</option>
            <option value="car">Car</option>
            <option value="bus">Bus</option>
            <option value="flight">Flight</option>
          </select>
        </div>
        <div style={styles.field}>
          <label style={styles.label}>From:</label>
          <input
            type="text"
            name="from"
            value={formData.from}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>To:</label>
          <input
            type="text"
            name="to"
            value={formData.to}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Starts At:</label>
          <div style={styles.timeField}>
            <select
              name="hours"
              value={formData.startsAt.hours}
              onChange={handleChange}
              required
              style={styles.select}
            >
              <option value="">HH</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              name="minutes"
              value={formData.startsAt.minutes}
              onChange={handleChange}
              required
              style={styles.select}
            >
              <option value="">MM</option>
              {Array.from({ length: 60 }, (_, i) => (
                <option key={i} value={i < 10 ? `0${i}` : i}>
                  {i < 10 ? `0${i}` : i}
                </option>
              ))}
            </select>
            <select
              name="period"
              value={formData.startsAt.period}
              onChange={handleChange}
              required
              style={styles.select}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Duration (in hrs):</label>
          <input
            type="text"
            name="duration"
            maxLength={2}
            value={formData.duration}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Capacity:</label>
          <input
            type="text"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default VehicleRouteForm;
