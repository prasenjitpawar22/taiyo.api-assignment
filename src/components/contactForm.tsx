import { FormEvent, useState } from "react";
import { addContact } from "../features/counter/counterSlice";
import { useAppDispatch } from "../hooks";
import { status } from "../types";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    status: status.active,
  });

  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.info(formData);

    dispatch(addContact(formData));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2 items-center">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Firt name"
          type={"text"}
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
        />
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Last name"
          type={"text"}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
          value={formData.lastName}
        />
        <div className="flex justify-center gap-2">
          <label>Status: </label>
          <input
            className=""
            type="radio"
            name="active"
            id="active"
            onClick={() => setFormData({ ...formData, status: status.active })}
            checked={formData.status === status.active}
          />
          <label htmlFor="active">Active</label>
          <input
            className=""
            onClick={() =>
              setFormData({ ...formData, status: status.inactive })
            }
            type="radio"
            name="inactive"
            id="inactive"
            checked={formData.status === status.inactive}
          />
          <label htmlFor="inactive">Inactive</label>
        </div>
        <input
          className="bg-slate-50 border px-2 rounded cursor-pointer"
          type={"submit"}
          value="Create"
        />
      </form>
    </div>
  );
};

export default ContactForm;
