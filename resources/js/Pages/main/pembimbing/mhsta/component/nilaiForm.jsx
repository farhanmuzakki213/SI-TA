import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { classNames } from 'primereact/utils';
import { Tooltip } from 'primereact/tooltip';
import TextAreaEditor from '@/Components/TextAreaEditor';

const NilaitaForm = ({
    nilaitaDialog,
    nilaita,
    submitted,
    nilaitaDialogFooter,
    hideDialog,
    setnilaita,
}) => {
    const [editorValue, setEditorValue] = useState("");

    useEffect(() => {
        setEditorValue(nilaita.komentar ? nilaita.komentar : "");
    }, [nilaita]);

    const handleEditorChange = (content) => {
        setEditorValue(content);
        setnilaita((prev) => ({
            ...prev,
            komentar: content,
        }));
    };

    const setValue = (e, field) => {
        const value = e.value;
        setnilaita((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };
    // console.log("form nilai",nilaita);

    return (
        <Dialog
            visible={nilaitaDialog}
            style={{ width: "500px" }}
            header="Penilaian Tugas Akhir Details"
            modal
            className="p-fluid"
            footer={nilaitaDialogFooter}
            onHide={hideDialog}
        >
            <div className='tw-mt-4'>
                <h5>Bimbingan</h5>
            </div>
            <hr className="tw-my-4" />
            <div className="p-fluid formgrid grid">
                {/* Etika dan Penampilan */}
                <div className="field col-12 md:col-6">
                    <Tooltip target=".etika_penampilan" />
                    <label htmlFor="etika_dan_penampilan">Etika & Penampilan
                        <i className="etika_penampilan pi pi-info-circle tw-ml-1"
                            data-pr-tooltip="Etika dan Penampilan. Bobot 5%"
                            data-pr-position="right"
                            data-pr-at="right+5 top"
                            data-pr-my="left center-2"
                            style={{ fontSize: '1rem' }}></i>
                    </label>
                    <InputNumber
                        inputId="etika_dan_penampilan"
                        value={nilaita.etika_dan_penampilan || ''}
                        onValueChange={(e) => setValue(e, "etika_dan_penampilan")}
                        required
                        mode="decimal"
                        showButtons
                        min={0}
                        max={100}
                        minFractionDigits={2}
                        className={classNames({
                            "p-invalid": submitted && !nilaita.etika_dan_penampilan,
                        })}
                    />
                    {submitted && !nilaita.etika_dan_penampilan && (
                        <small className="p-invalid">Etika & Penampilan is required.</small>
                    )}
                </div>

                {/* Komunikasi dan Sistematika */}
                <div className="field col-12 md:col-6">
                    <Tooltip target=".komunikasi_sistematiak" />
                    <label htmlFor="komunikasi_dan_sistematika">Komunikasi & Sistematika
                        <i className="komunikasi_sistematiak pi pi-info-circle tw-ml-1"
                            data-pr-tooltip="Komunikasi dan Sistematika. Bobot 5%"
                            data-pr-position="right"
                            data-pr-at="right+5 top"
                            data-pr-my="left center-2"
                            style={{ fontSize: '1rem' }}></i>
                    </label>
                    <InputNumber
                        inputId="komunikasi_dan_sistematika"
                        value={nilaita.komunikasi_dan_sistematika || ''}
                        onValueChange={(e) => setValue(e, "komunikasi_dan_sistematika")}
                        required
                        mode="decimal"
                        showButtons
                        min={0}
                        max={100}
                        minFractionDigits={2}
                        className={classNames({
                            "p-invalid": submitted && !nilaita.komunikasi_dan_sistematika,
                        })}
                    />
                    {submitted && !nilaita.komunikasi_dan_sistematika && (
                        <small className="p-invalid">Komunikasi & Sistematika is required.</small>
                    )}
                </div>

                {/* Pengetahuan Dasar */}
                <div className="field col-12 md:col-6">
                    <Tooltip target=".pengetahuan_dasar" />
                    <label htmlFor="penguasaan_materi_pengetahuan_dasar">Pengetahuan Dasar
                        <i className="pengetahuan_dasar pi pi-info-circle tw-ml-1"
                            data-pr-tooltip="Penguasaan Materi Pengetahuan Dasar. Bobot 10%"
                            data-pr-position="right"
                            data-pr-at="right+5 top"
                            data-pr-my="left center-2"
                            style={{ fontSize: '1rem' }}></i>
                    </label>
                    <InputNumber
                        inputId="penguasaan_materi_pengetahuan_dasar"
                        value={nilaita.penguasaan_materi_pengetahuan_dasar || ''}
                        onValueChange={(e) => setValue(e, "penguasaan_materi_pengetahuan_dasar")}
                        required
                        mode="decimal"
                        showButtons
                        min={0}
                        max={100}
                        minFractionDigits={2}
                        className={classNames({
                            "p-invalid": submitted && !nilaita.penguasaan_materi_pengetahuan_dasar,
                        })}
                    />
                    {submitted && !nilaita.penguasaan_materi_pengetahuan_dasar && (
                        <small className="p-invalid">Pengetahuan Dasar is required.</small>
                    )}
                </div>

                {/* Pemahaman */}
                <div className="field col-12 md:col-6">
                    <Tooltip target=".pemahaman" />
                    <label htmlFor="penguasaan_materi_pemahaman">Pemahaman
                        <i className="pemahaman pi pi-info-circle tw-ml-1"
                            data-pr-tooltip="Penguasaan Materi Pemahaman. Bobot 10%"
                            data-pr-position="right"
                            data-pr-at="right+5 top"
                            data-pr-my="left center-2"
                            style={{ fontSize: '1rem' }}></i>
                    </label>
                    <InputNumber
                        inputId="penguasaan_materi_pemahaman"
                        value={nilaita.penguasaan_materi_pemahaman || ''}
                        onValueChange={(e) => setValue(e, "penguasaan_materi_pemahaman")}
                        required
                        mode="decimal"
                        showButtons
                        min={0}
                        max={100}
                        minFractionDigits={2}
                        className={classNames({
                            "p-invalid": submitted && !nilaita.penguasaan_materi_pemahaman,
                        })}
                    />
                    {submitted && !nilaita.penguasaan_materi_pemahaman && (
                        <small className="p-invalid">Pemahaman is required.</small>
                    )}
                </div>

                {/* Kemampuan Terapan */}
                <div className="field col-12 md:col-6">
                    <Tooltip target=".kemampuan_terapan" />
                    <label htmlFor="penguasaan_materi_kemampuan_terapan">Kemampuan Terapan
                        <i className="kemampuan_terapan pi pi-info-circle tw-ml-1"
                            data-pr-tooltip="Penguasaan Materi Kemampuan Terapan. Bobot 20%"
                            data-pr-position="right"
                            data-pr-at="right+5 top"
                            data-pr-my="left center-2"
                            style={{ fontSize: '1rem' }}></i>
                    </label>
                    <InputNumber
                        inputId="penguasaan_materi_kemampuan_terapan"
                        value={nilaita.penguasaan_materi_kemampuan_terapan || ''}
                        onValueChange={(e) => setValue(e, "penguasaan_materi_kemampuan_terapan")}
                        required
                        mode="decimal"
                        showButtons
                        min={0}
                        max={100}
                        minFractionDigits={2}
                        className={classNames({
                            "p-invalid": submitted && !nilaita.penguasaan_materi_kemampuan_terapan,
                        })}
                    />
                    {submitted && !nilaita.penguasaan_materi_kemampuan_terapan && (
                        <small className="p-invalid">Kemampuan Terapan is required.</small>
                    )}
                </div>
            </div>
            <h5>Makalah</h5>
            <hr className="tw-my-4" />
            <div className="p-fluid formgrid grid">
                {/* Bahasa dan Tata tulis */}
                <div className="field col-12 md:col-6">
                    <Tooltip target=".bahasa" />
                    <label htmlFor="bahasa_dan_tata_tulis">Bahasa dan Tata tulis
                        <i className="bahasa pi pi-info-circle tw-ml-1"
                            data-pr-tooltip="Bahasa dan Tata Tulis. Bobot 5%"
                            data-pr-position="right"
                            data-pr-at="right+5 top"
                            data-pr-my="left center-2"
                            style={{ fontSize: '1rem' }}></i>
                    </label>
                    <InputNumber
                        inputId="bahasa_dan_tata_tulis"
                        value={nilaita.bahasa_dan_tata_tulis || ''}
                        onValueChange={(e) => setValue(e, "bahasa_dan_tata_tulis")}
                        required
                        mode="decimal"
                        showButtons
                        min={0}
                        max={100}
                        minFractionDigits={2}
                        className={classNames({
                            "p-invalid": submitted && !nilaita.bahasa_dan_tata_tulis,
                        })}
                    />
                    {submitted && !nilaita.bahasa_dan_tata_tulis && (
                        <small className="p-invalid">Bahasa dan Tata tulis is required.</small>
                    )}
                </div>

                {/* Penerapan Siklus Pengembangan Sistem */}
                <div className="field col-12 md:col-6">
                    <Tooltip target=".penerapan" />
                    <label htmlFor="penerapan_siklus_pengembangan_sistem">Penerapan
                        <i className="penerapan pi pi-info-circle tw-ml-1"
                            data-pr-tooltip="Penerapan Siklus Pengembangan Sistem. Bobot 15%"
                            data-pr-position="right"
                            data-pr-at="right+5 top"
                            data-pr-my="left center-2"
                            style={{ fontSize: '1rem' }}></i>
                    </label>
                    <InputNumber
                        inputId="penerapan_siklus_pengembangan_sistem"
                        value={nilaita.penerapan_siklus_pengembangan_sistem || ''}
                        onValueChange={(e) => setValue(e, "penerapan_siklus_pengembangan_sistem")}
                        required
                        mode="decimal"
                        showButtons
                        min={0}
                        max={100}
                        minFractionDigits={2}
                        className={classNames({
                            "p-invalid": submitted && !nilaita.penerapan_siklus_pengembangan_sistem,
                        })}
                    />
                    {submitted && !nilaita.penerapan_siklus_pengembangan_sistem && (
                        <small className="p-invalid">Penerapan Siklus Pengembangan Sistem is required.</small>
                    )}
                </div>

                {/* Kesesuian Hasil Dengan Kebutuhan Sistem */}
                <div className="field col-12 md:col-6">
                    <Tooltip target=".kesesuaian" />
                    <label htmlFor="kesesuian_hasil_dengan_kebutuhan_sistem">Kesesuian
                        <i className="kesesuaian pi pi-info-circle tw-ml-1"
                            data-pr-tooltip="Kesesuian Hasil Dengan Kebutuhan Sistem. Bobot 15%"
                            data-pr-position="right"
                            data-pr-at="right+5 top"
                            data-pr-my="left center-2"
                            style={{ fontSize: '1rem' }}></i>
                    </label>
                    <InputNumber
                        inputId="kesesuian_hasil_dengan_kebutuhan_sistem"
                        value={nilaita.kesesuian_hasil_dengan_kebutuhan_sistem || ''}
                        onValueChange={(e) => setValue(e, "kesesuian_hasil_dengan_kebutuhan_sistem")}
                        required
                        mode="decimal"
                        showButtons
                        min={0}
                        max={100}
                        minFractionDigits={2}
                        className={classNames({
                            "p-invalid": submitted && !nilaita.kesesuian_hasil_dengan_kebutuhan_sistem,
                        })}
                    />
                    {submitted && !nilaita.kesesuian_hasil_dengan_kebutuhan_sistem && (
                        <small className="p-invalid">Kesesuian is required.</small>
                    )}
                </div>
            </div>
            <h5>Hasil Penelitian</h5>
            <hr className="tw-my-4" />
            <div className="p-fluid formgrid grid">
                {/* Program / Sistem */}
                <div className="field col-12 md:col-6">
                    <Tooltip target=".program" />
                    <label htmlFor="program_sistem">Program / Sistem
                        <i className="program pi pi-info-circle tw-ml-1"
                            data-pr-tooltip="Program / Sistem. Bobot 15%"
                            data-pr-position="right"
                            data-pr-at="right+5 top"
                            data-pr-my="left center-2"
                            style={{ fontSize: '1rem' }}></i>
                    </label>
                    <InputNumber
                        inputId="program_sistem"
                        value={nilaita.program_sistem || ''}
                        onValueChange={(e) => setValue(e, "program_sistem")}
                        required
                        mode="decimal"
                        showButtons
                        min={0}
                        max={100}
                        minFractionDigits={2}
                        className={classNames({
                            "p-invalid": submitted && !nilaita.program_sistem,
                        })}
                    />
                    {submitted && !nilaita.program_sistem && (
                        <small className="p-invalid">Program / Sistem is required.</small>
                    )}
                </div>
            </div>
            {/* Input Komentar */}
            <h5>Komentar</h5>
            <hr className="tw-my-4" />
            <div className="field">
                <label htmlFor="komentar"></label>
                <TextAreaEditor
                    value={editorValue}
                    onChange={handleEditorChange}
                />
                {submitted && !editorValue && (
                    <small className="p-invalid">Komentar wajib diisi.</small>
                )}
            </div>

        </Dialog>
    );
};

export default NilaitaForm;
