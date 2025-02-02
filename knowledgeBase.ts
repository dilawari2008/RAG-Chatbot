interface KnowledgeBaseItem {
  id: number;
  content: string;
}

const knowledgeBase: KnowledgeBaseItem[] = [
  {
    id: 1,
    content:
      "Our store offers a wide range of electronics including smartphones, laptops, tablets, and accessories.",
  },
  {
    id: 2,
    content:
      "We offer free shipping on all orders over $50. Standard shipping takes 3-5 business days.",
  },
  {
    id: 3,
    content:
      "Our return policy allows returns within 30 days of purchase for a full refund, provided the item is in its original condition.",
  },
  {
    id: 4,
    content: "The latest iPhone model is priced at $999 for the base version.",
  },
  {
    id: 5,
    content:
      "We have a price match guarantee. If you find a lower price on an identical item from a qualified retailer, we'll match it.",
  },
];

export { knowledgeBase, KnowledgeBaseItem };
