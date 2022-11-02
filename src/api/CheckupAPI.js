export const getCheckupResult = async () => {
    const result = await fetch('/api/checkup-result');

    return await result.json();
};
