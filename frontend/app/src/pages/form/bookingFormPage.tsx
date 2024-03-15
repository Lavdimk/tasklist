
import styles from '../../styles/bookingForm.module.css';
import { useState } from 'react';

const BookingFormPage = () => {
  const [formData, setFormData] = useState({
    service: '',
    doctor_name: '',
    start_time: '',
    end_time: '',
    date: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Booking inserted successfully');
      } else {
        setMessage('Error inserting booking');
        console.error('Error inserting booking:', response.statusText);
      }
    } catch (error) {
      setMessage('Error inserting booking');
      console.error('Error inserting booking:', error);
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

export default BookingFormPage;
