import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

const bimbinganForm = ({
    bimbinganDetailDialog,
    bimbingan,
    hideDialog,
}) => {
    // console.log(bimbingan);
    return (
        <Dialog
            visible={bimbinganDetailDialog}
            style={{ width: "900px" }}
            header={`${bimbingan?.nama_dosen || "Bimbingan TA Details"}`}
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <div className="card">
                <p class="tw-text-lg tw-font-semibold tw-text-gray-800">Pembahasan</p>
                <span className="tw-text-gray-800">
                    <div dangerouslySetInnerHTML={{ __html: bimbingan?.pembahasan }} />
                </span>
                <hr className="tw-my-4" />
                <p class="tw-text-lg tw-font-semibold tw-text-gray-800">Komentar / Saran</p>
                <span className="tw-text-gray-800">
                    <div dangerouslySetInnerHTML={{ __html: bimbingan?.komentar }} />
                </span>
                <hr className="tw-my-4" />
            </div>
            <div className="tw-mt-6">
                <div className="card">
                    <p className="tw-text-lg tw-font-semibold tw-text-gray-800">Files</p>
                    <div className="tw-mt-4 tw-space-y-4">
                        <div className="tw-flex tw-justify-between tw-items-center tw-py-2">
                            <div className="tw-flex tw-items-center">
                                <span className="tw-text-gray-800">Bimbingan</span>
                            </div>
                            <div className="tw-flex tw-justify-items-end">
                                <Button
                                    icon="pi pi-file"
                                    severity="primary"
                                    outlined
                                    label="File"
                                    tooltip="Lihat File"
                                    tooltipOptions={{ position: 'left', mouseTrack: false, mouseTrackLeft: 15 }}
                                    onClick={() => window.open(`/storage/uploads/ta/bimbingan/${bimbingan?.file_bimbingan}`, '_blank')}
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </Dialog>
    );
};

export default bimbinganForm;
