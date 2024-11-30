var arr = [];
var WorkValue = document.querySelector('.input-work');
var WorkDetailsValue = document.querySelector('.input-workdetails');
var WorkName = document.querySelector('.input-name');
var WorkDate = document.querySelector('.input-date');
var table = document.querySelector('.table-striped');
// ES5 
function inputValue(Work, WorkDetails, WorkName, WorkDate) {
    let id;
    this.Work = Work;
    this.WorkDetails = WorkDetails;
    this.WorkName = WorkName;
    this.WorkDate = WorkDate;
}
//#region Düzenleme
inputValue.prototype.Edit = function (id) {
    let obj = arr.find(x => x[0] == id);
    WorkValue.value = obj[1];
    WorkDetailsValue.value = obj[2];
    WorkName.value = obj[3];
    WorkDate.value = obj[4];
    this.Delete(id).List();

}
//#endregion
//#region Ekleme
inputValue.prototype.Add = function () {
    let val = [GetId(), this.Work, this.WorkDetails, this.WorkName, this.WorkDate]
    arr.push(val);
    localStorage.setItem(GetId().toString(), JSON.stringify(val));
    return this;
}
//#endregion
//#region Silme
inputValue.prototype.Delete = function (id) {
    localStorage.removeItem(`${id + 1}`);
    let obj = arr.splice(arr.indexOf(arr.find(x => x[0] == id)), 1);
    return this;
}
//#endregion
//#region Listeleme
inputValue.prototype.List = function () {
    table.innerHTML = "";
    arr.forEach(function (element) {
        console.log(element)
        table.innerHTML +=
            `
        <tr data-id=${element[0]}>
            <td scope="col">${element[1]}</td>
            <td scope="col">${element[2]}</td>
            <td scope="col">${element[3]}</td>
            <td scope="col">${element[4]}</td>
            <td scope="col">
                <button class="btn btn-warning"onclick="editBtn(${element[0]})">Düzenle</button>
            </td>
            <td scope="col">
                <button class="btn btn-danger" onclick="deleteBtn(${element[0]})">Sil</button>
            </td>
            <td scope="col">
               <input type="checkbox" class="form-check-input" onchange="checkMe(this)">
            </td>
        </tr>
`
        return this;
    });
}
//#endregion







document.querySelector('#addBtn').addEventListener('click', function (e) {
    new inputValue(WorkValue.value, WorkDetailsValue.value, WorkName.value, WorkDate.value).Add().List();
    WorkValue.value = ""; WorkDetailsValue.value = ""; WorkName.value = ""; WorkDate.value = "";
});
function checkMe(element) {
    element.parentElement.parentElement.classList.toggle("text-decoration-line-through");
}
function deleteBtn(element) {
    inputValue.prototype.Delete(element).List();
}
function editBtn(element) {
    inputValue.prototype.Edit(element).List();
}
function GetId() {
    return arr.length + 1;
}