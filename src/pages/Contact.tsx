import { useState } from "react";

import ContactForm from "../components/contactForm";
import { removeContact } from "../features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

export default function Contacts() {
  const [formState, setFormState] = useState(true);

  const contacts = useAppSelector((state) => state.contacts.contacts);
  const dispatch = useAppDispatch();

  console.log("asdasd", contacts);

  return (
    <div className="flex gap-3 flex-col">
      <h1 className="font-semibold text-xl">Contact</h1>
      <div className="flex gap-4 items-center">
        <button
          onClick={() => setFormState(!formState)}
          className="bg-slate-50 w-fit p-2 rounded border hover:shadow"
        >
          {formState ? <span>x</span> : <span> Add Contact</span>}
        </button>
        {formState ? <ContactForm /> : null}
      </div>

      {contacts.length ? (
        <div className="flex flex-col gap-4">
          {contacts.map((data, index) => (
            <div key={index}>
              <div className="flex gap-2 items-center">
                <span className="bg-slate-50 py-1 px-2 rounded-full">
                  {data.firstName + " " + data.lastName}
                </span>
                <span className="bg-slate-50 py-1 px-2 rounded-full">
                  {!data.status ? "Active" : "Inactive"}
                </span>
                {/* <span className="cursor-pointer bg-yellow-300 px-2 rounded-full">
                  Edit
                </span> */}
                <span
                  onClick={() => dispatch(removeContact(data))}
                  className="cursor-pointer bg-red-400 px-2 rounded-full"
                >
                  Delete
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div> no contacts </div>
      )}
    </div>
  );
}
