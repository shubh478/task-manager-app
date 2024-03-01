import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Analytics.module.css";

function Analytics() {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
      
        setAnalyticsData(response.data);
      } catch (error) {
      
      }
    };

    fetchAnalyticsData();
  }, []);

  return (
    <div>
      {analyticsData && (
        <div>
          <ul className={styles.firstList}>
            <li>Backlog Tasks: {analyticsData.backlogCount}</li>
            <li>To-do Tasks: {analyticsData.todoCount}</li>
            <li>In-Progress Tasks: {analyticsData.inProgressCount}</li>
            <li>Completed Tasks: {analyticsData.doneCount}</li>
          </ul>
          <ul className={styles.secondList}>
            <li>Low Priority: {analyticsData.lowPriorityCount}</li>
            <li>Moderate Priority: {analyticsData.moderatePriorityCount}</li>
            <li>Due Date Tasks: {analyticsData.dueDateTasksCount}</li>
            <li>High Priority: {analyticsData.highPriorityCount}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Analytics;
