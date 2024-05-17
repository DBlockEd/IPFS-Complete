document.getElementById('uploadForm').addEventListener('submit', async function (event) {

    PINATA_JWT = /* Your Pinata JWT */
    
    IPFS_GATEWAY = /* Your Pinata IPFS Gateway Domain Ex - (https://mydomain.mypinata.cloud/ipfs/)*/ 

    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const file = formData.get('file');

    formData.append('file', file);
    formData.append('pinataMetadata', JSON.stringify({ name: 'File to upload' }));

    try {
        const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${PINATA_JWT}`,
            },
            body: formData,
        });

        const result = await res.json();
        const { IpfsHash } = result;
        const url = `${IPFS_GATEWAY}${IpfsHash}`;

        console.log('The Ipfs Hash is', IpfsHash);
        console.log('The URL is: ', url);


        alert(`File uploaded successfully! IPFS Hash: ${IpfsHash}`);
    } catch (e) {
        console.error('Error uploading file:', e);
        alert('Failed to upload file');
    }
});
