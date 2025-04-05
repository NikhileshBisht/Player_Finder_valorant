import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import styles from './Team.module.scss';

export default function GridLinesDemo() {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/get_table")
            .then(res => res.json())
            .then(data => {
                setPlayers(data);
            })
            .catch(err => {
                console.error("Error fetching player data:", err);
            });
    }, []);

    return (
        <div className={styles.main}>
            <DataTable value={players} showGridlines tableStyle={{ minWidth: '50rem' }}>
                <Column field="code" header="Code"></Column>
                <Column field="rank" header="Rank"></Column>
                <Column field="click" header="Click"></Column>
            </DataTable>
        </div>
    );
}
