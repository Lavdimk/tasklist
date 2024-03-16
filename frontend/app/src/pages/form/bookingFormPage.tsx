import styles from '../../styles/bookingForm.module.css';
import { useState } from 'react';
import { useRouter } from "next/router"

const BookingForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    service: '',
    doctor_name: '',
    start_time: '',
    end_time: '',
    date: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://host.docker.internal:5000/api/bookings' , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setMessage('Booking inserted successfully');
        await router.push("/");
      } else {
        setMessage('Error inserting booking');
      }
    } catch (error) {
      console.error('Error inserting booking:', error);
      setMessage('Internal Server Error');
    }
  };

  return (
    <div className={styles['booking-form-container']}>
      <h1>Booking Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Service:
          <input type="text" name="service" value={formData.service} onChange={handleChange} />
        </label>
        <br />
        <label>
          Doctor Name:
          <input type="text" name="doctor_name" value={formData.doctor_name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Start Time:
          <input type="text" name="start_time" value={formData.start_time} onChange={handleChange} />
        </label>
        <br />
        <label>
          End Time:
          <input type="text" name="end_time" value={formData.end_time} onChange={handleChange} />
        </label>
        <br />
        <label>
          Date:
          <input type="text" name="date" value={formData.date} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BookingForm;
