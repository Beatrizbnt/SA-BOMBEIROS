function showAlert(message, redirectUrl) {
    alert(message);
    if (redirectUrl) {
        window.location.href = redirectUrl;
    }
}

module.exports = {
    showAlert
};