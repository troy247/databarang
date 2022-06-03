import React, { useEffect, useState } from "react";

const App = () => {
  const [id, set_id] = useState("");
  const [nama_barang, set_nama_barang] = useState("");
  const [harga, set_harga] = useState("");
  const [stok, set_stok] = useState("");
  const [data, setData] = useState([]);
  const [form_status, set_form_status] = useState("create");

  const baseApi = "http://localhost:3000";

  useEffect(() => {
    const getData = async () => {
      const request = await fetch(baseApi + "/databarang");
      const response = await request.json();
      const result = response;
      setData(result);
    };
    getData();
  }, []);

  const handleEdit = (event) => {
    event.preventDefault();
    const edit = {
      id: event.id,
      nama_barang: event.nama_barang,
      harga: event.harga,
      stok: event.stok,
    };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      nama_barang,
      harga,
      stok,
    };

    const postData = async (e) => {
      const param = {
        method: "POST",

        body: JSON.stringify({
          nama_barang: nama_barang,
          harga: harga,
          stok: stok,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };

      const request = await fetch(baseApi + "/databarang", param);
      if (!request.ok) {
        alert("Gagal meniympan data");
      }
      const response = await request.json();
      const result = response;
    };
    postData();
  };

  //get,patch,push,put,delete
  return (
    <div>
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-6" style={{ border: "1px solid black" }}>
            <h2>Data Barang</h2>
            <div className="row">
              {data.map((value, index) => {
                return (
                  <div className="col-md-6" key={index}>
                    <div className="card" style={{ margin: 10 }}>
                      <div className="card-body">
                        <h5 className="card-title">{value.id}</h5>

                        <h5 className="card-title">{value.nama_barang}</h5>

                        <h5 className="card-title">{value.harga}</h5>

                        <h5 className="card-title">{value.stok}</h5>
                        <h5 className="card-title"></h5>
                        <button className="btn btn-primary">Edit</button>
                        <button className="btn btn-danger">Delete</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-md-6" style={{ border: "1px solid black" }}>
            <h2>Form</h2>
            <form onSubmit={handleSubmit}>
              {/* <div className="form-group">
                <label>Id Barang</label>
                <input
                  type="text"
                  className="form-control"
                  value={id}
                  name="id"
                  onChange={(e) => set_id(e.target.value)}
                />
              </div> */}
              <div className="form-group">
                <label>Nama Barang</label>
                <input
                  type="text"
                  className="form-control"
                  name="nama_barang"
                  value={nama_barang}
                  onChange={(e) => set_nama_barang(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Harga</label>
                <input
                  type="text"
                  className="form-control"
                  name="harga"
                  value={harga}
                  onChange={(e) => set_harga(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Stok</label>
                <input
                  type="text"
                  className="form-control"
                  name="stok"
                  value={stok}
                  onChange={(e) => set_stok(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
