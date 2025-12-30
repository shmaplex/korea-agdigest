# Korea Ag Digest

Curated Korean Agriculture News & Briefings  
Subdomain: agdigest.shmaplex.com

Korea Ag Digest is a focused news aggregation and briefing platform dedicated to agriculture, rural policy, and food systems in South Korea. Its goal is to make Korean agriculture news more accessible to English-speaking audiences while preserving original context, sources, and nuance.

The project also serves as a discussion catalyst for the /r/Agriculture_in_Korea subreddit, making it easier to discover articles, summarize key points, and generate well-structured discussion posts.

---

## Why This Exists

Korean agriculture is undergoing rapid structural change driven by:

- Labor shortages and demographic shifts
- Smart farming and automation
- Climate stress and input volatility
- Policy reform and subsidy restructuring

Much of the reporting remains siloed across Korean-language outlets. Korea Ag Digest exists to:

- Aggregate trusted agriculture-focused news sources
- Normalize and archive articles in a durable, auditable way
- Provide English summaries without replacing original reporting
- Encourage transparent, community-driven discussion rather than platform capture

---

## Core Principles

- Source-respectful: Always links back to original publishers
- Slow-journalism friendly: Focus on trends, policy, and structural shifts
- Decentralization-first: Avoids opaque data lock-in
- Discussion-oriented: Built to feed thoughtful Reddit threads, not clicks

---

## Technology Overview

### Frontend

- Next.js 16+ (App Router)
- Tailwind CSS
- shadcn/ui

Fully server-rendered pages with fast client transitions.

### Backend and Data Layer

OrbitDB (IPFS-backed)  
Canonical, append-only article ledger that provides:

- Tamper-resistant ingestion history
- Durable archival of articles and metadata
- A foundation for future federation with other nodes

PostgreSQL with Prisma is used as a fast query index and cache layer. OrbitDB remains the source of truth.

### Ingestion and Automation

- RSS ingestion
- Manual fetch and scrape endpoints
- Daily cron ingestion
- Article normalization and deduplication

### Editorial and Community Tools

- Admin dashboard for highlighting and promotion
- Article archiving and visibility controls
- Reddit post generator tailored for /r/Agriculture_in_Korea

---

## Primary News Sources

The platform focuses on agriculture-relevant Korean outlets, including:

### Agriculture-Focused Publications

**농민신문 (Farmers’ Newspaper)**
General farming news, agricultural policy, rural livelihoods, and practical farming guidance.

**원예산업신문 (Horticultural Industry Newspaper)**
Horticulture trends, greenhouse production, crop technology, and ag business developments.

**한국농촌경제신문 (Korea Rural Economic Newspaper)**
Agricultural policy, rural economy analysis, market outlooks, and research insights.

**한국농어민신문 (Korea Farmers & Fishermen Newspaper)**
Farming and fisheries livelihoods, policy commentary, and sector-level reporting.

**영농자재신문 (Agricultural Materials Newspaper)**
Agricultural inputs, materials, ag-tech innovations, and rural industry coverage.

### General Newspapers with Strong Agriculture Coverage

**매일경제신문 (Maeil Business Newspaper)**
Agriculture, food markets, trade, and ag-related economics.

**조선일보 (Chosun Ilbo)**
National coverage including agriculture, rural policy, and trade issues.

**동아일보 (Dong-A Ilbo)**
Broad social and economic reporting with agriculture-relevant sections.

---

## Project Structure

```
app/
page.tsx Daily digest homepage
 articles/[slug]/page.tsx Article detail view
 admin/ Admin dashboard
 api/
ingest/rss/ RSS ingestion
 ingest/fetch/ Manual scrape or fetch
 reddit/generate/ Reddit post generator

lib/
sources.ts Source registry
 ingest.ts Normalization logic
 summarize.ts Summarization hooks
 reddit.ts Reddit formatting

services/
orbit/ OrbitDB services

prisma/
schema.prisma

scripts/
cron.ts Daily ingestion job
```

---

## Getting Started

Development:

`npm run dev`
or  
`pnpm dev`

Open <http://localhost:3000> in your browser.

You can start editing by modifying app/page.tsx.

---

## Deployment

The frontend is designed to deploy cleanly on Vercel.

OrbitDB should run as a long-lived service or worker, not inside serverless functions.

Recommended setup:

- Vercel for the Next.js frontend
- A separate Node service or container for OrbitDB
- Managed PostgreSQL (Supabase, RDS, Neon, etc.)

---

## Current Status

### Implemented

- RSS ingestion pipeline
- Article normalization
- Durable article storage via OrbitDB
- PostgreSQL indexing layer
- Admin highlight and promote controls
- Reddit post generator
- Daily digest homepage

### In Progress

- English summaries and bilingual support
- Improved topic tagging
- Weekly and monthly digests
- Better article discovery UX

---

## Coming Soon

- Multilingual summaries (English and Korean toggle)
- Topic-based feeds (policy, smart farming, climate)
- Federation with other agriculture nodes
- DID-based editorial signing
- Newsletter delivery (email and RSS)
- Community-submitted sources

---

## Relationship to /r/Agriculture_in_Korea

Korea Ag Digest is explicitly designed to:

- Surface high-signal agriculture news
- Reduce translation friction
- Encourage informed, long-form discussion
- Avoid sensationalism or algorithmic engagement traps

Articles generated here are intended to feed discussion on:  
[/r/Agriculture_in_Korea](https://reddit.com/r/Agriculture_in_Korea)

---

## Philosophy

This project deliberately avoids building another centralized content platform. Instead, it treats agriculture news as shared infrastructure, emphasizing transparency, durability, and community relevance.

If agriculture is foundational, then the information that shapes it should be too.
