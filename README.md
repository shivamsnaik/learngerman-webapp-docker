# German learning webapp using Next.js framework

This project is built using Next.js framework and containerized using Docker. 

## How to use?

- Docker Compose **(recommended)**
  - If the docker is running behind an Nginx reverse-proxy with the lets-encrypt support ([click here to find how?](https://github.com/shivamsnaik/nextcloud-reverseproxy-docker)), you can alternatively run the following script to run the container assigned to a domain, e.g., portfolio.example.com

    ```
    docker-compose up --detach
    ```

  - **Note:** For this service to be proxied via Nginx and to support auto-ssl configuration, the following environment variables need to be modified in ```docker-compose.yaml``` and ```docker-compose-dev.yaml```: 
    ```
    VIRTUAL_HOST - portfolio.example.com
    LETSENCRYPT_HOST: portfolio.example.com
    LETSENCRYPT_EMAIL: user@example.com
    ```
## Running Locally

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

**Note:** If the development server is running on a remote machine, enable ssh port-forwarding while connecting to the remote machine from the local machine. Execute the below command on your local machine:
  
    ```
    ssh -L 8080:localhost:3000 username@server
    ```
    Now, visit localhost:8080 on your local machine to see the result. 
