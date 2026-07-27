export function timeAgo(dateString) {
    const diff = Math.floor(
        (new Date() - new Date(dateString)) /
            1000
    );

    if (diff < 60) {
        return `${diff} segundos atrás`;
    }

    if (diff < 3600) {
        return `${Math.floor(
            diff / 60
        )} minutos atrás`;
    }

    if (diff < 86400) {
        return `${Math.floor(
            diff / 3600
        )} horas atrás`;
    }

    return `${Math.floor(
        diff / 86400
    )} dias atrás`;
}