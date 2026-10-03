export default function DataTable({ headers, rows, className = '' }) {
  return <div className={`data-table-wrap ${className}`}>
    <table className="data-table">
      {headers && headers.some((h) => h) && <thead><tr>{headers.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>}
      <tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>)}</tbody>
    </table>
  </div>
}
