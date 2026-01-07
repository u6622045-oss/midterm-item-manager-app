import "./item-manager-app.css"

import { useState, useRef } from "react";

import deleteLogo from '../assets/delete.svg';
import stationaryLogo from '../assets/ink_pen.svg';
import kitchenwareLogo from "../assets/flatware.svg";
import applianceLogo from "../assets/electrical_services.svg";

function ItemManager () {

  /*
   * !!! IMPORTANT !!!
   * - You MUST use the given states and refs in your code.
   * - You MAY add additional state, refs, and variables if needed.
   */

  const [items, setItems] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  // You must use this ref for the item name input
  const itemName = useRef(null);

  //TODO: Your code goes here
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [nextId, setNextId] = useState(1);
  
  const categoryIcons = {
    Stationary: stationaryLogo,
    Kitchenware: kitchenwareLogo,
    Appliance: applianceLogo,
  };

  const handleAddItem = () => {
    const itemNameValue = itemName.current.value;
    if (!itemNameValue.trim()) {
      setErrorMsg("Item name must not be empty");
      return;
    }

    const duplicate = items.some(
      item => item.name.toLowerCase() === itemNameValue.toLowerCase()
    );

    if (duplicate) {
      setErrorMsg("Item must not be a duplicate");
      return;
    }

    if (!category) {
      setErrorMsg("Please select a category");
      return;
    }

    if (price < 0) {
      setErrorMsg("Price must not be less than 0");
      return;
    }

    setItems([
      ...items, 
      { id: nextId, itemNameValue, category, price }
    ]);

    setNextId(nextId + 1);
    itemName.current.value = "";
    setCategory("");
    setPrice("");
    setErrorMsg("");
  };

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };
  /*
   * !!! IMPORTANT !!!
   * - Implement your output based on the given sample layout.
   * - The id and className attributes below MUST be preserved.
   * - Your CSS MUST use the existing id and className selectors.
   */
  return (
    <>
      <div id="h1">
        Item Management
      </div>
      <div id="data-area">
        <table id="item-table" className="item-table">
          <thead>
            <tr>
              <th id="col-item-id">ID</th>
              <th id="col-item-name">Name</th>
              <th id="col-item-category">Category</th>
              <th id="col-item-price">Price</th>
              <th id="col-item-action">Action</th>
            </tr>
          </thead>
          <tbody>
            {/*
              * TODO: Your code goes here
              * !!! IMPORTANT !!!
              * - All items must be listed here (above the form row).
              * - Your input form must be implemented as the LAST row in this table.
              */}
            {items.map(item => (
              <tr key = {item.id}>
                <td>{item.id}</td>
                <id>{item.name}</id>
                <td>
                  <img
                    src={categoryIcons[item.category]}
                    alt={item.category}
                  />
                </td>
                <td>{item.price}</td>
                <td>
                  <img
                    src={deleteLogo}
                    alt="delete"
                    onClick={() => handleDelete(item.id)}
                    style={{ cursor: "pointer" }}
                  />
                </td>
              </tr>
            ))}

            <tr>
              <td></td>
              <td>
                <input
                  ref={itemName}
                  type="text"
                />
              </td>
              <td>
                <select value={category} onChange={e => setCategory(e.target.value)}>
                    <option value=""></option>
                    <option value="Stationary">Stationary</option>
                    <option value="Kitchenware">Kitchenware</option>
                    <option value="Appliance">Appliance</option>
                </select>
              </td>
              <td>
                <input
                  type="number"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                />
              </td>
              <td>
                <button onClick={handleAddItem}>Add Item</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="error-message">
         {/* You MUST display the errorMsg state here. */}
         {errorMsg}
      </div>
    </>
  );
}

export default ItemManager