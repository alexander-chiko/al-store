import UsersAdminView from "@/components/views/admin/Users";
import userServices from "@/services/user";
import { useState } from "react";
import { useEffect } from "react";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await userServices.getAllUsers();
      setUsers(data.data);
    };
    getAllUsers();
  }, []);
  return (
    <>
      <UsersAdminView users={users}></UsersAdminView>
    </>
  );
};

export default AdminUsersPage;
