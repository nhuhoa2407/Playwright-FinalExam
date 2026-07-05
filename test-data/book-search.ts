export type SearchTestData  = {
  keywords: string[];
  expectedTitles: string[];
};

export const bookSearchData:SearchTestData = {
    keywords: ['Design', 'design'],
  
    expectedTitles: [
        'Learning JavaScript Design Patterns',
        'Designing Evolvable Web APIs with ASP.NET'
    ]
};

export const bookName = {
  title: 'Learning JavaScript Design Patterns',
  isbn: '9781449331818',
}