import React from "react";
import { Tag } from 'primereact/tag';
import { Button } from "primereact/button";

const detailPkl = ({
    data_mhs,
}) => {
    let emptylaporanpkl = {
        id_log_book_pkl: null,
        komentar: "",
        keaktifan: null,
        komunikasi: null,
        problem_solving: null,
        status: "",
    };
    const { props } = usePage();
    const data_mhss = data_mhs[0];
    const data_laporanpkl = data_laporan;
    const [laporanpkls, setlaporanpkls] = useState(null);
    const [laporanpklDialog, setlaporanpklDialog] = useState(false);
    const [laporanpkl, setlaporanpkl] = useState(emptylaporanpkl);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);

    useEffect(() => {
        setlaporanpkls(data_laporanpkl);
        displaySuccessMessage(props.flash?.success);
        displayErrorMessage(props.flash?.error);
    }, [data_laporanpkl, props.flash]);

    const hideDialog = () => {
        setSubmitted(false);
        setlaporanpklDialog(false);
    };

    const displaySuccessMessage = (successMessage) => {
        if (successMessage !== null) {
            const message = successMessage || "Operation successful";
            toast.current?.show({
                severity: "success",
                summary: "Successful",
                detail: message,
                life: 3000,
            });
        }
    };

    const displayErrorMessage = (errorMessage) => {
        if (errorMessage !== null) {
            const message = errorMessage || "Operation failed";
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: message,
                life: 3000,
            });
        }
    };

    const savelaporanpkl = async () => {
        setSubmitted(true);

        const requiredFieldsForUpdate = [
            laporanpkl.id_log_book_pkl,
            laporanpkl.komentar,
            laporanpkl.status,
            laporanpkl.keaktifan,
            laporanpkl.komunikasi,
            laporanpkl.problem_solving
        ];

        const isValid = requiredFieldsForUpdate.every(field => field);

        if (!isValid) {
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Please fill in all required fields.",
                life: 3000,
            });
            return;
        }

        let _laporanpkl = { ...laporanpkl };

        try {
            await router.put(`/Pembimbing/Mhspkl/Laporan/${laporanpkl.id_log_book_pkl}/update`, _laporanpkl);

            setlaporanpkls(prevlaporanpkls =>
                prevlaporanpkls.map(d => d.id_log_book_pkl === laporanpkl.id_log_book_pkl ? _laporanpkl : d)
            );
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to update data.";
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: errorMessage,
                life: 3000,
            });
        } finally {
            setlaporanpkl(emptylaporanpkl);
            setlaporanpklDialog(false);
        }
    };

    const editlaporanpkl = (laporanpkl) => {
        setlaporanpkl({ ...laporanpkl });
        setlaporanpklDialog(true);
    };

    const laporanpklDialogFooter = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                text
                onClick={hideDialog}
            />
            <Button label="Save" icon="pi pi-check" text onClick={savelaporanpkl} />
        </>
    );
    const statusUsulan = () => {

        switch (data_mhss.status_usulan) {
            case "1":
                return <Tag severity="danger" value="Belum Disetujui" />;
            case "2":
                return <Tag severity="warning" value="Menunggu Persetujuan" />;
            case "3":
                return <Tag severity="success" value="Dikonfirmasi" />;
            default:
                return <Tag severity="info" value="Status Tidak Dikenal" />;
        }
    };
    return (
        <div className="card">
            <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">PKL Details</h1>
            <hr className="tw-my-4" />
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Perusahaan</p>
                    <p className="tw-text-gray-600">{data_mhss.tempat_pkl}</p>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Alamat</p>
                    <p className="tw-text-gray-600">{data_mhss.alamat_perusahaan}</p>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Role / Divisi</p>
                    <p className="tw-text-gray-600">{data_mhss.role_pkl}</p>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Tanggal PKL</p>
                    <p className="tw-text-gray-600">{data_mhss.tgl_awal_pkl} - {data_mhss.tgl_akhir_pkl}</p>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Dosen Pembimbing</p>
                    <div className="tw-flex tw-justify-between tw-items-center">
                        <div className="tw-flex tw-items-center">
                            <p className="tw-text-gray-600">{data_mhss.dosen_pembimbing}</p>
                        </div>
                        <Button icon="pi pi-pencil" severity="success" outlined rounded
                            tooltip="Ubah Pembimbing" tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                        />
                    </div>
                </div>
                <div>
                    <p className="tw-text-gray-800 tw-font-semibold">Status</p>
                    {statusUsulan()}
                </div>
            </div>
            <LaporanpklForm
                laporanpklDialog={laporanpklDialog}
                laporanpkl={laporanpkl}
                setlaporanpkl={setlaporanpkl}
                submitted={submitted}
                laporanpklDialogFooter={laporanpklDialogFooter}
                hideDialog={hideDialog}
            />
        </div>
    )
};

export default detailPkl;
