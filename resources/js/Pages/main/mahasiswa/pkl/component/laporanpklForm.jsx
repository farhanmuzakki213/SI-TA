import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import FileUploadC from '@/Components/FileUploadC';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';

const LaporanpklForm = ({
    laporanpklDialog,
    laporanpkl,
    submitted,
    laporanpklDialogFooter,
    hideDialog,
    setlaporanpkl,
}) => {
    const today = new Date();
    const [kegiatanList, setKegiatanList] = useState(['']);

    // Parse date untuk format "YYYY-MM-DD"
    const parseDate = (dateString) => {
        if (!dateString) return null;
        const [year, month, day] = dateString.split("-");
        return new Date(year, month - 1, day);
    };

    const [tglAwalPkl, setTglAwalPkl] = useState(
        laporanpkl.tgl_awal_kegiatan ? parseDate(laporanpkl.tgl_awal_kegiatan) : null
    );
    const [tglAkhirPkl, setTglAkhirPkl] = useState(
        laporanpkl.tgl_akhir_kegiatan ? parseDate(laporanpkl.tgl_akhir_kegiatan) : null
    );

    useEffect(() => {
        setTglAwalPkl(laporanpkl.tgl_awal_kegiatan ? parseDate(laporanpkl.tgl_awal_kegiatan) : null);
        setTglAkhirPkl(laporanpkl.tgl_akhir_kegiatan ? parseDate(laporanpkl.tgl_akhir_kegiatan) : null);
    }, [laporanpkl]);

    const minDate = new Date(today);
    minDate.setDate(minDate.getDate() + 1);

    const handleAwalChange = (e) => {
        const selectedDate = e.value;
        setTglAwalPkl(selectedDate);
        setlaporanpkl((prev) => ({
            ...prev,
            tgl_awal_kegiatan: formatDate(selectedDate),
        }));

        if (tglAkhirPkl && selectedDate > tglAkhirPkl) {
            setTglAkhirPkl(null);
            setlaporanpkl((prev) => ({
                ...prev,
                tgl_akhir_kegiatan: "",
            }));
        }
    };

    const handleAkhirChange = (e) => {
        const selectedDate = e.value;
        if (tglAwalPkl && selectedDate < tglAwalPkl) {
            alert("Tanggal akhir tidak boleh kurang dari tanggal awal.");
        } else {
            setTglAkhirPkl(selectedDate);
            setlaporanpkl((prev) => ({
                ...prev,
                tgl_akhir_kegiatan: formatDate(selectedDate),
            }));
        }
    };

    const formatDate = (date) => {
        if (!date) return "";
        return date.toLocaleDateString("en-CA", {
            timeZone: "Asia/Jakarta",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    };

    const onFileSelect = (files) => {
        setlaporanpkl((prevState) => ({
            ...prevState,
            dokumen_laporan: files,
        }));
    };
    // console.log(laporanpkl);

    const onInputChange = (e, index) => {
        const newKegiatanList = [...kegiatanList];
        newKegiatanList[index] = e.target.value;
        setKegiatanList(newKegiatanList);
    };

    const addKegiatanInput = () => {
        setKegiatanList([...kegiatanList, '']);
    };

    const removeKegiatanInput = (index) => {
        const newKegiatanList = kegiatanList.filter((_, i) => i !== index);
        setKegiatanList(newKegiatanList);
    };

    return (
        <Dialog
            visible={laporanpklDialog}
            style={{ width: "450px" }}
            header="Laporan PKL Details"
            modal
            className="p-fluid"
            footer={laporanpklDialogFooter}
            onHide={hideDialog}
        >
            {kegiatanList.map((kegiatan, index) => (
                <div key={index} className="field">
                    <label className='tw-mr-4' htmlFor={`kegiatan_${index}`}>Kegiatan {index + 1}</label>
                    {kegiatanList.length > 1 && (
                        <Button
                            icon="pi pi-minus"
                            rounded outlined text
                            className="p-button-danger p-button-outlined"
                            onClick={() => removeKegiatanInput(index)}
                        />
                    )}
                    <Button icon="pi pi-plus" rounded outlined text onClick={addKegiatanInput} />
                    <InputText
                        id={`kegiatan_${index}`}
                        value={kegiatan}
                        onChange={(e) => onInputChange(e, index)}
                        required
                        className={classNames({
                            "p-invalid": submitted && !kegiatan,
                        })}
                    />
                    {submitted && !kegiatan && (
                        <small className="p-invalid">Kegiatan {index + 1} is required.</small>
                    )}
                </div>
            ))}

            {/* Tanggal Awal PKL */}
            <div className="field">
                <label htmlFor="tgl_awal_kegiatan">Tanggal Awal Kegiatan</label>
                <Calendar
                    id="tgl_awal_kegiatan"
                    showIcon
                    showButtonBar
                    dateFormat="dd/mm/yy"
                    value={tglAwalPkl}
                    onChange={handleAwalChange}
                    placeholder="Pilih Tanggal"
                    minDate={minDate}
                />
                {submitted && !laporanpkl.tgl_awal_kegiatan && (
                    <small className="p-invalid">Tanggal awal is required.</small>
                )}
            </div>

            {/* Tanggal Akhir PKL */}
            <div className="field">
                <label htmlFor="tgl_akhir_kegiatan">Tanggal Akhir Kegiatan</label>
                <Calendar
                    id="tgl_akhir_kegiatan"
                    showIcon
                    showButtonBar
                    dateFormat="dd/mm/yy"
                    value={tglAkhirPkl}
                    onChange={handleAkhirChange}
                    placeholder="Pilih Tanggal"
                    minDate={tglAwalPkl || minDate}
                />
                {submitted && !laporanpkl.tgl_akhir_kegiatan && (
                    <small className="p-invalid">Tanggal akhir is required.</small>
                )}
            </div>

            {/* Upload Dokumen */}
            <div className="field">
                <label htmlFor="dokumen_laporan">Dokumen Laporan</label>
                <FileUploadC
                    multiple={false}
                    name="dokumen_laporan"
                    onFileSelect={onFileSelect}
                />
                {submitted && !laporanpkl?.dokumen_laporan && (
                    <small className="p-invalid">Dokumen Laporan is required.</small>
                )}
            </div>
        </Dialog>
    );
};

export default LaporanpklForm;
