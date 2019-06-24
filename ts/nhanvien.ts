interface NhanVienInterface {
    MaNV: string;
    HoTen: string;
    LuongCB: number;
    LoaiNV: string;
    // ?: có cũng đc, ko cũng đc
    Bonus?: number;
    TinhLuong(): number;
}
export class NhanVien implements NhanVienInterface { 

    MaNV: string;
    HoTen: string;
    LuongCB: number;
    LoaiNV: string;

    constructor(manv:string, hoten:string, luongCB:number, loaiNV: string) {
        this.MaNV = manv;
        this.HoTen = hoten;
        this.LuongCB = luongCB;
        this.LoaiNV = loaiNV;
    }
    
    TinhLuong(): number {
        switch(this.LoaiNV) {
            case "Sếp":
                return this.LuongCB * 3;
            case "Trưởng phòng":
                return this.LuongCB * 1.5;
            case "Thường":
                return this.LuongCB;
            default: return 0;
        }
    }
}