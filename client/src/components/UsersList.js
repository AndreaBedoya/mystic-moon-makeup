import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UserForm from "./UserForm";
import "../styles/UserList.css";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  //---------------------nuevo estado--------------------
  const [selectedUser, setSelectedUser] = useState(null);
  //-----------------------------------------------------

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

  //-----------------------------------------------------------------------
  //-----------------Funcion para crear un usuario-------------------------
  //-----------------------------------------------------------------------
  const handleCreateUser = async (newUser) => {
    try {
      const response = await fetch("http://localhost:4000/api/users", {
        method: "POST",
        body: newUser,
      });

      if (!response.ok) {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Error al crear usuario",
          text:
            errorData.error ||
            `El usuario ya existe y no puede ser registrado nuevamente.`,
          confirmButtonColor: "#d9534f",
        });
        return;
      }

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

  //-----------------------------------------------------------------------
  //------------------Funcion para editar un usuario-----------------------
  //-----------------------------------------------------------------------
  const handleEditUser = async (id, updatedUser) => {
    try {
      const response = await fetch(`http://localhost:4000/api/users/${id}`, {
        method: "PUT",
        body: updatedUser,
      });

      if (!response.ok) {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Error al actualizar usuario",
          text: errorData.error || "No se pudo actualizar el usuario.",
          confirmButtonColor: "#d9534f",
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Usuario actualizado",
        text: "El usuario se ha actualizado con éxito.",
        confirmButtonColor: "#6c8cff",
      });

      setShowForm(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Error al actualizar usuario", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar el usuario.",
        confirmButtonColor: "#d9534f",
      });
    }
  };

  //-----------------------------------------------------------------------
  //------------------Funcion para eliminar un usuario---------------------
  //-----------------------------------------------------------------------
  const handleDeleteUser = async (id) => {
    const result = await Swal.fire({
      title: "¿Seguro que desea eliminar este usuario?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d9534f",
      cancelButtonColor: "#6c8cff",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:4000/api/users/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const errorData = await response.json();
          Swal.fire({
            icon: "error",
            title: "Error al eliminar usuario",
            text: errorData.error || "No se pudo eliminar el usuario.",
            confirmButtonColor: "#d9534f",
          });
          return;
        }

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
                    <button
                      className="edit-btn"
                      onClick={() => {
                        //------------------guardamos el usuario a editar------------------
                        setSelectedUser(user);
                        //-----------------------------------------------------------------
                        setShowForm(true);
                      }}
                    >
                      Editar
                    </button>
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
              onClick={() => {
                //---------------limpiar para modo creación-------------
                setSelectedUser(null);
                //------------------------------------------------------
                setShowForm(true);
              }}
            >
              + Crear nuevo usuario
            </button>
          </div>
        </>
      ) : (
        <UserForm
          //-------------------pasamos datos si es edición------------------
          initialData={selectedUser}
          //--------------------------------------------------------------
          onSubmit={(formData) =>
            selectedUser
              ? handleEditUser(selectedUser.id, formData)
              : handleCreateUser(formData)
          }
          onCancel={() => {
            setShowForm(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
}

export default UsersList;
