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
      // formStatus: "create",
      buttonDisabled: false,
      barangIdSelected: null,
    };
  }

  editButtonHandler = (barang) => {
    this.setState({
      id: barang.id,
      nama_barang: barang.nama_barang,
      harga: barang.harga,
      stok: barang.stok,
      formStatus: "edit",
      barangIdSelected: barang.id,
    });
  };

  inputOnchangeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // addBarang = (url, load) => {
  //   var load = {
  //     id: 71,
  //     nama_barang: this.state.nama_barang,
  //     harga: this.state.harga,
  //     stok: this.state.stok,
  //   };
  //   var url = "https://3389-182-23-95-60.ngrok.io/barang";
  //   axios
  //     .post(url, load)
  //     .then((response) => {
  //       var barangs = [...this.state.barangs];
  //       barangs.push(response.data);
  //       this.setState({
  //         barangs,
  //         buttonDisabled: false,
  //         nama_barang: "",
  //         harga: "",
  //         stok: "",
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  UpdateMember = (url, load) => {
    var url = `https://3389-182-23-95-60.ngrok.io/barang/${this.state.barangIdSelected}`;
    axios
      .put(url, load)
      .then((response) => {
        var barangs = [...this.state.barangs];
        var indexBarang = barangs.findIndex(
          (barangs) => barangs.id === this.state.barangIdSelected
        );

        //mengganti data yang ada dalam state members dan index yang sesuai
        barangs[indexBarang].first_name = response.data.nama_barang;
        barangs[indexBarang].last_name = response.data.harga;
        barangs[indexBarang].last_name = response.data.stok;
        this.setState({
          barangIdSelected,
          buttonDisabled: false,
          nama_barang: "",
          harga: "",
          stock: "",
          formStatus: "create",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    var load = {
      id: this.state.id,
      nama_barang: this.state.nama_barang,
      harga: this.state.harga,
      stok: this.state.stok,
    };

    var url = "https://3389-182-23-95-60.ngrok.io/barang";
    // if (this.state.formStatus == "create") {
    //   this.addBarang(url, load);
    // } else {
    //   url = `https://3389-182-23-95-60.ngrok.io/barang/${this.state.barangIdSelected}`;
    // }
    axios
      .post(url, load)
      .then((response) => {
        alert("berhasil");
        var barangs = this.state.barangs;
        barangs.push(response.data);
        this.setState.state({ barangs });
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  componentDidMount() {
    axios
      .get("https://3389-182-23-95-60.ngrok.io/barang")
      .then((response) => {
        //menmgubah state members yg berisi object kosong kita ganti dengan hasil dari server melalui object response.data.data
        this.setState({ barangs: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-6" style={{ border: "1px solid black" }}>
            <h2>Data Barang</h2>
            <div className="row">
              {this.state.barangs.map((barang) => (
                <div className="col-md-6" key={barang.id_barang}>
                  <div className="card" style={{ margin: 10 }}>
                    <div className="card-body">
                      <h5 className="card-title">{barang.id}</h5>
                      <h5 className="card-title">{barang.nama_barang}</h5>
                      <h5 className="card-title">{barang.harga}</h5>
                      <h5 className="card-title">{barang.stock}</h5>
                      <button
                        className="btn btn-primary"
                        onClick={() => this.editButtonHandler(barang)}
                      >
                        Edit
                      </button>
                      <button className="btn btn-danger">Delete</button>
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
                <label>Id Barang</label>
                <input
                  type="text"
                  className="form-control"
                  name="id"
                  value={this.state.id}
                  onChange={this.inputOnchangeHandler}
                />
              </div>
              <div className="form-group">
                <label>Nama Barang</label>
                <input
                  type="text"
                  className="form-control"
                  name="nama_barang"
                  value={this.state.nama_barang}
                  onChange={this.inputOnchangeHandler}
                />
              </div>
              <div className="form-group">
                <label>Harga</label>
                <input
                  type="text"
                  className="form-control"
                  name="harga"
                  value={this.state.harga}
                  onChange={this.inputOnchangeHandler}
                />
              </div>
              <div className="form-group">
                <label>Stok</label>
                <input
                  type="text"
                  className="form-control"
                  name="stok"
                  value={this.state.stok}
                  onChange={this.inputOnchangeHandler}
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
