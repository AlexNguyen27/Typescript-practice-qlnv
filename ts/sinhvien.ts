// lớp trừu tượng chỉ khởi tạo chứ ko định nghĩa
// bản mẫu tạo ra để đồng bộ dữ liệu
interface SinhVienIn {
    HoTen: string; 
    Email: string;
    tinhDiem(): void;
}

interface BaseInterface {
    hienThi(): void;
}

export class SinhVien implements SinhVienIn, BaseInterface{
    HoTen: string;
    Tuoi: number;
    Lop: string;
    Email: string;
    constructor(ht: string, tuoi: number, lop: string, email: string) {
        this.HoTen = ht;
        this.Tuoi = tuoi;
        this.Lop = lop;
        this.Email = email;
    }
    hienThi(){};
    tinhDiem() {}
    static thongBao() {
        console.log("Here is Thong bao function");
    }
}

class LopTruong extends SinhVien {
    Quyen: string;
    // cần constructor và super để kế thừa
    constructor(ht: string, tuoi: number, lop: string, quyen: string, email: string){
        // super là cái cần để kế thừa lại đống này: 
        // this.HoTen = ht;
        // this.Tuoi = tuoi;
        // this.Lop = lop;
        // phải bằng số tham số truyền vào
        super(ht, tuoi, lop, email);
        this.Quyen = quyen;
    }
}

let lopTruong = new LopTruong('thanh', 1, '12a1', 'Lop Truong', 'alfjal');
console.log(lopTruong);