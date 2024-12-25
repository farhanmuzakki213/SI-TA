import React, { useRef } from "react";
import { Button } from 'primereact/button';
import { Messages } from "primereact/messages";
import { Toast } from "primereact/toast";

const detailTa = ({
    data_ta,
    data_dosen,
    data_nilai,
    nextNumber_nilai,
}) => {
    // console.log("data_ta", data_ta);
    let emptynilaisempro = {
        id_sempro_nilai: null,
        sempro_mhs_id: data_mhs[0].id_sempro_mhs,
        pendahuluan: "",
        tinjauan_pustaka: "",
        metodologi_penelitian: "",
        bahasa_dan_tata_tulis: "",
        presentasi: "",
    };
    const data_tas = data_ta[0];
    const data_dosens = data_dosen[0];
    const { props } = usePage();
    const [nilaisempros, setnilaisempros] = useState(null);
    const [nilaisemproDialog, setnilaisemproDialog] = useState(false);
    const [nilaisempro, setnilaisempro] = useState(emptynilaisempro);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);
    const msgs = useRef(null);

    useEffect(() => {
        setnilaisempros(data_nilai);
        displaySuccessMessage(props.flash?.success);
        displayErrorMessage(props.flash?.error);

        if (msgs.current && data_mhss.status_sempro === '1' && nilaiAkhir() !== null) {
            msgs.current.clear();
            msgs.current.show([
                { sticky: true, severity: 'error', detail: 'Tidak Lulus Seminar Proposal', closable: true }
            ]);
        }
        if (msgs.current && data_mhss.status_sempro === '3' && nilaiAkhir() !== null) {
            msgs.current.clear();
            msgs.current.show([
                { sticky: true, life: 1000, severity: 'success', summary: 'success', detail: ' Lulus Seminar Proposal', closable: true },
            ]);
        }
    }, [data_nilai, props.flash]);

    // console.log(data_nilai);
    const nilaiPembimbing = () => {
        console.log("Nilais", nilaisempros);
        if (!Array.isArray(nilaisempros) || nilaisempros.length === 0) {
            // console.warn("nilaisempros is empty or not an array");
            return null;
        }
        const nilaisempro = nilaisempros[0];

        return nilaisempro;
    };

    // console.log("Hasil Nilai Pembimbing:", nilaiPembimbing());

    const nilaiPembimbing_1 = JSON.parse(data_tas.nilai_pembimbing_1?.nilai || null);
    const nilaiPembimbing_2 = JSON.parse(data_tas.nilai_pembimbing_2?.nilai || null);
    const nilaiKetua = JSON.parse(data_tas.nilai_ketua?.nilai || null);
    const nilaiSekretaris = JSON.parse(data_tas.nilai_sekretaris?.nilai || null);
    const nilaiPenguji_1 = JSON.parse(data_tas.nilai_penguji_1?.nilai || null);
    const nilaiPenguji_2 = JSON.parse(data_tas.nilai_penguji_2?.nilai || null);
    const nilaiAkhir = () => {
        if (nilaiPembimbing_1 != null && nilaiPembimbing_2 != null && nilaiKetua != null && nilaiSekretaris != null && nilaiPenguji_1 != null && nilaiPenguji_2 != null) {
            if (nilaiPembimbing() != null) {
                if (data_mhss.pembimbing_1_id === data_dosens.id_dosen) {
                    const totalNilai =
                        (nilaiPembimbing().total_nilai +
                            nilaiPembimbing_2.total_nilai +
                            nilaiKetua.total_nilai +
                            nilaiSekretaris.total_nilai +
                            nilaiPenguji_1.total_nilai +
                            nilaiPenguji_2.total_nilai) / 6;
                    return parseFloat(totalNilai.toFixed(2));
                }

                if (data_mhss.pembimbing_2_id === data_dosens.id_dosen) {
                    const totalNilai =
                        (nilaiPembimbing().total_nilai +
                            nilaiPembimbing_1.total_nilai +
                            nilaiKetua.total_nilai +
                            nilaiSekretaris.total_nilai +
                            nilaiPenguji_1.total_nilai +
                            nilaiPenguji_2.total_nilai) / 6;
                    return parseFloat(totalNilai.toFixed(2));
                }
                return null
            }
            return null
        }
        return null
    };
    const openFile = async () => {
        try {
            const url = `/SuratTugas/TA/${data_tas.id_ta_mhs}`;
            window.open(url, '_blank');
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="card">
            <Toast ref={toast} />
            <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">Sidang Details</h1>
            <hr className="tw-my-4" />
            {data_tas.status_sidang_ta !== '0' && (
                <div className="card">
                    <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6 tw-bg-white tw-p-4 tw-rounded-lg tw-shadow-sm">
                        <div>
                            <p className="tw-text-gray-800 tw-font-semibold">Judul</p>
                            <p className="tw-text-gray-600">{data_tas?.judul || '-'}</p>
                        </div>
                        <div>
                            <p className="tw-text-gray-800 tw-font-semibold">Tanggal Sidang</p>
                            <p className="tw-text-gray-600">{data_tas?.tgl_sidang || '-'}</p>
                        </div>
                        <div>
                            <p className="tw-text-gray-800 tw-font-semibold">Ruangan</p>
                            <p className="tw-text-gray-600">{data_tas?.ruangan_sidang || '-'}</p>
                        </div>
                        <div>
                            <p className="tw-text-gray-800 tw-font-semibold">Sesi</p>
                            <p className="tw-text-gray-600">{data_tas?.sesi_sidang || '-'}</p>
                        </div>
                    </div>
                </div>
            )}
            <hr className="tw-my-3" />
            <div className="card">
                <Messages ref={msgs} className="tw-mb-2" />
                <div className="tw-flex tw-justify-between tw-items-center tw-py-2">
                    <div className="tw-flex tw-items-center">
                        <p className="tw-text-lg tw-font-semibold tw-text-gray-800">Penilaian Tugas Akhir</p>
                    </div>
                    {data_tas.pembimbing_1_id === data_dosens.id_dosen && data_tas.id_booking && data_tas.status_sidang_ta === '1' && (
                        <>
                            {data_tas.nilai_pembimbing_1 === null ? (
                                <Button
                                    label="Nilai"
                                    icon="pi pi-plus"
                                    severity="success"
                                    className="mr-2"
                                    tooltip="Beri Nilai"
                                    tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                                    onClick={openNew}
                                />
                            ) : (
                                <Button
                                    label="Nilai"
                                    icon="pi pi-pencil"
                                    severity="success"
                                    className="mr-2"
                                    tooltip="Edit Nilai"
                                    tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                                    onClick={() => editnilaisempro(nilaiPembimbing())}
                                />
                            )}
                        </>
                    )}
                    {data_tas.pembimbing_2_id === data_dosens.id_dosen && data_tas.id_booking && data_tas.status_sidang_ta === '1' && (
                        <>
                            {data_tas.nilai_pembimbing_2 === null ? (
                                <Button
                                    label="Nilai"
                                    icon="pi pi-plus"
                                    severity="success"
                                    className="mr-2"
                                    tooltip="Beri Nilai"
                                    tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                                    onClick={openNew}
                                />
                            ) : (
                                <Button
                                    label="Nilai"
                                    icon="pi pi-pencil"
                                    severity="success"
                                    className="mr-2"
                                    tooltip="Edit Nilai"
                                    tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                                    onClick={() => editnilaisempro(nilaiPembimbing())}
                                />
                            )}
                        </>
                    )}
                </div>
                <hr className="tw-my-4" />
                <div className="tw-mt-4 tw-space-y-4">
                    <div className="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-800 tw-font-medium">Nama Dosen</p>
                        </div>
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-800 tw-font-medium">Jabatan</p>
                        </div>
                        <div className="tw-w-1/3 tw-text-right">
                            <p className="tw-text-gray-800 tw-font-medium">Nilai</p>
                        </div>
                    </div>
                    <div className="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">{!data_tas.nama_pembimbing_1 ? '-' : data_tas.nama_pembimbing_1}</p>
                        </div>
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">Pembimbing 1</p>
                        </div>
                        <div className="tw-w-1/3 tw-text-right">
                            {data_dosens.id_dosen === data_tas.pembimbing_1_id && nilaiPembimbing_1 ? (
                                <>
                                    {!nilaiPembimbing() ? (
                                        <p className="tw-text-gray-600">-</p>
                                    ) : (
                                        <p className="tw-text-gray-600">{nilaiPembimbing().total_nilai}</p>
                                    )}
                                </>
                            ) : (
                                <p className="tw-text-gray-600">
                                    {!nilaiPembimbing_1 ? 'Belum Dinilai' : nilaiPembimbing_1.total_nilai}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">{!data_tas.nama_pembimbing_2 ? '-' : data_tas.nama_pembimbing_2}</p>
                        </div>
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">Pembimbing 2</p>
                        </div>
                        <div className="tw-w-1/3 tw-text-right">
                            {data_dosens.id_dosen === data_tas.pembimbing_2_id && nilaiPembimbing_2 ? (
                                <>
                                    {!nilaiPembimbing() ? (
                                        <p className="tw-text-gray-600">-</p>
                                    ) : (
                                        <p className="tw-text-gray-600">{nilaiPembimbing().total_nilai}</p>
                                    )}
                                </>
                            ) : (
                                <p className="tw-text-gray-600">
                                    {!nilaiPembimbing_2 ? 'Belum Dinilai' : nilaiPembimbing_2.total_nilai}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">{!data_tas.nama_ketua ? '-' : data_tas.nama_ketua}</p>
                        </div>
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">Ketua</p>
                        </div>
                        <div className="tw-w-1/3 tw-text-right">
                            {!nilaiKetua ? (
                                <p className="tw-text-gray-600">Belum Dinilai</p>
                            ) : (
                                <p className="tw-text-gray-600">{nilaiKetua.total_nilai}</p>
                            )}
                        </div>
                    </div>
                    <div className="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">{!data_tas.nama_sekretaris ? '-' : data_tas.nama_sekretaris}</p>
                        </div>
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">Sekretaris</p>
                        </div>
                        <div className="tw-w-1/3 tw-text-right">
                            {!nilaiSekretaris ? (
                                <p className="tw-text-gray-600">Belum Dinilai</p>
                            ) : (
                                <p className="tw-text-gray-600">{nilaiSekretaris.total_nilai}</p>
                            )}
                        </div>
                    </div>
                    <div className="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">{!data_tas.nama_penguji_1 ? '-' : data_tas.nama_penguji_1}</p>
                        </div>
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">Penguji 1</p>
                        </div>
                        <div className="tw-w-1/3 tw-text-right">
                            {!nilaiPenguji_1 ? (
                                <p className="tw-text-gray-600">Belum Dinilai</p>
                            ) : (
                                <p className="tw-text-gray-600">{nilaiPenguji_1.total_nilai}</p>
                            )}
                        </div>
                    </div>
                    <div className="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">{!data_tas.nama_penguji_2 ? '-' : data_tas.nama_penguji_2}</p>
                        </div>
                        <div className="tw-w-1/3">
                            <p className="tw-text-gray-600">Penguji 2</p>
                        </div>
                        <div className="tw-w-1/3 tw-text-right">
                            {!nilaiPenguji_2 ? (
                                <p className="tw-text-gray-600">Belum Dinilai</p>
                            ) : (
                                <p className="tw-text-gray-600">{nilaiPenguji_2.total_nilai}</p>
                            )}
                        </div>
                    </div>
                    <hr className="tw-my-2" />
                    <div className="tw-flex tw-justify-between tw-items-center tw-border-b tw-pb-2">
                        <div className="tw-w-1/2">
                            <p className="tw-text-gray-800 tw-font-medium">Total Nilai</p>
                        </div>
                        <div className="tw-w-1/2 tw-text-right">
                            <p className="tw-text-gray-800 tw-font-medium">{!nilaiAkhir() ? 'Belum Lengkap' : nilaiAkhir()}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="tw-mt-6">
                <div className="card">
                    <p className="tw-text-lg tw-font-semibold tw-text-gray-800">Files</p>
                    <div className="tw-mt-4 tw-space-y-4">
                        {data_tas.id_booking && (
                            <div className="tw-flex tw-justify-between tw-items-center tw-py-2">
                                <div className="tw-flex tw-items-center">
                                    <span className="tw-text-gray-800">Surat Tugas</span>
                                </div>
                                <Button icon="pi pi-file" severity="primary" outlined label="File"
                                    tooltip="Lihat File" tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                                    onClick={openFile} />
                            </div>
                        )}
                        <div className="tw-flex tw-justify-between tw-items-center tw-py-2">
                            <div className="tw-flex tw-items-center">
                                <span className="tw-text-gray-800">Proposal</span>
                            </div>
                            <Button
                                icon="pi pi-file"
                                severity="primary"
                                outlined
                                label="File"
                                tooltip="Lihat File"
                                tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                                onClick={() => window.open(`/storage/uploads/ta/file/${data_tas?.file_proposal}`, '_blank')}
                            />
                        </div>
                        {data_tas.status_ver_ta === '2' && (
                            <div className="tw-flex tw-justify-between tw-items-center tw-py-2">
                                <div className="tw-flex tw-items-center">
                                    <span className="tw-text-gray-800">Tugas Akhir</span>
                                </div>
                                <Button
                                    icon="pi pi-file"
                                    severity="primary"
                                    outlined
                                    label="File"
                                    tooltip="Lihat File"
                                    tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                                    onClick={() => window.open(`/storage/uploads/ta/file_ta/${data_tas?.file_ta}`, '_blank')}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default detailTa;
