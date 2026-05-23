import React, { useEffect, useState } from "react";
import UserForm from "./UserForm";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:4000/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error al cargar usuarios", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (newUser) => {
    try {
      await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      setShowForm(false);
      fetchUsers();
    } catch (error) {
      console.error("Error al crear usuario", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await fetch(`http://localhost:4000/users/${id}`, {
        method: "DELETE",
      });
      fetchUsers();
    } catch (error) {
      console.error("Error al eliminar usuario", error);
    }
  };

  return (
    <div className="users-container">
      {!showForm ? (
        <>
          {/* ✅ El título solo aparece en la vista de lista */}
          <h2>Usuarios registrados</h2>

          <div className="users-grid">
            {users.map((user) => (
              <div key={user.id} className="user-card">
                <h3>{user.username}</h3>
                <p>{user.email}</p>
                <p>Rol: {user.role}</p>
                <p>Teléfono: {user.phone_number}</p>
                <p>Cédula: {user.document_id}</p>
                <p>Estado: {user.status}</p>
                <div className="user-actions">
                  <button className="btn-edit">Editar</button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className="btn-create" onClick={() => setShowForm(true)}>
            + Crear nuevo usuario
          </button>
        </>
      ) : (
        <UserForm
          onSubmit={handleCreateUser}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default UsersList;
