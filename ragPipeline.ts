import { ChatOpenAI } from "@langchain/openai";
import { Chroma } from "@langchain/community/vectorstores/chroma";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

async function createRAGPipeline(vectorStore: Chroma) {
  console.log('createRAGPipeline here1');
  const model = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature: 0.3,
  });
  console.log('createRAGPipeline here2');

  const prompt = ChatPromptTemplate.fromTemplate(
    `Answer the following question based on the provided Context: {context} Question: {question} Answer:`
  );
  console.log('createRAGPipeline here3');

  const combineDocsChain = await createStuffDocumentsChain({
    llm: model,
    prompt,
    outputParser: new StringOutputParser(),
  });
  console.log('createRAGPipeline here4');

  const retrievalChain = await createRetrievalChain({
    combineDocsChain,
    retriever: vectorStore.asRetriever(),
  });
  console.log('createRAGPipeline here5');

  return async (query: string): Promise<string> => {
    const response = await retrievalChain.invoke({
      question: query,
      input: query, // Corrected to use the query as input
    });
    return response.answer;
  };
  console.log('createRAGPipeline here6');
}

export { createRAGPipeline };
