import { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

function Purchase() {

  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [form, setForm] = useState({
  name: "",
  hsnCode: ""
});

   const [editId, setEditId] = useState(null);

  
  const fetchItems = async () => {
    const res = await axios.get("http://localhost:8080/api/items");
    setItems(res.data);
  };


const handleSearch = async (value) => {
  setSearch(value);

  if (value.length > 1) {
    const res = await axios.get(`http://localhost:8080/api/items/search?q=${value}`);
    setSuggestions(res.data);
  } else {
    setSuggestions([]);
  }
};

const selectItem = (item) => {
  setForm({
    name: item.name,
    hsnCode: item.hsnCode
  });
  setSuggestions([]);
};
const saveItem = async () => {

  if (editId) {
    await axios.put(`http://localhost:8080/api/items/${editId}`, form);
  } else {
    await axios.post("http://localhost:8080/api/items", form);
  }

  setForm({ name: "", hsnCode: "" });
  setEditId(null);
  setShowModal(false);
  fetchItems();
};

const handleEdit = (item) => {
  setForm(item);
  setEditId(item.id);
  setShowModal(true);
};
const deleteItem = async (id) => {
  await axios.delete(`http://localhost:8080/api/items/${id}`);
  fetchItems();
};

const resetForm = () => {
  setForm({ name: "", hsnCode: "" });
  setEditId(null);
  setSearch("");
  setSuggestions([]);
};

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="container">
    {/* TABLE CARD */}
      <div className="card">
       <div className="header">
        <div>
          <h2>Purchase Item Master</h2>
          <p className="sub">Manage purchase items and inventory</p>
        </div>

     <button
       className="btn"
       onClick={() => {
       resetForm();
       setShowModal(true);
       }}
      >
  + Add Purchase
</button>
      </div>


        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>HSN CODE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
  {items.map((item, index) => (
    <tr key={item.id}>
      <td>{index + 1}</td>
      <td>{item.name}</td>
      <td>{item.hsnCode}</td>
      <td>
        <span className="edit" onClick={() => handleEdit(item)}>✏️</span>
        <span className="delete" onClick={() => deleteItem(item.id)}>🗑</span>
      </td>
    </tr>
  ))}
</tbody>
        </table>
      </div>
       

     {showModal && (
  <div className="modal">
    <div className="modal-content">

      <div className="modal-header">
        <h3>Add New Purchase Item</h3>
        <span onClick={() => setShowModal(false)}>X</span>
      </div>

      <p className="sub">Enter purchase item details below.</p>

      {/* SEARCH */}
      <input
        className="input"
        placeholder="Search existing items..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />

      {/* Suggestions */}
      {suggestions.map((item) => (
        <div key={item.id} className="suggestion" onClick={() => selectItem(item)}>
          {item.name}
        </div>
      ))}

      {/* FORM */}
      <input
        className="input"
        placeholder="Item Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="input"
        placeholder="HSN Code"
        value={form.hsnCode}
        onChange={(e) => setForm({ ...form, hsnCode: e.target.value })}
      />

      {/* BUTTONS */}
      <div className="actions">
        <button onClick={() => {
           resetForm()
          setShowModal(false);
          
         }}>
  Cancel
</button>

        <button className="btn" onClick={saveItem}>
          {editId ? "Update" : "Save"}
        </button>
      </div>

    </div>
  </div>
)}

    </div>
  );
}

export default Purchase;