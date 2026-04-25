import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

const questions = [
  // ─── OS ───────────────────────────────────────────────────────────────────

  // os-basics (beta: -2.0)
  {
    topicId: 'os-basics', subject: 'os', tag: 'os-basics-process',
    text: 'What is a process in an operating system?',
    options: [
      'A program stored on disk',
      'A program in execution with its own memory space',
      'A thread of execution within a program',
      'A file managed by the OS',
    ],
    answer: 1,
    explanation: 'A process is a program in execution. Unlike a program (passive entity on disk), a process is active and has its own memory space, program counter, and resources.',
    beta: -2.0,
  },
  {
    topicId: 'os-basics', subject: 'os', tag: 'os-basics-thread',
    text: 'How does a thread differ from a process?',
    options: [
      'Threads have their own memory space; processes share memory',
      'Threads are heavier than processes',
      'Threads share the memory space of their parent process; processes have separate memory',
      'A process can only contain one thread',
    ],
    answer: 2,
    explanation: 'Threads are lightweight units within a process that share the same address space, heap, and open files. Processes are independent with separate memory spaces, making context switching between processes more expensive.',
    beta: -1.8,
  },

  // os-scheduling (beta: -1.0)
  {
    topicId: 'os-scheduling', subject: 'os', tag: 'os-scheduling-rr',
    text: 'In Round Robin scheduling, what happens when a process\'s time quantum expires?',
    options: [
      'The process is terminated',
      'The process is moved to the back of the ready queue',
      'The process gets a higher priority',
      'The process is blocked until I/O completes',
    ],
    answer: 1,
    explanation: 'Round Robin is preemptive. When a process exhausts its time quantum, it is preempted and placed at the back of the ready queue, giving other processes a turn. This ensures fairness.',
    beta: -1.0,
  },

  // os-sync (beta: 1.0)
  {
    topicId: 'os-sync', subject: 'os', tag: 'os-sync-mutex',
    text: 'What is the key difference between a mutex and a semaphore?',
    options: [
      'A mutex can be released by any thread; a semaphore only by its owner',
      'A mutex is owned — only the thread that locked it can unlock it; a semaphore has no ownership',
      'A semaphore is faster than a mutex',
      'A mutex allows multiple threads; a semaphore allows only one',
    ],
    answer: 1,
    explanation: 'A mutex has ownership — the thread that acquires it must be the one to release it. A semaphore is a signaling mechanism with no ownership; any thread can call signal(). This makes semaphores suitable for producer-consumer patterns.',
    beta: 1.0,
  },

  // os-deadlock (beta: 1.5)
  {
    topicId: 'os-deadlock', subject: 'os', tag: 'os-deadlock-conditions',
    text: 'Which of the following is NOT one of the four necessary conditions for deadlock?',
    options: [
      'Mutual Exclusion',
      'Hold and Wait',
      'Preemption',
      'Circular Wait',
    ],
    answer: 2,
    explanation: 'The four necessary conditions for deadlock are: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. "Preemption" (the ability to forcibly take resources) actually PREVENTS deadlock — its absence (No Preemption) is the condition.',
    beta: 1.5,
  },

  // os-memory (beta: -0.5)
  {
    topicId: 'os-memory', subject: 'os', tag: 'os-memory-paging',
    text: 'What problem does paging solve in memory management?',
    options: [
      'It eliminates the need for virtual memory',
      'It solves external fragmentation by using fixed-size memory frames',
      'It speeds up CPU scheduling',
      'It prevents processes from accessing each other\'s memory',
    ],
    answer: 1,
    explanation: 'Paging divides physical memory into fixed-size frames and logical memory into pages of the same size. This eliminates external fragmentation (no contiguous allocation needed), though it introduces internal fragmentation within the last page.',
    beta: -0.5,
  },

  // ─── DBMS ─────────────────────────────────────────────────────────────────

  // db-basics (beta: -2.0)
  {
    topicId: 'db-basics', subject: 'dbms', tag: 'db-basics-primarykey',
    text: 'What is the purpose of a primary key in a relational database?',
    options: [
      'To link two tables together',
      'To uniquely identify each row in a table',
      'To speed up query execution',
      'To enforce referential integrity',
    ],
    answer: 1,
    explanation: 'A primary key uniquely identifies each record in a table. It must be unique and non-null. Foreign keys reference primary keys to establish relationships between tables.',
    beta: -2.0,
  },
  {
    topicId: 'db-basics', subject: 'dbms', tag: 'db-basics-sql-join',
    text: 'What does an INNER JOIN return?',
    options: [
      'All rows from the left table, with NULLs for non-matching right rows',
      'All rows from both tables regardless of match',
      'Only rows where there is a match in both tables',
      'All rows from the right table, with NULLs for non-matching left rows',
    ],
    answer: 2,
    explanation: 'INNER JOIN returns only the rows where the join condition is satisfied in both tables. Rows with no match in either table are excluded. Use LEFT/RIGHT JOIN to include unmatched rows from one side.',
    beta: -1.8,
  },

  // db-tx (beta: 0.5)
  {
    topicId: 'db-tx', subject: 'dbms', tag: 'db-tx-acid',
    text: 'Which ACID property ensures that a transaction either completes fully or has no effect at all?',
    options: [
      'Consistency',
      'Isolation',
      'Atomicity',
      'Durability',
    ],
    answer: 2,
    explanation: 'Atomicity guarantees that a transaction is treated as a single unit — it either commits entirely or rolls back entirely. There is no partial execution. This is enforced via write-ahead logging (WAL) or undo logs.',
    beta: 0.5,
  },

  // db-index (beta: 1.0)
  {
    topicId: 'db-index', subject: 'dbms', tag: 'db-index-btree',
    text: 'Why is a B-Tree index preferred over a hash index for range queries?',
    options: [
      'B-Trees use less memory than hash indexes',
      'B-Trees maintain sorted order, enabling efficient range scans; hash indexes only support equality lookups',
      'Hash indexes are slower for all query types',
      'B-Trees are always faster than hash indexes',
    ],
    answer: 1,
    explanation: 'B-Trees store keys in sorted order, so range queries (BETWEEN, >, <) can be answered by traversing a contiguous range of leaf nodes. Hash indexes map keys to buckets via a hash function — they\'re O(1) for equality but cannot support range queries at all.',
    beta: 1.0,
  },

  // db-query (beta: 2.0)
  {
    topicId: 'db-query', subject: 'dbms', tag: 'db-query-optimization',
    text: 'What does a query optimizer primarily use to choose between execution plans?',
    options: [
      'The length of the SQL query string',
      'Table statistics such as row counts, column cardinality, and histogram data',
      'The order in which tables appear in the FROM clause',
      'The number of indexes defined on the table',
    ],
    answer: 1,
    explanation: 'A cost-based query optimizer uses statistics (row counts, distinct value counts, data distribution histograms) to estimate the cost of each execution plan and picks the cheapest one. Stale statistics lead to poor plan choices — hence ANALYZE/UPDATE STATISTICS commands.',
    beta: 2.0,
  },

  // ─── OOP ──────────────────────────────────────────────────────────────────

  // oop-basics (beta: -2.5)
  {
    topicId: 'oop-basics', subject: 'oop', tag: 'oop-basics-class',
    text: 'What is the difference between a class and an object?',
    options: [
      'A class is an instance; an object is a blueprint',
      'A class is a blueprint/template; an object is an instance of that class',
      'They are the same thing in modern languages',
      'An object can only be created from abstract classes',
    ],
    answer: 1,
    explanation: 'A class is a blueprint that defines attributes and behaviors. An object is a concrete instance of a class with actual values. You can create many objects from one class, each with its own state.',
    beta: -2.5,
  },

  // oop-pillars (beta: -1.0)
  {
    topicId: 'oop-pillars', subject: 'oop', tag: 'oop-pillars-polymorphism',
    text: 'Which OOP concept allows a subclass to provide a specific implementation of a method already defined in its parent class?',
    options: [
      'Encapsulation',
      'Abstraction',
      'Method Overriding (Runtime Polymorphism)',
      'Method Overloading (Compile-time Polymorphism)',
    ],
    answer: 2,
    explanation: 'Method overriding allows a subclass to provide its own implementation of a method inherited from the parent class. The correct method is resolved at runtime based on the actual object type — this is runtime polymorphism (dynamic dispatch).',
    beta: -1.0,
  },
  {
    topicId: 'oop-pillars', subject: 'oop', tag: 'oop-pillars-encapsulation',
    text: 'What is the primary purpose of encapsulation?',
    options: [
      'To allow a class to inherit from multiple parents',
      'To bundle data and methods together and restrict direct access to internal state',
      'To define abstract methods that subclasses must implement',
      'To enable objects of different types to be treated uniformly',
    ],
    answer: 1,
    explanation: 'Encapsulation bundles data (fields) and behavior (methods) into a single unit (class) and hides internal state from outside access. Access is controlled via getters/setters. This protects invariants and reduces coupling.',
    beta: -1.2,
  },

  // oop-solid (beta: 1.0)
  {
    topicId: 'oop-solid', subject: 'oop', tag: 'oop-solid-srp',
    text: 'According to the Single Responsibility Principle, a class should:',
    options: [
      'Only have one method',
      'Have only one reason to change — one responsibility',
      'Never be extended by subclasses',
      'Implement only one interface',
    ],
    answer: 1,
    explanation: 'SRP states that a class should have only one reason to change, meaning it should have only one job or responsibility. A class handling both data persistence and business logic violates SRP — changes to either concern force changes to the class.',
    beta: 1.0,
  },

  // ─── CN ───────────────────────────────────────────────────────────────────

  // cn-basics (beta: -2.0)
  {
    topicId: 'cn-basics', subject: 'cn', tag: 'cn-basics-osi',
    text: 'At which OSI layer does IP (Internet Protocol) operate?',
    options: [
      'Layer 2 — Data Link',
      'Layer 3 — Network',
      'Layer 4 — Transport',
      'Layer 5 — Session',
    ],
    answer: 1,
    explanation: 'IP operates at Layer 3 (Network layer) and is responsible for logical addressing and routing packets across networks. Layer 2 handles MAC addressing within a network segment. Layer 4 (TCP/UDP) handles end-to-end communication.',
    beta: -2.0,
  },
  {
    topicId: 'cn-basics', subject: 'cn', tag: 'cn-basics-mac',
    text: 'What is the purpose of a MAC address?',
    options: [
      'To identify a device on the internet globally',
      'To uniquely identify a network interface within a local network segment',
      'To route packets between different networks',
      'To encrypt data during transmission',
    ],
    answer: 1,
    explanation: 'A MAC (Media Access Control) address is a hardware identifier assigned to a network interface card. It operates at Layer 2 and is used for communication within the same network segment. Unlike IP addresses, MAC addresses are not routable across the internet.',
    beta: -1.8,
  },

  // cn-transport (beta: -1.0)
  {
    topicId: 'cn-transport', subject: 'cn', tag: 'cn-transport-tcp-udp',
    text: 'Which statement correctly describes a key difference between TCP and UDP?',
    options: [
      'UDP guarantees delivery; TCP does not',
      'TCP is connectionless; UDP is connection-oriented',
      'TCP provides reliable, ordered delivery with flow control; UDP is faster but unreliable',
      'UDP is used for file transfers; TCP is used for video streaming',
    ],
    answer: 2,
    explanation: 'TCP is connection-oriented and provides reliable, ordered, error-checked delivery via acknowledgments and retransmission. UDP is connectionless and has no delivery guarantees — it\'s faster and used where low latency matters more than reliability (DNS, video streaming, gaming).',
    beta: -1.0,
  },

  // cn-http (beta: 0.0)
  {
    topicId: 'cn-http', subject: 'cn', tag: 'cn-http-tls',
    text: 'What does TLS provide in HTTPS?',
    options: [
      'Faster data transfer speeds',
      'Compression of HTTP headers',
      'Encryption, authentication, and data integrity for the connection',
      'Load balancing across multiple servers',
    ],
    answer: 2,
    explanation: 'TLS (Transport Layer Security) provides three things: encryption (data is unreadable to eavesdroppers), authentication (server identity verified via certificates), and integrity (data cannot be tampered with undetected via MAC). HTTPS = HTTP over TLS.',
    beta: 0.0,
  },

  // cn-routing (beta: 1.5)
  {
    topicId: 'cn-routing', subject: 'cn', tag: 'cn-routing-subnet',
    text: 'A host has IP 192.168.1.100 with subnet mask 255.255.255.0. What is its network address?',
    options: [
      '192.168.1.1',
      '192.168.1.0',
      '192.168.0.0',
      '192.168.1.255',
    ],
    answer: 1,
    explanation: 'The network address is obtained by ANDing the IP with the subnet mask. 192.168.1.100 AND 255.255.255.0 = 192.168.1.0. The /24 mask means the first 24 bits are the network portion. .255 is the broadcast address; .1 is typically the gateway.',
    beta: 1.5,
  },

  // ─── SYSTEM DESIGN ────────────────────────────────────────────────────────

  // sd-basics (beta: -1.0)
  {
    topicId: 'sd-basics', subject: 'sysdesign', tag: 'sd-basics-scalability',
    text: 'What is the difference between horizontal and vertical scaling?',
    options: [
      'Horizontal scaling adds more CPU/RAM to existing servers; vertical scaling adds more servers',
      'Vertical scaling adds more CPU/RAM to existing servers; horizontal scaling adds more servers',
      'They are the same concept with different names',
      'Horizontal scaling is only for databases; vertical scaling is for web servers',
    ],
    answer: 1,
    explanation: 'Vertical scaling (scale up) means adding more resources (CPU, RAM, disk) to an existing machine — limited by hardware ceiling. Horizontal scaling (scale out) means adding more machines to distribute load — theoretically unlimited but requires stateless design and load balancing.',
    beta: -1.0,
  },
  {
    topicId: 'sd-basics', subject: 'sysdesign', tag: 'sd-basics-loadbalancer',
    text: 'What is the primary role of a load balancer?',
    options: [
      'To store frequently accessed data in memory',
      'To distribute incoming requests across multiple servers to prevent overload',
      'To compress data before sending it to clients',
      'To encrypt traffic between client and server',
    ],
    answer: 1,
    explanation: 'A load balancer distributes incoming network traffic across multiple backend servers. This prevents any single server from becoming a bottleneck, improves availability (if one server fails, traffic routes to others), and enables horizontal scaling.',
    beta: -1.0,
  },

  // sd-cache (beta: 0.5)
  {
    topicId: 'sd-cache', subject: 'sysdesign', tag: 'sd-cache-strategy',
    text: 'In a cache-aside (lazy loading) strategy, what happens on a cache miss?',
    options: [
      'The request fails and returns an error',
      'The application reads from the database, stores the result in cache, then returns it',
      'The cache automatically fetches data from the database',
      'The write-through cache updates both cache and database simultaneously',
    ],
    answer: 1,
    explanation: 'In cache-aside, the application is responsible for cache management. On a miss: (1) read from DB, (2) write to cache, (3) return data. The cache is only populated on demand. This avoids caching unused data but causes a "cold start" penalty on first access.',
    beta: 0.5,
  },

  // sd-db (beta: 1.0)
  {
    topicId: 'sd-db', subject: 'sysdesign', tag: 'sd-db-nosql',
    text: 'When would you choose a NoSQL database over a relational database?',
    options: [
      'When you need complex multi-table JOIN queries',
      'When ACID transactions across multiple entities are critical',
      'When you need flexible schema, horizontal scalability, and high write throughput for unstructured data',
      'When data integrity and normalization are the top priorities',
    ],
    answer: 2,
    explanation: 'NoSQL databases excel at flexible/evolving schemas, horizontal sharding for massive scale, and high write throughput (e.g., time-series, user activity logs, product catalogs). Relational DBs are better for complex queries, strict consistency, and normalized data with relationships.',
    beta: 1.0,
  },

  // sd-dist (beta: 2.5)
  {
    topicId: 'sd-dist', subject: 'sysdesign', tag: 'sd-dist-cap',
    text: 'According to the CAP theorem, during a network partition a distributed system must choose between:',
    options: [
      'Consistency and Availability',
      'Availability and Partition Tolerance',
      'Consistency and Partition Tolerance',
      'Latency and Throughput',
    ],
    answer: 0,
    explanation: 'CAP theorem states a distributed system can guarantee at most 2 of 3: Consistency (all nodes see same data), Availability (every request gets a response), Partition Tolerance (system works despite network splits). Since partitions are unavoidable in real networks, you must choose between CP (consistent but may reject requests) or AP (available but may return stale data).',
    beta: 2.5,
  },
]

async function main() {
  console.log('Seeding questions...')

  await db.question.createMany({
    data: questions.map(q => ({
      topicId: q.topicId,
      subject: q.subject,
      tag: q.tag,
      text: q.text,
      options: q.options,
      answer: q.answer,
      explanation: q.explanation,
      beta: q.beta,
    })),
    skipDuplicates: true,
  })

  console.log(`Seeded ${questions.length} questions.`)
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect())
