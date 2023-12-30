import Modal from "@/components/ui/modal";
import { useState } from "react";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import Button from "@/components/ui/button";
import userServices from "@/services/user";

const ModalUpdateUser = (props: any) => {
  const { updatedUser, setUpdatedUser, setUsersData } = props;
  const [isLoading, setIsloading] = useState(false);
  const handleUpdateUser = async (e: any) => {
    e.preventDefault();
    setIsloading(true);
    const form: any = e.target as HTMLFormElement;
    const data = {
      role: form.role.value,
    };
    const result = await userServices.updateUser(updatedUser.id, data);
    if (result.status === 200) {
      setUpdatedUser({});
      setIsloading(false);
      const { data } = await userServices.getAllUsers();
      setUsersData(data.data);
    } else {
      setIsloading(false);
    }
  };
  return (
    <Modal onClose={() => setUpdatedUser({})}>
      <h1>Update User</h1>
      <form onSubmit={handleUpdateUser}>
        <Input
          label="Email"
          name="email"
          type="email"
          defaultValue={updatedUser.email}
          disabled
        />
        <Input
          label="Fullname"
          name="fullname"
          type="text"
          defaultValue={updatedUser.fullname}
          disabled
        />
        <Input
          label="Phone"
          name="phone"
          type="number"
          defaultValue={updatedUser.phone}
          disabled
        />
        <Select
          label="Role"
          name="role"
          options={[
            { value: "admin", label: "Admin" },
            { value: "user", label: "User" },
          ]}
          defaultValue={updatedUser.role}
        ></Select>
        <Button type="submit">Update</Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateUser;
