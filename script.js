import { createClient } from 'https://esm.sh/@supabase/supabase-js'

// GANTI DENGAN URL PROJECT SUPABASE ANDA
const supabaseUrl = 'https://xppzbclbhqgeyvlqbvlx.supabase.co'

// GANTI DENGAN PUBLISHABLE KEY SUPABASE ANDA
const supabaseKey = 'sb_publishable_quDixocgAAC-uaKu4MKZsw_b-dve2c-'

const supabase = createClient(
  supabaseUrl,
  supabaseKey
)

async function cekKelulusan() {
  const nisn = document
    .getElementById('nisn')
    .value
    .trim()

  const hasil = document.getElementById('hasil')

  if (!nisn) {
    hasil.innerHTML = 'NISN wajib diisi'
    return
  }

  hasil.innerHTML = 'Mencari data...'

  try {
    const { data, error } = await supabase
      .from('siswa')
      .select('*')

    console.log('DATA:', data)
    console.log('ERROR:', error)

    if (error) {
      hasil.innerHTML = 'ERROR: ' + error.message
      return
    }

    const siswa = data.find(item =>
      String(item.nisn).trim() === String(nisn).trim()
    )

    if (!siswa) {
      hasil.innerHTML = 'NISN tidak ditemukan'
      return
    }

    const lulus = String(siswa.status).toUpperCase() === 'LULUS'

    const warna = lulus ? '#00ff88' : '#ff5c5c'

    const pesan = lulus
      ? 'SELAMAT, ANDA DINYATAKAN LULUS'
      : 'ANDA DINYATAKAN TIDAK LULUS'

    hasil.innerHTML = `
      <h2>${siswa.nama ?? '-'}</h2>

      <div style="text-align:left; margin-top:15px; line-height:1.8;">
        <p><strong>Jenis Kelamin:</strong> ${siswa.jk == 'P' ? 'Perempuan' : 'Laki-Laki'}</p>
        <p><strong>NISN:</strong> ${siswa.nisn ?? '-'}</p>
        <p><strong>Tempat Lahir:</strong> ${siswa.tempat_lahir ?? '-'}</p>
        <p><strong>Tgl Lahir:</strong> ${siswa.tgl_lahir ?? siswa.tanggal_lahir ?? '-'}</p>
        <p><strong>Nama Ibu:</strong> ${siswa.nama_ibu ?? siswa.ibu ?? '-'}</p>
        <p><strong>Nama Ayah:</strong> ${siswa.nama_ayah ?? siswa.ayah ?? '-'}</p>
      </div>

      <h3 style="color:${warna}; font-size:24px; margin-top:15px;">
        ${pesan}
      </h3>
    `
  } catch (err) {
    console.error(err)

    hasil.innerHTML = 'Gagal terhubung ke database'
  }
}

window.cekKelulusan = cekKelulusan