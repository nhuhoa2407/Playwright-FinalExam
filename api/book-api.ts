export class AddBookApi {
    static async addBook(userId: string, isbn: string, token: string) {
        const res = await fetch('https://demoqa.com/BookStore/v1/Books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            userId: userId,
            collectionOfIsbns: [{ isbn }]
        })
        });
        return res.json();
    }
    static async deleteAllBooks(userId: string, token: string) {
        const response = await fetch(`https://demoqa.com/BookStore/v1/Books?UserId=${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response;
    }
}