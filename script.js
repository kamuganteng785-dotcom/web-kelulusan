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

  hasil.innerHTML = 'Mencari data...'

  try {

    const { data, error } = await supabase
      .from('kelulusan')
      .select('*')

    console.log('DATA:', data)
    console.log('ERROR:', error)

    if (error) {
      hasil.innerHTML = 'ERROR: ' + error.message
      return
    }

    const siswa = data.find(
      item => item.nisn === nisn
    )

    if (siswa) {

     const warna =
siswa.status === 'SELAMAT ANDA DINYATAKAN LULUS'
? '#00ff88'
: '#ff5c5c'

hasil.innerHTML = `
<h2>${siswa.nama}</h2>

<h3 style="color:${warna}">
STATUS : ${siswa.status}
</h3>
`

    } else {

      hasil.innerHTML =
        'NISN tidak ditemukan'

    }

  } catch (err) {

    console.error(err)

    hasil.innerHTML =
      'Gagal terhubung ke database'

  }
}

window.cekKelulusan = cekKelulusan