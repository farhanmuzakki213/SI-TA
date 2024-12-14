import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import style Quill

const TextAreaEditor = ({ value, onChange }) => {
    return (
        <ReactQuill
            theme="snow"
            value={value} // Nilai awal editor
            onChange={onChange} // Handler perubahan nilai
            modules={{
                toolbar: [
                    ['bold', 'italic', 'underline'], // Text styling
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }], // Lists
                    ['link', 'image'], // Media
                    [{ 'align': [] }], // Alignment
                    ['clean'], // Remove formatting
                ],
            }}
            formats={[
                'bold', 'italic', 'underline',
                'list', 'bullet', 'link', 'image', 'align',
            ]}
            placeholder="Ketik sesuatu di sini..."
        />
    );
};

export default TextAreaEditor;
