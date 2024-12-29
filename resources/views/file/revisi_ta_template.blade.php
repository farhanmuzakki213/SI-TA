<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Revisi Sidang</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>

    <style>
        body {
            font-family: 'Times New Roman', Times, serif;
            margin: 1.5cm 1cm 4cm 1.5cm;
        }

        .kepala {
            position: fixed;
            top: 0;
            left: 56.8px;
            right: 56.8px;
            z-index: 0;
            border-collapse: collapse;
            border-left: none;
            border-top: none;
            border-bottom: 3px solid black;
            padding-bottom: 10px;
        }

        .kepala table {
            border: none;
            width: 100%;
        }

        .kepala td.logo {
            text-align: center;
            padding: 0;
        }

        .kepala td.logo img {
            display: block;
            margin-left: 10px;
            margin-top: 10px;
            width: 120%;

        }

        .kepala td {
            padding: 0;
            text-align: center;
            border: none;

        }

        .kepala .header-content {
            vertical-align: top;
            padding-top: 10px;
        }

        .kepala tr {
            border: none;
        }


        .badan {
            top: 70px;
            position: relative;

        }

        .details {
            margin-bottom: 20px;
        }

        .details p {
            margin: 0;
            line-height: 1.6;
        }

        .details .label {
            /* font-weight: bold; */
        }

        .details-table {
            width: auto;
            margin-bottom: 20px;
            border-collapse: collapse;
            border: none;
        }

        .details-table td {
            padding: 0;
            line-height: 1.6;
            vertical-align: top;
            border: none;
        }

        .details-table .label {
            padding-right: 30px;
            white-space: nowrap;
            font-size: 15px;
        }

        .details-table .value {
            padding-left: 15px;
            font-size: 15px;
        }

        table .isi {
            page-break-inside: auto;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            page-break-inside: auto;
        }

        table,
        th,
        td {
            border: 1px solid black;
        }

        th,
        td {
            padding: 7px;
            text-align: left;
            vertical-align: top;
        }

        strong {
            font-weight: bold;
        }

        .no {
            width: 5%;
            overflow: hidden;
            text-align: center;
            border-left: 1px solid black;
        }

        .nama_dosen {
            max-width: 200px;
            overflow: hidden;
            text-align: left;
            font-size: 15px;
        }

        .nip {
            max-width: 50px;
            overflow: hidden;
            text-align: justify;
            word-wrap: break-word;
            font-size: 15px;
        }

        .jabatan {
            max-width: 50px;
            overflow: hidden;
            text-align: justify;
            word-wrap: break-word;
            font-size: 15px;
        }

        .signatures {
            display: flex;
            justify-content: center;
            page-break-inside: avoid;
        }
    </style>
</head>

<body>



    <div class="kepala">
        <table>
            <tr class="border-top">
                <td class="logo" rowspan="1" style="width: 15%;">
                    <img src="{{ public_path('images/logo/logo_pnp.png') }}" alt="Logo" />
                </td>
                <td class="header-content">
                    <center>
                        <strong>
                            <font style="font-size: 18px;">KEMENTRIAN PENDIDIKAN, KEBUDAYAAN,</font><br>
                            <font style="font-size: 18px;">RISET, DAN TEKNOLOGI</font><br>
                        </strong>
                        <strong>
                            <font style="font-size: 18px;">POLITEKNIK NEGERI PADANG</font>
                        </strong><br>
                        <strong>
                            <font style="font-size: 18px;">JURUSAN TEKNOLOGI INFORMASI</font>
                        </strong><br>
                        <font style="font-size: 15px;">Kampus Politeknik Negeri Padang Limau Manis, Padang, Sumatera
                            Barat</font><br>
                        <font style="font-size: 15px;">Telepon: (0751) 72590, Faks: (0751) 72576</font><br>
                        <font style="font-size: 15px;">
                            Laman: <a href="https://ti.pnp.ac.id"
                                style="color: blue; text-decoration: underline;">https://ti.pnp.ac.id</a> | Surel:
                            ti@pnp.ac.id
                        </font>

                    </center>
                </td>
            </tr>
        </table>
    </div>
    <br>
    <br>
    <br>

    <div class="badan">
        <center>
            <h2 style="margin: 0;">PERNYATAAN PERBAIKAN TUGAS AKHIR</h2>
        </center>
        <br>
        <div>
            <font style="font-size: 15px;">Telah memperbaiki Tugas Akhir sesuai dengan arahan penguji dan pembimbing.
            </font>
        </div>
        <br>
        <div class="details">
            <table class="details-table" style="padding-left: 20px;">
                @if ($data_sidang_ta)
                    <tr>
                        <td class="label">Nama </td>
                        <td>:</td>
                        <td class="value">{{ $data_sidang_ta->r_mahasiswa->nama_mahasiswa }}</td>
                    </tr>
                    <tr>
                        <td class="label">NIM</td>
                        <td>:</td>
                        <td class="value">{{ $data_sidang_ta->r_mahasiswa->nim_mahasiswa }}</td>
                    </tr>
                    <tr>
                        <td class="label">Program Studi</td>
                        <td>:</td>
                        <td class="value">{{ $data_sidang_ta->r_mahasiswa->r_kelas->r_prodi->nama_prodi }}</td>
                    </tr>
                    <tr>
                        <td class="label">Judul Tugas Akhir</td>
                        <td>:</td>
                        <td class="value">{{ $data_sidang_ta->judul }}</td>
                    </tr>
                @endif
            </table>
        </div>
        <br>
        <table class="isi">
            <thead>
                <tr class="table-info">
                    <th>No</th>
                    <th>Nama</th>
                    <th>Jabatan</th>
                    <th>Tanggal Periksa</th>
                    <th>Tanda Tangan</th>
                </tr>
            </thead>

            @php
                $counter = 1;
                // dd($data_sidang_ta);
            @endphp
            <tbody>
                <tr class="table-light">
                    <td class="no">{{ $counter++ }}</td>
                    <td class="nama_dosen">{{ $data_sidang_ta->r_ketua->nama_dosen }}</td>
                    <td class="jabatan">Ketua</td>
                    <td style="padding: 40px"></td>
                    <td style="padding: 40px"></td>
                </tr>

                <tr class="table-light">
                    <td class="no">{{ $counter++ }}</td>
                    <td class="nama_dosen">{{ $data_sidang_ta->r_sekretaris->nama_dosen }}</td>
                    <td class="jabatan">Sekretaris</td>
                    <td style="padding: 40px"></td>
                    <td style="padding: 40px"></td>
                </tr>

                <tr class="table-light">
                    <td class="no">{{ $counter++ }}</td>
                    <td class="nama_dosen">{{ $data_sidang_ta->r_penguji_1->nama_dosen }}</td>
                    <td class="jabatan">Anggota 1</td>
                    <td style="padding: 40px"></td>
                    <td style="padding: 40px"></td>
                </tr>

                <tr class="table-light">
                    <td class="no">{{ $counter++ }}</td>
                    <td class="nama_dosen">{{ $data_sidang_ta->r_penguji_2->nama_dosen }}</td>
                    <td class="jabatan">Anggota 2</td>
                    <td style="padding: 40px"></td>
                    <td style="padding: 40px"></td>
                </tr>

                <tr class="table-light">
                    <td class="no">{{ $counter++ }}</td>
                    <td class="nama_dosen">{{ $data_sidang_ta->r_pembimbing_1->nama_dosen }}</td>
                    <td class="jabatan">Pembimbing 1</td>
                    <td style="padding: 40px"></td>
                    <td style="padding: 40px"></td>
                </tr>

                <tr class="table-light">
                    <td class="no">{{ $counter++ }}</td>
                    <td class="nama_dosen">{{ $data_sidang_ta->r_pembimbing_2->nama_dosen }}</td>
                    <td class="jabatan">Pembimbing 2</td>
                    <td style="padding: 40px"></td>
                    <td style="padding: 40px"></td>
                </tr>
            </tbody>

        </table>
        <br>
        <div class="signatures">
            <table style="width: 100%; font-size: 14px; margin-top: 50px; text-align: left;">
                <tr>
                    <td colspan="2" >
                        <strong>Diperiksa</strong>
                    </td>
                    <td colspan="2" >
                        <strong>Disetujui</strong>
                    </td>
                    <td colspan="2" >
                        <strong>Yang Menyatakan</strong>
                    </td>
                </tr>
                <tr>
                    <td style="width: 50%;">Tanggal</td>
                    <td style="width: 50%;"></td>
                    <td style="width: 50%;">Tanggal</td>
                    <td style="width: 50%;"></td>
                    <td style="width: 50%;">Tanggal</td>
                    <td style="width: 50%;"></td>
                </tr>
                <tr>
                    <td style="width: 50%;">Oleh</td>
                    <td style="width: 50%;"></td>
                    <td style="width: 50%;">Oleh</td>
                    <td style="width: 50%;">{{ $kajur->r_dosen->nama_dosen }}</td>
                    <td style="width: 50%;">Oleh</td>
                    <td style="width: 50%;"></td>
                </tr>
                <tr>
                    <td style="width: 50%;">Jabatan</td>
                    <td style="width: 50%;">Koordinator TA</td>
                    <td style="width: 50%;">Jabatan</td>
                    <td style="width: 50%;">Ketua Jurusan</td>
                    <td style="width: 50%;">Jabatan</td>
                    <td style="width: 50%;">Mahasiswa</td>
                </tr>
                <tr>
                    <td style="width: 50%;">Tanda Tangan</td>
                    <td style="width: 50%; padding: 40px;"></td>
                    <td style="width: 50%;">Tanda Tangan</td>
                    <td style="width: 50%; padding: 40px;"></td>
                    <td style="width: 50%;">Tanda Tangan</td>
                    <td style="width: 50%; padding: 40px;"></td>
                </tr>
            </table>
        </div>



</body>

</html>
