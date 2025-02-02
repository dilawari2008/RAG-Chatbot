import { OpenAIEmbeddings } from "@langchain/openai";
import { Chroma } from "@langchain/community/vectorstores/chroma";
import { KnowledgeBaseItem, knowledgeBase } from "./knowledgeBase";
import { Document } from "@langchain/core/documents";

async function initializeVectorStore(): Promise<Chroma> {
  console.log("initializeVectorStore here 1");
  const embeddings = new OpenAIEmbeddings();
  console.log("initializeVectorStore here 2");

  const vectorStore = new Chroma(embeddings, {
    collectionName: "customer-support",
    url: "http://localhost:8000",
  });
  console.log("initializeVectorStore here 3");

  // Convert knowledge base items to Documents
  const documents: Document[] = knowledgeBase.map(
    (item: KnowledgeBaseItem) => ({
      pageContent: item.content,
      metadata: { id: item.id.toString() },
    })
  );
  console.log("initializeVectorStore here 4",documents);

  // Add knowledge base to vector store
  await vectorStore.addDocuments(documents);
  console.log("initializeVectorStore here 5");

  return vectorStore;
}

export { initializeVectorStore };
``