export class AccountApi {  
  static async generateToken(userName: string, password: string) {
    const res = await fetch('https://demoqa.com/Account/v1/GenerateToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName, password })
    });
    return res.json();
  }
}
