import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UserForm from "./UserForm";
import "../styles/UserList.css";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/users");
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
      await fetch("http://localhost:4000/api/users", {
        method: "POST",
        body: newUser,
      });

      Swal.fire({
        icon: "success",
        title: "Usuario registrado",
        text: "El usuario se ha registrado con éxito.",
        confirmButtonColor: "#6c8cff",
      });

      setShowForm(false);
      fetchUsers();
    } catch (error) {
      console.error("Error al crear usuario", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo registrar el usuario.",
        confirmButtonColor: "#d9534f",
      });
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await fetch(`http://localhost:4000/api/users/${id}`, {
        method: "DELETE",
      });

      Swal.fire({
        icon: "success",
        title: "Usuario eliminado",
        text: "El usuario ha sido eliminado correctamente.",
        confirmButtonColor: "#6c8cff",
      });

      fetchUsers();
    } catch (error) {
      console.error("Error al eliminar usuario", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo eliminar el usuario.",
        confirmButtonColor: "#d9534f",
      });
    }
  };

  return (
    <div className="users">
      {!showForm ? (
        <>
          <h2 className="users-view-title">Usuarios</h2>
          <div className="users-view-box">
            <div className="users-view-grid">
              {users.map((user) => (
                <div key={user.id} className="users-view-card">
                  {user.profile_picture && (
                    <img
                      src={`http://localhost:4000/uploads/${user.profile_picture}`}
                      alt="Foto perfil"
                      className="users-view-img"
                    />
                  )}
                  <h4>{user.username}</h4>
                  <p>{user.email}</p>
                  <p>Rol: {user.role}</p>
                  <p>Teléfono: {user.phone_number}</p>
                  <p>Cédula: {user.document_id}</p>
                  <p>Estado: {user.status}</p>
                  <div className="users-view-actions">
                    <button className="edit-btn">Editar</button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="create-user">
            <button
              className="create-btn"
              onClick={() => setShowForm(true)}
            >
              + Crear nuevo usuario
            </button>
          </div>
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
