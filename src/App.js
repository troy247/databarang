import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barangs: [],
      nama_barang: "",
      harga: "",
      stok: "",
      buttonDisabled: false,
      formStatus: "create",
      barangIdSelected: null,
    };
  }

  // inputOnchangeHandler = (event) => {
  //   this.setState({ [event.target.name]: event.target.value });
  // };

  //get data
  componentDidMount() {
    const BaseApi = "http://localhost:3000";
    axios
      .get(BaseApi + "/databarang")
      .then((response) => {
        this.setState({ barangs: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  inputOnChangeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  //post data
  onSubmitHandler = (event) => {
    event.preventDefault();
    this.setState({ buttonDisabled: true });
    console.log("form telah disubmit");
    const payload = {
      nama_barang: this.state.nama_barang,
      harga: this.state.harga,
      stok: this.state.stok,
    };

    if (this.state.formStatus == "create") {
      const BaseApi = "http://localhost:3000";
      this.addBarang(BaseApi, payload);
    } else {
      const BaseApi = `http://localhost:3000/databarang/${this.state.barangIdSelected}`;
      this.editBarang(BaseApi, payload);
    }
  };

  addBarang = (BaseApi, payload) => {
    axios
      .post(BaseApi + "/databarang", payload)
      .then((response) => {
        console.log(response);
        const barangs = [...this.state.barangs];
        barangs.push(response.data);

        this.setState({
          barangs,
          buttonDisabled: false,
          nama_barang: "",
          harga: "",
          stok: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  editBarang = (BaseApi, payload) => {
    axios
      .put(BaseApi, payload)
      .then((response) => {
        const barangs = [...this.state.barangs];
        const indexbarang = barangs.findIndex(
          (barang) => barang.id === this.state.barangIdSelected
        );

        //modfikasi index member yg ditemukan dengan isi response yang baru
        barangs[indexbarang].nama_barang = response.data.nama_barang;
        barangs[indexbarang].harga = response.data.harga;
        barangs[indexbarang].stok = response.data.stok;

        this.setState({
          barangs,
          buttonDisabled: false,
          nama_barang: "",
          harga: "",
          stok: "",
          formStatus: "create",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  editButtonHandler = (barang) => {
    this.setState({
      nama_barang: barang.nama_barang,
      harga: barang.harga,
      stok: barang.stok,
      formStatus: "edit",
      barangIdSelected: barang.id,
    });
  };

  deleteButtonHandler = (id) => {
    const url = `http://localhost:3000/databarang/${id}`;
    axios
      .delete(url)
      .then((response) => {
        if (response.status === 204) {
          const barangs = [...this.state.barangs];
          const index = barangs.findIndex((barang) => barang.id === id);
          barangs.splice(index, 1);
          this.setState({ barangs });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-6" style={{ border: "1px solid black" }}>
            <h2>Data Barang</h2>
            <div className="row">
              {this.state.barangs.map((barang, index) => (
                <div className="col-md-6" key={barang.id}>
                  <div className="card" style={{ margin: 10 }}>
                    <div className="card-body">
                      <h5 className="card-title">{barang.id}</h5>
                      <h5 className="card-title">{barang.nama_barang}</h5>
                      <h5 className="card-title">{barang.harga}</h5>
                      <h5 className="card-title">{barang.stok}</h5>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => this.editButtonHandler(barang)}
                      >
                        Edit
                      </button>
                      |
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => this.deleteButtonHandler(barang.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-6" style={{ border: "1px solid black" }}>
            <h2>Form {this.state.formStatus}</h2>
            <form onSubmit={this.onSubmitHandler}>
              <div className="form-group">
                <label>Nama Barang</label>
                <input
                  type="text"
                  className="form-control"
                  name="nama_barang"
                  value={this.state.nama_barang}
                  onChange={this.inputOnChangeHandler}
                />
              </div>
              <div className="form-group">
                <label>Harga</label>
                <input
                  type="text"
                  className="form-control"
                  name="harga"
                  value={this.state.harga}
                  onChange={this.inputOnChangeHandler}
                />
              </div>
              <div className="form-group">
                <label>Stok</label>
                <input
                  type="text"
                  className="form-control"
                  name="stok"
                  value={this.state.stok}
                  onChange={this.inputOnChangeHandler}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-3"
                disabled={this.state.buttonDisabled}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
