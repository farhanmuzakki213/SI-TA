import React, { useRef } from "react";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import Layout from "@/Layouts/layout/layout.jsx";

const FileDemo = () => {
    const toast = useRef(null);

    const onUpload = () => {
        toast.current.show({
            severity: "info",
            summary: "Success",
            detail: "File Uploaded",
            life: 3000,
        });
    };

    return (
        <Layout>
            <div className="grid">
                <Toast ref={toast}></Toast>
                <div className="col-12">
                    <div className="card">
                        <h5>Advanced</h5>
                        <FileUpload
                            name="demo[]"
                            url="/api/upload"
                            onUpload={onUpload}
                            multiple
                            accept="image/*"
                            maxFileSize={1000000}
                        />

                        <h5>Basic</h5>
                        <FileUpload
                            mode="basic"
                            name="demo[]"
                            url="/api/upload"
                            accept="image/*"
                            maxFileSize={1000000}
                            onUpload={onUpload}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default FileDemo;
