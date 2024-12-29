<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Berita Acara</title>
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
            padding-left: 40px;
            white-space: nowrap;
        }

        .details-table .value {
            padding-left: 15px;
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
            justify-content: flex-end;
            margin-top: 70px;
            page-break-inside: avoid;
        }

        .signatures table {
            border: none;
            width: 100%;
        }

        .signatures .left,
        .signatures .right {
            width: 50%;
            text-align: right;
            border: none;
            page-break-inside: avoid;
            white-space: nowrap;
        }

        .signatures .right p {
            margin: 0;
        }

        .signatures .nama_kajur {
            margin: 0;
            display: inline-block;
            border-bottom: 1px solid black;
            padding-bottom: 5px;
            width: fit-content;
            text-align: right;
        }

        .signatures .nip_kajur {
            margin: 0;
            display: block;
            text-align: right;
        }



        /* .signatures .right p:last-child {
            padding-top: 10px;
        } */

        .signatures .center {
            width: 100%;
            text-align: center;
            page-break-inside: avoid;
        }

        .signatures .center p {
            page-break-after: avoid;
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
            <h4 style="margin: 0;">SURAT KETERANGAN BEBAS SEGALA URUSAN UNTUK PENDAFTARAN WISUDA DAN PENGAMBILAN IZAJAH
            </h4>
            <font style="font-size: 16px; margin-top: 0; margin-bottom: 0;">Nomor : . . .
                ./PL9.8/PT/{{ \Carbon\Carbon::now()->format('Y') }}</font>
        </center>
        <br>
        <div>
            <font style="font-size: 16px;">Yang bertanda tangan di bawah ini Ketua Jurusan
                {{ $kajur->r_prodi->r_jurusan->nama_jurusan }}
                ,dengan ini menerangkan bahwa mahasiswa yang disebut dibawah ini:</font>
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
                        <td class="label">IPK</td>
                        <td>:</td>
                        <td class="value"></td>
                    </tr>
                @endif
            </table>
        </div>
        <br>

        <div style="margin-bottom: 1%;">
            <font style="font-size: 16px;">Telah bebas persoalan yang menyangkut kepentingan Jurusan
                {{ $kajur->r_prodi->r_jurusan->nama_jurusan }} pada semester Genap / Ganjil Tahun Akademik
                ........../..........</font>
        </div>
        <br>
        <font style="font-size: 16px;">Demikian surat tugas ini dibuat, untuk dapat dipergunakan seperlunya.</font>

        <div class="signatures">
            <table style="width: 100%;">
                <tr>
                    <td class="right" style="padding-left: 100px; font-size: 16px;">
                        <p style="margin-right: 120px ">Padang, </p>
                        <p>Ketua Jurusan {{ $kajur->r_prodi->r_jurusan->nama_jurusan }}</p>
                        <br><br><br><br>
                        <p class="nama_kajur">{{ $kajur->r_dosen->nama_dosen }}</p>
                        <p class="nip_kajur">{{ $kajur->r_dosen->nip_dosen }}</p>
                    </td>
                </tr>
            </table>
        </div>


</body>

</html>
