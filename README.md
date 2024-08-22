This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and [`fastapi`](https://fastapi.tiangolo.com/).

## Getting Started

- 1st, install dependencies:

  ```bash
      cp .env.example .env # Update accordingly
      npm run copy_env
      npm install
  ```

  ```bash
      cd fastapi
      pip install -r requirements.txt
  ```

- 2nd, run the development server:

  ```bash
      npm run dev
  ```

  ```bash
      fastapi dev main.py
  ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [@ai-sdk/openai](https://www.npmjs.com/package/@ai-sdk/openai)
- [@zilliz/milvus2-sdk-node](https://milvus.io/docs/install-node.md)
- [sdk.vercel.ai](https://sdk.vercel.ai/docs/introduction)
- [axios](https://axios-http.com/docs/intro)
- [cache-manager](https://www.npmjs.com/package/cache-manager)
- [drizzle-orm](https://orm.drizzle.team/)
- [langchain.js](https://js.langchain.com/v0.2/docs/introduction/)
- [ollama-js](https://github.com/ollama/ollama-js)
- [React Documentation](https://react.dev/)
- [react-hook-form](https://react-hook-form.com/)
- [@hookform/error-message](https://react-hook-form.com/docs/useformstate/errormessage)
- [zod](https://zod.dev/)
- [tailwindcss](https://tailwindcss.com/)
- [typescript](https://www.typescriptlang.org/)
- [fastapi](https://fastapi.tiangolo.com/)
- [python.langchain](https://python.langchain.com/v0.2/docs/introduction/)
- [pydantic](https://docs.pydantic.dev/latest/)
- [pymilvus](https://milvus.io/docs/install-pymilvus.md)

### TODO:

- [x] basic ui
- [x] drizzle setup
- [x] crud with react-query
- [x] fastapi
  - [x] scrape url content with webbaseloader
  - [x] segment the document
  - [x] vectorize the segmentated document
  - [x] save vectors in milvus
- [x] chat page
- [x] prompt and response

## Docker

- [Ollama](https://ollama.com/)

  - Embedding

    ```
        sudo docker run -d -v ollama:/root/.ollama -p 11435:11434 --name ollama ollama/ollama
        sudo docker exec -it ollama ollama pull nomic-embed-text
        sudo docker rename ollama ollama-nomic-embed-text
    ```

  - llama3:8b

    ```
        sudo docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama
        sudo docker exec -it ollama ollama pull llama3.1:8b
        sudo docker rename ollama ollama-llama3.1.8b
    ```

- [milvus-install_standalone-docker](https://milvus.io/docs/install_standalone-docker.md)

issue - [Error: ENOENT: no such file or directory, open '/var/task/.next/proto/proto/schema.proto'](https://github.com/milvus-io/milvus-sdk-node/issues/326)
<br/>
Resolution - https://github.com/zilliztech/zilliz-cloud-typescript-example/blob/master/semantic-search-example/next.config.js
