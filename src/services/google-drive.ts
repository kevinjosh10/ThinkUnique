import { google } from 'googleapis';
import stream from 'stream';

const FOLDER_ID = '1uzoUXiFZby_xDqEcRiHajw_XxjafcBCd';

export async function uploadFileToDrive(file: File, fileName: string): Promise<string> {
    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive'],
        });

        const drive = google.drive({ version: 'v3', auth });

        // Convert File to a readable stream
        const buffer = Buffer.from(await file.arrayBuffer());
        const bufferStream = new stream.PassThrough();
        bufferStream.end(buffer);

        const response = await drive.files.create({
            requestBody: {
                name: fileName,
                parents: [FOLDER_ID],
            },
            media: {
                mimeType: file.type,
                body: bufferStream,
            },
            fields: 'id, webViewLink',
            supportsAllDrives: true,
        });

        return response.data.webViewLink || '';
    } catch (error) {
        console.error('Error uploading to Google Drive:', error);
        throw new Error('Failed to upload presentation to Google Drive.');
    }
}
