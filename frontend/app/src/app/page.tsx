import React from 'react';
import Link from 'next/link';
import styles from '../styles/home.module.css';



async function getBookings() {
  const res = await fetch('http://host.docker.internal:5000/api/bookings', { cache: 'no-store', mode: 'no-cors' });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}



const Home: React.FC = async () => {


  let bookings = await getBookings();

  console.log(bookings);

  bookings = bookings.map(value => {
    value.date = new Date(value.date).toDateString();
    return value;
  });




  return (
    <div className={styles.container}>
      <h4>Bookings</h4>
      <ul >
        {bookings.map((booking) => (
          <li key={booking.id} className={styles['booking-item']} >
            <Link href={`/book/${booking.id}?doctor_name=${booking.doctor_name}&service=${booking.service}&end_time=${booking.end_time}`}>
              <div>
                A Booking on {booking.date} starting at {booking.start_time}
              </div>
            </Link>
          </li>
        ))}
      </ul>
     <div>
      <Link href="/form/bookingFormPage" className={styles.link}>
        Insert a Booking
      </Link>
     </div>
    </div>
  );

};

export default Home;
