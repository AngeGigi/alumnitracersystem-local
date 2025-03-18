import React, { useState , useEffect } from "react";
import styles from "./Analytics-Cards.module.css";

export default function DashboardCards() {
  const [stats, setStats] = useState({
    totalAlumni: 0,
    employedAlumni: 0,
    alignedAlumni: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const baseURL = "https://localhost:5050/dashboard"; // Change this in production
        const responses = await Promise.all([
          fetch(`${baseURL}/total-alumni`),
          fetch(`${baseURL}/employed-alumni`),
          fetch(`${baseURL}/course-aligned-alumni`),
        ]);

        const [totalData, employedData, alignedData] = await Promise.all(responses.map(res => res.json()));

        setStats({
          totalAlumni: totalData.totalAlumni || 0,
          employedAlumni: employedData.employedAlumni || 0,
          alignedAlumni: alignedData.alignedAlumni || 0,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchStats();
  }, []);


  const data = [
    {
      id: 1,
      title: "REGISTERED ALUMNI",
      value: stats.totalAlumni,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fc1e1e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
      ),
    },
    {
      id: 2,
      title: "EMPLOYED ALUMNI",
      value: stats.employedAlumni,
      percentage: stats.totalAlumni ? `${Math.round((stats.employedAlumni / stats.totalAlumni) * 100)}%` : "0%",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fc1e1e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
      ),
    },
    {
      id: 3,
      title: "COURSE ALIGNED",
      value: stats.alignedAlumni,
      percentage: stats.totalAlumni ? `${Math.round((stats.alignedAlumni / stats.totalAlumni) * 100)}%` : "0%",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fc1e1e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
      ),
    },
  ];

  return (
    <div className={styles.cardsContainer}>
      {data.map((item) => (
        <div key={item.id} className={styles.card}>
          <div className={styles.icon}>{item.icon}</div>
          <div className={styles.value}>
            {item.value}
            {item.percentage && <span className={styles.percentage}> ({item.percentage})</span>}
          </div>
          <div className={styles.title}>{item.title}</div>
        </div>
      ))}
    </div>
  );
}
