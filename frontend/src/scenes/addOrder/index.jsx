import React from "react";

const AddOrder = () => {
  return (
    <div className="container m-2">
      <form class="row g-3">
        <div class="col-12 col-md-6 d-flex flex-column">
          <label for="inputCity" class="form-label">
            Order Number
          </label>
          <input
            type="text"
            class="form-control"
            id="inputCity"
            placeholder="Order No"
            style={{ width: '200px' }}
          />
        </div>
        <div class="col-12 col-md-6 d-flex flex-column">
          <label for="name" class="form-label">
            Customer
          </label>
          <input
            type="text"
            class="form-control"
            placeholder="Customer"
            style={{ width: '200px' }}
          />
        </div>
        <div class="col-12 col-md-6 d-flex flex-column">
          <label for="inputAddress" class="form-label">
           Devices
          </label>
          <input
            type="text"
            class="form-control"
            id="inputAddress"
            placeholder="Devices"
            style={{ width: '200px' }}
          />
        </div>
        <div class="col-12 col-md-6 d-flex flex-column">
          <label for="inputEmail4" class="form-label">
            Collection Date
          </label>
          <input
            type="email"
            class="form-control"
            id="inputEmail4"
            placeholder="Collection Date"
            style={{ width: '200px' }}
          />
        </div>
        <div class="col-12">
        <button type="submit" class="btn" style={{ backgroundColor: '#3498db' }} >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOrder;
