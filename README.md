# Sample Blog API Integration

This repository contains a simple example of integrating your website with an API to create, retrieve, and delete blog posts. The API endpoints are provided by a service, and this example demonstrates how to use them to perform these basic operations. 

## Prerequisites

Before you proceed, ensure that the following steps have been completed in the API service:

1. **Create a Project and Module:**

    - Create a new project for the blog application within the API service.
    - Set up an appropriate module for the blog-related API endpoints.

2. **Database Setup:**

    - Configure the database for the blog module with the following fields:
        - `id` (integer, primary key) - Unique identifier for each blog post (automatically generated).
        - `title` (string) - The title of the blog post.
        - `content` (string) - The content of the blog post.
        - `timestamp` (integer) - The UNIX timestamp when the post was created.

3. **API Endpoints:**

    Define the following API endpoints within the service:

    - **Create a New Post (POST):**
        - Path: `/posts`
        - Action: Create
        - Fields: The request should include the following fields: title, content.

    - **List All Posts (GET):**
        - Path: `/posts`
        - Action: List
        - Fields: The response should include all fields (id, title, content, timestamp) for each blog post.

    - **Delete a Post (DELETE):**
        - Path: `/posts`
        - Action: Delete
        - Fields: No request body fields are required. 

4. **Set Up a Pipe Function for Create Endpoint:**

    To ensure the `timestamp` field is correctly filled in, you'll need to create a pipe function for the create post API endpoint. This function will modify the request data. Below is an example code snippet for a pipe function that sets the `timestamp` field to the current time:

    ```python
    import time

    data["timestamp"] = time.time()
    ```

## Usage

To use this sample blog code, follow these steps:

1. **Clone this Repository:**

    ```bash
    git clone git@github.com:aaaaasv/dynamic-api-demo.git
    ```

2. **Edit Domain Configuration:**

    Open the `script.js` file and set your domain in the `DOMAIN` constant. Replace the empty string with the actual URL where the API is hosted.

    ```javascript
    const DOMAIN = "https://your-api-url.com";  // Replace with your API URL
    ```

3. **Open the HTML Page:**

    Open the `index.html` file in your web browser to see the sample blog interface. You can create and delete posts using the provided form and buttons.

4. **Done:**

    You now have a simple blog that interacts with an API for creating and managing posts. Feel free to explore and adapt the code for your specific needs.
