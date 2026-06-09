export interface Project {
  id: string
  title: string
  tagline: string
  description: string
  category: 'AI/ML' | 'Full-Stack' | 'Data'
  tags: string[]
  featured: boolean
  status?: 'shipped' | 'in-progress'
  image?: string
  links: { github?: string; demo?: string; huggingface?: string }
}

export const projects: Project[] = [
  {
    id: 'iteris',
    title: 'iteris Medical Image Segmentation',
    tagline: 'Web-based medical image segmentation using Deep Reinforcement Learning',
    description: 'Final Year Project at Taylor’s University. A DRL-powered segmentation system for MRI/CT scans with an LLM diagnostic assistance layer. Built with a reward-based region growing agent achieving state-of-the-art performance on benchmark medical imaging datasets.',
    category: 'AI/ML',
    tags: ['Python', 'PyTorch', 'DRL', 'FastAPI', 'React', 'Medical Imaging', 'LLM'],
    featured: true,
    status: 'in-progress',
    links: { github: 'https://github.com/Anfaal26/iteris' },
  },
  {
    id: 'rag-assistant',
    title: 'RAG KnowledgeBase Assistant',
    tagline: 'Intelligent document Q&A using Retrieval-Augmented Generation',
    description: 'Upload any PDF set and query it in natural language. Full LLM pipeline: document chunking, vector embedding via Pinecone, semantic similarity retrieval, and GPT-4 generation with source citations and confidence scores.',
    category: 'AI/ML',
    tags: ['Python', 'LangChain', 'OpenAI', 'Pinecone', 'FastAPI', 'Next.js'],
    featured: true,
    status: 'shipped',
    links: { github: 'https://github.com/Anfaal26/TechAssist-KB' },
  },
  {
    id: 'muskaan-website',
    title: 'Muskaan Foundation Website',
    tagline: 'Full-stack e-commerce platform for a live boutique shop',
    description: 'Designed and deployed a full e-commerce platform for a boutique shop handling product listings, cart functionality, and order management. Sole developer across design, development, and deployment in a live environment with real customers.',
    category: 'Full-Stack',
    tags: ['Next.js', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'Cloudinary', 'Vercel'],
    featured: true,
    status: 'shipped',
    links: { github: 'https://github.com/Anfaal26/muskaan-website' },
  },
  {
    id: 'jobtech-pulse',
    title: 'Malaysia JobTech Pulse',
    tagline: 'Live job market analytics from Malaysian open datasets',
    description: 'Interactive dashboard tracking tech hiring trends, in-demand skills, and salary bands sourced from data.gov.my and public job listings. Visualises real-time market shifts for Malaysian CS graduates.',
    category: 'Data',
    tags: ['Python', 'Pandas', 'Streamlit', 'Plotly', 'data.gov.my'],
    featured: false,
    status: 'in-progress',
    links: {},
  },
  {
    id: 'bm-sentiment',
    title: 'BM Sentiment Classifier',
    tagline: 'Fine-tuned transformer for Bahasa Malaysia sentiment analysis',
    description: 'Fine-tuned multilingual BERT on Malaysian social media data from Twitter and Reddit. Deployed as a public HuggingFace Gradio Space with live inference API. Supports mixed BM/EN code-switched text.',
    category: 'AI/ML',
    tags: ['Python', 'HuggingFace Transformers', 'BERT', 'Gradio', 'NLP'],
    featured: false,
    status: 'in-progress',
    links: {},
  },
]

export default projects
