// Topic prerequisite graph — 5 subjects, 22 nodes

export interface TopicNode {
  id: string
  name: string
  subject: 'os' | 'dbms' | 'oop' | 'cn' | 'sysdesign'
  beta: number          // avg difficulty of questions in this topic
  prerequisites: string[]
}

export const TOPICS: TopicNode[] = [
  // OS (5 nodes)
  { id: 'os-basics',     name: 'Processes & Threads',   subject: 'os',       beta: -2.0, prerequisites: [] },
  { id: 'os-scheduling', name: 'CPU Scheduling',        subject: 'os',       beta: -1.0, prerequisites: ['os-basics'] },
  { id: 'os-memory',     name: 'Memory Management',     subject: 'os',       beta: -0.5, prerequisites: ['os-basics'] },
  { id: 'os-sync',       name: 'Synchronization',       subject: 'os',       beta:  1.0, prerequisites: ['os-basics', 'os-scheduling'] },
  { id: 'os-deadlock',   name: 'Deadlocks',             subject: 'os',       beta:  1.5, prerequisites: ['os-sync'] },

  // DBMS (5 nodes)
  { id: 'db-basics',     name: 'Relational Model & SQL', subject: 'dbms',    beta: -2.0, prerequisites: [] },
  { id: 'db-normal',     name: 'Normalization',          subject: 'dbms',    beta: -0.5, prerequisites: ['db-basics'] },
  { id: 'db-index',      name: 'Indexing & B-Trees',     subject: 'dbms',    beta:  1.0, prerequisites: ['db-basics'] },
  { id: 'db-tx',         name: 'Transactions & ACID',    subject: 'dbms',    beta:  0.5, prerequisites: ['db-basics'] },
  { id: 'db-query',      name: 'Query Optimization',     subject: 'dbms',    beta:  2.0, prerequisites: ['db-index', 'db-normal'] },

  // OOP (4 nodes)
  { id: 'oop-basics',    name: 'Classes & Objects',      subject: 'oop',     beta: -2.5, prerequisites: [] },
  { id: 'oop-pillars',   name: '4 Pillars (APIE)',       subject: 'oop',     beta: -1.0, prerequisites: ['oop-basics'] },
  { id: 'oop-solid',     name: 'SOLID Principles',       subject: 'oop',     beta:  1.0, prerequisites: ['oop-pillars'] },
  { id: 'oop-patterns',  name: 'Design Patterns',        subject: 'oop',     beta:  2.0, prerequisites: ['oop-solid'] },

  // CN (4 nodes)
  { id: 'cn-basics',     name: 'OSI / TCP-IP Model',     subject: 'cn',      beta: -2.0, prerequisites: [] },
  { id: 'cn-transport',  name: 'TCP vs UDP',             subject: 'cn',      beta: -1.0, prerequisites: ['cn-basics'] },
  { id: 'cn-http',       name: 'HTTP / DNS / TLS',       subject: 'cn',      beta:  0.0, prerequisites: ['cn-transport'] },
  { id: 'cn-routing',    name: 'Routing & Subnetting',   subject: 'cn',      beta:  1.5, prerequisites: ['cn-transport'] },

  // System Design (4 nodes)
  { id: 'sd-basics',     name: 'Scalability Basics',     subject: 'sysdesign', beta: -1.0, prerequisites: [] },
  { id: 'sd-cache',      name: 'Caching Strategies',     subject: 'sysdesign', beta:  0.5, prerequisites: ['sd-basics'] },
  { id: 'sd-db',         name: 'SQL vs NoSQL choices',   subject: 'sysdesign', beta:  1.0, prerequisites: ['sd-basics', 'db-basics'] },
  { id: 'sd-dist',       name: 'Distributed Systems',    subject: 'sysdesign', beta:  2.5, prerequisites: ['sd-cache', 'sd-db', 'cn-http'] },
]

// Map for O(1) lookup
export const TOPIC_MAP = new Map<string, TopicNode>(TOPICS.map(t => [t.id, t]))

// Returns unlocked topic IDs for a subject given user's topic scores
// A topic is unlocked if all its prerequisites have score >= 50
export function getUnlocked(
  subject: string,
  userTopicScores: Record<string, number>
): string[] {
  const subjectTopics = TOPICS.filter(t => t.subject === subject)
  const unlocked: string[] = []
  const visited = new Set<string>()

  const roots = subjectTopics.filter(t => t.prerequisites.length === 0)
  const queue = roots.map(t => t.id)

  while (queue.length) {
    const id = queue.shift()!
    if (visited.has(id)) continue
    visited.add(id)
    unlocked.push(id)

    if ((userTopicScores[id] ?? 0) >= 50) {
      const children = subjectTopics.filter(t => t.prerequisites.includes(id))
      queue.push(...children.map(t => t.id).filter(id => !visited.has(id)))
    }
  }

  return unlocked
}

export const SUBJECTS = ['os', 'dbms', 'oop', 'cn', 'sysdesign'] as const
export type Subject = typeof SUBJECTS[number]

export const SUBJECT_NAMES: Record<Subject, string> = {
  os: 'Operating Systems',
  dbms: 'Database Management',
  oop: 'Object-Oriented Programming',
  cn: 'Computer Networks',
  sysdesign: 'System Design',
}
