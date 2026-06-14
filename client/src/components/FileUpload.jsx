import React, { useCallback, useState } from 'react';
import { UploadCloud, FileVideo, Image as ImageIcon, X } from 'lucide-react';

const FileUpload = ({ onFileSelect }) => {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateAndSetFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            validateAndSetFile(e.target.files[0]);
        }
    };

    const validateAndSetFile = (file) => {
        // Simple client-side validation
        if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
            setFile(file);
            onFileSelect(file);
        } else {
            alert("Please upload a valid image or video file.");
        }
    };

    const clearFile = () => {
        setFile(null);
        onFileSelect(null);
    };

    return (
        <div className="w-full">
            {!file ? (
                <div
                    className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer
                        ${dragActive ? 'border-brand-accent bg-brand-accent/5' : 'border-gray-700 hover:border-brand-accent/50 hover:bg-gray-800/50'}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        onChange={handleChange}
                        accept="image/*,video/*"
                    />
                    <label htmlFor="file-upload" className="flex flex-col items-center justify-center cursor-pointer w-full h-full">
                        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4 text-brand-accent">
                            <UploadCloud size={32} />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">Click to upload or drag & drop</h3>
                        <p className="text-gray-400 text-sm">Supported formats: MP4, MOV, JPG, PNG</p>
                    </label>
                </div>
            ) : (
                <div className="glass-panel p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-brand-accent">
                            {file.type.startsWith('video/') ? <FileVideo size={24} /> : <ImageIcon size={24} />}
                        </div>
                        <div>
                            <h4 className="font-medium text-white truncate max-w-[200px]">{file.name}</h4>
                            <p className="text-sm text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                    </div>
                    <button onClick={clearFile} className="p-2 hover:bg-red-500/10 text-gray-400 hover:text-red-500 rounded-lg transition-colors">
                        <X size={20} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
