"use client";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebase";

export default function Home() {
  const [items, setItems] = useState([]);

  const [newItem, setNewItem] = useState({ name: "", price: "" });
  const [total, setTotal] = useState(0);

  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.name !== "" && newItem.price !== "") {
      // setItems([...items, newItem]);
      await addDoc(collection(db, "items"), {
        name: newItem.name.trim(),
        price: newItem.price,
      });
      setNewItem({ name: "", price: "" });
    }
  };
  //Display the Expenses
  useEffect(() => {
    const q = query(collection(db, "items"));
    const calculateTotal = (itemArr) => {
      const totalAmt = itemArr.reduce(
        (sum, item) => sum + parseFloat(item.price),
        0
      );
      setTotal(totalAmt);
    };
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemArr = [];

      querySnapshot.forEach((doc) => {
        itemArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemArr);
      calculateTotal(itemArr);
    });

    return () => unsubscribe();
  }, []);

  //Delete items

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "items", id));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm ">
        <h1 className="text-4xl text-center p-4">Expense Tracker</h1>
        <div className="bg-slate-800 rounded-lg p-4">
          <form className="grid grid-cols-6 items-center text-black">
            <input
              value={newItem.name}
              onChange={(e) => {
                setNewItem({ ...newItem, name: e.target.value });
              }}
              type="text"
              className="col-span-3 p-3"
              placeholder="Enter Items"
            />
            <input
              value={newItem.price}
              onChange={(e) => {
                setNewItem({ ...newItem, price: e.target.value });
              }}
              type="number"
              className="col-span-2 p-3 mx-3"
              placeholder="Enter $"
            />
            <button
              type="submit"
              className="p-3 col-span-1 mx-3 bg-slate-950 hover:bg-slate-900 text-white"
              onClick={addItem}
            >
              +
            </button>
          </form>
          <ul>
            {items.map((item, id) => (
              <li
                key={id}
                className="my-4 w-full flex justify-between bg-slate-950"
              >
                <div className="p-4 w-full flex justify-between">
                  <span className="capitalize">{item.name}</span>
                  <span>${item.price}</span>
                </div>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
          {items.length < 1 ? (
            ""
          ) : (
            <div className="w-full flex justify-between p-3">
              <span>Total</span>
              <span>${total}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
