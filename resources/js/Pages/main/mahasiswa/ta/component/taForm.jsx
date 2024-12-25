import React from 'react';
import { Dialog } from 'primereact/dialog';
import FileUploadC from '@/Components/FileUploadC';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Tooltip } from 'primereact/tooltip';

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

    const onFileProposalSelect = (files) => {
        setta((prevState) => ({
            ...prevState,
            file_proposal: files,
        }));
    };
    console.log("test123", ta);
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
                        data-pr-tooltip="Optional Jika Ada Perubahan Proposal"
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

            {/* File TA */}
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

        </Dialog>
    );
};

export default taForm;
