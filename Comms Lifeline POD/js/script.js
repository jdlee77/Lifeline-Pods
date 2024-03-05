

function cycleImage(currentImage, setId) {
    if (document.body.dataset.ishost === "false") {
        return;
    }
    const set = document.getElementById(setId);
    const images = set.getElementsByTagName('img');
    let nextImg = 0;
    let found = false;
    for (let i = 0; i < images.length; i++) {
        if (images[i] === currentImage) {
            nextImg = i + 1;
        }
    }
    //Cycle through the images.
    (nextImg === images.length) ? nextImg = 0 : nextImg;
    setImage(setId, nextImg);

    //Send the message to the other users.
    syncConnector.dispatchSyncMessage(setId, nextImg);
    /*     switch (setId) {
            case 'set1':
                syncConnector.dispatchSyncMessage('set1', nextImg);
                break;
            case 'set2':
                syncConnector.dispatchSyncMessage('set2', nextImg);
                break;
            case 'set3':
                syncConnector.dispatchSyncMessage('set3', nextImg);
                break;
            case 'set4':
                syncConnector.dispatchSyncMessage('set4', nextImg);
                break;
            case 'set5':
                syncConnector.dispatchSyncMessage('set5', nextImg);
                break;
            case 'set6':
                syncConnector.dispatchSyncMessage('set6', nextImg);
                break;
        } */

}
function setImage(setId, index) {
    const set = document.getElementById(setId);
    const images = set.getElementsByTagName('img');
    for (let i = 0; i < images.length; i++) {
        if (i === index) {
            images[i].style.display = 'block';
        } else {
            images[i].style.display = 'none';
        }
    }
}
