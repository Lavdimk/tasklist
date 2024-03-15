import { useRouter } from "next/router"
import styles from '../../styles/book.module.css'; 


import { useEffect } from 'react';

export default function Book() {
    const router = useRouter();
    const id = router.query.id;
    const doctor_name = router.query.doctor_name;
    const service = router.query.service;
    const end_time = router.query.end_time;

    const handleBackClick = async() => {
        // localStorage.setItem('backPage', router.pathname)

        // const backPage = localStorage.getItem('backPage')
        await router.push("/");
    }

    return (
        <div className={styles.container}>
            <h2>This Booking is with {doctor_name} For {service} and it ends on {end_time}</h2>
            <button className={styles.button} type='button' onClick={handleBackClick}>Back</button>
        </div>

    )
}