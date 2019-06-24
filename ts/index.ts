import $ from 'jquery'
import _ from 'lodash';

import { NhanVien} from './nhanVien';

let DSNV: Array<NhanVien> = []
// không làm thay đỏi ngữ cảnh của con trỏ this
const themNhanVien = (): void => {
    let maNV:any = $('#txtMaNV').val();
    let hoTen:any = $('#txtHoTen').val();
    let luongCB:any = $('#txtLuongCB').val();
    luongCB = parseFloat(luongCB);
    let loaiNV:any = $('#loainv').val();

    let nhanVien: NhanVien = new NhanVien(maNV, hoTen, luongCB, loaiNV);
    console.log(nhanVien);

    // đây chỉ push chứ ko gán, gán báo lỗi vì là const
    DSNV.push(nhanVien);
    console.log(DSNV)   
    taoBang(DSNV);
}

const taoBang = (danhsach:Array<NhanVien>): void  => {
    let content:string = ``;
    for (let nhanvien of danhsach) {
        let {MaNV,HoTen,LoaiNV, LuongCB} = nhanvien;
        content += `
            <tr>
                <td>${MaNV}</td>
                <td>${HoTen}</td>
                <td>${LuongCB}</td>
                <td>${nhanvien.TinhLuong()}</td>

                <td>
                    <button class="btn btn-success btnXoaNV" data-manv="${MaNV}">Xóa</button>
                </td>
            </tr>
        `
    }    
    $('#tableNhanVien').html(content);

}
$('#btnThem').click(themNhanVien);

// function timKiemTheoMa(danhsach, manv): number {
//     for (let i: number in danhsach.length){
//         if(danhsach.MaNV === manv){
//             return i;
//         }
//     }
//     return -1;
// }
$('body').delegate('.btnXoaNV', 'click', function(): void{
    const maNV: string = $(this).attr('data-manv');

    // let index: number = timKiemTheoMa(DSNV, maNV);
    // trả về mảng đã bỏ đi thằng có mnv đó 
    // DSNV = DSNV.filter(function(nhanVien: NhanVien){
    //     return nhanVien.MaNV !== maNV;
    // })
    
    const index: number = _.findIndex(DSNV, function(e){
        // nếu có nó sẽ trả về index
            return e.MaNV === maNV;
    })

    DSNV.splice(index, 1);

    taoBang(DSNV)
   
})

const timKiem = (): void =>{
    const keyword: string = $('#txtSearch').val().toString();
    // trả về mảng mới chứa các phần tử thỏa đk lọc
    const DSTimKiem = DSNV.filter(function(nhanVien: NhanVien){
        // nếu thỏa mãn đk thì nó sẽ trả về true và trả về ds cần tìm kiếm
        return nhanVien.HoTen.indexOf(keyword) !== -1 || nhanVien.MaNV === keyword;
    })

    // for (let item of DSNV){
    //     if(item.MaNV === keyword || item.HoTen.toLowerCase().indexOf(keyword.toLowerCase().trim()) !== -1){
    //         DSTimKiem.push(item);
    //     }

    // }

    taoBang(DSTimKiem);    
}

$('#btnTim').click(timKiem);

const sapXepTangDan = (): void => {
    for(let i = 0; i < DSNV.length -1; i++){
        for (let j = i + 1; j < DSNV.length; j++){
            if(DSNV[i].HoTen >  DSNV[j].HoTen){
                let temp = DSNV[i];
                DSNV[i] = DSNV[j];
                DSNV[j] = temp;
            }
        }
    }
    taoBang(DSNV);
} 
const sapXepGiamDan = (): void => {
    for(let i = 0; i < DSNV.length -1; i++){
        for (let j = i + 1; j < DSNV.length; j++){
            if(DSNV[i].HoTen <  DSNV[j].HoTen){
                let temp = DSNV[i];
                DSNV[i] = DSNV[j];
                DSNV[j] = temp;
            }
        }
    }
    taoBang(DSNV);
} 

// phải nhấn option đó rồi change mới chạy
$('#selectSort').change(function(){
    let opt = $(this).val();
    if(opt == 0){
        sapXepTangDan();
        
    }
    if(opt == 1){
        sapXepGiamDan();
        
    }
})


// // chạy hết bên file sinhvien
// import {SinhVien} from './sinhvien';

// let sinhVien = new SinhVien('thanh', 12, '12a1');
// console.log(sinhVien);
// // phương thức tĩnh đi kèm với class luôn
// SinhVien.thongBao();
// // từ khóa khai báo biến
// // let a = 5;
// // let: phạm vị khai báo ngắn hơn var, và không cho khai báo 2 biến trên cùng một khu vực
// // function hienThi() {
// //     var a = 5;
// //     if(a === 5) {
// //         var b = 1;
// //     }
// //     console.log(a);
// //     console.log(b);
// // }

// // for (var i = 0; i < 5; i++) {
// //     // hàm bất đồng bộ: chỉ gọi hàm chạy trước, đợi nó chạy thì i đã chạy tới 5 rồi
// //     // result: 5 5 5 5 5
// //     setTimeout (function(){
// //         console.log('Đếm: ', i);
// //     }, 1000);
// // }

// // for (let i = 0; i < 5; i++) {
// //     // let chỉ có phạm vi trong một cặp ngoặc nhọn 
// //     setTimeout (function(){
// //         console.log('Đếm: ', i);
// //     }, 1000);
// // }

// let mangSoNguyen: Array<number> = [1, 3, 4, 5];
// let mangSoNguyen2: number[] = [1, 3, 4, 5];

// let danhSachSinhVien: Array<{HoTen: string, Tuoi: number}> = [
//     {HoTen: 'Thanh', Tuoi: 23}, 
//     {HoTen: 'Hieu', Tuoi: 23}
// ]

// // arrow function 
// // const tinhTong = (): void => {
// //     console.log('aaa');
// // }
// // trong trường hợp chỉ có 1 dòng code và sẽ trả về một giá trị gì đó thì sd arrow function 
// // const tinhTong = (): number => 1 * 100;

// const thongBao = ():void => console.log("aaaa");
// thongBao();

// // this. trong ts là trỏ tới đối tượng có cái id đc DOM tới
// // function thường: thay đổi ngữ cảnh của con trỏ this
// // arrow function: ko thay đổi ngữ cảnh của con trỏ this, trỏ tới nguyên hàm
// // nên loại 2 cái line: true bên tsconfig.json
// // $('#btn').click(()) => {
//     // console.log(this);
// // }

// // const tinhTong = (a:number = 1, b:number = 2) =>{
// //     alert(a + b);
// // }
// // tinhTong(5, 6);

// let hocSinh = {HoTen: 'hieu'};
// // trỏ chung vùng nhớ
// // let hocSinh2 = hocSinh;

// // copy ra 1 đối tượng hs rồi gán cho hs2
// let hocSinh2 = {...hocSinh};
// hocSinh2.HoTen = 'Dung';

// console.log(hocSinh2.HoTen);
// console.log(hocSinh.HoTen);

// let a: Array<number> = [1, 2, 3];
// // let b = a;
// let b = [...a];
// b.push(5);
// console.log(a,b);


// let hocSinh3 = {HoTen: 'thanh', Tuoi: 12,  Lop: '12a1'};
// let {Tuoi, HoTen} = hocSinh3;

// console.log(Tuoi);
// console.log(HoTen);

// const danhSachSinhVien1 = [
//     {HoTen: 'thanh', Tuoi: 12,  Lop: '12a1'},
//     {HoTen: 'wwe', Tuoi: 12,  Lop: '12a1'},
//     {HoTen: 'dsdsd', Tuoi: 12,  Lop: '12a1'}
// ]

// for (let i in danhSachSinhVien1) {
//     console.log(i);
// }

// for (let sinhvien of danhSachSinhVien1) {
//     console.log(sinhvien);
// }

