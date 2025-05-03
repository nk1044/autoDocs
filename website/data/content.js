export const Content = [
    {
      title: 'Home',
      path: 'Home/Introduction',
      content: `
  # Home
  
  ## Introduction
  
  This is a paragraph introducing the Home page.
  
  \`\`\`js
  // This is a sample JavaScript code block
  function greet(name) {
    return "Hello, " + name;
  }
  \`\`\`
  
  - First item
  - Second item
  - Third item
  
  | Name     | Age | City       |
  |----------|-----|------------|
  | Alice    | 25  | New York   |
  | Bob      | 30  | San Diego  |
  | Charlie  | 28  | San Jose   |
  
  Another paragraph for testing purposes.
      `
    },
    {
      title: 'About',
      path: 'Home/About',
      content: `
  # Home
  
  ## About
  
  This section is all about the application.
  
  \`\`\`python
  # Python code block example
  def hello():
      print("Hello, world!")
  \`\`\`
  
  - Apple
  - Banana
  - Cherry
  
  | Product   | Price | In Stock |
  |-----------|-------|----------|
  | Laptop    | $999  | Yes      |
  | Keyboard  | $49   | No       |
  | Mouse     | $25   | Yes      |
  
  Yet another paragraph to test rendering.
      `
    }
  ];
  