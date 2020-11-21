

const createPdf = (title, version=null, content) => {
    const isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1; 

    if(isAndroid) {
        alert('sorry. this feature is not supported on android');
        return;
    }

    const name = JSON.parse(localStorage.getItem('nota_user')).name.replace(' ', '_');
    const pdfTitle = version ? title = name + '_' + title + '_' + version : title = name + '_' + title;
    const newWindow = window.open('', 'PRINT', 'height=650, width=900, top=100, left=150');
    newWindow.document.write(`<html><head><title>${pdfTitle}</title></head>`);
    newWindow.document.write(`<body>${content}</body>`);
    newWindow.document.write('</html>');
    newWindow.document.close();
    newWindow.focus();

    newWindow.print();
    newWindow.close();
    return true;
}

export { createPdf };