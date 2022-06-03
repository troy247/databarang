import React from "react";

const barangs = (props) => {
  props.barangs.map((barang) => (
    <div className="col-md-6" key={barang.id}>
      <div className="card" style={{ margin: 10 }}>
        <div className="card-body">
          <h5 className="card-title">{barang.id}</h5>
          <h5 className="card-title">{barang.nama_barang}</h5>
          <h5 className="card-title">{barang.harga}</h5>
          <h5 className="card-title">{barang.stok}</h5>
          <button
            className="btn btn-primary"
            onClick={() => props.editButtonHandler(props.barang)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => props.deleteButtonHandler(props.barang.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ));
};
export default barangs;
