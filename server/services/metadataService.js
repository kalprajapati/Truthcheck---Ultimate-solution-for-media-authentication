const fs = require('fs');
const ExifParser = require('exif-parser');

/**
 * Extracts metadata from a media file and calculates a risk score.
 * High risk score implies traces of manipulation software or missing crucial data.
 * @param {string} filePath - Path to the uploaded file
 * @param {string} mimetype - MIME type of the file
 * @returns {object} { metadataRisk: number, metadata: object }
 */
const extractMetadata = (filePath, mimetype) => {
    let metadata = {
        container: mimetype || 'Unknown',
        software: 'None detected',
        gps: 'Absent',
        creationDate: 'Unknown',
        dimensions: 'Unknown'
    };
    
    let metadataRisk = 0;

    try {
        // Exif-parser works best with JPEG/TIFF
        if (mimetype && (mimetype === 'image/jpeg' || mimetype === 'image/tiff')) {
            const buffer = fs.readFileSync(filePath);
            const parser = ExifParser.create(buffer);
            
            // Enable parsing options if needed, but defaults are fine
            const result = parser.parse();
            
            const tags = result.tags || {};
            const imageSize = result.imageSize || {};

            if (imageSize.width && imageSize.height) {
                metadata.dimensions = `${imageSize.width}x${imageSize.height}`;
            }

            if (tags.Software) {
                metadata.software = tags.Software;
                
                // Risk detection: Popular editing software signatures
                const softwareLower = tags.Software.toLowerCase();
                if (softwareLower.includes('photoshop') || 
                    softwareLower.includes('lightroom') || 
                    softwareLower.includes('gimp') || 
                    softwareLower.includes('canva') ||
                    softwareLower.includes('illustrator')) {
                    metadataRisk += 60; // High risk if edited by manipulation tools
                } else if (softwareLower.includes('apple') || softwareLower.includes('google')) {
                    metadataRisk += 10; // Slight risk, could just be a mobile phone OS saving
                }
            }

            if (tags.DateTimeOriginal) {
                // DateTimeOriginal is a UNIX timestamp
                metadata.creationDate = new Date(tags.DateTimeOriginal * 1000).toLocaleString();
            } else if (tags.CreateDate) {
                metadata.creationDate = new Date(tags.CreateDate * 1000).toLocaleString();
            }

            if (tags.GPSLatitude && tags.GPSLongitude) {
                metadata.gps = `Lat: ${tags.GPSLatitude.toFixed(4)}, Lon: ${tags.GPSLongitude.toFixed(4)}`;
            } else {
                // Not necessarily manipulated if missing, but common in stripped images
                metadataRisk += 5; 
            }

            // Exif-specific manipulation signs
            if (tags.ModifyDate && tags.DateTimeOriginal && tags.ModifyDate !== tags.DateTimeOriginal) {
                metadataRisk += 20; // Modified after creation
            }
        } else {
            // For non-JPEG files or video, we currently fallback
            // In a real app we'd use ffmpeg to probe video metadata
            metadata.notes = "Full metadata extraction currently supported for JPEG only.";
            metadataRisk = 10; // Moderate unknown risk
        }
    } catch (error) {
        console.error('Error extracting metadata:', error.message);
        metadataRisk = 30; // Stripped or corrupted metadata is suspicious
        metadata.notes = "Failed to parse metadata. File may be corrupted or stripped.";
    }

    // Cap risk at 100
    metadataRisk = Math.min(100, Math.max(0, metadataRisk));

    return { metadataRisk, metadata };
};

module.exports = { extractMetadata };
