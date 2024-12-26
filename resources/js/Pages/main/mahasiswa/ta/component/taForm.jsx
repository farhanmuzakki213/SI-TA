import React from 'react';
import { Dialog } from 'primereact/dialog';
import FileUploadC from '@/Components/FileUploadC';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Tooltip } from 'primereact/tooltip';
import { InputNumber } from 'primereact/inputnumber';

const taForm = ({
    taDialog,
    ta,
    submitted,
    taDialogFooter,
    hideDialog,
    setta,
}) => {
    const onInputChange = (e, field) => {
        const value = e.target ? e.target.value : e.value;
        setta((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const onFileTASelect = (files) => {
        setta((prevState) => ({
            ...prevState,
            file_ta: files,
        }));
    };

    const onFileLaporanSelect = (files) => {
        setta((prevState) => ({
            ...prevState,
            file_laporan: files,
        }));
    };

    const onFileRevisiSelect = (files) => {
        setta((prevState) => ({
            ...prevState,
            file_revisi_sidang: files,
        }));
    };

    const onFileProposalSelect = (files) => {
        setta((prevState) => ({
            ...prevState,
            file_proposal: files,
        }));
    };
    // console.log("test123", ta);
    return (
        <Dialog
            visible={taDialog}
            style={{ width: "450px" }}
            header="Ta PKL Details"
            modal
            className="p-fluid"
            footer={taDialogFooter}
            onHide={hideDialog}
        >
            {/* Judul */}
            <div className="field">
                <Tooltip target=".judul" />
                <label htmlFor="judul">Judul
                    <i className="judul pi pi-info-circle tw-ml-1"
                        data-pr-tooltip="Pastikan Judul Tidak Plagiat"
                        data-pr-position="right"
                        data-pr-at="right+5 top"
                        data-pr-my="left center-2"
                        style={{ fontSize: '1rem' }}></i>
                </label>
                <InputText
                    id="judul"
                    value={ta.judul || ''}
                    onChange={(e) => onInputChange(e, "judul")}
                    required
                    autoFocus
                    className={classNames({
                        "p-invalid": submitted && !ta.judul,
                    })}
                />
                {submitted && !ta.judul && (
                    <small className="p-invalid">Judul is required.</small>
                )}
            </div>

            {/* File Proposal */}
            {ta.status_ver_proposal !== '0' && ta.status_judul === '2' && (
                <div className="field">
                    <Tooltip target=".file_proposal" />
                    <label htmlFor="file_proposal">File Proposal
                        <i className="file_proposal pi pi-info-circle tw-ml-1"
                            data-pr-tooltip="Optional Jika Ada Perubahan Proposal"
                            data-pr-position="right"
                            data-pr-at="right+5 top"
                            data-pr-my="left center-2"
                            style={{ fontSize: '1rem' }}></i>
                    </label>
                    <FileUploadC
                        multiple={false}
                        name="file_proposal"
                        onFileSelect={onFileProposalSelect}
                    />
                    {submitted && !ta?.file_proposal && (
                        <small className="p-invalid">File Proposal is required.</small>
                    )}
                </div>
            )}

            {/* File TA */}
            {ta.status_ver_ta !== '0' && ta.status_ver_proposal === '2' && ta.acc_pembimbing_satu === '1' && ta.acc_pembimbing_dua === '1' && (
                <>
                    <div className="field">
                        <label htmlFor="file_ta">File TA *</label>
                        <FileUploadC
                            multiple={false}
                            name="file_ta"
                            onFileSelect={onFileTASelect}
                        />
                        {submitted && !ta?.file_ta && (
                            <small className="p-invalid">File TA is required.</small>
                        )}
                    </div>

                    {/* File Laporan */}
                    <div className="field">
                        <label htmlFor="file_laporan">File Laporan *</label>
                        <FileUploadC
                            multiple={false}
                            name="file_laporan"
                            onFileSelect={onFileLaporanSelect}
                        />
                        {submitted && !ta?.file_laporan && (
                            <small className="p-invalid">File Laporan is required.</small>
                        )}
                    </div>
                </>
            )}

            {ta.status_sidang_ta === '3' && ta.acc_pembimbing_satu === '1' && ta.acc_pembimbing_dua === '1' && (
                <>
                    {/* File Revisi Sidang */}
                    <div className="field">
                        <label htmlFor="file_revisi_sidang">File Revisi Sidang *</label>
                        <FileUploadC
                            multiple={false}
                            name="file_revisi_sidang"
                            onFileSelect={onFileRevisiSelect}
                        />
                        {submitted && !ta?.file_revisi_sidang && (
                            <small className="p-invalid">File Revisi Sidang is required.</small>
                        )}
                    </div>
                    {/* IPK */}
                    <div className="field">
                        <label htmlFor="ipk">IPK *</label>
                        <InputNumber
                            inputId="ipk"
                            value={ta.ipk || ''}
                            onValueChange={(e) => onInputChange(e, "ipk")}
                            required
                            mode="decimal"
                            showButtons
                            min={0}
                            max={100}
                            minFractionDigits={2}
                            className={classNames({
                                "p-invalid": submitted && !ta.ipk,
                            })}
                        />
                        {submitted && !ta.ipk && (
                            <small className="p-invalid">IPK is required.</small>
                        )}
                    </div>
                </>
            )}


        </Dialog>
    );
};

export default taForm;
