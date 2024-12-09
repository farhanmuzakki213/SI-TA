<?php

namespace Database\Seeders;

use App\Models\Dosen;
use App\Models\Pimpinan;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = ['pimpinanJurusan', 'dosenPembimbing', 'pimpinanProdi', 'dosenPenguji', 'superAdmin', 'mahasiswa', 'admin'];
        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role]);
        }

        function generateEmail($name)
        {
            $titles = ['Ir.', 'Dr.', 'S.T', 'S.Si', 'M.T', 'M.Kom', 'M.Kom.', 'S.Kom'];
            $name = strtolower($name);
            foreach ($titles as $title) {
                $name = str_replace(strtolower($title), '', $name);
            }
            $name = str_replace(' ', '', $name);
            $nameParts = explode(',', trim($name));
            $firstName = trim($nameParts[0]);
            return strtolower($firstName) . '@pnp.ac.id';
        }

        $adminUser = User::firstOrCreate(
            ['email' => generateEmail('Admin')],
            ['name' => 'Admin User', 'password' => Hash::make('12345678')]
        );
        $adminUser->assignRole('admin');

        $superAdminUser = User::firstOrCreate(
            ['email' => generateEmail('SuperAdmin')],
            ['name' => 'Super Admin', 'password' => Hash::make('12345678')]
        );
        $superAdminUser->assignRole('superAdmin');

        // Data dosen yang akan dibuat
        $dosenData = [
            [13,  38, 2, 'ALDE ALANDA, S.Kom, M.T', '0025088802', 'Laki-laki', '1', '198808252015041002'],
            [14,  35, 2, 'ALDO ERIANDA, M.T, S.ST', '003078904', 'Laki-laki', '1', '198907032019031015'],
            [40,  38, 2, 'CIPTO PRABOWO, S.T, M.T', '0002037410', 'Laki-laki', '1', '197403022008121001'],
            [46,  38, 2, 'DEDDY PRAYAMA, S.Kom, M.ISD', '0015048105', 'Laki-laki', '1', '198104152006041002'],
            [50,  35, 2, 'DEFNI, S.Si, M.Kom', '0007128104', 'Perempuan', '1', '198112072008122001'],
            [52,  35, 2, 'DENI SATRIA, S.Kom, M.Kom', '0028097803', 'Laki-laki', '1', '197809282008121002'],
            [66,  42, 2, 'DWINY MEIDELFI, S.Kom, M.Cs', '0009058601', 'Perempuan', '1', '198605092014042001'],
            [85,  35, 2, 'ERVAN ASRI, S.Kom, M.Kom', '0001097802', 'Laki-laki', '1', '197809012008121001'],
            [91,  38, 2, 'FAZROL ROZI, M.Sc.', '0021078601', 'Laki-laki', '1', '19860721201012006'],
            [103, 38, 2, 'FITRI NOVA, M.T, S.ST', '1029058502', 'Perempuan', '1', '198505292014042001'],
            [109, 38, 3, 'Ir. HANRIYAWAN ADNAN MOODUTO, M.Kom.', '0010056606', 'Laki-laki', '1', '196605101994031003'],
            [116, 20, 3, 'Ir. Hendrick, ST.,MT.,Ph.D', '0002127705', 'Laki-laki', '1', '197712022006041000'],
            [121, 35, 2, 'HIDRA AMNUR, S.E., S.Kom, M.Kom', '0015048209', 'Laki-laki', '1', '198204152012121002'],
            [122, 42, 3, 'HUMAIRA, S.T, M.T', '0019038103', 'Perempuan', '1', '198103192006042002'],
            [127, 38, 2, 'IKHSAN YUSDA PRIMA PUTRA, S.H., LL.M', '0001107505', 'Laki-laki', '1', '197510012006041002'],
            [132, 42, 2, 'INDRI RAHMAYUNI, S.T, M.T', '0025068301', 'Perempuan', '1', '198306252008012004'],
            [160, 35, 3, 'MERI AZMI, S.T, M.Cs', '0029068102', 'Perempuan', '1', '198106292006042001'],
            [198, 42, 3, 'Ir. Rahmat Hidayat, S.T, M.Sc.IT', '1015047801', 'Laki-laki', '1', '197804152000121002'],
            [206, 35, 3, 'RASYIDAH, S.Si, M.M.', '0001067407', 'Perempuan', '1', '197406012006042001'],
            [212, 42, 2, 'RIKA IDMAYANTI, S.T, M.Kom', '0022017806', 'Perempuan', '1', '197801222009122002'],
            [220, 35, 2, 'RITA AFYENNI, S.Kom, M.Kom', '0018077099', 'Perempuan', '1', '197007182008012010'],
            [223, 38, 3, 'RONAL HADI, S.T, M.Kom', '0029017603', 'Laki-laki', '1', '197601292002121001'],
            [258, 35, 2, 'TAUFIK GUSMAN, S.S.T, M.Ds', '0010088805', 'Laki-laki', '1', '198808102019031012'],
            [277, 35, 3, 'YANCE SONATHA, S.Kom, M.T', '0029128003', 'Perempuan', '1', '198012292006042001'],
            [289, 35, 3, 'Dr. Ir. YUHEFIZAR, S.Kom., M.Kom', '0020025008', 'Laki-laki', '1', '197601132006041002'],
            [292, 42, 2, 'YULHERNIWATI, S.Kom, M.T', '0019077609', 'Perempuan', '1', '197607192008012017'],
            [310, 35, 1, 'TRI LESTARI, S.Pd.,M.Eng.', '0005039205', 'Perempuan', '1', '199203052019032025'],
            [311, 42, 2, 'Fanni Sukma, S.ST., M.T', '0006069009', 'Perempuan', '1', '199006062019032026'],
            [312, 42, 1, 'Andre Febrian Kasmar, S.T., M.T.', '0020028804', 'Laki-laki', '1', '198802202019031009'],
            [351, 35, 2, 'RONI PUTRA, S.Kom, M.T ', '0022078607', 'Laki-laki', '1', '198607222009121004'],
            [352, 38, 1, 'Ardi Syawaldipa, S.Kom.,M.T.', '0029058909', 'Laki-laki', '1', '198905292020121003'],
            [353, 42, 1, 'Harfebi Fryonanda, S.Kom., M.Kom', '0310119101', 'Laki-laki', '1', '199111102022031008'],
            [354, 38, 1, 'Ideva Gaputra, S.Kom., M.Kom', '0012098808', 'Laki-laki', '1', '198809122022031006'],
            [355, 38, 1, 'Yulia Jihan Sy, S.Kom., M.Kom', '1017078904', 'Perempuan', '1', '198907172022032010'],
            [356, 35, 2, 'Andrew Kurniawan Vadreas, S.Kom., M.T ', '1021028702', 'Laki-laki', '1', '198702212022031001'],
            [357, 35, 1, 'YORI ADI ATMA, S.Pd., M.Kom', '2010059001', 'Laki-laki', '1', '199005102022031002'],
            [358, 42, 2, 'Dr. Ulya Ilhami Arsyah, S.Kom., M.Kom', '0130039101', 'Laki-laki', '1', '199103302022031004'],
            [359, 35, 1, 'Hendra Rotama, S.Pd., M.Sn', '0218068801', 'Laki-laki', '1', '198806182022031003'],
            [360, 38, 1, 'Sumema, S.Ds., M.Ds', '0008069103', 'Perempuan', '1', '199106082022032006'],
            [361, 38, 1, 'Raemon Syaljumairi, S.Kom., M.Kom', '0017078407', 'Laki-laki', '1', '198407172010121002'],
            [362, 42, 1, 'Mutia Rahmi Dewi, S.Kom., M.Kom', '0004099601', 'Perempuan', '1', '199609042022032018'],
            [363, 38, 1, 'Novi, S.Kom., M.T', '0001118611', 'Perempuan', '1', '198611012022032003'],
            [364, 38, 1, 'Rahmi Putri Kurnia, S.Kom., M.Kom', '0027089303', 'Perempuan', '1', '199308272022032012']
        ];

        // Membuat data dosen dan mengisi 'user_id' secara otomatis
        foreach ($dosenData as $data) {
            $user = User::firstOrCreate(
                ['email' => generateEmail($data[3])],
                ['name' => $data[3], 'password' => Hash::make('12345678')]
            );
            $user->assignRole(['dosenPembimbing', 'dosenPenguji']);

            Dosen::updateOrCreate(
                ['id_dosen' => $data[0]],
                [
                    'user_id' => $user->id,
                    'prodi_id' => $data[1],
                    'golongan_id' => $data[2],
                    'nama_dosen' => $data[3],
                    'nidn_dosen' => $data[4],
                    'gender' => $data[5],
                    'status_dosen' => $data[6],
                    'nip_dosen' => $data[7]
                ]
            );
        }
        $dosenUserIds = Dosen::get()->pluck('user_id')->toArray();

        foreach ($dosenUserIds as $user_id) {
            $user = User::find($user_id);
            if ($user) {
                $user->assignRole('dosenPembimbing');
                $user->assignRole('dosenPenguji');
            }
        }

        // Data mahasiswa yang akan dibuat
        $data_mahasiswa = [
            [1, 5, '2201081001', 'Andre Ferdinan', 'Laki-laki', '1'],
            [2, 5, '2201081002', 'Andre Fransisko', 'Laki-laki', '1'],
            [3, 5, '2201081004', 'Asrivo Maha Kurnia Pitama', 'Perempuan', '1'],
            [4, 5, '2201081005', 'Dhea Safira', 'Perempuan', '1'],
            [5, 5, '2201081006', 'Dini Damayanti', 'Perempuan', '1'],
            [6, 5, '2201081007', 'Hafizhoh Viarma', 'Perempuan', '1'],
            [7, 5, '2201081008', 'Keisya Triandara Mawaddah', 'Perempuan', '1'],
            [8, 5, '2201081009', 'Muhammad Fajrin Lubis', 'Laki-laki', '1'],
            [9, 5, '2201081011', 'Rasis Al Zailany Hasibuan', 'Laki-laki', '1'],
            [10, 5, '2201082001', 'Amalia Yosandra', 'Perempuan', '1'],
            [11, 5, '2201082003', 'Abdullah Adam', 'Laki-laki', '1'],
            [12, 5, '2201082004', 'Farrell Aydin Mhasood', 'Laki-laki', '1'],
            [13, 5, '2201082006', 'Fidia Rahmatunnisa', 'Perempuan', '1'],
            [14, 5, '2201082007', 'Julian Fadhillah', 'Laki-laki', '1'],
            [15, 5, '2201082008', 'Melida Sari', 'Perempuan', '1'],
            [16, 5, '2201082012', 'Muhammad Irfan', 'Laki-laki', '1'],
            [17, 5, '2201082020', 'Afiq Nur Effendi', 'Laki-laki', '1'],
            [18, 5, '2201082021', 'Alif Nur Samudra', 'Laki-laki', '1'],
            [19, 5, '2201082022', 'Azzammil Akbar Ramadhan', 'Laki-laki', '1'],
            [20, 5, '2201082024', 'Della Putri Herman', 'Perempuan', '1'],
            [21, 5, '2201082025', 'Dion Pratama Putra', 'Laki-laki', '1'],
            [22, 5, '2201082026', 'Erlian Fir Dhani', 'Laki-laki', '1'],
            [23, 5, '2201082027', 'Farhan Sahida', 'Laki-laki', '1'],
            [24, 5, '2201082028', 'Farig Muhammad Taqy', 'Laki-laki', '1'],
            [25, 5, '2201082029', 'Khalilul Rahman', 'Laki-laki', '1'],
            [26, 4, '2201091001', 'Anjeli Masrizal Putri', 'Perempuan', '1'],
            [27, 4, '2201091002', 'Aria Mardiah', 'Perempuan', '1'],
            [28, 4, '2201091004', 'Mauizati Hasanah', 'Perempuan', '1'],
            [29, 4, '2201091006', 'Hafiz Alek Sandro', 'Laki-laki', '1'],
            [30, 4, '2201091007', 'Heru Rizaldi', 'Laki-laki', '1'],
            [31, 4, '2201091010', 'Nadya Kusuma Wardani', 'Perempuan', '1'],
            [32, 4, '2201091018', 'Khalisha Salsabila', 'Perempuan', '1'],
            [33, 4, '2201092003', 'Baihaqi Alfarizi Darnas', 'Laki-laki', '1'],
            [34, 4, '2201092005', 'Aditya Swandy', 'Laki-laki', '1'],
            [35, 4, '2201092007', 'Fachrul Ihsan', 'Laki-laki', '1'],
            [36, 4, '2201092008', 'Fauzan Syakhira', 'Laki-laki', '1'],
            [37, 4, '2201092011', 'Heru Rafki Ramadhan', 'Laki-laki', '1'],
            [38, 4, '2201092021', 'Bimo Surya Prima', 'Laki-laki', '1'],
            [39, 4, '2201092027', 'Radiatul Al Adyah', 'Perempuan', '1'],
            [40, 4, '2201092028', 'Bintang Suhel', 'Laki-laki', '1'],
            [41, 4, '2201092032', 'Rifki Aditya Ramadhan', 'Laki-laki', '1'],
            [42, 4, '2201092036', 'Wahyu Bulkhoir', 'Laki-laki', '1'],
            [43, 4, '2201092038', 'Fadhil Ridho Pratama', 'Laki-laki', '1'],
            [44, 4, '2201092043', 'Hanna Adilah', 'Perempuan', '1'],
            [45, 4, '2201092044', 'Larsa Zalona Illahi', 'Perempuan', '1'],
            [46, 4, '2201092045', 'Miftahul Azizah', 'Perempuan', '1'],
            [47, 4, '2201092047', 'Nashywa Davina Aurelia', 'Perempuan', '1'],
            [48, 4, '2201092048', 'Nurul Iqma', 'Perempuan', '1'],
            [49, 4, '2201092050', 'Rani Sakirman', 'Perempuan', '1'],
            [50, 4, '2201093001', 'Dian Putri Sriwahyuni', 'Perempuan', '1'],
            [51, 4, '2201093002', 'Rahman Faisal', 'Laki-laki', '1'],
            [52, 3, '2111082026', 'Muhammad Ar-Razi A.Gazali', 'Laki-laki', '1'],
            [53, 3, '2111082047', 'Winaldo Ageng Kalimasada', 'Laki-laki', '1'],
            [54, 3, '2211081006', 'Cindy Steffani', 'Perempuan', '1'],
            [55, 3, '2211081009', 'Fitri Sakinah', 'Perempuan', '1'],
            [56, 3, '2211081010', 'Hafifah Azzahra', 'Perempuan', '1'],
            [57, 3, '2211081021', 'Nurhadi Sa\'bani', 'Laki-laki', '1'],
            [58, 3, '2211081025', 'Razi Syahriful Zanah', 'Laki-laki', '1'],
            [59, 3, '2211081026', 'Rifko Ahmad', 'Laki-laki', '1'],
            [60, 3, '2211081029', 'Taufiqurrahman', 'Laki-laki', '1'],
            [61, 3, '2211082004', 'Athira Rahmadini Liamdas', 'Perempuan', '1'],
            [62, 3, '2211082007', 'Fadila Islami Nisa', 'Perempuan', '1'],
            [63, 3, '2211082015', 'Iqlima Khairunnisa', 'Perempuan', '1'],
            [64, 3, '2211082016', 'Jazila Valisya Luthfia', 'Perempuan', '1'],
            [65, 3, '2211082023', 'Nurul Aulia', 'Perempuan', '1'],
            [66, 3, '2211082024', 'Puti Hanifah Marsla', 'Perempuan', '1'],
            [67, 3, '2211083005', 'Ibrahim Risyad', 'Laki-laki', '1'],
            [68, 3, '2211083010', 'Deni Ramadhan', 'Laki-laki', '1'],
            [69, 3, '2211083012', 'M. Zidhan Prasetyo', 'Laki-laki', '1'],
            [70, 3, '2211083013', 'M. Ismal Pratama', 'Laki-laki', '1'],
            [71, 3, '2211083022', 'Auriel Ibrahim', 'Laki-laki', '1'],
            [72, 3, '2211083024', 'Dzaky Rahmat Nurwahid', 'Laki-laki', '1'],
            [73, 3, '2211083025', 'Farhan Muzakki', 'Laki-laki', '1'],
            [74, 3, '2211083026', 'Geraldo Afrinandi Persada', 'Laki-laki', '1'],
            [75, 3, '2211083028', 'Imam Mahmuda', 'Laki-laki', '1'],
            [76, 3, '2211083041', 'Exel Pratama', 'Laki-laki', '1'],
            [77, 3, '2211083045', 'Salma Husna', 'Perempuan', '1'],
            [78, 1, '2111081002', 'Arshifa Demuna', 'Perempuan', '1'],
            [79, 1, '2111081005', 'Fazila Surya Azzahrah', 'Perempuan', '1'],
            [80, 1, '2111081009', 'Messy Wirdianti', 'Perempuan', '1'],
            [81, 1, '2111081014', 'Yefri Afri Zandra', 'Laki-laki', '1'],
            [82, 1, '2111082003', 'Aditiya Nofril Saputra', 'Laki-laki', '1'],
            [83, 1, '2111082016', 'Habib Maulana Shidiq', 'Laki-laki', '1'],
            [84, 1, '2111082017', 'Hana Aliyah Puteri', 'Perempuan', '1'],
            [85, 1, '2111082024', 'Muhammad Anshar', 'Laki-laki', '1'],
            [86, 1, '2111082025', 'Muhammad Ardy Ansyah', 'Laki-laki', '1'],
            [87, 1, '2111082039', 'Ranaufal Muha', 'Laki-laki', '1'],
            [88, 1, '2111082040', 'Rifqi Wirma Putra', 'Laki-laki', '1'],
            [89, 1, '2111082041', 'Rizky Abiyyu', 'Laki-laki', '1'],
            [90, 1, '2111082042', 'Rizqy Yoanda', 'Laki-laki', '1'],
            [91, 1, '2111082043', 'Silvia Putri Herlieno', 'Perempuan', '1'],
            [92, 1, '2111082049', 'Zaqaul Fikri Aziz', 'Laki-laki', '1'],
            [93, 1, '2111083002', 'Ahmad Rayhan', 'Laki-laki', '1'],
            [94, 1, '2111083003', 'Ahmad Zulveron', 'Laki-laki', '1'],
            [95, 1, '2111083004', 'Alif Zidan Andriansyah', 'Laki-laki', '1'],
            [96, 1, '2111083007', 'Fauzi Isyrin Apridal', 'Laki-laki', '1'],
            [97, 1, '2111083011', 'Iqbal Muhakim', 'Laki-laki', '1'],
            [98, 1, '2111083012', 'Iqra Aisyah . Ra', 'Perempuan', '1'],
            [99, 1, '2111083019', 'Rahmi Aulia', 'Perempuan', '1'],
            [100, 1, '2111083025', 'Yaser Husein', 'Laki-laki', '1'],
            [101, 2, '2011083008', 'Ihsan Shadiq', 'Laki-laki', '1'],
            [102, 2, '2011083014', 'Nadia .Z', 'Perempuan', '1'],
            [103, 2, '2111081003', 'Aufa Yuliansyah', 'Laki-laki', '1'],
            [104, 2, '2111081004', 'Bima Lintang Pratama', 'Laki-laki', '1'],
            [105, 2, '2111081006', 'Gybran Nauval Yuhandika', 'Laki-laki', '1'],
            [106, 2, '2111082001', 'Abdillah Hendra Rahmatullah', 'Laki-laki', '1'],
            [107, 2, '2111082006', 'Amelia', 'Perempuan', '1'],
            [108, 2, '2111082007', 'Astrid Tri Gustia', 'Perempuan', '1'],
            [109, 2, '2111082015', 'Gerry Novazy Binjari Putra', 'Laki-laki', '1'],
            [110, 2, '2111082019', 'Ikhsano Mulya', 'Laki-laki', '1'],
            [111, 2, '2111082022', 'M.Cakra Adhana', 'Laki-laki', '1'],
            [112, 2, '2111082027', 'Muhammad Bintang', 'Laki-laki', '1'],
            [113, 2, '2111082036', 'Noverino Ramadhan', 'Laki-laki', '1'],
            [114, 2, '2111082045', 'Teguh Yasti Putra', 'Laki-laki', '1'],
            [115, 2, '2111083005', 'Dhiwa Thatsbih Azzaraqi', 'Laki-laki', '1'],
            [116, 2, '2111083006', 'Farhan Abyu', 'Laki-laki', '1'],
            [117, 2, '2111083008', 'Ferdiansyah Irawan', 'Laki-laki', '1'],
            [118, 2, '2111083009', 'Githani Rizkyka Pasya', 'Perempuan', '1'],
            [119, 2, '2111083013', 'Irfan Maulana', 'Laki-laki', '1'],
            [120, 2, '2111083015', 'Muhammad Dwiky Alfira', 'Laki-laki', '1'],
            [121, 2, '2111083017', 'Mubdi Marfiki Ikhsan', 'Laki-laki', '1'],
            [122, 2, '2111083020', 'Revi Wardana Putra', 'Laki-laki', '1']
        ];


        // Membuat data mahasiswa dan mengisi 'user_id' secara otomatis
        foreach ($data_mahasiswa as $data) {
            $user = User::firstOrCreate(
                ['email' => generateEmail($data[3])],
                ['name' => $data[3], 'password' => Hash::make('12345678')]
            );
            $user->assignRole('mahasiswa');

            DB::table('mahasiswas')->updateOrInsert(
                ['id_mahasiswa' => $data[0]],
                [
                    'user_id' => $user->id,
                    'kelas_id' => $data[1],
                    'nim_mahasiswa' => $data[2],
                    'nama_mahasiswa' => $data[3],
                    'gender' => $data[4],
                    'status_mahasiswa' => $data[5]
                ]
            );
        }

        $PJData = [
            [1, 1, 223, 38, '2022-2026', '1'],
            [2, 2, 122, 42, '2022-2026', '1'],
            [3, 3, 160, 42, '2022-2026', '1'],
            [4, 3, 351, 35, '2022-2026', '1'],
            [5, 3, 312, 38, '2022-2026', '1'],
        ];

        foreach ($PJData as $data) {
            DB::table('pimpinans')->insert([
                'id_pimpinan' => $data[0],
                'jabatan_pimpinan_id' => $data[1],
                'dosen_id' => $data[2],
                'prodi_id' => $data[3],
                'periode' => $data[4],
                'status_pimpinan' => $data[5]
            ]);
        }

        $kajurUserIds = Pimpinan::with('r_dosen')->whereIn('jabatan_pimpinan_id', [1, 2])->get()->pluck('r_dosen.user_id')->toArray();
        $kaprodiUserIds = Pimpinan::with('r_dosen')->where('jabatan_pimpinan_id', 3)->get()->pluck('r_dosen.user_id')->toArray();

        foreach ($kajurUserIds as $user_id) {
            $user = User::find($user_id);
            if ($user) {
                $user->assignRole('pimpinanJurusan');
            }
        }

        foreach ($kaprodiUserIds as $user_id) {
            $user = User::find($user_id);
            if ($user) {
                $user->assignRole('pimpinanProdi');
            }
        }
    }
}
