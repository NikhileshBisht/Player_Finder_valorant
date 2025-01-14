import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import styles from './Team.module.scss';

export default function GridLinesDemo() {
    const [products, setProducts] = useState([]);
    const dummyProducts = [
      { code: "P001", name: "Laptop", category: "Electronics", quantity: 15 },
      { code: "P002", name: "Smartphone", category: "Electronics", quantity: 30 },
      { code: "P003", name: "Table", category: "Furniture", quantity: 10 },
      { code: "P004", name: "Chair", category: "Furniture", quantity: 25 },
      { code: "P005", name: "Notebook", category: "Stationery", quantity: 50 },
      { code: "P006", name: "Pen", category: "Stationery", quantity: 100 },
      { code: "P007", name: "Headphones", category: "Electronics", quantity: 20 },
      { code: "P008", name: "Monitor", category: "Electronics", quantity: 5 },
      { code: "P009", name: "Sofa", category: "Furniture", quantity: 3 },
      { code: "P010", name: "Keyboard", category: "Electronics", quantity: 12 },
  ];
  


      useEffect(() => {
        setProducts(dummyProducts);
    }, []);


    return (
        <div className={styles.main}>
            <DataTable value={products} showGridlines tableStyle={{ minWidth: '50rem' }}>
                <Column field="code" header="Code"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="category" header="Category"></Column>
                <Column field="quantity" header="Quantity"></Column>
            </DataTable>
        </div>
    );
}