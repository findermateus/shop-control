export function getStoreName() {
    return process.env.NEXT_PUBLIC_STORE_NAME || "Esquina Geek";
}

export function getStoreDescription() {
    return (
        process.env.NEXT_PUBLIC_STORE_DESCRIPTION ||
        "E-commerce Esquina Geek"
    );
}