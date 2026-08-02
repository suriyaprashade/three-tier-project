import { useEffect, useState } from 'react';
function App(){const [users,setUsers]=useState([]);useEffect(()=>{fetch('http://localhost:5000/users').then(r=>r.json()).then(setUsers)},[]);return <div><h1>User List</h1>{users.map(u=><div key={u.id}>{u.name} - {u.email}</div>)}</div>}
export default App;