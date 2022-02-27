let renderTaleDSSV = () => {
  sinhVienService
    .layDanhSachSinhVien()
    .then((res) => {
      convertedArr = res.data.map((item) => {
        let { name, email, toan, ly, hoa, id } = item;
        return new SV(name, email, toan, ly, hoa, id);
      });
      console.log("convertedArr", convertedArr);
      sinhVienControllers.renderTable(convertedArr);
    })
    .catch((err) => {
      console.log("err", err);
    });
};
renderTaleDSSV();
document.getElementById("btn-add").addEventListener("click", function () {
  let svOject = sinhVienControllers.layThongTinTuForm();
  let isValid =
    validator.kiemTraDoDai(svOject.name, "spanTenSV") &
    validator.kiemTraKiTu(svOject.name, "spanTenSV") &
    validator.kiemTraSo(svOject.id, "spanMaSV");
  isValid &&
    sinhVienService
      .themSinhVien(svOject)
      .then((res) => {
        renderTaleDSSV();
      })
      .catch((err) => {
        console.log(err);
      });
});

function xoaSV(id) {
  sinhVienService
    .xoaSinhVien(id)
    .then((res) => {
      renderTaleDSSV();
    })
    .catch((err) => {
      console.log(err);
    });
}
