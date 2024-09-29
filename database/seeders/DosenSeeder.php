<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Dosen;

class DosenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $dosenData = [
            [13, 2 , 2 ,'ALDE ALANDA, S.Kom, M.T', '0025088802', 'Laki-laki', '1'],
            [14, 3 , 2 ,'ALDO ERIANDA, M.T, S.ST', '003078904',  'Laki-laki','1'],
            [40, 4 , 2 ,'CIPTO PRABOWO, S.T, M.T', '0002037410',  'Laki-laki', '1'],
            [46, 5 , 2 ,'DEDDY PRAYAMA, S.Kom, M.ISD', '0015048105', 'Laki-laki', '1'],
            [50, 6 , 2 ,'DEFNI, S.Si, M.Kom', '0007128104',  'Perempuan', '1'],
            [52, 7 , 2 ,'DENI SATRIA, S.Kom, M.Kom', '0028097803',  'Laki-laki', '1'],
            [66, 8 , 2 ,'DWINY MEIDELFI, S.Kom, M.Cs', '0009058601',  'Perempuan', '1'],
            [85, 9 , 2 ,'ERVAN ASRI, S.Kom, M.Kom', '0001097802',  'Laki-laki',  '1'],
        ];

        foreach ($dosenData as $data) {
            Dosen::create([
                'id_dosen' => $data[0],
                'user_id' => $data[1],
                'prodi_id' => $data[2],
                'nama_dosen' => $data[3],
                'nidn_dosen' => $data[4],
                'gender' => $data[5],
                'status_dosen' => $data[6]
            ]);
        }
    }
}

