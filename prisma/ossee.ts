import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

const questions = [
  // ─── OS ───────────────────────────────────────────────────────────────────

{
"topicId": "os-basics",
"subject": "os",
"tag": "os-basics-critical-section",
"text": "Why must a correct critical section solution guarantee bounded waiting?",
"options": ["To avoid deadlocks", "To ensure fairness among processes", "To reduce context switches", "To maximize CPU utilization"],
"answer": 1,
"explanation": "Bounded waiting ensures no process waits indefinitely, preventing starvation.",
"beta": -2.0
},
{
"topicId": "os-basics",
"subject": "os",
"tag": "os-basics-race-condition",
"text": "Two threads increment a shared counter without synchronization. What determines if a race condition occurs?",
"options": ["Compiler optimizations", "Instruction interleaving at runtime", "Cache size", "Thread priority"],
"answer": 1,
"explanation": "Race conditions arise due to unpredictable interleaving of instructions.",
"beta": -2.0
},
{
"topicId": "os-basics",
"subject": "os",
"tag": "os-basics-mutex",
"text": "What property of a mutex ensures mutual exclusion?",
"options": ["Counting mechanism", "Binary locking behavior", "FIFO scheduling", "Busy waiting"],
"answer": 1,
"explanation": "Mutex allows only one holder at a time due to its binary lock state.",
"beta": -2.0
},
{
"topicId": "os-basics",
"subject": "os",
"tag": "os-basics-semaphore",
"text": "How does a counting semaphore differ from a mutex in resource management?",
"options": ["Mutex supports multiple resources", "Semaphore supports multiple resources", "Mutex uses counters", "Semaphore enforces ownership"],
"answer": 1,
"explanation": "Counting semaphore allows multiple resources via its integer value.",
"beta": -2.0
},
{
"topicId": "os-basics",
"subject": "os",
"tag": "os-basics-spinlock",
"text": "Why are spinlocks inefficient for long critical sections?",
"options": ["They cause deadlocks", "They waste CPU cycles in busy waiting", "They increase memory usage", "They block interrupts"],
"answer": 1,
"explanation": "Spinlocks keep CPU busy waiting, wasting cycles if lock is held long.",
"beta": -2.0
},
{
"topicId": "os-basics",
"subject": "os",
"tag": "os-basics-monitor",
"text": "What advantage do monitors provide over semaphores?",
"options": ["Lower overhead", "Implicit mutual exclusion", "Better hardware support", "No blocking"],
"answer": 1,
"explanation": "Monitors automatically ensure mutual exclusion, reducing programmer errors.",
"beta": -2.0
},
{
"topicId": "os-basics",
"subject": "os",
"tag": "os-basics-thread",
"text": "Why are threads considered lightweight compared to processes?",
"options": ["They have separate memory", "They share address space", "They avoid scheduling", "They run faster"],
"answer": 1,
"explanation": "Threads share memory, reducing overhead of creation and communication.",
"beta": -2.0
},
{
"topicId": "os-basics",
"subject": "os",
"tag": "os-basics-process",
"text": "What is the primary overhead in process context switching?",
"options": ["Register saving only", "Switching memory address space", "Thread synchronization", "Interrupt handling"],
"answer": 1,
"explanation": "Processes require switching address spaces, which is costly.",
"beta": -2.0
},
{
"topicId": "os-basics",
"subject": "os",
"tag": "os-basics-critical-section",
"text": "Why is disabling interrupts not a suitable solution for mutual exclusion in multiprocessor systems?",
"options": ["It increases latency", "It only works on one CPU", "It wastes memory", "It blocks threads"],
"answer": 1,
"explanation": "Disabling interrupts affects only one CPU, not others in multiprocessors.",
"beta": -2.0
},
{
"topicId": "os-basics",
"subject": "os",
"tag": "os-basics-race-condition",
"text": "Which scenario best illustrates a race condition?",
"options": ["Two threads reading data", "Two threads writing shared data concurrently", "Single thread execution", "Sequential execution"],
"answer": 1,
"explanation": "Concurrent writes without sync lead to inconsistent results.",
"beta": -2.0
},
{
"topicId": "os-basics",
"subject": "os",
"tag": "os-basics-semaphore",
"text": "What happens if a semaphore's wait operation is not atomic?",
"options": ["Deadlock avoided", "Race condition occurs", "Improved performance", "No effect"],
"answer": 1,
"explanation": "Non-atomic operations allow interference, causing race conditions.",
"beta": -2.0
},
{
"topicId": "os-basics",
"subject": "os",
"tag": "os-basics-mutex",
"text": "Why is ownership important in mutex locks?",
"options": ["To improve speed", "To ensure only locker can unlock", "To allow multiple locks", "To prevent starvation"],
"answer": 1,
"explanation": "Mutex ensures only the owning thread releases the lock.",
"beta": -2.0
},
{
"topicId": "os-basics",
"subject": "os",
"tag": "os-basics-monitor",
"text": "In monitors, why are condition variables needed?",
"options": ["For memory allocation", "For waiting and signaling conditions", "For scheduling threads", "For locking"],
"answer": 1,
"explanation": "Condition variables allow threads to wait and be signaled safely.",
"beta": -2.0
},
{
"topicId": "os-basics",
"subject": "os",
"tag": "os-basics-thread",
"text": "What risk arises from multiple threads sharing the same address space?",
"options": ["Deadlocks only", "Data inconsistency", "Memory leaks", "Scheduling issues"],
"answer": 1,
"explanation": "Shared memory can lead to inconsistent data without synchronization.",
"beta": -2.0
},
{
"topicId": "os-basics",
"subject": "os",
"tag": "os-basics-spinlock",
"text": "When are spinlocks preferred over blocking locks?",
"options": ["Long wait times", "Short critical sections", "High memory usage", "Single-threaded systems"],
"answer": 1,
"explanation": "Spinlocks are efficient when lock hold time is very short.",
"beta": -2.0
},
{
"topicId": "os-basics",
"subject": "os",
"tag": "os-basics-critical-section",
"text": "What condition ensures progress in critical section solutions?",
"options": ["Bounded waiting", "No process outside critical section blocks others", "Mutual exclusion", "Deadlock freedom"],
"answer": 1,
"explanation": "Progress ensures only interested processes decide entry.",
"beta": -2.0
},
{
"topicId": "os-basics",
"subject": "os",
"tag": "os-basics-process",
"text": "Why are processes isolated from each other?",
"options": ["To improve speed", "To ensure protection and stability", "To simplify scheduling", "To reduce memory"],
"answer": 1,
"explanation": "Isolation prevents one process from affecting another's memory.",
"beta": -2.0
},
{
"topicId": "os-basics",
"subject": "os",
"tag": "os-basics-semaphore",
"text": "What issue arises if semaphore signal is called too many times?",
"options": ["Deadlock", "Resource over-allocation", "Starvation", "Race condition"],
"answer": 1,
"explanation": "Excess signals increase count, allowing more access than resources.",
"beta": -2.0
},
{
"topicId": "os-basics",
"subject": "os",
"tag": "os-basics-race-condition",
"text": "Why are race conditions hard to debug?",
"options": ["They occur always", "They depend on timing and interleaving", "They cause crashes immediately", "They affect only memory"],
"answer": 1,
"explanation": "Race conditions depend on unpredictable timing, making them rare and hard to reproduce.",
"beta": -2.0
},
{
"topicId": "os-basics",
"subject": "os",
"tag": "os-basics-thread",
"text": "Why is thread synchronization necessary even if threads are independent logically?",
"options": ["To reduce memory", "To protect shared resources", "To improve scheduling", "To avoid context switching"],
"answer": 1,
"explanation": "Threads may still share resources, requiring synchronization.",
"beta": -2.0
},
{
"topicId": "os-scheduling",
"subject": "os",
"tag": "os-scheduling-fcfs",
"text": "Why can FCFS scheduling lead to poor average waiting time in mixed workloads?",
"options": ["It favors short jobs", "It suffers from convoy effect", "It preempts long jobs", "It minimizes turnaround time"],
"answer": 1,
"explanation": "Long jobs block shorter ones, increasing overall waiting time (convoy effect).",
"beta": -1.0
},
{
"topicId": "os-scheduling",
"subject": "os",
"tag": "os-scheduling-sjf",
"text": "Why is SJF considered optimal for minimizing average waiting time?",
"options": ["Executes longest jobs first", "Executes shortest jobs first", "Uses priority queues", "Avoids preemption"],
"answer": 1,
"explanation": "Short jobs finish quickly, reducing average waiting time.",
"beta": -1.0
},
{
"topicId": "os-scheduling",
"subject": "os",
"tag": "os-scheduling-srtf",
"text": "What is a key drawback of SRTF scheduling?",
"options": ["Low throughput", "Starvation of long jobs", "High memory usage", "No preemption"],
"answer": 1,
"explanation": "Short jobs continuously arriving can starve longer jobs.",
"beta": -1.0
},
{
"topicId": "os-scheduling",
"subject": "os",
"tag": "os-scheduling-rr",
"text": "Why does Round Robin improve response time over FCFS?",
"options": ["No context switches", "Time slicing ensures fairness", "Executes shortest jobs first", "Avoids preemption"],
"answer": 1,
"explanation": "Each process gets CPU periodically, improving responsiveness.",
"beta": -1.0
},
{
"topicId": "os-scheduling",
"subject": "os",
"tag": "os-scheduling-rr",
"text": "What happens if time quantum in Round Robin is too large?",
"options": ["Behaves like SJF", "Behaves like FCFS", "Increases context switches", "Improves response time"],
"answer": 1,
"explanation": "Large quantum removes preemption effect, resembling FCFS.",
"beta": -1.0
},
{
"topicId": "os-scheduling",
"subject": "os",
"tag": "os-scheduling-priority",
"text": "Why can priority scheduling lead to starvation?",
"options": ["Low priority tasks never get CPU", "High priority tasks wait", "All tasks treated equally", "No preemption"],
"answer": 0,
"explanation": "Higher priority jobs keep executing, starving lower ones.",
"beta": -1.0
},
{
"topicId": "os-scheduling",
"subject": "os",
"tag": "os-scheduling-aging",
"text": "How does aging prevent starvation in priority scheduling?",
"options": ["Decreases priority over time", "Increases priority over time", "Removes processes", "Blocks CPU"],
"answer": 1,
"explanation": "Waiting processes gradually gain higher priority.",
"beta": -1.0
},
{
"topicId": "os-scheduling",
"subject": "os",
"tag": "os-scheduling-mlfq",
"text": "Why does MLFQ scheduling adapt better than fixed priority scheduling?",
"options": ["Static priorities", "Dynamic adjustment based on behavior", "No queues", "Single level queue"],
"answer": 1,
"explanation": "Processes move between queues based on runtime behavior.",
"beta": -1.0
},
{
"topicId": "os-scheduling",
"subject": "os",
"tag": "os-scheduling-context-switch",
"text": "Why is excessive context switching undesirable?",
"options": ["Consumes CPU time without useful work", "Improves throughput", "Reduces latency", "Avoids starvation"],
"answer": 0,
"explanation": "Context switching adds overhead with no productive computation.",
"beta": -1.0
},
{
"topicId": "os-scheduling",
"subject": "os",
"tag": "os-scheduling-throughput",
"text": "Which scheduling goal conflicts with minimizing response time?",
"options": ["Maximizing throughput", "Fairness", "CPU utilization", "Minimizing turnaround time"],
"answer": 0,
"explanation": "High throughput may delay individual responses.",
"beta": -1.0
},
{
"topicId": "os-scheduling",
"subject": "os",
"tag": "os-scheduling-preemption",
"text": "What advantage does preemptive scheduling provide?",
"options": ["Reduces flexibility", "Improves responsiveness", "Eliminates overhead", "Prevents context switches"],
"answer": 1,
"explanation": "Preemption allows quick response to high-priority tasks.",
"beta": -1.0
},
{
"topicId": "os-scheduling",
"subject": "os",
"tag": "os-scheduling-fairness",
"text": "Why is fairness important in scheduling?",
"options": ["Maximizes CPU idle time", "Prevents indefinite postponement", "Reduces context switches", "Avoids interrupts"],
"answer": 1,
"explanation": "Ensures all processes get CPU time eventually.",
"beta": -1.0
},
{
"topicId": "os-scheduling",
"subject": "os",
"tag": "os-scheduling-burst",
"text": "Why is CPU burst prediction difficult in SJF?",
"options": ["Requires exact future knowledge", "Uses priority queues", "Needs preemption", "Consumes memory"],
"answer": 0,
"explanation": "Future execution time is unknown, making prediction hard.",
"beta": -1.0
},
{
"topicId": "os-scheduling",
"subject": "os",
"tag": "os-scheduling-rr",
"text": "What trade-off does a very small time quantum create in Round Robin?",
"options": ["High throughput", "High context switching overhead", "Low fairness", "Starvation"],
"answer": 1,
"explanation": "Too small quantum causes frequent context switches.",
"beta": -1.0
},
{
"topicId": "os-scheduling",
"subject": "os",
"tag": "os-scheduling-priority",
"text": "What is a benefit of preemptive priority scheduling over non-preemptive?",
"options": ["Simpler implementation", "Better response for urgent tasks", "No starvation", "Less overhead"],
"answer": 1,
"explanation": "High-priority tasks can interrupt others immediately.",
"beta": -1.0
},
{
"topicId": "os-scheduling",
"subject": "os",
"tag": "os-scheduling-mlfq",
"text": "Why are interactive processes favored in MLFQ?",
"options": ["They use more CPU", "They stay in higher priority queues", "They avoid queues", "They block CPU"],
"answer": 1,
"explanation": "Short bursts keep them in higher priority levels.",
"beta": -1.0
},
{
"topicId": "os-scheduling",
"subject": "os",
"tag": "os-scheduling-utilization",
"text": "Why is CPU utilization not always the best metric for scheduling?",
"options": ["Ignores user experience", "Maximizes throughput", "Reduces waiting time", "Ensures fairness"],
"answer": 0,
"explanation": "High utilization may still give poor response time.",
"beta": -1.0
},
{
"topicId": "os-scheduling",
"subject": "os",
"tag": "os-scheduling-turnaround",
"text": "Which scheduling strategy best minimizes turnaround time in theory?",
"options": ["FCFS", "SJF", "Round Robin", "Priority"],
"answer": 1,
"explanation": "SJF minimizes average turnaround time if burst times are known.",
"beta": -1.0
},
{
"topicId": "os-scheduling",
"subject": "os",
"tag": "os-scheduling-starvation",
"text": "Which scheduling type is most prone to starvation?",
"options": ["FCFS", "Round Robin", "Priority scheduling", "FIFO"],
"answer": 2,
"explanation": "Low-priority processes may never execute.",
"beta": -1.0
},
{
"topicId": "os-scheduling",
"subject": "os",
"tag": "os-scheduling-response",
"text": "Why is response time critical for interactive systems?",
"options": ["Improves throughput", "Ensures quick feedback to users", "Reduces CPU usage", "Avoids context switching"],
"answer": 1,
"explanation": "Users expect fast interaction, not just completion speed.",
"beta": -1.0
},

{
"topicId": "os-memory",
"subject": "os",
"tag": "os-memory-paging",
"text": "Why does paging eliminate external fragmentation but not internal fragmentation?",
"options": ["Pages are variable-sized", "Fixed page size wastes space inside pages", "Memory is contiguous", "Pages are swapped frequently"],
"answer": 1,
"explanation": "Fixed-size pages avoid gaps between blocks but may leave unused space inside a page.",
"beta": -0.5
},
{
"topicId": "os-memory",
"subject": "os",
"tag": "os-memory-segmentation",
"text": "Why is segmentation prone to external fragmentation?",
"options": ["Segments are fixed-sized", "Segments vary in size and need contiguous memory", "Segments are swapped often", "Segments use paging"],
"answer": 1,
"explanation": "Variable-sized segments require contiguous allocation, causing holes over time.",
"beta": -0.5
},
{
"topicId": "os-memory",
"subject": "os",
"tag": "os-memory-tlb",
"text": "What is the primary purpose of a TLB?",
"options": ["Increase memory size", "Speed up address translation", "Reduce page faults", "Store page tables"],
"answer": 1,
"explanation": "TLB caches recent translations to avoid repeated page table lookups.",
"beta": -0.5
},
{
"topicId": "os-memory",
"subject": "os",
"tag": "os-memory-pagefault",
"text": "Why is a page fault expensive?",
"options": ["Uses CPU registers", "Requires disk I/O", "Consumes cache", "Uses interrupts"],
"answer": 1,
"explanation": "Handling a page fault involves accessing disk, which is slow.",
"beta": -0.5
},
{
"topicId": "os-memory",
"subject": "os",
"tag": "os-memory-replacement",
"text": "Why is LRU page replacement difficult to implement exactly?",
"options": ["Needs future knowledge", "Requires tracking usage history precisely", "Uses too much disk", "Causes fragmentation"],
"answer": 1,
"explanation": "Exact LRU requires maintaining detailed access order, which is costly.",
"beta": -0.5
},
{
"topicId": "os-memory",
"subject": "os",
"tag": "os-memory-fifo",
"text": "Why can FIFO page replacement suffer from Belady’s anomaly?",
"options": ["Ignores page usage", "Uses future prediction", "Minimizes faults", "Uses priority queues"],
"answer": 0,
"explanation": "FIFO does not consider usage, leading to unexpected increase in faults.",
"beta": -0.5
},
{
"topicId": "os-memory",
"subject": "os",
"tag": "os-memory-thrashing",
"text": "What causes thrashing in a system?",
"options": ["High CPU usage", "Excessive page faults", "Large memory size", "Efficient paging"],
"answer": 1,
"explanation": "Too many page faults cause constant swapping, reducing performance.",
"beta": -0.5
},
{
"topicId": "os-memory",
"subject": "os",
"tag": "os-memory-working-set",
"text": "Why is the working set model useful?",
"options": ["Reduces CPU usage", "Tracks actively used pages", "Increases memory size", "Avoids interrupts"],
"answer": 1,
"explanation": "Working set ensures active pages stay in memory, reducing faults.",
"beta": -0.5
},
{
"topicId": "os-memory",
"subject": "os",
"tag": "os-memory-virtual",
"text": "Why does virtual memory allow programs larger than physical memory?",
"options": ["Uses faster CPU", "Loads only needed pages into memory", "Increases RAM size", "Avoids disk usage"],
"answer": 1,
"explanation": "Only required pages are loaded, rest stay on disk.",
"beta": -0.5
},
{
"topicId": "os-memory",
"subject": "os",
"tag": "os-memory-fragmentation",
"text": "Which technique reduces external fragmentation?",
"options": ["Paging", "Segmentation", "Compaction avoidance", "Swapping"],
"answer": 0,
"explanation": "Paging uses fixed-size blocks, eliminating external fragmentation.",
"beta": -0.5
},
{
"topicId": "os-memory",
"subject": "os",
"tag": "os-memory-allocation",
"text": "Why is best-fit allocation slower than first-fit?",
"options": ["Uses more memory", "Searches entire list to find smallest suitable block", "Causes fragmentation", "Uses paging"],
"answer": 1,
"explanation": "Best-fit scans all blocks to find optimal size, increasing overhead.",
"beta": -0.5
},
{
"topicId": "os-memory",
"subject": "os",
"tag": "os-memory-allocation",
"text": "Why can worst-fit allocation reduce fragmentation temporarily?",
"options": ["Allocates smallest blocks", "Leaves large free blocks", "Uses paging", "Avoids swapping"],
"answer": 1,
"explanation": "Using largest block leaves bigger remaining spaces for future use.",
"beta": -0.5
},
{
"topicId": "os-memory",
"subject": "os",
"tag": "os-memory-pagefault",
"text": "What determines whether a page fault is minor or major?",
"options": ["Page size", "Whether disk access is required", "CPU speed", "Cache size"],
"answer": 1,
"explanation": "Major faults require disk I/O; minor faults do not.",
"beta": -0.5
},
{
"topicId": "os-memory",
"subject": "os",
"tag": "os-memory-replacement",
"text": "Why does Optimal page replacement perform best theoretically?",
"options": ["Uses least memory", "Uses future knowledge of references", "Avoids disk access", "Uses FIFO"],
"answer": 1,
"explanation": "It replaces the page not needed for the longest future time.",
"beta": -0.5
},
{
"topicId": "os-memory",
"subject": "os",
"tag": "os-memory-dirtybit",
"text": "Why is a dirty bit used in paging?",
"options": ["To track page location", "To check if page was modified", "To reduce fragmentation", "To store addresses"],
"answer": 1,
"explanation": "Dirty bit indicates if page must be written back to disk.",
"beta": -0.5
},
{
"topicId": "os-memory",
"subject": "os",
"tag": "os-memory-cow",
"text": "Why does copy-on-write improve performance?",
"options": ["Copies pages immediately", "Delays copying until modification", "Reduces CPU speed", "Avoids paging"],
"answer": 1,
"explanation": "Pages are only copied when modified, saving memory and time.",
"beta": -0.5
},
{
"topicId": "os-memory",
"subject": "os",
"tag": "os-memory-protection",
"text": "Why are base and limit registers used?",
"options": ["To increase speed", "To enforce memory protection", "To reduce page faults", "To manage cache"],
"answer": 1,
"explanation": "They ensure processes access only their allocated memory.",
"beta": -0.5
},
{
"topicId": "os-memory",
"subject": "os",
"tag": "os-memory-inverted",
"text": "Why are inverted page tables used?",
"options": ["Reduce page faults", "Reduce memory overhead of page tables", "Increase fragmentation", "Avoid disk usage"],
"answer": 1,
"explanation": "Single table indexed by frames reduces memory usage.",
"beta": -0.5
},
{
"topicId": "os-memory",
"subject": "os",
"tag": "os-memory-locality",
"text": "Why does locality of reference improve paging performance?",
"options": ["Reduces CPU speed", "Keeps frequently used pages in memory", "Increases fragmentation", "Uses FIFO"],
"answer": 1,
"explanation": "Programs reuse nearby data, reducing page faults.",
"beta": -0.5
},
{
"topicId": "os-memory",
"subject": "os",
"tag": "os-memory-swap",
"text": "Why is swapping less used in modern systems?",
"options": ["Consumes less memory", "High disk latency reduces performance", "Avoids paging", "Increases CPU usage"],
"answer": 1,
"explanation": "Disk I/O is slow, making full process swapping inefficient.",
"beta": -0.5
},

{
"topicId": "os-sync",
"subject": "os",
"tag": "os-sync-critical-section",
"text": "Why must mutual exclusion alone be insufficient for a correct critical section solution?",
"options": ["It causes deadlock", "It does not guarantee progress or bounded waiting", "It increases CPU usage", "It prevents concurrency"],
"answer": 1,
"explanation": "A correct solution also requires progress and bounded waiting, not just mutual exclusion.",
"beta": 1
},
{
"topicId": "os-sync",
"subject": "os",
"tag": "os-sync-race-condition",
"text": "Why can compiler optimizations worsen race conditions?",
"options": ["They remove synchronization", "They reorder instructions", "They increase CPU speed", "They reduce memory"],
"answer": 1,
"explanation": "Reordering changes execution order, increasing unpredictability of shared data access.",
"beta": 1
},
{
"topicId": "os-sync",
"subject": "os",
"tag": "os-sync-mutex",
"text": "Why is a mutex considered safer than a binary semaphore for mutual exclusion?",
"options": ["It allows multiple holders", "It enforces ownership rules", "It avoids blocking", "It reduces overhead"],
"answer": 1,
"explanation": "Mutex ensures only the owning thread can unlock, preventing misuse.",
"beta": 1
},
{
"topicId": "os-sync",
"subject": "os",
"tag": "os-sync-semaphore",
"text": "What issue arises if semaphore wait and signal are not atomic?",
"options": ["Deadlock avoided", "Race condition in semaphore value", "Improved performance", "No blocking"],
"answer": 1,
"explanation": "Non-atomic operations allow concurrent updates, corrupting semaphore state.",
"beta": 1
},
{
"topicId": "os-sync",
"subject": "os",
"tag": "os-sync-spinlock",
"text": "Why are spinlocks preferred in kernel-level synchronization?",
"options": ["They avoid busy waiting", "Context switching is expensive in kernel", "They allow multiple holders", "They reduce CPU usage"],
"answer": 1,
"explanation": "Kernel avoids costly context switches, so short busy-waiting is efficient.",
"beta": 1
},
{
"topicId": "os-sync",
"subject": "os",
"tag": "os-sync-monitor",
"text": "Why do monitors eliminate the need for explicit locking?",
"options": ["They avoid shared memory", "They provide implicit mutual exclusion", "They prevent blocking", "They use semaphores internally"],
"answer": 1,
"explanation": "Only one thread executes inside a monitor at a time automatically.",
"beta": 1
},
{
"topicId": "os-sync",
"subject": "os",
"tag": "os-sync-critical-section",
"text": "Why is progress condition important in synchronization?",
"options": ["Ensures fairness", "Prevents processes outside CS from blocking entry", "Avoids deadlock", "Improves CPU usage"],
"answer": 1,
"explanation": "Only interested processes should decide entry, not others.",
"beta": 1
},
{
"topicId": "os-sync",
"subject": "os",
"tag": "os-sync-race-condition",
"text": "Why do race conditions not always manifest in every run?",
"options": ["They depend on compiler", "They depend on timing of execution", "They depend on memory size", "They depend on OS"],
"answer": 1,
"explanation": "Different interleavings occur each run, making bugs non-deterministic.",
"beta": 1
},
{
"topicId": "os-sync",
"subject": "os",
"tag": "os-sync-semaphore",
"text": "Why can misuse of semaphore lead to deadlock?",
"options": ["Too many signals", "Incorrect ordering of wait operations", "Too much CPU usage", "No blocking"],
"answer": 1,
"explanation": "Improper ordering can cause circular waiting among processes.",
"beta": 1
},
{
"topicId": "os-sync",
"subject": "os",
"tag": "os-sync-mutex",
"text": "What happens if a thread unlocks a mutex it does not own?",
"options": ["No effect", "Undefined behavior or error", "Deadlock resolved", "CPU crash"],
"answer": 1,
"explanation": "Mutex ownership violation leads to undefined or erroneous behavior.",
"beta": 1
},
{
"topicId": "os-sync",
"subject": "os",
"tag": "os-sync-spinlock",
"text": "Why are spinlocks inefficient on single-core systems?",
"options": ["They cause deadlock", "They waste CPU cycles while waiting", "They increase memory", "They avoid blocking"],
"answer": 1,
"explanation": "Thread spins without progress since no other thread can run to release lock.",
"beta": 1
},
{
"topicId": "os-sync",
"subject": "os",
"tag": "os-sync-monitor",
"text": "Why are condition variables necessary in monitors?",
"options": ["For memory allocation", "To allow threads to wait for conditions", "To enforce locking", "To reduce CPU usage"],
"answer": 1,
"explanation": "They enable threads to sleep and be notified when conditions change.",
"beta": 1
},
{
"topicId": "os-sync",
"subject": "os",
"tag": "os-sync-critical-section",
"text": "Why is bounded waiting required along with mutual exclusion?",
"options": ["Avoids starvation", "Improves throughput", "Reduces context switching", "Avoids deadlock"],
"answer": 0,
"explanation": "Ensures every process gets a chance to enter critical section.",
"beta": 1
},
{
"topicId": "os-sync",
"subject": "os",
"tag": "os-sync-race-condition",
"text": "Which factor most directly causes inconsistent shared data?",
"options": ["Multiple CPUs", "Concurrent unsynchronized access", "Large memory", "Cache size"],
"answer": 1,
"explanation": "Lack of synchronization allows conflicting updates.",
"beta": 1
},
{
"topicId": "os-sync",
"subject": "os",
"tag": "os-sync-semaphore",
"text": "Why is semaphore signal allowed by any thread unlike mutex?",
"options": ["To enforce ownership", "Semaphores do not track ownership", "To reduce blocking", "To improve speed"],
"answer": 1,
"explanation": "Semaphores are not owned, so any thread can signal.",
"beta": 1
},
{
"topicId": "os-sync",
"subject": "os",
"tag": "os-sync-mutex",
"text": "Why can mutex locking cause deadlock?",
"options": ["Too many locks", "Circular wait among threads", "Too fast execution", "No blocking"],
"answer": 1,
"explanation": "Threads waiting on each other in a cycle leads to deadlock.",
"beta": 1
},
{
"topicId": "os-sync",
"subject": "os",
"tag": "os-sync-spinlock",
"text": "When is a spinlock more efficient than a mutex?",
"options": ["Long wait times", "Very short lock hold time", "Single thread execution", "High contention"],
"answer": 1,
"explanation": "Busy waiting is efficient if lock is released quickly.",
"beta": 1
},
{
"topicId": "os-sync",
"subject": "os",
"tag": "os-sync-monitor",
"text": "What problem do monitors help reduce compared to semaphores?",
"options": ["Deadlocks", "Programming errors in synchronization", "CPU usage", "Memory leaks"],
"answer": 1,
"explanation": "Monitors encapsulate synchronization, reducing manual mistakes.",
"beta": 1
},
{
"topicId": "os-sync",
"subject": "os",
"tag": "os-sync-critical-section",
"text": "Why is disabling interrupts unsuitable for user-level synchronization?",
"options": ["Too slow", "User programs cannot control interrupts safely", "Consumes memory", "Avoids deadlock"],
"answer": 1,
"explanation": "Only OS should manage interrupts to maintain system stability.",
"beta": 1
},
{
"topicId": "os-sync",
"subject": "os",
"tag": "os-sync-race-condition",
"text": "Why does adding locks fix race conditions?",
"options": ["Increases speed", "Ensures mutual exclusion on shared data", "Reduces memory usage", "Avoids CPU usage"],
"answer": 1,
"explanation": "Locks serialize access, preventing conflicting updates.",
"beta": 1
},

{
"topicId": "os-deadlock",
"subject": "os",
"tag": "os-deadlock-conditions",
"text": "Why is mutual exclusion a necessary condition for deadlock?",
"options": ["Resources are shareable", "At least one resource must be non-shareable", "Processes must terminate", "All resources must be preemptible"],
"answer": 1,
"explanation": "Deadlock requires at least one resource that cannot be shared simultaneously.",
"beta": 1.5
},
{
"topicId": "os-deadlock",
"subject": "os",
"tag": "os-deadlock-holdwait",
"text": "Why does the hold-and-wait condition contribute to deadlock?",
"options": ["Processes release resources early", "Processes hold resources while waiting for others", "Resources are preempted", "Processes avoid waiting"],
"answer": 1,
"explanation": "Holding resources while waiting creates circular dependencies.",
"beta": 1.5
},
{
"topicId": "os-deadlock",
"subject": "os",
"tag": "os-deadlock-nopreemption",
"text": "Why is no-preemption necessary for deadlock?",
"options": ["Resources cannot be forcibly taken", "Processes terminate early", "Resources are shared", "Scheduling is fair"],
"answer": 0,
"explanation": "If resources could be preempted, deadlock could be broken.",
"beta": 1.5
},
{
"topicId": "os-deadlock",
"subject": "os",
"tag": "os-deadlock-circularwait",
"text": "What does circular wait imply in deadlock?",
"options": ["Processes form a cycle of waiting", "Resources are duplicated", "Processes run sequentially", "No waiting occurs"],
"answer": 0,
"explanation": "Each process waits for a resource held by another in a cycle.",
"beta": 1.5
},
{
"topicId": "os-deadlock",
"subject": "os",
"tag": "os-deadlock-prevention",
"text": "Why does resource ordering prevent deadlocks?",
"options": ["Reduces CPU usage", "Eliminates circular wait", "Increases throughput", "Avoids mutual exclusion"],
"answer": 1,
"explanation": "Ordering ensures no cyclic dependency can form.",
"beta": 1.5
},
{
"topicId": "os-deadlock",
"subject": "os",
"tag": "os-deadlock-avoidance",
"text": "Why does Banker's algorithm avoid deadlocks?",
"options": ["Allocates resources randomly", "Ensures system stays in safe state", "Prevents all waiting", "Eliminates mutual exclusion"],
"answer": 1,
"explanation": "It checks if allocation keeps system in a safe sequence.",
"beta": 1.5
},
{
"topicId": "os-deadlock",
"subject": "os",
"tag": "os-deadlock-detection",
"text": "Why is deadlock detection needed if prevention is not used?",
"options": ["To avoid scheduling", "To identify and recover from deadlocks", "To reduce CPU usage", "To eliminate waiting"],
"answer": 1,
"explanation": "Detection finds deadlocks so recovery actions can be taken.",
"beta": 1.5
},
{
"topicId": "os-deadlock",
"subject": "os",
"tag": "os-deadlock-recovery",
"text": "Why can process termination resolve deadlocks?",
"options": ["Increases resources", "Breaks circular wait", "Reduces memory", "Improves scheduling"],
"answer": 1,
"explanation": "Killing processes releases resources, breaking dependency cycles.",
"beta": 1.5
},
{
"topicId": "os-deadlock",
"subject": "os",
"tag": "os-deadlock-recovery",
"text": "Why is resource preemption risky in recovery?",
"options": ["Increases CPU usage", "May cause starvation or rollback overhead", "Prevents deadlock", "Improves fairness"],
"answer": 1,
"explanation": "Preempted processes may need rollback, causing inefficiency.",
"beta": 1.5
},
{
"topicId": "os-deadlock",
"subject": "os",
"tag": "os-deadlock-safe",
"text": "Why is a safe state not necessarily deadlock-free at the moment?",
"options": ["Deadlock already exists", "Future allocations can still avoid deadlock", "Processes are blocked", "Resources are free"],
"answer": 1,
"explanation": "Safe state guarantees possibility of avoiding deadlock in future.",
"beta": 1.5
},
{
"topicId": "os-deadlock",
"subject": "os",
"tag": "os-deadlock-unsafe",
"text": "Why is an unsafe state dangerous?",
"options": ["Deadlock has occurred", "Deadlock may occur in future", "No processes run", "Resources are free"],
"answer": 1,
"explanation": "Unsafe state means no guarantee of avoiding deadlock.",
"beta": 1.5
},
{
"topicId": "os-deadlock",
"subject": "os",
"tag": "os-deadlock-graph",
"text": "Why does a cycle in a resource allocation graph indicate deadlock only for single-instance resources?",
"options": ["Multiple instances break cycles", "Graph is incorrect", "Resources are shared", "Processes terminate"],
"answer": 0,
"explanation": "With multiple instances, a cycle may not block all processes.",
"beta": 1.5
},
{
"topicId": "os-deadlock",
"subject": "os",
"tag": "os-deadlock-graph",
"text": "What does a cycle imply in wait-for graph?",
"options": ["Deadlock always", "Possible deadlock only", "No deadlock", "Resource free"],
"answer": 0,
"explanation": "Wait-for graph cycles directly indicate deadlock among processes.",
"beta": 1.5
},
{
"topicId": "os-deadlock",
"subject": "os",
"tag": "os-deadlock-prevention",
"text": "Why does eliminating hold-and-wait reduce system efficiency?",
"options": ["Processes must request all resources upfront", "Resources are shared", "CPU usage increases", "Deadlocks increase"],
"answer": 0,
"explanation": "Processes may hold unused resources, reducing utilization.",
"beta": 1.5
},
{
"topicId": "os-deadlock",
"subject": "os",
"tag": "os-deadlock-prevention",
"text": "Why is eliminating mutual exclusion impractical?",
"options": ["Resources are infinite", "Some resources cannot be shared", "Processes terminate early", "CPU is limited"],
"answer": 1,
"explanation": "Certain resources like printers must be used exclusively.",
"beta": 1.5
},
{
"topicId": "os-deadlock",
"subject": "os",
"tag": "os-deadlock-avoidance",
"text": "Why must maximum resource needs be known in Banker's algorithm?",
"options": ["To reduce memory", "To evaluate safe states", "To prevent scheduling", "To eliminate waiting"],
"answer": 1,
"explanation": "Algorithm simulates future allocations using max requirements.",
"beta": 1.5
},
{
"topicId": "os-deadlock",
"subject": "os",
"tag": "os-deadlock-detection",
"text": "Why is deadlock detection overhead acceptable in some systems?",
"options": ["Deadlocks never occur", "Deadlocks are rare events", "Resources are infinite", "Processes are few"],
"answer": 1,
"explanation": "Detection cost is justified if deadlocks are infrequent.",
"beta": 1.5
},
{
"topicId": "os-deadlock",
"subject": "os",
"tag": "os-deadlock-recovery",
"text": "Why is victim selection important in deadlock recovery?",
"options": ["To maximize CPU usage", "To minimize recovery cost", "To avoid scheduling", "To increase memory"],
"answer": 1,
"explanation": "Choosing minimal-cost process reduces system disruption.",
"beta": 1.5
},
{
"topicId": "os-deadlock",
"subject": "os",
"tag": "os-deadlock-starvation",
"text": "Why can deadlock recovery lead to starvation?",
"options": ["Processes terminate early", "Same process repeatedly chosen as victim", "Resources are infinite", "No waiting occurs"],
"answer": 1,
"explanation": "Repeated victim selection prevents a process from progressing.",
"beta": 1.5
},
{
"topicId": "os-deadlock",
"subject": "os",
"tag": "os-deadlock-difference",
"text": "Why is livelock different from deadlock?",
"options": ["Processes are blocked", "Processes keep changing state but make no progress", "Resources are free", "No waiting occurs"],
"answer": 1,
"explanation": "In livelock, processes actively run but fail to progress.",
"beta": 1.5
}
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
