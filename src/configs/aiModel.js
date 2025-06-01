const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  const fs = require("node:fs");
  const mime = require("mime-types");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMNI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 2,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 65536,
    responseModalities: [],
    responseMimeType: "application/json",
  };
  const generationConfigNotes = {
    temperature: 2,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseModalities: [
    ],
    responseMimeType: "text/plain",
  };
  
  
  
  export const courseOutline = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Generate a study material for Python and level of difficulty will be Easy with Course Title, summary of course, List of chapters (Max 3) along with summary and emoji icon for each chapter, Topic list in each chapter, All results in JSON Format."},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "{\"CourseTitle\": \"Python for Beginners\", \"Summary\": \"This course provides a gentle introduction to Python programming.  We will cover the fundamental concepts and syntax, enabling you to write simple programs and scripts.\", \"Chapters\": [{\"ChapterTitle\": \"Getting Started with Python\", \"Summary\": \"Learn how to install Python, write your first program, and understand basic programming concepts.\", \"Emoji\": \"🚀\", \"Topics\": [\"Installing Python\", \"Running your first Python program\", \"Understanding variables\", \"Data types (integers, floats, strings, booleans)\", \"Basic operators (+, -, *, /, %)\", \"Working with the print() function\", \"Comments in Python\"]}, {\"ChapterTitle\": \"Control Flow and Loops\", \"Summary\": \"Master conditional statements and loops to create more dynamic and interactive programs.\", \"Emoji\": \"🐍\", \"Topics\": [\"if, elif, else statements\", \"Comparison operators (==, !=, <, >, <=, >=)\", \"Logical operators (and, or, not)\", \"for loops\", \"while loops\", \"break and continue statements\"]}, {\"ChapterTitle\": \"Working with Data Structures\", \"Summary\": \"Learn to handle data effectively using lists, tuples and dictionaries.\", \"Emoji\": \"🗄️\", \"Topics\": [\"Lists: creation, access, modification\", \"List methods (append, insert, remove, pop)\", \"Tuples: creation and access\", \"Dictionaries: creation, access, modification\", \"Dictionary methods (keys, values, items)\"]}]}"},
        ],
      },
    ],
  });
  
  export const generateNotesAiModel = model.startChat({
    generationConfigNotes,
    history: [
      {
        role: "user",
        parts: [
          {text: "Generate detail content for each chapter title + add everything related to that chaptertitle's topics like if it requires code then add some code , Make sure to include all topic points in the content, Make sure to give content in HTML format + make each heading tag bold(Do not add HTML, head, body, title, tags) . The chapters: {\"Chapters\": [{\"ChapterTitle\": \"Getting Started with Python\", \"Summary\": \"Learn how to install Python, write your first program, and understand basic programming concepts.\", \"Emoji\": \"🚀\", \"Topics\": [\"Installing Python\", \"Running your first Python program\", \"Understanding variables\", \"Data types (integers, floats, strings, booleans)\", \"Basic operators (+, -, *, /, %)\", \"Working with the print() function\", \"Comments in Python\"]}, {\"ChapterTitle\": \"Control Flow and Loops\", \"Summary\": \"Master conditional statements and loops to create more dynamic and interactive programs.\", \"Emoji\": \"🐍\", \"Topics\": [\"if, elif, else statements\", \"Comparison operators (==, !=, <, >, <=, >=)\", \"Logical operators (and, or, not)\", \"for loops\", \"while loops\", \"break and continue statements\"]}, {\"ChapterTitle\": \"Working with Data Structures\", \"Summary\": \"Learn to handle data effectively using lists, tuples and dictionaries.\", \"Emoji\": \"🗄️\", \"Topics\": [\"Lists: creation, access, modification\", \"List methods (append, insert, remove, pop)\", \"Tuples: creation and access\", \"Dictionaries: creation, access, modification\", \"Dictionary methods (keys, values, items)\"]}]}"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```html\n<h1>🚀 Getting Started with Python</h1>\n\n<h2>Summary:</h2>\n<p>Learn how to install Python, write your first program, and understand basic programming concepts.</p>\n\n<h2>Topics:</h2>\n\n<h3>Installing Python</h3>\n<p>To begin using Python, you'll first need to install it on your system. The installation process varies slightly depending on your operating system:</p>\n<ul>\n    <li><b>Windows:</b>\n        <ol>\n            <li>Download the latest version of Python from the official Python website: <a href=\"https://www.python.org/downloads/windows/\">https://www.python.org/downloads/windows/</a></li>\n            <li>Run the installer. <b>Important:</b> Make sure to check the \"Add Python to PATH\" option during installation. This will allow you to run Python from the command line.</li>\n            <li>After installation, open the command prompt (cmd) and type <code>python --version</code> to verify that Python is installed correctly.</li>\n        </ol>\n    </li>\n    <li><b>macOS:</b>\n        <ol>\n            <li>Download the latest version of Python from the official Python website: <a href=\"https://www.python.org/downloads/macos/\">https://www.python.org/downloads/macos/</a></li>\n            <li>Run the installer.</li>\n            <li>Open the terminal and type <code>python3 --version</code> to verify that Python is installed correctly. On macOS, you often need to use <code>python3</code> instead of <code>python</code>.</li>\n        </ol>\n    </li>\n    <li><b>Linux:</b>\n        <p>Python is usually pre-installed on most Linux distributions. If not, you can install it using your distribution's package manager (e.g., <code>apt</code> for Debian/Ubuntu, <code>yum</code> for Fedora/CentOS).</p>\n        <ul>\n            <li>For Debian/Ubuntu: <code>sudo apt update</code> followed by <code>sudo apt install python3</code></li>\n            <li>For Fedora/CentOS: <code>sudo yum install python3</code></li>\n        </ul>\n        <p>Verify the installation by typing <code>python3 --version</code> in the terminal.</p>\n    </li>\n</ul>\n\n<h3>Running Your First Python Program</h3>\n<p>Let's write a simple \"Hello, World!\" program:</p>\n\n<ol>\n    <li>Open a text editor (e.g., Notepad, VS Code, Sublime Text).</li>\n    <li>Type the following code:\n        <pre><code>print(\"Hello, World!\")</code></pre>\n    </li>\n    <li>Save the file with a <code>.py</code> extension (e.g., <code>hello.py</code>).</li>\n    <li>Open a command prompt or terminal, navigate to the directory where you saved the file, and run the program using the command <code>python hello.py</code> (or <code>python3 hello.py</code> on macOS and Linux).</li>\n    <li>You should see \"Hello, World!\" printed on the console.</li>\n</ol>\n\n<h3>Understanding Variables</h3>\n<p>A variable is a named storage location that holds a value.  You can assign values to variables using the <code>=</code> operator.  Here's an example:</p>\n<pre><code>\nname = \"Alice\"\nage = 30\npi = 3.14159\n\nprint(name)  # Output: Alice\nprint(age)   # Output: 30\nprint(pi)    # Output: 3.14159\n</code></pre>\n<p>Variable names should be descriptive and follow these rules:</p>\n<ul>\n    <li>Start with a letter or underscore (<code>_</code>).</li>\n    <li>Contain only letters, numbers, and underscores.</li>\n    <li>Be case-sensitive (<code>myVariable</code> and <code>myvariable</code> are different).</li>\n</ul>\n\n<h3>Data Types (Integers, Floats, Strings, Booleans)</h3>\n<p>Python has several built-in data types:</p>\n<ul>\n    <li><b>Integers (<code>int</code>):</b> Whole numbers (e.g., <code>-5</code>, <code>0</code>, <code>10</code>).</li>\n    <li><b>Floats (<code>float</code>):</b> Decimal numbers (e.g., <code>3.14</code>, <code>-2.5</code>, <code>0.0</code>).</li>\n    <li><b>Strings (<code>str</code>):</b> Sequences of characters enclosed in single or double quotes (e.g., <code>\"Hello\"</code>, <code>'Python'</code>).</li>\n    <li><b>Booleans (<code>bool</code>):</b> Represent truth values, either <code>True</code> or <code>False</code>.</li>\n</ul>\n\n<p>You can determine the data type of a variable using the <code>type()</code> function:</p>\n\n<pre><code>\nage = 30\nprice = 99.99\nmessage = \"Hello, Python!\"\nis_valid = True\n\nprint(type(age))      # Output: &ltclass 'int'&gt\nprint(type(price))    # Output: &ltclass 'float'&gt\nprint(type(message))  # Output: &ltclass 'str'&gt\nprint(type(is_valid)) # Output: &ltclass 'bool'&gt\n</code></pre>\n\n<h3>Basic Operators (+, -, *, /, %)</h3>\n<p>Python supports standard arithmetic operators:</p>\n\n<ul>\n    <li><b>Addition (<code>+</code>):</b> Adds two values.</li>\n    <li><b>Subtraction (<code>-</code>):</b> Subtracts the second value from the first.</li>\n    <li><b>Multiplication (<code>*</code>):</b> Multiplies two values.</li>\n    <li><b>Division (<code>/</code>):</b> Divides the first value by the second. The result is always a float.</li>\n    <li><b>Modulo (<code>%</code>):</b> Returns the remainder of the division of the first value by the second.</li>\n</ul>\n\n<pre><code>\nx = 10\ny = 3\n\nprint(x + y)   # Output: 13\nprint(x - y)   # Output: 7\nprint(x * y)   # Output: 30\nprint(x / y)   # Output: 3.3333333333333335\nprint(x % y)   # Output: 1\n</code></pre>\n\n<h3>Working with the <code>print()</code> Function</h3>\n\n<p>The <code>print()</code> function is used to display output to the console.  You can print strings, variables, and expressions.  You can also format the output.</p>\n\n<pre><code>\nname = \"Bob\"\nage = 25\n\nprint(\"Hello, \" + name + \"! You are \" + str(age) + \" years old.\") # String concatenation\n\n# Using f-strings (formatted string literals)\nprint(f\"Hello, {name}! You are {age} years old.\")\n\n# Using the .format() method\nprint(\"Hello, {}! You are {} years old.\".format(name, age))\n</code></pre>\n<p>All three print statements above produce the same output: \"Hello, Bob! You are 25 years old.\"</p>\n<p>Other important arguments to the <code>print()</code> function are:</p>\n<ul>\n<li><code>sep</code>: specifies how the printed values are separated, default is a space</li>\n<li><code>end</code>: specifies what is printed at the end of the output, default is a newline</li>\n</ul>\n\n<pre><code>\nprint(\"apples\", \"bananas\", \"cherries\", sep=\", \", end=\"!\\n\") #prints: apples, bananas, cherries!\n</code></pre>\n\n<h3>Comments in Python</h3>\n<p>Comments are used to explain your code and make it more readable.  Python supports two types of comments:</p>\n\n<ul>\n    <li><b>Single-line comments:</b> Start with a <code>#</code> symbol and continue to the end of the line.</li>\n    <li><b>Multi-line comments (docstrings):</b> Enclosed in triple quotes (<code>\"\"\"</code> or <code>'''</code>).  These are often used to document functions and classes.</li>\n</ul>\n\n<pre><code>\n# This is a single-line comment.\n\n\"\"\"\nThis is a multi-line comment (docstring).\nIt can span multiple lines and is often used to\ndescribe the purpose of a function or a class.\n\"\"\"\n\ndef greet(name):\n    \"\"\"Greets the person passed in as a parameter.\"\"\"\n    print(f\"Hello, {name}!\")\n\ngreet(\"Charlie\")  # This is another single-line comment.\n</code></pre>\n\n<h1>🐍 Control Flow and Loops</h1>\n\n<h2>Summary:</h2>\n<p>Master conditional statements and loops to create more dynamic and interactive programs.</p>\n\n<h2>Topics:</h2>\n\n<h3><code>if</code>, <code>elif</code>, <code>else</code> statements</h3>\n<p>Conditional statements allow you to execute different blocks of code based on certain conditions. The basic structure is:</p>\n\n<pre><code>\nif condition:\n    # Code to execute if the condition is true\nelif another_condition:\n    # Code to execute if the first condition is false and this condition is true\nelse:\n    # Code to execute if all conditions are false\n</code></pre>\n\n<p>Example:</p>\n\n<pre><code>\nage = 20\n\nif age >= 18:\n    print(\"You are an adult.\")\nelif age >= 13:\n    print(\"You are a teenager.\")\nelse:\n    print(\"You are a child.\")\n</code></pre>\n\n<h3>Comparison Operators (<code>==</code>, <code>!=</code>, <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>>=</code>)</h3>\n\n<p>Comparison operators are used to compare values.  They return a boolean result (<code>True</code> or <code>False</code>).</p>\n\n<ul>\n    <li><code>==</code>: Equal to</li>\n    <li><code>!=</code>: Not equal to</li>\n    <li><code>&lt;</code>: Less than</li>\n    <li><code>&gt;</code>: Greater than</li>\n    <li><code>&lt;=</code>: Less than or equal to</li>\n    <li><code>>=</code>: Greater than or equal to</li>\n</ul>\n\n<pre><code>\nx = 10\ny = 5\n\nprint(x == y)  # Output: False\nprint(x != y)  # Output: True\nprint(x &lt; y)   # Output: False\nprint(x &gt; y)   # Output: True\nprint(x &lt;= y)  # Output: False\nprint(x >= y)  # Output: True\n</code></pre>\n\n<h3>Logical Operators (<code>and</code>, <code>or</code>, <code>not</code>)</h3>\n\n<p>Logical operators are used to combine or negate boolean expressions.</p>\n\n<ul>\n    <li><code>and</code>: Returns <code>True</code> if both operands are <code>True</code>.</li>\n    <li><code>or</code>: Returns <code>True</code> if at least one operand is <code>True</code>.</li>\n    <li><code>not</code>: Returns the opposite boolean value of the operand.</li>\n</ul>\n\n<pre><code>\nage = 25\nis_student = True\n\nif age >= 18 and is_student:\n    print(\"You are an adult student.\")\n\nif age &lt; 18 or is_student:\n    print(\"You are either under 18 or a student.\")\n\nis_employed = False\nif not is_employed:\n    print(\"You are not employed.\")\n</code></pre>\n\n<h3><code>for</code> loops</h3>\n\n<p>A <code>for</code> loop is used to iterate over a sequence (e.g., a list, tuple, string, or range) and execute a block of code for each item in the sequence.</p>\n\n<pre><code>\n# Iterating over a list\nfruits = [\"apple\", \"banana\", \"cherry\"]\nfor fruit in fruits:\n    print(fruit)\n\n# Iterating over a range\nfor i in range(5):  # Generates numbers from 0 to 4\n    print(i)\n\n#Iterating over string\nword = \"Python\"\nfor char in word:\n    print(char)\n\n# using else after the for loop is complete:\nfor number in range(5):\n  print(number)\nelse:\n  print(\"Loop finished successfully!\")  #This will execute after loop\n</code></pre>\n\n<h3><code>while</code> loops</h3>\n<p>A <code>while</code> loop is used to repeatedly execute a block of code as long as a condition is <code>True</code>.</p>\n\n<pre><code>\ncount = 0\nwhile count &lt; 5:\n    print(count)\n    count += 1 # or count = count + 1\n\n#using else after while loop condition gets false\nnumber = 1\nwhile number &lt;= 5:\n    print(number)\n    number += 1\nelse:\n    print(\"Loop complete!\")\n</code></pre>\n\n<h3><code>break</code> and <code>continue</code> statements</h3>\n\n<p><code>break</code> and <code>continue</code> are used to control the flow of loops.</p>\n\n<ul>\n    <li><code>break</code>: Exits the loop immediately.</li>\n    <li><code>continue</code>: Skips the current iteration and continues to the next iteration.</li>\n</ul>\n\n<pre><code>\n# Using break\nfor i in range(10):\n    if i == 5:\n        break  # Exit the loop when i is 5\n    print(i)\n\n# Using continue\nfor i in range(10):\n    if i % 2 == 0:\n        continue  # Skip even numbers\n    print(i)\n</code></pre>\n\n<h1>🗄️ Working with Data Structures</h1>\n\n<h2>Summary:</h2>\n<p>Learn to handle data effectively using lists, tuples, and dictionaries.</p>\n\n<h2>Topics:</h2>\n\n<h3>Lists: Creation, Access, Modification</h3>\n<p>A list is an ordered, mutable (changeable) collection of items. Lists are created using square brackets <code>[]</code>.</p>\n\n<h4>Creation</h4>\n\n<pre><code>\nmy_list = [1, 2, 3, \"apple\", \"banana\"]\nempty_list = [] # Empty list\n</code></pre>\n\n<h4>Access</h4>\n\n<pre><code>\nmy_list = [10, 20, 30, 40, 50]\n\nprint(my_list[0])   # Output: 10 (first element)\nprint(my_list[2])   # Output: 30 (third element)\nprint(my_list[-1])  # Output: 50 (last element)\n\n# Slicing\nprint(my_list[1:4])  # Output: [20, 30, 40] (elements from index 1 to 3)\nprint(my_list[:3])   # Output: [10, 20, 30] (elements from the beginning to index 2)\nprint(my_list[3:])   # Output: [40, 50] (elements from index 3 to the end)\n\nprint(my_list[::-1])  #Output : [50, 40, 30, 20, 10](Reverses a List)\n\n# Access elements via loop\nlist1 = [1, 2, 3, 4, 5]\nfor item in list1:\n    print(item)\n\nfor i in range(len(list1)):\n    print(list1[i])\n</code></pre>\n\n<h4>Modification</h4>\n\n<pre><code>\nmy_list = [1, 2, 3]\n\nmy_list[0] = 10  # Change the first element\nprint(my_list)    # Output: [10, 2, 3]\n\nmy_list.append(4) # Add an element to the end\nprint(my_list)    # Output: [10, 2, 3, 4]\n\nmy_list.insert(1, 5) # Insert an element at a specific index\nprint(my_list)    # Output: [10, 5, 2, 3, 4]\n</code></pre>\n\n<h3>List Methods (<code>append</code>, <code>insert</code>, <code>remove</code>, <code>pop</code>)</h3>\n\n<ul>\n    <li><code>append(item)</code>: Adds <code>item</code> to the end of the list.</li>\n    <li><code>insert(index, item)</code>: Inserts <code>item</code> at the given <code>index</code>.</li>\n    <li><code>remove(item)</code>: Removes the first occurrence of <code>item</code> from the list.</li>\n    <li><code>pop(index)</code>: Removes and returns the item at the given <code>index</code>. If no index is provided, it removes and returns the last item.</li>\n</ul>\n\n<pre><code>\nmy_list = [1, 2, 3, 2, 4]\n\nmy_list.append(5)        # Add 5 to the end: [1, 2, 3, 2, 4, 5]\nmy_list.insert(1, 10)     # Insert 10 at index 1: [1, 10, 2, 3, 2, 4, 5]\nmy_list.remove(2)       # Remove the first occurrence of 2: [1, 10, 3, 2, 4, 5]\npopped_item = my_list.pop(1)   # Remove and return item at index 1: [1, 3, 2, 4, 5] (popped_item is 10)\npopped_item_end = my_list.pop() # remove the last item. [1,3,2,4](popped_item_end is 5)\nprint(my_list)    #Output [1, 3, 2, 4]\nprint(popped_item)    # Output: 10\nprint(popped_item_end)    #Output 5\n</code></pre>\n\n<h3>Tuples: Creation and Access</h3>\n<p>A tuple is an ordered, <em>immutable</em> (unchangeable) collection of items. Tuples are created using parentheses <code>()</code>. While tuples are immutable, they can contain mutable objects like lists.</p>\n\n<h4>Creation</h4>\n<pre><code>\nmy_tuple = (1, 2, 3, \"hello\")\nempty_tuple = ()\nsingle_element_tuple = (42,)  # Note the trailing comma for single-element tuples!\n</code></pre>\n\n<h4>Access</h4>\n<p>Accessing tuple elements is the same as with lists, using indexing and slicing:</p>\n\n<pre><code>\nmy_tuple = (10, 20, 30, 40, 50)\n\nprint(my_tuple[0])  # Output: 10 (first element)\nprint(my_tuple[-1]) # Output: 50 (last element)\n\nprint(my_tuple[1:4])  # Output: (20, 30, 40) (slicing)\n</code></pre>\n<p>Tuple is not mutable i.e you cannot perform <code>my_tuple[0] = 100 </code> this will raise error\nYou also can't use <code>append</code>,<code>insert</code> on a tuple\nHowever you can add or concat two tuples</p>\n<pre><code>\ntuple1 = (1, 2, 3)\ntuple2 = (4, 5, 6)\n\nconcatenated_tuple = tuple1 + tuple2\nprint(concatenated_tuple)  # Output: (1, 2, 3, 4, 5, 6)\n</code></pre>\n\n<h3>Dictionaries: Creation, Access, Modification</h3>\n\n<p>A dictionary is an unordered collection of key-value pairs. Keys must be unique and immutable (e.g., strings, numbers, tuples). Dictionaries are created using curly braces <code>{}</code>.</p>\n\n<h4>Creation</h4>\n\n<pre><code>\nmy_dict = {\"name\": \"Alice\", \"age\": 30, \"city\": \"New York\"}\nempty_dict = {}\n</code></pre>\n\n<h4>Access</h4>\n\n<pre><code>\nmy_dict = {\"name\": \"Alice\", \"age\": 30}\n\nprint(my_dict[\"name\"])  # Output: Alice\nprint(my_dict[\"age\"])   # Output: 30\n\n# Avoid KeyError by using the .get() method\nprint(my_dict.get(\"city\", \"Unknown\"))  # Output: Unknown (returns a default value if key doesn't exist)\nprint(my_dict.get(\"name\", \"Unknown\")) #Alice\n</code></pre>\n\n<h4>Modification</h4>\n\n<pre><code>\nmy_dict = {\"name\": \"Alice\", \"age\": 30}\n\nmy_dict[\"age\"] = 31      # Modify an existing value\nmy_dict[\"occupation\"] = \"Engineer\"  # Add a new key-value pair\n\nprint(my_dict)   # Output: {'name': 'Alice', 'age': 31, 'occupation': 'Engineer'}\n\ndel my_dict[\"name\"]  #delete element. You cannot access a deleted element\n#my_dict[\"name\"] will give error after this delete operation\nprint(my_dict) #{'age': 31, 'occupation': 'Engineer'}\n\nmy_dict.clear()  #clears dictionary content\nprint(my_dict) #{} empty dictonary\n</code></pre>\n\n<h3>Dictionary Methods (<code>keys</code>, <code>values</code>, <code>items</code>)</h3>\n\n<ul>\n    <li><code>keys()</code>: Returns a view object containing all the keys in the dictionary.</li>\n    <li><code>values()</code>: Returns a view object containing all the values in the dictionary.</li>\n    <li><code>items()</code>: Returns a view object containing all the key-value pairs (as tuples) in the dictionary.</li>\n</ul>\n\n<pre><code>\nmy_dict = {\"name\": \"Bob\", \"age\": 25, \"city\": \"London\"}\n\nprint(my_dict.keys())   # Output: dict_keys(['name', 'age', 'city'])\nprint(my_dict.values()) # Output: dict_values(['Bob', 25, 'London'])\nprint(my_dict.items())  # Output: dict_items([('name', 'Bob'), ('age', 25), ('city', 'London')])\n\n#Iterating through dictionary\nfor key, value in my_dict.items():\n  print(f\"Key: {key}, Value: {value}\")\n\nfor key in my_dict.keys():\n    print(key)\n\nfor value in my_dict.values():\n    print(value)\n</code></pre>\n```"},
        ],
      },
    ],
  });

  export const generateStudyTypeContentAiModel = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Generate flashcard on topic: Flutter Fundamentals, User Interface(UI) Development, Basic App Navigation in JSON Format with front bakc content, Maximum 15"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "[\n  {\n    \"front\": \"What is Flutter?\",\n    \"back\": \"Flutter is a UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase.\"\n  },\n  {\n    \"front\": \"What is a Widget in Flutter?\",\n    \"back\": \"In Flutter, everything is a widget. Widgets are the basic building blocks of the UI. They describe what the view should look like given their current configuration and state.\"\n  },\n  {\n    \"front\": \"What are the two main types of widgets?\",\n    \"back\": \"StatelessWidget and StatefulWidget.\"\n  },\n  {\n    \"front\": \"Explain StatefulWidget.\",\n    \"back\": \"StatefulWidget is a widget that has mutable state. It can be redrawn multiple times during its lifetime.\"\n  },\n  {\n    \"front\": \"Explain StatelessWidget.\",\n    \"back\": \"StatelessWidget is a widget that does not have any mutable state. Once created, it remains immutable.\"\n  },\n  {\n    \"front\": \"What is the purpose of the `build` method in a widget?\",\n    \"back\": \"The `build` method is responsible for describing the part of the user interface represented by this widget.\"\n  },\n  {\n    \"front\": \"What is the significance of the `MaterialApp` widget?\",\n    \"back\": \"`MaterialApp` is the base widget for Flutter apps that use Material Design. It sets up necessary services, themes, and routing for the app.\"\n  },\n  {\n    \"front\": \"How can you change the theme of your Flutter app?\",\n    \"back\": \"By using the `ThemeData` class, which defines the colors, fonts, and styles of the app's visual elements and is given as property for MaterialApp widget.\"\n  },\n  {\n    \"front\": \"Name some common layout widgets in Flutter.\",\n    \"back\": \"`Container`, `Row`, `Column`, `Stack`, `Center`, `Padding`\"\n  },\n  {\n    \"front\": \"What is the difference between `Row` and `Column`?\",\n    \"back\": \"`Row` arranges widgets horizontally, while `Column` arranges widgets vertically.\"\n  },\n  {\n    \"front\": \"How do you add padding around a widget?\",\n    \"back\": \"Using the `Padding` widget and specifying the desired padding values.\"\n  },\n  {\n    \"front\": \"What is the purpose of the `Navigator` class?\",\n    \"back\": \"The `Navigator` manages the app's screen stack, allowing you to push new screens and pop back to previous screens, achieving navigation between different parts of the app.\"\n  },\n  {\n    \"front\": \"How do you navigate to a new screen in Flutter?\",\n    \"back\": \"Using `Navigator.push()` and providing a `Route` that defines the new screen.\"\n  },\n  {\n    \"front\": \"How can you pass data to a new screen during navigation?\",\n    \"back\": \"By including the data as arguments when pushing the route (e.g., in the `Navigator.push` method or in the new route Widget constructor).\"\n  },\n  {\n    \"front\": \"How do you go back to the previous screen?\",\n    \"back\": \"Using `Navigator.pop()`.\"\n  }\n]"},
        ],
      },
    ],
  });


  export const generateQuizAiModel = model.startChat({
    generationConfig,
    history: [
      {
        role: 'user',
        parts: [
          {
            text: `Generate quiz on topic: Flutter Fundamentals, User Interface (UI) Development, Basic App Navigation with Question and options along with correct answer in JSON Format.`,
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: `\`\`\`json
  {
    "quizTitle": "Flutter Fundamentals & Basic App Navigation Quiz",
    "questions": [
      {
        "questionText": "What is Flutter primarily used for?",
        "options": [
          "Backend Development",
          "Database Management",
          "Cross-Platform Mobile App Development",
          "Web Server Configuration"
        ],
        "correctAnswer": "Cross-Platform Mobile App Development",
        "explanation": "Flutter is a UI toolkit developed by Google for building natively compiled applications for mobile, web, and desktop from a single codebase."
      },
      {
        "questionText": "Which widget is fundamental in Flutter for structuring layouts, particularly with rows and columns?",
        "options": [
          "Scaffold",
          "Container",
          "Row",
          "SafeArea"
        ],
        "correctAnswer": "Container",
        "explanation": "The Container widget provides padding, margin, borders, background color, and size to other widgets, acting as a flexible layout building block. While Row and Column are for horizontal/vertical layout arrangements."
      },
      {
        "questionText": "What does the 'hot reload' feature in Flutter allow you to do?",
        "options": [
          "Instantly apply code changes to a running app without restarting.",
          "Completely rebuild and reinstall the app.",
          "Compile the app for a specific platform.",
          "Debug network requests."
        ],
        "correctAnswer": "Instantly apply code changes to a running app without restarting.",
        "explanation": "Hot reload lets you quickly experiment and iterate on your UI during development.  Changes are visible nearly instantly without losing the app's current state."
      },
      {
        "questionText": "Which widget in Flutter represents the basic visual structure of a mobile screen, often providing a title and other navigation features?",
        "options": [
          "Text",
          "Center",
          "Scaffold",
          "AppBar"
        ],
        "correctAnswer": "Scaffold",
        "explanation": "The Scaffold widget is a layout that provides a base for your UI structure, often including an AppBar (top navigation bar) and potentially a body containing other widgets."
      },
      {
        "questionText": "What is the purpose of the 'pubspec.yaml' file in a Flutter project?",
        "options": [
          "Defines the main application logic.",
          "Manages the project's assets (images, fonts, etc.).",
          "Declares project dependencies (packages) and metadata.",
          "Configures the app's deployment settings."
        ],
        "correctAnswer": "Declares project dependencies (packages) and metadata.",
        "explanation": "The \`pubspec.yaml\` file is crucial for managing project metadata (name, description, version), SDK constraints, dependencies (external packages), and assets. It's central to Flutter project configuration."
      },
      {
        "questionText": "What type of widget rebuilds automatically whenever the internal data changes?",
        "options": [
          "StatelessWidget",
          "StatefulWidget",
          "GestureDetector",
          "Container"
        ],
        "correctAnswer": "StatefulWidget",
        "explanation": "StatefulWidget widgets manage a mutable state that can trigger rebuilds of their UI.  StatelessWidgets are immutable after initial creation."
      },
      {
        "questionText": "What does the \`Navigator\` class provide functionality for?",
        "options": [
          "Creating animations.",
          "Managing application-wide theme data.",
          "Handling app navigation (pushing, popping routes).",
          "Storing data locally."
        ],
        "correctAnswer": "Handling app navigation (pushing, popping routes).",
        "explanation": "The \`Navigator\` class is Flutter's primary way of managing app screens (routes). You push new routes onto the stack to display new screens, and pop routes off the stack to return to previous screens."
      },
      {
        "questionText": "Which of these widgets allows for handling touch gestures like taps, double taps, and long presses?",
        "options": [
          "Text",
          "Container",
          "GestureDetector",
          "Icon"
        ],
        "correctAnswer": "GestureDetector",
        "explanation": "The GestureDetector widget detects various touch gestures and calls callbacks, allowing you to implement touch interactions in your UI."
      },
      {
        "questionText": "Which of the following is the core build function required in all Flutter widgets (StatelessWidget or StatefulWidget)?",
        "options": [
          "render()",
          "create()",
          "build()",
          "paint()"
        ],
        "correctAnswer": "build()",
        "explanation": "The \`build()\` function is a required method for both StatelessWidget and StatefulWidget widgets. It describes how the widget should be constructed from its configuration and state. Flutter uses this description to build the UI."
      },
      {
        "questionText": "What is the purpose of the 'async' and 'await' keywords in Dart (used with Flutter)?",
        "options": [
          "For creating animations.",
          "For handling asynchronous operations like network requests.",
          "For defining class inheritance.",
          "For defining constant values."
        ],
        "correctAnswer": "For handling asynchronous operations like network requests.",
        "explanation": "\`async\` and \`await\` simplify working with asynchronous operations in Dart.  \`async\` marks a function as asynchronous, and \`await\` pauses execution until an asynchronous operation completes."
      }
    ]
  }
  \`\`\`
  `,
          },
        ],
      },
    ],
  });

export const generateQAAiModel = model.startChat({
    generationConfig,
    history: [
      {
        role: 'user',
        parts: [
          {
            text: `Generate 10 common questions and detailed answers about Flutter Fundamentals, User Interface (UI) Development, and Basic App Navigation in JSON Format. Each answer should be comprehensive and include examples where relevant.`,
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: `{
              "questions": [
                {
                  "question": "What is Flutter and why should I use it?",
                  "answer": "Flutter is a UI toolkit developed by Google for building natively compiled applications for mobile, web, and desktop from a single codebase. You should use Flutter because it offers fast development with hot reload, beautiful and customizable widgets, excellent performance, and the ability to build for multiple platforms with a single codebase. For example, you can write code once and deploy it to both iOS and Android, saving significant development time and resources."
                },
                {
                  "question": "What is the difference between StatelessWidget and StatefulWidget?",
                  "answer": "A StatelessWidget is immutable, meaning its properties can't change after creation. It's used for UI elements that don't need to maintain any state. A StatefulWidget, on the other hand, can maintain state that might change during the widget's lifetime. For example, a simple text display would use StatelessWidget, while a counter that needs to update its value would use StatefulWidget."
                },
                {
                  "question": "How does Flutter handle state management?",
                  "answer": "Flutter offers several approaches to state management: setState for simple state management, Provider for dependency injection and state management, Bloc for complex state management with separation of business logic, and Redux for predictable state management. The choice depends on your app's complexity. For example, a simple app might use setState, while a complex app might benefit from Bloc or Redux."
                },
                {
                  "question": "What are Flutter widgets and how do they work?",
                  "answer": "Widgets are the basic building blocks of Flutter UI. Everything in Flutter is a widget, from structural elements like Container and Row to visual elements like Text and Image. Widgets are organized in a tree structure, where each widget can have child widgets. For example, a Container widget might contain a Column widget, which in turn contains multiple Text widgets."
                },
                {
                  "question": "How do you handle navigation in Flutter?",
                  "answer": "Flutter provides the Navigator class for handling navigation between screens. You can use Navigator.push() to navigate to a new screen and Navigator.pop() to go back. For named routes, you can use Navigator.pushNamed(). For example: Navigator.push(context, MaterialPageRoute(builder: (context) => SecondScreen()));"
                },
                {
                  "question": "What is the purpose of the build method in Flutter?",
                  "answer": "The build method is a required method in both StatelessWidget and StatefulWidget. It describes how to display the widget in terms of other, lower-level widgets. The build method is called whenever the widget needs to be rebuilt, such as when its state changes or when its parent widget rebuilds."
                },
                {
                  "question": "How do you handle user input in Flutter?",
                  "answer": "Flutter provides various widgets for handling user input, such as TextField for text input, ElevatedButton for buttons, and GestureDetector for touch events. You can also use Form widgets for form validation. For example, a TextField widget can be used to collect user input and update state accordingly."
                },
                {
                  "question": "What is the difference between main() and runApp() in Flutter?",
                  "answer": "main() is the entry point of a Flutter application, while runApp() is a function that inflates the given widget and attaches it to the screen. The main() function typically calls runApp() with the root widget of the application. For example: void main() { runApp(MyApp()); }"
                },
                {
                  "question": "How do you handle asynchronous operations in Flutter?",
                  "answer": "Flutter uses async/await syntax for handling asynchronous operations. You can use Future for single asynchronous operations and Stream for continuous data. For example, to fetch data from an API, you would use async/await with http package: Future<void> fetchData() async { final response = await http.get(url); }"
                },
                {
                  "question": "What is the purpose of the pubspec.yaml file?",
                  "answer": "The pubspec.yaml file is the configuration file for a Flutter project. It defines the project's dependencies, assets, and metadata. It's used to manage external packages, specify Flutter SDK version, and declare assets like images and fonts. For example, to add a package, you would add it under the dependencies section: dependencies: http: ^0.13.0"
                }
              ]
            }`
          },
        ],
      },
    ],
  });

  