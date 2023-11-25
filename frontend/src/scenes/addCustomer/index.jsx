import React, { useState } from "react";
const AddCustomer = () => {
  return (
    <div className="container m-2">
      
      <form class="row g-3" >
        <div class="col-12 col-md-6 d-flex flex-column">
          <label for="company" class="form-label">
            Company
          </label>
          <input
            type="text"
            class="form-control"
            id="company"
            placeholder="company"
            style={{ width: '200px' }}
          />
        </div>


        <div class="col-12 col-md-6 d-flex flex-column">
          <label for="name" class="form-label">
            Name
          </label>
          <input
            type="text"
            class="form-control"
            placeholder="Name"
            aria-label="name"
            style={{ width: '200px' }}
          />
        </div>

        <div class="col-12 col-md-6 d-flex flex-column">
          <label for="inputAddress" class="form-label">
            Address
          </label>
          <input
            type="text"
            class="form-control"
            id="inputAddress"
            placeholder="enter your address"
            style={{ width: '200px' }}
          />
        </div>
        
        <div class="col-12 col-md-6 d-flex flex-column">
          <label for="inputEmail4" class="form-label">
            Email
          </label>
          <input
            type="email"
            class="form-control"
            id="inputEmail4"
            placeholder="enter your email"
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

export default AddCustomer;
