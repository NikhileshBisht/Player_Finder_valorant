import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import styles from "./Team.module.scss";
import axios from "../../api/axios"; // using the axios instance with token
import { useSelector } from 'react-redux';

export default function GridLinesDemo() {
  const [players, setPlayers] = useState([]);
  const [copiedCode, setCopiedCode] = useState(null);
  const name = useSelector((state) => state.user.name);

  const fetchData = async () => {
    try {
      const res = await axios.get("/get_table");
      setPlayers(res.data);
    } catch (err) {
      console.error("Error fetching player data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const copyToClipboard = async (rowData) => {
    try {
      navigator.clipboard.writeText(rowData.code);
      setCopiedCode(rowData.code);
      setTimeout(() => setCopiedCode(null), 2000);

      // Call backend to decrement click
      await axios.post(`/decrement_click/${rowData.code}`);
      await fetchData(); // refresh the data
    } catch (err) {
      console.error("Error during copy or update:", err);
    }
  };

  const copyButtonTemplate = (rowData) => (
    <button
      className={styles.copyButton}
      onClick={() => copyToClipboard(rowData)}
      disabled={rowData.click <= 0}
    >
      {rowData.click <= 0
        ? "No Clicks"
        : copiedCode === rowData.code
        ? "Copied!"
        : `Copy (${rowData.click})`}
    </button>
  );

  return (
    <div className={styles.main}>
      <div className={styles.mainContainer}>
        <DataTable
          value={players}
          showGridlines
          tableStyle={{ minWidth: "50rem" }}
          paginator
          rows={10} // how many rows per page
          scrollable
          scrollHeight="400px" // sets vertical scroll height
        >
          <Column field="code" header="Code" />
          <Column field="rank" header="Rank" />
          <Column field="click" header="Clicks Left" />
          <Column body={copyButtonTemplate} header="Action" />
        </DataTable>
      </div>
    </div>
  );
}
