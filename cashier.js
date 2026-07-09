const readline = require('readline');

const daftarBarang = [
    { nama: "Roti", harga: 4000, stok: 20 },
    { nama: "Susu", harga: 8000, stok: 15 },
    { nama: "Air Mineral", harga: 3000, stok: 30 },
    { nama: "Mie Instan", harga: 3500, stok: 50 },
    { nama: "Telur", harga: 2500, stok: 100 },
    { nama: "Gula", harga: 14000, stok: 25 },
    { nama: "Kopi", harga: 12000, stok: 18 },
    { nama: "Teh", harga: 7000, stok: 22 },
    { nama: "Beras", harga: 65000, stok: 10 },
    { nama: "Minyak Goreng", harga: 18000, stok: 12 }
];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function tanyaBarang() {
    rl.question("Masukkan nama barang yang ingin dibeli: ",
        (inputBarang) => {
            let barang = daftarBarang.find(b => b.nama.toLowerCase() === inputBarang.toLowerCase());
            if (!barang) {
                console.log(`[ERROR] Barang bernama "${inputBarang}" tidak ada!`);
                return tanyaBarang();
            }
            tanyaJumlah(barang);
        });
};

function tanyaJumlah(barang) {
    rl.question(`Mau beli berapa ${barang.nama}? (Stok tersedia: ${barang.stok}): `,
        (inputJumlah) => {
            let jumlah = Number(inputJumlah);
            if (barang.stok >= jumlah) {
                barang.stok -= jumlah;
                let totalHarga = barang.harga * jumlah;
                console.log("\n === STRUK BELANJA ===");
                console.log(`Barang: ${barang.nama}`);
                console.log(`Jumlah: ${jumlah} pcs`);
                console.log(`Total: Rp ${totalHarga}`)
                console.log("=====================\n");
                rl.close();
            } else {
                console.log(`\n[ERROR] Maaf stok tidak cukup! Tersisa ${barang.stok} pcs.`);
                rl.question("Mau GANTI barang atau TETAP pilih barang ini dengan stok baru? (ganti/tetap): ", (opsi) => {
                    if (opsi.toLowerCase() === "ganti") {
                        tanyaBarang();
                    } else {
                        tanyaJumlah(barang);
                    }
                });
            }
        });
}


console.log("=== DAFTAR MENU WARUNG KAMI ===");
for (let i = 0; i < daftarBarang.length; i++) {
    console.log(`${daftarBarang[i].nama} - Rp ${daftarBarang[i].harga} (Stok: ${daftarBarang[i].stok})`);
}
console.log("==================================\n");

tanyaBarang();