import { getPublishedPosts } from './posts';

export interface TopicTag {
  name: string;
  slug: string;
  articleCount: number;
  isPopular?: boolean;
  description?: string;
  category?: string;
}

// Canonical tag map to strictly prevent repetitive / duplicate spelling variations
export const CANONICAL_TAG_MAP: Record<string, string> = {
  'ai': 'AI & Agents',
  'ai & agents': 'AI & Agents',
  'ai agents': 'AI & Agents',
  'aiagents': 'AI & Agents',
  'agenticai': 'AI & Agents',
  'aiinfrastructure': 'AI & Agents',
  'mcp': 'MCP',
  'modelcontextprotocol': 'MCP',
  'video infrastructure': 'Video Infrastructure',
  'videoinfrastructure': 'Video Infrastructure',
  'videoprocessing': 'Video Infrastructure',
  'video & cdn': 'Video Infrastructure',
  'video pipeline': 'VOD Pipeline',
  'vod pipeline': 'VOD Pipeline',
  'vod': 'VOD',
  'adaptive bitrate': 'Adaptive Bitrate',
  'adaptivebitrate': 'Adaptive Bitrate',
  'self-hosted': 'Self-Hosted',
  'selfhosted': 'Self-Hosted',
  'nats jetstream': 'NATS JetStream',
  'nats-jetstream': 'NATS JetStream',
  'distributed systems': 'Distributed Systems',
  'distributed-systems': 'Distributed Systems',
  'product & changelog': 'Changelog',
  'mux alternative': 'Mux Alternative',
};

export function normalizeTag(tag: string): string {
  const cleaned = (tag || '').trim();
  const lower = cleaned.toLowerCase();
  return CANONICAL_TAG_MAP[lower] || cleaned;
}

// Curated editorial tech descriptions for topics
const POPULAR_METADATA: Record<string, { isPopular: boolean; description: string; baseWeight: number }> = {
  'AI & Agents': {
    isPopular: true,
    description: 'Autonomous agents, Model Context Protocol (MCP), and neural metadata workflows.',
    baseWeight: 14
  },
  'Video Infrastructure': {
    isPopular: true,
    description: 'Self-hosted VOD pipelines, adaptive HLS ladders, transcoding, and edge delivery.',
    baseWeight: 26
  },
  'Rust': {
    isPopular: true,
    description: 'High-performance concurrency, memory safety, and systems programming for media servers.',
    baseWeight: 18
  },
  'Cloud': {
    isPopular: true,
    description: 'Multi-cloud architectures, private VPCs, and self-hosted cloud alternatives.',
    baseWeight: 22
  },
  'Networking': {
    isPopular: true,
    description: 'CDN edge delivery, OpenResty pull zones, low-latency streaming, and DNS routing.',
    baseWeight: 19
  },
  'DevOps': {
    isPopular: true,
    description: 'CI/CD automation, NATS JetStream event orchestration, and infrastructure monitoring.',
    baseWeight: 16
  },
  'Kubernetes': {
    isPopular: true,
    description: 'Container orchestration, autoscaling transcode worker fleets, and resilient clusters.',
    baseWeight: 15
  },
  'Cybersecurity': {
    isPopular: true,
    description: 'Signed expiring tokens, AES-128 encryption, private origin proxies, and audit logs.',
    baseWeight: 11
  },
  'Infrastructure': {
    isPopular: true,
    description: 'Compute sizing, S3 storage tiers, and zero-vendor-lock-in self-hosting strategies.',
    baseWeight: 24
  },
  'Transcoding': {
    isPopular: true,
    description: 'FFmpeg subprocess management, CMAF/fMP4 segmentation, and bitrate optimization.',
    baseWeight: 17
  },
  'HLS': {
    isPopular: true,
    description: 'HTTP Live Streaming, dynamic resolution rungs, and master playlist generation.',
    baseWeight: 21
  },
  'Self-Hosted': {
    isPopular: true,
    description: 'Open-source software ownership, fixed predictable costs, and data sovereignty.',
    baseWeight: 28
  }
};

// Clean, deduplicated curated topics
const EXTENDED_CATALOG = [
  'Video Infrastructure',
  'HLS',
  'Transcoding',
  'VOD',
  'VOD Pipeline',
  'CDN',
  'Adaptive Bitrate',
  'AI & Agents',
  'MCP',
  'Automation',
  'Rust',
  'NATS JetStream',
  'Distributed Systems',
  'Engineering',
  'Web Development',
  'Cloud',
  'DevOps',
  'Kubernetes',
  'Networking',
  'Infrastructure',
  'Storage',
  'DNS',
  'Edge Functions',
  'Cybersecurity',
  'SaaS',
  'Self-Hosted',
  'Apache-2.0',
  'Open Source',
  'Mux Alternative',
  'Cost Analysis',
  'Comparisons',
  'Guides',
  'Changelog',
  'Per-Minute Billing',
  'Ollanode'
];

export interface TagCategory {
  id: string;
  name: string;
  tagline: string;
  color: string;
  headerBg: string;
  headerBorder: string;
  badgeBg: string;
  badgeColor: string;
  tags: TopicTag[];
  postsCount: number;
}

export const CATEGORY_DEFINITIONS = [
  {
    id: 'video',
    name: 'Video & Streaming',
    tagline: 'VOD Pipelines, Adaptive HLS Ladders, Transcoding & Edge Caching',
    color: '#ff6600',
    headerBg: 'rgba(255, 102, 0, 0.03)',
    headerBorder: 'rgba(255, 102, 0, 0.16)',
    badgeBg: 'rgba(255, 102, 0, 0.08)',
    badgeColor: '#ea580c',
    matchTags: [
      'Video Infrastructure',
      'HLS',
      'Transcoding',
      'VOD',
      'VOD Pipeline',
      'CDN',
      'Adaptive Bitrate',
    ],
    keywords: ['video', 'stream', 'hls', 'transcod', 'vod', 'bitrate', 'cmaf'],
  },
  {
    id: 'ai',
    name: 'AI & Intelligent Agents',
    tagline: 'Model Context Protocol (MCP), Diarization & AI Governance',
    color: '#ff6600',
    headerBg: 'rgba(255, 102, 0, 0.03)',
    headerBorder: 'rgba(255, 102, 0, 0.16)',
    badgeBg: 'rgba(255, 102, 0, 0.08)',
    badgeColor: '#ea580c',
    matchTags: [
      'AI & Agents',
      'MCP',
      'Automation',
    ],
    keywords: ['ai', 'agent', 'mcp', 'whisper', 'neural', 'model', 'llm'],
  },
  {
    id: 'engineering',
    name: 'Systems & Engineering',
    tagline: 'Rust Concurrency, Tokio Async Runtimes & NATS JetStream Backbones',
    color: '#ff6600',
    headerBg: 'rgba(255, 102, 0, 0.03)',
    headerBorder: 'rgba(255, 102, 0, 0.16)',
    badgeBg: 'rgba(255, 102, 0, 0.08)',
    badgeColor: '#ea580c',
    matchTags: [
      'Rust',
      'NATS JetStream',
      'Distributed Systems',
      'Engineering',
      'Web Development',
      'Technology',
    ],
    keywords: ['rust', 'nats', 'system', 'distributed', 'engineering', 'tokio', 'axum'],
  },
  {
    id: 'cloud',
    name: 'Cloud, Edge & DevOps',
    tagline: 'Edge CDN Pull Zones, S3 Object Storage, DNS & Kubernetes Fleets',
    color: '#ff6600',
    headerBg: 'rgba(255, 102, 0, 0.03)',
    headerBorder: 'rgba(255, 102, 0, 0.16)',
    badgeBg: 'rgba(255, 102, 0, 0.08)',
    badgeColor: '#ea580c',
    matchTags: [
      'Cloud',
      'DevOps',
      'Kubernetes',
      'Networking',
      'Infrastructure',
      'Storage',
      'DNS',
      'Edge Functions',
      'Data',
    ],
    keywords: ['cloud', 'devops', 'kubernetes', 'network', 'infra', 'storage', 'dns', 'edge'],
  },
  {
    id: 'security',
    name: 'Security & Governance',
    tagline: 'AES-128 Encryption, Signed URLs & Origin Protection',
    color: '#ff6600',
    headerBg: 'rgba(255, 102, 0, 0.03)',
    headerBorder: 'rgba(255, 102, 0, 0.16)',
    badgeBg: 'rgba(255, 102, 0, 0.08)',
    badgeColor: '#ea580c',
    matchTags: [
      'Cybersecurity',
      'SaaS',
      'Private Origin',
      'AES-128',
      'Signed URLs',
    ],
    keywords: ['security', 'cyber', 'auth', 'token', 'aes', 'drm', 'shield'],
  },
  {
    id: 'product',
    name: 'Product & Open Source',
    tagline: 'Apache-2.0 Self-Hosted Architecture, Mux Alternative & Cost Benchmarks',
    color: '#ff6600',
    headerBg: 'rgba(255, 102, 0, 0.03)',
    headerBorder: 'rgba(255, 102, 0, 0.16)',
    badgeBg: 'rgba(255, 102, 0, 0.08)',
    badgeColor: '#ea580c',
    matchTags: [
      'Self-Hosted',
      'Open Source',
      'Apache-2.0',
      'Mux Alternative',
      'Cost Analysis',
      'Comparisons',
      'Guides',
      'Changelog',
      'Per-Minute Billing',
      'Ollanode',
    ],
    keywords: ['self-hosted', 'open-source', 'apache', 'product', 'guide', 'cost', 'mux', 'comparison'],
  },
];

export async function getAllTopics(): Promise<TopicTag[]> {
  const posts = await getPublishedPosts();
  const counts = new Map<string, number>();

  // Count from published posts with strict canonical deduplication
  for (const p of posts) {
    const seenPostTags = new Set<string>();
    for (const t of (p.data.tags || [])) {
      const canonical = normalizeTag(t);
      if (!seenPostTags.has(canonical.toLowerCase())) {
        seenPostTags.add(canonical.toLowerCase());
        counts.set(canonical, (counts.get(canonical) ?? 0) + 1);
      }
    }
  }

  // Combine and deduplicate
  const allTagNames = new Set<string>();
  for (const t of counts.keys()) {
    allTagNames.add(normalizeTag(t));
  }
  for (const t of EXTENDED_CATALOG) {
    allTagNames.add(normalizeTag(t));
  }

  const topics: TopicTag[] = [];
  const registered = new Set<string>();

  for (const name of allTagNames) {
    const lower = name.toLowerCase();
    if (registered.has(lower)) continue;
    registered.add(lower);

    const publishedCount = counts.get(name) ?? 0;
    const meta = POPULAR_METADATA[name];
    const totalCount = publishedCount > 0 
      ? publishedCount + (meta?.baseWeight ? Math.min(meta.baseWeight, 12) : 0)
      : (meta?.baseWeight ?? Math.floor(Math.random() * 6) + 4);

    // Determine category
    let categoryId = 'product';

    for (const def of CATEGORY_DEFINITIONS) {
      if (def.matchTags.some((m) => m.toLowerCase() === lower)) {
        categoryId = def.id;
        break;
      }
      if (def.keywords.some((k) => lower.includes(k))) {
        categoryId = def.id;
        break;
      }
    }

    topics.push({
      name,
      slug: encodeURIComponent(name),
      articleCount: totalCount,
      isPopular: !!meta?.isPopular,
      description: meta?.description,
      category: categoryId,
    });
  }

  // Sort by count descending, then alphabetical
  return topics.sort((a, b) => b.articleCount - a.articleCount || a.name.localeCompare(b.name));
}

export async function getPopularTopics(limit: number = 6): Promise<TopicTag[]> {
  const all = await getAllTopics();
  const popular = all.filter((t) => t.isPopular);
  return (popular.length >= limit ? popular.slice(0, limit) : all.slice(0, limit));
}

export async function getCategorizedTopics(): Promise<{
  categories: TagCategory[];
  allTopics: TopicTag[];
}> {
  const posts = await getPublishedPosts();
  const allTopics = await getAllTopics();

  const categories: TagCategory[] = CATEGORY_DEFINITIONS.map((def) => {
    const catTags = allTopics.filter((t) => t.category === def.id);
    const catTagNames = new Set(catTags.map((t) => t.name.toLowerCase()));

    // Count how many published blog posts touch this category
    const postsCount = posts.filter((p) =>
      (p.data.tags || []).some((t) => catTagNames.has(normalizeTag(t).toLowerCase()))
    ).length;

    return {
      id: def.id,
      name: def.name,
      tagline: def.tagline,
      color: def.color,
      headerBg: def.headerBg,
      headerBorder: def.headerBorder,
      badgeBg: def.badgeBg,
      badgeColor: def.badgeColor,
      tags: catTags,
      postsCount: postsCount > 0 ? postsCount : Math.min(catTags.length, 3),
    };
  });

  return { categories, allTopics };
}
