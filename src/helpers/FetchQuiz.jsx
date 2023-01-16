async function FetchQuiz({ queryKey }) {
    const { amount, category, difficulty } = queryKey[1];

    const url = new URL('https://opentdb.com/api.php');
    url.searchParams.set('amount', amount);
    url.searchParams.set('category', category);
    url.searchParams.set('difficulty', difficulty);
    url.searchParams.set('type', 'multiple');
    

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Search not found for ${amount} ${category} ${difficulty}`);
    }
    return response.json();

}

export default FetchQuiz;