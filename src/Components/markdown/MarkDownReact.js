/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import './styles.css';
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import remarkEmoji from 'remark-emoji';
import rehypeRaw from 'rehype-raw';

const MarkDownReact = () => {
  const [markDown, setMarkDown] = useState(() => {
    // Retrieve the saved state from localStorage on initial load
    return localStorage.getItem('markdown-content') || 'Welcome to Markdown Editor';
  });

  // Save markdown to localStorage whenever it changes
  useEffect(() => {
    // Only set localStorage when markDown changes
    localStorage.setItem('markdown-content', markDown);
  }, [markDown]); // This runs only when markDown changes

  // Scroll to top and remove the hash from URL on component mount (page reload)
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top

    // Remove the hash from the URL
    setTimeout(() => {
      if (window.location.hash) {
        window.history.replaceState(null, null, window.location.pathname); // Remove hash
      }
    }, 100); // Delay for smooth scrolling
  }, []); // This effect runs once when the component mounts

  // Function to clear the markdown content
  const clearMarkdown = () => {
    localStorage.removeItem('markdown-content'); // Remove the stored content
    setMarkDown('Welcome to Markdown Editor'); // Reset the editor state
  };

  return (
    <>
      {/* Title */}
      <div className='Title'>
        <h1 className='Sitename'>MarkIt!</h1>
        <h4 className='Sitesubname'>Your simple markdown workspace</h4>
      </div>

      {/* About Section */}
      <div className='About'>
        <h2>Welcome to Our Markdown Editor!</h2>
        <p>
          This simple and intuitive Markdown editor helps you quickly write formatted text and see how it will appear in HTML in real-time.
          It's perfect for beginners who want to learn Markdown, bloggers, and developers who need a lightweight writing tool.
        </p>
      </div>

      {/* How to Use Section */}
      <div className='HowToUse'>
        <h2>How to Use:</h2>
        <ul>
          <li>   Start typing in the markdown editor below.</li>
          <li> The preview section on the right shows how your content will look in HTML.</li>
          <li>   Use the <a href="#markdown-cheatsheet">Markdown Cheatsheet</a> below for quick reference!</li>you
        </ul>
      </div>

      {/* Markdown Editor and Preview */}
      <div className='center-div'>
        <textarea
          className='left-side'
          value={markDown}
          onChange={(e) => setMarkDown(e.target.value)} // Update state on change
        ></textarea>
        <div className='right-side'>
          
          <ReactMarkdown children={markDown}
            remarkPlugins={[remarkGfm, remarkEmoji]} rehypePlugins={[rehypeRaw]}>{markDown}</ReactMarkdown>
        </div>
      </div>
      {/* Clear Button */}
      <div className='clear-button'>
        <button onClick={clearMarkdown}>Clear Markdown Content</button>
      </div>

      {/* Markdown Cheatsheet */}
      <div className='cheatsheet' id='markdown-cheatsheet'>
        <h2>Markdown Cheatsheet for Beginners</h2>
        <ul>
          <li> <h3> Headings</h3></li>
          <p>Create headings by adding # before your text.</p>
          <ul>
            <li> h1 - # Heading 1 </li>
            <li> h2 - ## Heading 2</li>
            <li> h3 - ### Heading 3</li>
            <li> h4 - ### Heading 4</li>
            <li> h5 - ### Heading 5</li>
            <li> h6 - ### Heading 6</li>
          </ul><br></br>
          <li>   <h3> Text styling</h3></li>
          <ul>
            <li>Bold -         **text** or __text__</li>
            <li>Italics - *text* or _text_ </li>
            <li>Bold and Italicized - ***text*** or ___text___</li>
            <li>Linethrough text - ~~text~~</li>
          </ul><br></br>
          <li><h3>Add horizontal line</h3>  <ul> <li>  " *** "  or  " ___ " or  " --- "</li></ul></li>
          <br></br><li><h3>Lists</h3>
            <ul>
              <li>Ordered lists -  <br></br>1. One <br></br>
                2. Two <br></br>
                3. Three</li><br></br>
              <li>Unordered lists - <br></br>
                - One <br></br>
                - Two <br></br>
                - Three <br></br></li></ul></li>
          <br></br>
          <li><h3>Code</h3>
            <ul><li>` Write code here `</li></ul></li>
          <br></br>
          <li><h3>Link</h3>
            <ul><li>[title](https://www.example.com)</li></ul></li>
          <br></br>
          <li><h3>Image</h3></li>
          <ul><li>![alt text](image.jpg)</li></ul>
          <br></br>
          <li><h3>Tables</h3>
            <ul>
              <li>Syntax for tables - <br></br><br></br>
                | Header 1 | Header 2 | Header 3 |<br></br>
                |----------|----------|----------|<br></br>
                | Row 1    | Data 1   | Data 2   |<br></br>
                | Row 2    | Data 3   | Data 4   |<br></br>
                | Row 3    | Data 5   | Data 6   |<br></br>
              </li></ul></li><br></br>
          <li><h3>Fenced code block</h3>
            <ul>
              <li>	```
                Write your code here
                ```</li>
            </ul>
          </li>
          <br></br>
          <li><h3>Footnote</h3>
            <ul>
              <li>	Here's a sentence with a footnote. [^1]<br></br><br></br>

                [^1]: This is the footnote.</li></ul></li><br></br>
          <li><h3>Task List</h3>
            <ul>
              <li>Cross the task completed - <br></br>
                  - [x] Task 1<br></br>
                  - [ ] Task 2<br></br>
                  - [ ] Task 3</li></ul></li><br></br>

          <li><h3>Emojis</h3>
          <ul><li>Write your text here :emoji name here:</li>
          <li><b>Note:</b>You can use this <a href='https://gist.github.com/rxaviers/7360908'>list of emoji</a> shortcodes. But keep in mind that some of the emoji shortcodes may vary.</li></ul></li> <br></br>
          <li><h3>Subscript and Superscript</h3>
          <ul><li>For subscript use html tag sub. </li>
          <li>For superscript use html tag sup.</li></ul></li>
        </ul>
        {/* Add more cheatsheet content as needed */}
      </div>
    </>
  );
}

export default MarkDownReact;
